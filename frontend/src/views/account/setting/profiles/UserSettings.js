import React from 'react';
import { Card, CardContent, Snackbar, Alert } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';
import EditableSettingsTable from 'src/components/settings/EditableSettingsTable';

const BCrumb = [
	{ to: '/', title: 'Home' },
	{ title: 'Account' },
	{ title: 'User Settings' },
];

export default function UserSettings() {
	const [loading, setLoading] = React.useState(false);
	const [snack, setSnack] = React.useState({ open: false, message: '', severity: 'success' });
	const [rows, setRows] = React.useState([]);

	const loadSettings = React.useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(BACKEND_URL + API_PREFIX + '/account/setting/profiles/user-settings', { headers: getAuthHeaders() });
			if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
			if (!res.ok) throw new Error('Failed load');
			const data = await res.json();
			setRows(data.sort((a,b)=>a.key.localeCompare(b.key)));
		} catch (e) {
			setSnack({ open: true, message: 'Load failed: ' + e.message, severity: 'error' });
		} finally { setLoading(false); }
	}, []);

	React.useEffect(() => { loadSettings(); }, [loadSettings]);

	const upsert = async (row) => {
		const res = await fetch(BACKEND_URL + API_PREFIX + '/account/setting/profiles/user-settings', {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(row)
		});
		if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
		if (!res.ok) throw new Error('Save failed');
		const saved = await res.json();
		setRows(r=>{
			const idx = r.findIndex(x=>x.key===saved.key);
			if(idx>=0){ const copy=[...r]; copy[idx]=saved; return copy.sort((a,b)=>a.key.localeCompare(b.key)); }
			return [...r, saved].sort((a,b)=>a.key.localeCompare(b.key));
		});
		setSnack({ open:true, message:'Saved', severity:'success' });
	};

	const del = async (key) => {
		const res = await fetch(BACKEND_URL + API_PREFIX + '/account/setting/profiles/user-settings/' + key, { method:'DELETE', headers: getAuthHeaders() });
		if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
		if (!res.ok) throw new Error('Delete failed');
		setSnack({ open:true, message:'Deleted '+key, severity:'success' });
		setRows(r=>r.filter(x=>x.key!==key));
	};

	return (
		<PageContainer title="User Settings" description="Manage your personal settings">
			<Breadcrumb title="User Settings" items={BCrumb} />
			<Card>
				<CardContent>
					<EditableSettingsTable 
						rows={rows}
						loading={loading}
						onReload={loadSettings}
						onUpsert={upsert}
						onDelete={del}
						title="User Settings"
					/>
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
