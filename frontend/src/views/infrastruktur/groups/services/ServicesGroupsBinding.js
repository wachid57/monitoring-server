import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Stack, Box, TextField, InputAdornment, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress } from '@mui/material';
import { IconSearch, IconPlus, IconEdit, IconTrash } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Service Groups' },
  { title: 'Bindings' },
];

const defaultItem = { name: '', alias: '', groupid: '', serviceid: '', tags: '', description: '', enabled: true };

export default function ServicesGroupsBinding() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultItem);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = async () => {
    setLoading(true); setError('');
    try {
      // Placeholder: use service groups endpoint or dedicated binding when available
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups`, { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      const data = await res.json();
      if (res.ok) setItems(Array.isArray(data) ? data : (data.items || [])); else setError(data.error || 'Failed to fetch');
    } catch (e) { setError('Failed to fetch'); } finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const filtered = useMemo(() => (items || []).filter(x =>
    (x.name||'').toLowerCase().includes(q.toLowerCase()) ||
    (x.alias||'').toLowerCase().includes(q.toLowerCase()) ||
    (x.tags||'').toLowerCase().includes(q.toLowerCase()) ||
    (x.description||'').toLowerCase().includes(q.toLowerCase())
  ), [items, q]);

  const save = async () => {
    setSubmitting(true); setError('');
    try {
      // TODO: replace with real binding API when available
      setOpen(false); setForm(defaultItem); setEditingId(null);
    } catch (e) { setError('Failed to save'); } finally { setSubmitting(false); }
  };

  const remove = async (id) => {
    try {
      // TODO: call delete binding API
      setItems(prev => prev.filter(x => x.id !== id));
    } catch (e) {}
  };

  return (
    <PageContainer title="Service Group Bindings" description="Manage service group bindings">
      <Breadcrumb title="Service Group Bindings" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField fullWidth placeholder="Search" value={q} onChange={(e)=>setQ(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }} />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} onClick={()=>{ setForm(defaultItem); setEditingId(null); setOpen(true); }} sx={{ width: 225 }}>Add Binding</Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Alias</TableCell>
                    <TableCell>Group ID</TableCell>
                    <TableCell>Service ID</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={7} align="center">No data</TableCell></TableRow>
                  ) : filtered.map(row => (
                    <TableRow key={row.id || row.name}>
                      <TableCell>{row.name || '-'}</TableCell>
                      <TableCell>{row.alias || '-'}</TableCell>
                      <TableCell>{row.groupid ?? '-'}</TableCell>
                      <TableCell>{row.serviceid ?? '-'}</TableCell>
                      <TableCell>{row.tags || '-'}</TableCell>
                      <TableCell>{row.description || '-'}</TableCell>
                      <TableCell align="center">
                        <IconButton color="warning" size="small" onClick={()=>{ setEditingId(row.id); setForm({ name: row.name||'', alias: row.alias||'', groupid: row.groupid||'', serviceid: row.serviceid||'', tags: row.tags||'', description: row.description||'', enabled: !!row.enabled }); setOpen(true); }}><IconEdit size={16} /></IconButton>
                        <IconButton color="error" size="small" onClick={()=>remove(row.id)}><IconTrash size={16} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>{editingId ? 'Edit Binding' : 'Add Binding'}</DialogTitle>
            <DialogContent>
              <Stack spacing={2} mt={1}>
                <TextField label="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} fullWidth />
                <TextField label="Alias" value={form.alias} onChange={(e)=>setForm({...form, alias:e.target.value})} fullWidth />
                <TextField label="Group ID" value={form.groupid} onChange={(e)=>setForm({...form, groupid:e.target.value})} fullWidth />
                <TextField label="Service ID" value={form.serviceid} onChange={(e)=>setForm({...form, serviceid:e.target.value})} fullWidth />
                <TextField label="Tags" value={form.tags} onChange={(e)=>setForm({...form, tags:e.target.value})} fullWidth />
                <TextField label="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} fullWidth />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={save} disabled={submitting}>{submitting ? <CircularProgress size={18} /> : 'Save'}</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
