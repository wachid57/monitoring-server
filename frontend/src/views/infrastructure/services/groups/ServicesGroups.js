import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Button, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, Box, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress
} from '@mui/material';
import { IconPlus, IconSearch, IconEdit, IconTrash, IconEye } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Infrastructure' },
  { title: 'Service Groups' },
];

export default function ServicesGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, group: null });
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', alias: '', description: '', tags: '' });

  const fetchGroups = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/infrastructure/services/groups/lists', { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
      const data = await res.json();
      if (res.ok) {
        const normalized = (data || []).map(g => ({
          id: g.id ?? g.ID,
            name: g.name ?? g.Name,
            alias: g.alias ?? g.Alias ?? '',
            description: g.description ?? g.Desc ?? '',
            tags: g.tags ?? g.Tags ?? '',
            created_at: g.created_at || g.created || g.CreatedAt || g.Created || null,
        }));
        setGroups(normalized);
      } else setError(data.error || 'Failed to fetch service groups');
    } catch (e) { console.error(e); setError('Failed to fetch service groups'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchGroups(); }, []);

  const filtered = groups.filter(g =>
    g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => { setFormData({ name: '', alias: '', description: '', tags: '' }); setEditMode(false); setEditingId(null); setFormDialogOpen(true); };
  const openEdit = (g) => { setFormData({ name: g.name || '', alias: g.alias || '', description: g.description || '', tags: g.tags || '' }); setEditMode(true); setEditingId(g.id); setFormDialogOpen(true); };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + `/services/groups/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      if (res.ok) { setGroups(prev => prev.filter(g => g.id !== id)); setDeleteDialog({ open: false, group: null }); }
      else { const data = await res.json(); setError(data.error || 'Failed to delete group'); }
    } catch (e) { console.error(e); setError('Failed to delete group'); }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true); setError('');
    try {
      const method = editMode ? 'PUT' : 'POST';
      const url = editMode ? `/services/groups/${editingId}` : '/services/groups';
      const res = await fetch(BACKEND_URL + API_PREFIX + url, {
        method,
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(formData)
      });
      if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
      const data = await res.json();
      if (res.ok) { fetchGroups(); setFormDialogOpen(false); setEditMode(false); setEditingId(null); }
      else setError(data.error || (editMode ? 'Failed to update group' : 'Failed to create group'));
    } catch (e) { console.error(e); setError(editMode ? 'Failed to update group' : 'Failed to create group'); }
    finally { setSubmitLoading(false); }
  };

  return (
    <PageContainer title="Service Groups" description="Manage service groups">
      <Breadcrumb title="Service Groups" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }}
                fullWidth
              />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} onClick={openCreate} sx={{ width: 225 }}>Add Group</Button>
          </Stack>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
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
                    <TableCell>Description</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={7} align="center">No service groups found</TableCell></TableRow>
                  ) : filtered.map(g => (
                    <TableRow key={g.id}>
                      <TableCell>{g.id}</TableCell>
                      <TableCell>{g.name || '-'}</TableCell>
                      <TableCell>{g.alias || '-'}</TableCell>
                      <TableCell>{g.description || '-'}</TableCell>
                      <TableCell>{g.tags || '-'}</TableCell>
                      <TableCell>{g.created_at ? new Date(g.created_at).toLocaleDateString() : '-'}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton size="small" color="primary"><IconEye size={16} /></IconButton>
                          <IconButton size="small" color="warning" onClick={() => openEdit(g)}><IconEdit size={16} /></IconButton>
                          <IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, group: g })}><IconTrash size={16} /></IconButton>
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

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, group: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent><Typography>Delete group "{deleteDialog.group?.name}"?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, group: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(deleteDialog.group?.id)}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={formDialogOpen} onClose={() => { setFormDialogOpen(false); setEditMode(false); setEditingId(null); }} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Service Group' : 'Add Service Group'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <TextField label="Alias" fullWidth margin="dense" value={formData.alias} onChange={e => setFormData({ ...formData, alias: e.target.value })} />
          <TextField label="Description" fullWidth margin="dense" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          <TextField label="Tags" fullWidth margin="dense" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={20} /> : (editMode ? 'Save' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
