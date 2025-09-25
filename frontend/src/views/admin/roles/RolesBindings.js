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
  Chip,
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
  { title: 'Admin' },
  { title: 'Roles' },
  { title: 'Role Bindings' },
];

const RolesBindings = () => {
  const [bindings, setBindings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [newBinding, setNewBinding] = useState({ user_id: '', role_id: '' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editBinding, setEditBinding] = useState(null); // {id, user_id, role_id}
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBindings = async () => {
    setLoading(true);
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles/bindings', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setBindings(Array.isArray(data) ? data : (data.bindings || data || []));
      }
    } catch (err) {
      console.error('Failed to fetch bindings', err);
      setError('Failed to fetch bindings');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setRoles(Array.isArray(data) ? data : (data.roles || []));
      }
    } catch (err) {
      console.error('Failed to fetch roles', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/users', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || data || []);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchBindings();
    fetchRoles();
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    if (!newBinding.user_id || !newBinding.role_id) return setError('User and Role are required');
    setSubmitLoading(true);
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles/bindings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(newBinding),
      });
      const data = await res.json();
      if (res.ok) {
        fetchBindings();
        setAddOpen(false);
        setNewBinding({ user_id: '', role_id: '' });
      } else {
        setError(data.error || 'Failed to create binding');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create binding');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles/bindings/' + id, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.ok) fetchBindings();
      else {
        const data = await res.json();
        setError(data.error || 'Failed to delete binding');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to delete binding');
    }
  };

  const openEdit = (binding) => {
    setEditBinding({ id: binding.id, user_id: binding.user_id || binding.user?.id, role_id: binding.role_id || binding.role?.id });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editBinding?.id || !editBinding.user_id || !editBinding.role_id) return setError('User and Role are required');
    setSubmitLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/admin/roles/bindings/${editBinding.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ user_id: editBinding.user_id, role_id: editBinding.role_id }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditOpen(false);
        setEditBinding(null);
        fetchBindings();
      } else {
        setError(data.error || 'Failed to update binding');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update binding');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <PageContainer title="Role Bindings" description="Bind users to roles">
      <Breadcrumb title="Role Bindings" items={BCrumb} />

      <Card>
        <CardContent>
  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
    <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
  <Button variant="contained" startIcon={<IconPlus />} onClick={() => setAddOpen(true)} sx={{ width: 225 }}>Add Binding</Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(bindings || []).filter(b => {
                  const q = (searchTerm || '').toLowerCase();
                  if (!q) return true;
                  const uname = b.user?.username?.toLowerCase() || '';
                  const rname = b.role?.name?.toLowerCase() || '';
                  return uname.includes(q) || rname.includes(q);
    }).map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.user?.username || b.user_id}</TableCell>
                    <TableCell>{b.role?.name || b.role_id}</TableCell>
                    <TableCell>{b.created_at ? new Date(b.created_at).toLocaleDateString() : '-'}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
      <IconButton size="small" color="warning" onClick={() => openEdit(b)}>
                          <IconEdit size={16} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(b.id)}>
                          <IconTrash size={16} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Role Binding</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField select label="User" value={newBinding.user_id} onChange={(e) => setNewBinding({ ...newBinding, user_id: e.target.value })}>
              <MenuItem value="">Select user</MenuItem>
              {users.map(u => <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>)}
            </TextField>
            <TextField select label="Role" value={newBinding.role_id} onChange={(e) => setNewBinding({ ...newBinding, role_id: e.target.value })}>
              <MenuItem value="">Select role</MenuItem>
              {roles.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" disabled={submitLoading}>{submitLoading ? <CircularProgress size={18} /> : 'Bind'}</Button>
        </DialogActions>
      </Dialog>

  {/* Edit Binding Dialog */}
  <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Role Binding</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
    <TextField label="User" value={(users.find(u => u.id === (editBinding?.user_id))?.username) || editBinding?.user_id || ''} disabled fullWidth />
    <TextField select label="Role" value={editBinding?.role_id || ''} onChange={(e) => setEditBinding({ ...editBinding, role_id: e.target.value })}>
              <MenuItem value="">Select role</MenuItem>
              {roles.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
      <Button onClick={handleEdit} variant="contained" disabled={submitLoading}>{submitLoading ? <CircularProgress size={18} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default RolesBindings;
