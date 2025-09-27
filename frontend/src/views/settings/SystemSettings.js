import React from 'react';
import { Card, CardContent, Box, TextField, Button, Snackbar, Alert, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Settings' },
  { title: 'System Settings' },
];

export default function SystemSettings() {
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [snack, setSnack] = React.useState({ open: false, message: '', severity: 'success' });
  const [rows, setRows] = React.useState([]);
  const [newRow, setNewRow] = React.useState({ key: '', name: '', value: '', description: '' });

  const loadSettings = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/system/settings`, { headers: getAuthHeaders() });
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

  const saveRow = async (row) => {
    const res = await fetch(`${BACKEND_URL}${API_PREFIX}/system/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ key: row.key, name: row.name, value: row.value, description: row.description })
    });
    if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); throw new Error('auth'); }
    if (!res.ok) throw new Error('save failed');
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const r of rows) { await saveRow(r); }
      if (newRow.key && newRow.value) { await saveRow(newRow); setNewRow({ key:'', name:'', value:'', description:'' }); }
      setSnack({ open: true, message: 'Settings saved', severity: 'success' });
      loadSettings();
    } catch (e) {
      setSnack({ open: true, message: 'Save failed: ' + e.message, severity: 'error' });
    } finally { setSaving(false); }
  };

  const removeRow = async (key) => {
    if (!window.confirm('Delete setting '+key+' ?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/system/settings/`+key, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
      setRows(r => r.filter(x=>x.key!==key));
      setSnack({ open:true, message:'Deleted '+key, severity:'success' });
    } catch (e) { setSnack({ open:true, message:'Delete failed', severity:'error' }); }
  };

  return (
    <PageContainer title="System Settings" description="Manage system settings">
      <Breadcrumb title="System Settings" items={BCrumb} />
      <Card>
        <CardContent>
          {loading ? <CircularProgress size={28} /> : (
            <>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={200}>Name</TableCell>
                    <TableCell width={180}>Key</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell width={60} align="center">Del</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((r,idx)=>(
                    <TableRow key={r.key}>
                      <TableCell>
                        <TextField size="small" fullWidth value={r.name || ''} onChange={e=>updateRowValue(idx,'name',e.target.value)} />
                      </TableCell>
                      <TableCell>{r.key}</TableCell>
                      <TableCell>
                        <TextField size="small" fullWidth value={r.value} onChange={e=>updateRowValue(idx,'value',e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <TextField size="small" fullWidth value={r.description || ''} onChange={e=>updateRowValue(idx,'description',e.target.value)} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={()=>removeRow(r.key)}><IconTrash size={16} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <TextField size="small" placeholder="Name" value={newRow.name} onChange={e=>setNewRow({...newRow,name:e.target.value})} />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" placeholder="new_key" value={newRow.key} onChange={e=>setNewRow({...newRow,key:e.target.value})} />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" placeholder="value" value={newRow.value} onChange={e=>setNewRow({...newRow,value:e.target.value})} />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" placeholder="description" value={newRow.description} onChange={e=>setNewRow({...newRow,description:e.target.value})} />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" disabled={!newRow.key || !newRow.value} onClick={()=>{ setRows(r=>[...r,newRow]); setNewRow({key:'',name:'',value:'',description:''}) }}><IconPlus size={16} /></IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box mt={2}>
                <Button variant="contained" disabled={saving} onClick={saveAll}>{saving ? 'Saving...' : 'Save All'}</Button>
              </Box>
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
