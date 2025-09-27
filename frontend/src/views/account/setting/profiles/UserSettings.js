import React from 'react';
import { Card, CardContent, Box, TextField, Snackbar, Alert, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Switch, Stack, Tooltip } from '@mui/material';
import { IconPlus, IconTrash, IconEdit, IconCheck, IconX, IconLock } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
	{ to: '/', title: 'Home' },
	{ title: 'Account' },
	{ title: 'User Settings' },
];

export default function UserSettings() {
	const [loading, setLoading] = React.useState(false);
	const [snack, setSnack] = React.useState({ open: false, message: '', severity: 'success' });
	const [rows, setRows] = React.useState([]);
	const [editing, setEditing] = React.useState({}); // key -> snapshot
	const [newRow, setNewRow] = React.useState({ key: '', name: '', value: '', description: '', enabled: true });

	const loadSettings = React.useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`${BACKEND_URL}${API_PREFIX}/account/setting/profiles/user-settings`, { headers: getAuthHeaders() });
			if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
			if (!res.ok) throw new Error('Failed load');
			const data = await res.json();
			setRows(data.sort((a,b)=>a.key.localeCompare(b.key)));
		} catch (e) {
			setSnack({ open: true, message: 'Load failed: ' + e.message, severity: 'error' });
		} finally {
			setLoading(false);
		}
	}, []);

	React.useEffect(() => { loadSettings(); }, [loadSettings]);

	const updateRowValue = (idx, field, value) => {
		setRows(r => r.map((row,i)=> i===idx ? { ...row, [field]: value } : row));
	};
	const beginEdit = (r) => setEditing(e => ({ ...e, [r.key]: { ...r } }));
	const cancelEdit = (r) => { setRows(rs => rs.map(x => x.key === r.key ? editing[r.key] : x)); setEditing(e => { const cp={...e}; delete cp[r.key]; return cp; }); };
	const isEditing = (key) => !!editing[key];

	const saveRow = async (row) => {
		const res = await fetch(`${BACKEND_URL}${API_PREFIX}/account/setting/profiles/user-settings`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
			body: JSON.stringify({ key: row.key, name: row.name, value: row.value, description: row.description, enabled: row.enabled })
		});
		if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); throw new Error('auth'); }
		if (!res.ok) throw new Error('save failed');
	};
	const commitEdit = async (r) => {
		try { await saveRow(r); setSnack({ open:true, message:`Saved ${r.key}`, severity:'success' }); setEditing(e=>{const cp={...e}; delete cp[r.key]; return cp;}); }
		catch(e){ setSnack({ open:true, message:'Save failed: '+e.message, severity:'error' }); }
	};
	const addNew = async () => {
		if (!newRow.key || !newRow.value) return;
		try { await saveRow(newRow); setSnack({open:true,message:`Created ${newRow.key}`,severity:'success'}); setNewRow({ key:'', name:'', value:'', description:'', enabled:true }); loadSettings(); }
		catch(e){ setSnack({open:true,message:'Create failed: '+e.message,severity:'error'}); }
	};

	const removeRow = async (row) => {
		if (row.native) return;
		if (!window.confirm('Delete setting '+row.key+' ?')) return;
		try {
			const res = await fetch(`${BACKEND_URL}${API_PREFIX}/account/setting/profiles/user-settings/`+row.key, { method: 'DELETE', headers: getAuthHeaders() });
			if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
			setRows(r => r.filter(x=>x.key!==row.key));
			setSnack({ open:true, message:'Deleted '+row.key, severity:'success' });
		} catch (e) { setSnack({ open:true, message:'Delete failed', severity:'error' }); }
	};

	return (
		<PageContainer title="User Settings" description="Manage your personal settings">
			<Breadcrumb title="User Settings" items={BCrumb} />
			<Card>
				<CardContent>
					{loading ? <CircularProgress size={28} /> : (
						<>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell width={200}>Name</TableCell>
										<TableCell width={160}>Key</TableCell>
										<TableCell width={120}>Enabled</TableCell>
										<TableCell>Value</TableCell>
										<TableCell>Description</TableCell>
										<TableCell width={140} align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((r,idx)=>{
										const editMode = isEditing(r.key);
										return (
											<TableRow key={r.key} hover>
												<TableCell>
													<Stack direction="row" spacing={1} alignItems="center">
														{r.native && <Tooltip title="Native setting"><span><IconLock size={14} /></span></Tooltip>}
														{editMode ? (
															<TextField size="small" fullWidth value={r.name || ''} onChange={e=>updateRowValue(idx,'name',e.target.value)} />
														) : (<span>{r.name || <em style={{opacity:0.6}}>—</em>}</span>)}
													</Stack>
												</TableCell>
												<TableCell>{r.key}</TableCell>
												<TableCell>
													<Switch size="small" checked={!!r.enabled} disabled={!editMode} onChange={e=>updateRowValue(idx,'enabled',e.target.checked)} />
												</TableCell>
												<TableCell>
													{editMode ? (
														<TextField size="small" fullWidth value={r.value} onChange={e=>updateRowValue(idx,'value',e.target.value)} />
													) : (<span style={{fontFamily:'monospace'}}>{r.value}</span>)}
												</TableCell>
												<TableCell>
													{editMode ? (
														<TextField size="small" fullWidth value={r.description || ''} onChange={e=>updateRowValue(idx,'description',e.target.value)} />
													) : (<span>{r.description}</span>)}
												</TableCell>
												<TableCell align="center">
													{editMode ? (
														<Stack direction="row" spacing={1} justifyContent="center">
															<IconButton size="small" color="success" onClick={()=>commitEdit(r)}><IconCheck size={16} /></IconButton>
															<IconButton size="small" color="error" onClick={()=>cancelEdit(r)}><IconX size={16} /></IconButton>
														</Stack>
													) : (
														<Stack direction="row" spacing={1} justifyContent="center">
															<IconButton size="small" onClick={()=>beginEdit(r)}><IconEdit size={16} /></IconButton>
															{!r.native && <IconButton size="small" onClick={()=>removeRow(r)}><IconTrash size={16} /></IconButton>}
														</Stack>
													)}
												</TableCell>
											</TableRow>
										);
									})}
									<TableRow>
										<TableCell>
											<TextField size="small" placeholder="Name" value={newRow.name} onChange={e=>setNewRow({...newRow,name:e.target.value})} />
										</TableCell>
										<TableCell>
											<TextField size="small" placeholder="new_key" value={newRow.key} onChange={e=>setNewRow({...newRow,key:e.target.value})} />
										</TableCell>
										<TableCell>
											<Switch size="small" checked={newRow.enabled} onChange={e=>setNewRow(n=>({...n,enabled:e.target.checked}))} />
										</TableCell>
										<TableCell>
											<TextField size="small" placeholder="value" value={newRow.value} onChange={e=>setNewRow({...newRow,value:e.target.value})} />
										</TableCell>
										<TableCell>
											<TextField size="small" placeholder="description" value={newRow.description} onChange={e=>setNewRow({...newRow,description:e.target.value})} />
										</TableCell>
										<TableCell align="center">
											<IconButton size="small" disabled={!newRow.key || !newRow.value} onClick={addNew}><IconPlus size={16} /></IconButton>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</>
					)}
				</CardContent>
			</Card>
			<Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
				<Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
					{snack.message}
				</Alert>
			</Snackbar>
		</PageContainer>
	);
}
