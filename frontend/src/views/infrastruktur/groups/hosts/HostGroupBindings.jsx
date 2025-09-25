import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Stack, Box, TextField, InputAdornment, Button, IconButton,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert, Typography
} from '@mui/material';
import { IconSearch, IconPlus, IconEdit, IconTrash } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Host Groups' },
  { title: 'Bindings' },
];

export default function HostGroupBindings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', alias: '', groupid: '', hostid: '', tags: '', description: '', enabled: true,
  });

  const fetchRows = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/infrastructure/hosts/groups/bindings`, { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      const data = await res.json();
      if (res.ok) setRows(Array.isArray(data) ? data : []);
      else setError(data.error || 'Failed to fetch bindings');
    } catch (e) {
      setError('Failed to fetch bindings');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchRows(); }, []);

  const filtered = rows.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.alias?.toLowerCase().includes(search.toLowerCase()) ||
    r.tags?.toLowerCase().includes(search.toLowerCase()) ||
    r.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        alias: form.alias,
        groupid: Number(form.groupid) || 0,
        hostid: Number(form.hostid) || 0,
        tags: form.tags,
        description: form.description,
        enabled: Boolean(form.enabled),
      };
      const url = editId
        ? `${BACKEND_URL}${API_PREFIX}/hosts/groups/bindings/${editId}`
        : `${BACKEND_URL}${API_PREFIX}/hosts/groups/bindings`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      const data = await res.json();
      if (res.ok) {
        setDialogOpen(false);
        setEditId(null);
        setForm({ name: '', alias: '', groupid: '', hostid: '', tags: '', description: '', enabled: true });
        fetchRows();
      } else setError(data.error || 'Save failed');
    } catch (e) {
      setError('Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/groups/bindings/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      if (res.ok) setRows(prev => prev.filter(r => r.id !== id));
      else {
        const data = await res.json();
        setError(data.error || 'Delete failed');
      }
    } catch (e) {
      setError('Delete failed');
    }
  };

  return (
    <PageContainer title="Host Group Bindings" description="Bind hosts to groups">
      <Breadcrumb title="Host Group Bindings" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search bindings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><IconSearch size={20} /></InputAdornment> }}
                fullWidth
              />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} onClick={() => { setDialogOpen(true); setEditId(null); }}>
              Add Binding
            </Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
                    <TableCell>Host ID</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Enabled</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={10} align="center">No bindings</TableCell></TableRow>
                  ) : filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.name || '-'}</TableCell>
                      <TableCell>{r.alias || '-'}</TableCell>
                      <TableCell>{r.groupid ?? '-'}</TableCell>
                      <TableCell>{r.hostid ?? '-'}</TableCell>
                      <TableCell>{r.tags || '-'}</TableCell>
                      <TableCell>{r.description || '-'}</TableCell>
                      <TableCell>{r.enabled ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{r.created ? new Date(r.created).toLocaleString() : '-'}</TableCell>
                      <TableCell>{r.updated ? new Date(r.updated).toLocaleString() : '-'}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="warning" onClick={() => { setEditId(r.id); setForm({ name: r.name||'', alias: r.alias||'', groupid: r.groupid||'', hostid: r.hostid||'', tags: r.tags||'', description: r.description||'', enabled: !!r.enabled }); setDialogOpen(true); }}>
                          <IconEdit size={16} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(r.id)}>
                          <IconTrash size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? 'Edit Binding' : 'Add Binding'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
          <TextField label="Alias" fullWidth margin="dense" value={form.alias} onChange={(e)=>setForm({...form,alias:e.target.value})} />
          <TextField label="Group ID" fullWidth margin="dense" value={form.groupid} onChange={(e)=>setForm({...form,groupid:e.target.value})} />
          <TextField label="Host ID" fullWidth margin="dense" value={form.hostid} onChange={(e)=>setForm({...form,hostid:e.target.value})} />
          <TextField label="Tags" fullWidth margin="dense" value={form.tags} onChange={(e)=>setForm({...form,tags:e.target.value})} />
          <TextField label="Description" fullWidth margin="dense" multiline minRows={2} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
