import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Stack, Box, Button, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, CircularProgress, Alert, IconButton
} from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons';
import { useParams } from 'react-router';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Hosts' },
  { title: 'Host Details' },
];

export default function HostsDetails() {
  const { id } = useParams();
  const [host, setHost] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [newService, setNewService] = useState({ name: '', type: '', target: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true); setError('');
    try {
      // Fetch host details
      const hRes = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${id}`, { headers: getAuthHeaders() });
      if (hRes.status === 401 || hRes.status === 403) { handleAuthError({ status: hRes.status }); return; }
      if (!hRes.ok) throw new Error('Failed load host');
      const hData = await hRes.json();
      setHost({
        id: hData.ID ?? hData.id,
        ip: hData.IP ?? hData.ip,
        hostname: hData.Hostname ?? hData.hostname,
        alias: hData.Alias ?? hData.alias,
        tags: hData.HostsTags ?? hData.hosts_tags ?? '',
      });

      // Fetch services bound to this host (placeholder endpoint)
      const sRes = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${id}/services`, { headers: getAuthHeaders() });
      if (sRes.status === 401 || sRes.status === 403) { handleAuthError({ status: sRes.status }); return; }
      if (sRes.ok) {
        const sData = await sRes.json();
        const normalized = (sData || []).map(s => ({
          id: s.ID ?? s.id,
          name: s.Name ?? s.name,
          type: s.Type ?? s.type,
          target: s.Target ?? s.target,
          status: s.Status ?? s.status ?? 'unknown',
          created_at: s.CreatedAt ?? s.created_at,
        }));
        setServices(normalized);
      }
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [id]);

  const addService = async () => {
    setSaving(true);
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${id}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(newService)
      });
      if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
      if (!res.ok) throw new Error('Failed create service');
      const created = await res.json();
      setServices(prev => [...prev, {
        id: created.ID ?? created.id,
        name: created.Name ?? created.name,
        type: created.Type ?? created.type,
        target: created.Target ?? created.target,
        status: created.Status ?? created.status ?? 'unknown',
        created_at: created.CreatedAt ?? created.created_at,
      }]);
      setAddOpen(false); setNewService({ name: '', type: '', target: '' });
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const deleteService = async (sid) => {
    if (!window.confirm('Delete service?')) return;
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${id}/services/${sid}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
      if (!res.ok) throw new Error('Delete failed');
      setServices(prev => prev.filter(s => s.id !== sid));
    } catch (e) { setError(e.message); }
  };

  return (
    <PageContainer title="Host Details" description="Host services overview">
      <Breadcrumb title="Host Details" items={BCrumb} />
      <Card sx={{ mb: 3 }}>
        <CardContent>
          {host ? (
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="h6" gutterBottom>{host.hostname} ({host.ip})</Typography>
                <Typography variant="body2">Alias: {host.alias || '-'}</Typography>
                <Typography variant="body2">Tags: {host.tags || '-'}</Typography>
              </Box>
              <Box>
                <Button variant="outlined" onClick={load}>Refresh</Button>
              </Box>
            </Stack>
          ) : (
            <Typography>Loading host...</Typography>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Services</Typography>
            <Button startIcon={<IconPlus />} variant="contained" onClick={() => setAddOpen(true)}>Add Service</Button>
          </Stack>
          {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
          {loading ? <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box> : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.length === 0 ? (
                    <TableRow><TableCell colSpan={6} align="center">No services found</TableCell></TableRow>
                  ) : services.map(s => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.type}</TableCell>
                      <TableCell>{s.target}</TableCell>
                      <TableCell>{s.status}</TableCell>
                      <TableCell>{s.created_at ? new Date(s.created_at).toLocaleDateString() : '-'}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="error" onClick={()=>deleteService(s.id)}><IconTrash size={16} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={addOpen} onClose={()=>setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Service</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={newService.name} onChange={e=>setNewService(ns=>({...ns,name:e.target.value}))} />
          <TextField label="Type" fullWidth margin="dense" value={newService.type} onChange={e=>setNewService(ns=>({...ns,type:e.target.value}))} />
          <TextField label="Target" fullWidth margin="dense" value={newService.target} onChange={e=>setNewService(ns=>({...ns,target:e.target.value}))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setAddOpen(false)}>Cancel</Button>
          <Button variant="contained" disabled={!newService.name || !newService.type} onClick={addService}>{saving ? <CircularProgress size={18} /> : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
