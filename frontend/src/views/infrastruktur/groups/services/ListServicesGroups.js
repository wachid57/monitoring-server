import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
} from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Service Groups' },
  { title: 'List Service Groups' },
];

const ServicesGroupsLists = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, group: null });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', desc: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/services/groups', { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setGroups(data || []);
      } else {
        setError(data.error || 'Failed to fetch service groups');
      }
    } catch (err) {
      console.error('fetch service groups error', err);
      setError('Failed to fetch service groups');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (groupId) => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + `/services/groups/${groupId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      if (res.ok) {
        setGroups(prev => prev.filter(g => g.id !== groupId));
        setDeleteDialog({ open: false, group: null });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete service group');
      }
    } catch (err) {
      console.error('delete service group error', err);
      setError('Failed to delete service group');
    }
  };

  const filteredGroups = groups.filter(g =>
    g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.desc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => { fetchGroups(); }, []);

  return (
    <PageContainer title="Service Groups" description="Manage service groups">
  <Breadcrumb title="Service Groups" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search service groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }}
                fullWidth
              />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} onClick={() => setAddDialogOpen(true)} sx={{ width: 225 }}>Add Group</Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                        <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGroups.length === 0 ? (
                    <TableRow><TableCell colSpan={7} align="center">No hosts found</TableCell></TableRow>
                  ) : (
                    filteredGroups.map((g) => (
                      <TableRow key={g.id}>
                        <TableCell>{g.name || '-'}</TableCell>
                        <TableCell>{g.desc || '-'}</TableCell>
                        <TableCell>{g.created_at ? new Date(g.created_at).toLocaleDateString() : '-'}</TableCell>
                        <TableCell align="center">
                                          <Stack direction="row" spacing={1} justifyContent="center">
                                            <IconButton size="small" color="primary"><IconEye size={16} /></IconButton>
                                            <IconButton size="small" color="warning" onClick={() => {
                                              setEditMode(true);
                                              setEditingGroupId(g.id);
                                              setNewGroup({ name: g.name || '', desc: g.desc || '' });
                                              setAddDialogOpen(true);
                                            }}><IconEdit size={16} /></IconButton>
                                            <IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, group: g })}><IconTrash size={16} /></IconButton>
                                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, group: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Delete service group "{deleteDialog.group?.name}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, group: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(deleteDialog.group?.id)}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={() => { setAddDialogOpen(false); setEditMode(false); setEditingGroupId(null); }} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Service Group' : 'Add Service Group'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={newGroup.name} onChange={e => setNewGroup({...newGroup, name: e.target.value})} />
          <TextField label="Description" fullWidth margin="dense" value={newGroup.desc} onChange={e => setNewGroup({...newGroup, desc: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={async () => {
            setSubmitLoading(true);
            try {
              let res;
              if (editMode && editingGroupId) {
                res = await fetch(BACKEND_URL + API_PREFIX + `/services/groups/${editingGroupId}`, { method: 'PUT', headers: {'Content-Type': 'application/json', ...getAuthHeaders()}, body: JSON.stringify(newGroup) });
              } else {
                res = await fetch(BACKEND_URL + API_PREFIX + '/services/groups', { method: 'POST', headers: {'Content-Type': 'application/json', ...getAuthHeaders()}, body: JSON.stringify(newGroup) });
              }
              if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
              const data = await res.json();
              if (res.ok) {
                fetchGroups();
                setAddDialogOpen(false);
                setNewGroup({ name: '', desc: '' });
                setEditMode(false);
                setEditingGroupId(null);
              } else setError(data.error || (editMode ? 'Failed to update service group' : 'Failed to create service group'));
            } catch (err) { console.error(err); setError(editMode ? 'Failed to update service group' : 'Failed to create service group'); }
            finally { setSubmitLoading(false); }
          }}>{submitLoading ? <CircularProgress size={20} /> : (editMode ? 'Save' : 'Create')}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ServicesGroupsLists;

