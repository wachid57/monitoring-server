import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress } from '@mui/material';
import { IconPlus, IconSearch, IconEdit, IconTrash, IconEye } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [ { to: '/', title: 'Home' }, { title: 'Infrastructure' }, { title: 'Service Group Bindings' } ];

const emptyForm = { name: '', alias: '', groupid: '', serviceid: '', tags: '', description: '', enabled: true };

export default function ServicesGroupsBinding() {
	const [bindings, setBindings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });
	const [viewDialog, setViewDialog] = useState({ open: false, item: null });
	const [editMode, setEditMode] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	const fetchBindings = async () => {
		setLoading(true); setError('');
		try {
			const res = await fetch(`${BACKEND_URL}${API_PREFIX}/infrastructure/services/groups/bindings`, { headers: getAuthHeaders() });
			if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
			const data = await res.json();
			if (res.ok) setBindings(Array.isArray(data) ? data : (data.items || [])); else setError(data.error || 'Failed to fetch bindings');
		} catch (e) { setError('Failed to fetch bindings'); }
		finally { setLoading(false); }
	};

	useEffect(() => { fetchBindings(); }, []);

	const filtered = useMemo(() => (bindings||[]).filter(b => {
		const q = search.toLowerCase();
		return (b.name||'').toLowerCase().includes(q) || (b.alias||'').toLowerCase().includes(q) || (b.tags||'').toLowerCase().includes(q) || (b.description||'').toLowerCase().includes(q);
	}), [bindings, search]);

	const openCreate = () => { setFormData(emptyForm); setEditMode(false); setEditingId(null); setFormOpen(true); };
	const openEdit = (b) => { setFormData({ name: b.name||'', alias: b.alias||'', groupid: b.groupid||'', serviceid: b.serviceid||'', tags: b.tags||'', description: b.description||'', enabled: b.enabled }); setEditMode(true); setEditingId(b.id); setFormOpen(true); };

	const handleSubmit = async () => {
		setSubmitting(true); setError('');
		try {
			const method = editMode ? 'PUT' : 'POST';
			const url = editMode ? `/services/groups/bindings/${editingId}` : '/services/groups/bindings';
			const res = await fetch(`${BACKEND_URL}${API_PREFIX}${url}`, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify(formData) });
			if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
			const data = await res.json();
			if (res.ok) { fetchBindings(); setFormOpen(false); setEditMode(false); setEditingId(null); }
			else setError(data.error || (editMode ? 'Failed to update binding' : 'Failed to create binding'));
		} catch (e) { setError(editMode ? 'Failed to update binding' : 'Failed to create binding'); }
		finally { setSubmitting(false); }
	};

	const handleDelete = async (id) => {
		try {
			const res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups/bindings/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
			if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
			if (res.status === 204 || res.ok) { setBindings(prev => prev.filter(b => b.id !== id)); setDeleteDialog({ open: false, item: null }); }
			else { try { const data = await res.json(); setError(data.error || 'Failed to delete binding'); } catch { setError('Failed to delete binding'); } }
		} catch { setError('Failed to delete binding'); }
	};

	return (
		<PageContainer title="Service Group Bindings" description="Manage service group bindings">
			<Breadcrumb title="Service Group Bindings" items={BCrumb} />
			<Card>
				<CardContent>
					<Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
						<Box sx={{ minWidth: 300 }}>
							<TextField placeholder="Search bindings..." value={search} onChange={e=>setSearch(e.target.value)} fullWidth InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }} />
						</Box>
						<Button variant="contained" startIcon={<IconPlus />} onClick={openCreate} sx={{ width: 225 }}>Add Binding</Button>
					</Stack>
					{error && <Alert severity="error" sx={{ mb:3 }}>{error}</Alert>}
					{loading ? (
						<Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
					) : (
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Alias</TableCell>
										<TableCell>Group ID</TableCell>
										<TableCell>Service ID</TableCell>
										<TableCell>Tags</TableCell>
										<TableCell>Description</TableCell>
										<TableCell>Created</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered.length === 0 ? (
										<TableRow><TableCell colSpan={9} align="center">No bindings found</TableCell></TableRow>
									) : filtered.map(b => (
										<TableRow key={b.id}>
											<TableCell>{b.id}</TableCell>
											<TableCell>{b.name || '-'}</TableCell>
											<TableCell>{b.alias || '-'}</TableCell>
											<TableCell>{b.groupid ?? '-'}</TableCell>
											<TableCell>{b.serviceid ?? '-'}</TableCell>
											<TableCell>{b.tags || '-'}</TableCell>
											<TableCell>{b.description || '-'}</TableCell>
											<TableCell>{b.created ? new Date(b.created).toLocaleDateString() : '-'}</TableCell>
											<TableCell align="center">
												<Stack direction="row" spacing={1} justifyContent="center">
													<IconButton size="small" color="primary" onClick={()=>setViewDialog({ open: true, item: b })}><IconEye size={16} /></IconButton>
													<IconButton size="small" color="warning" onClick={()=>openEdit(b)}><IconEdit size={16} /></IconButton>
													<IconButton size="small" color="error" onClick={()=>setDeleteDialog({ open: true, item: b })}><IconTrash size={16} /></IconButton>
												</Stack>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</CardContent>
			</Card>

			<Dialog open={deleteDialog.open} onClose={()=>setDeleteDialog({ open:false, item:null })}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent><Typography>Delete binding "{deleteDialog.item?.name}"?</Typography></DialogContent>
				<DialogActions>
					<Button onClick={()=>setDeleteDialog({ open:false, item:null })}>Cancel</Button>
					<Button color="error" variant="contained" onClick={()=>handleDelete(deleteDialog.item?.id)}>Delete</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={viewDialog.open} onClose={()=>setViewDialog({ open:false, item:null })} fullWidth maxWidth="sm">
				<DialogTitle>Binding Detail</DialogTitle>
				<DialogContent>
					{viewDialog.item && (
						<Stack spacing={1} mt={1}>
							<Typography variant="body2"><strong>ID:</strong> {viewDialog.item.id}</Typography>
							<Typography variant="body2"><strong>Name:</strong> {viewDialog.item.name || '-'}</Typography>
							<Typography variant="body2"><strong>Alias:</strong> {viewDialog.item.alias || '-'}</Typography>
							<Typography variant="body2"><strong>Group ID:</strong> {viewDialog.item.groupid ?? '-'}</Typography>
							<Typography variant="body2"><strong>Service ID:</strong> {viewDialog.item.serviceid ?? '-'}</Typography>
							<Typography variant="body2"><strong>Tags:</strong> {viewDialog.item.tags || '-'}</Typography>
							<Typography variant="body2"><strong>Description:</strong> {viewDialog.item.description || '-'}</Typography>
							<Typography variant="body2"><strong>Enabled:</strong> {viewDialog.item.enabled ? 'Yes' : 'No'}</Typography>
							<Typography variant="body2"><strong>Created:</strong> {viewDialog.item.created ? new Date(viewDialog.item.created).toLocaleString() : '-'}</Typography>
							<Typography variant="body2"><strong>Updated:</strong> {viewDialog.item.updated ? new Date(viewDialog.item.updated).toLocaleString() : '-'}</Typography>
						</Stack>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={()=>setViewDialog({ open:false, item:null })}>Close</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={formOpen} onClose={()=>{ setFormOpen(false); setEditMode(false); setEditingId(null); }} fullWidth maxWidth="sm">
				<DialogTitle>{editMode ? 'Edit Binding' : 'Add Binding'}</DialogTitle>
				<DialogContent>
					<TextField label="Name" fullWidth margin="dense" value={formData.name} onChange={e=>setFormData({ ...formData, name: e.target.value })} />
					<TextField label="Alias" fullWidth margin="dense" value={formData.alias} onChange={e=>setFormData({ ...formData, alias: e.target.value })} />
					<TextField label="Group ID" fullWidth margin="dense" value={formData.groupid} onChange={e=>setFormData({ ...formData, groupid: e.target.value })} />
					<TextField label="Service ID" fullWidth margin="dense" value={formData.serviceid} onChange={e=>setFormData({ ...formData, serviceid: e.target.value })} />
					<TextField label="Tags" fullWidth margin="dense" value={formData.tags} onChange={e=>setFormData({ ...formData, tags: e.target.value })} />
					<TextField label="Description" fullWidth margin="dense" value={formData.description} onChange={e=>setFormData({ ...formData, description: e.target.value })} />
				</DialogContent>
				<DialogActions>
					<Button onClick={()=>setFormOpen(false)}>Cancel</Button>
					<Button variant="contained" onClick={handleSubmit} disabled={submitting}>{submitting ? <CircularProgress size={20} /> : (editMode ? 'Save' : 'Create')}</Button>
				</DialogActions>
			</Dialog>
		</PageContainer>
	);
}
