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
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
  IconUserCircle,
} from '@tabler/icons';
import Autocomplete from '@mui/material/Autocomplete';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';
import { useNotify } from 'src/components/notifications/NotificationProvider';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Users',
  },
  {
    title: 'List Users',
  },
];

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const notifyCtx = useNotify();
  const notify = notifyCtx?.notify || (()=>{});
  const [newUser, setNewUser] = useState({ username: '', email: '', name: '', password: '', roles: [] });
  const [availableRoles, setAvailableRoles] = useState([]);
  const [formError, setFormError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  // Edit user state
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', email: '', name: '', roles: [] });
  const [editSaving, setEditSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
  console.log('Fetching users from:', BACKEND_URL + API_PREFIX + '/admin/users');
      console.log('Auth headers:', getAuthHeaders());
      
  const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/users', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      console.log('Response status:', res.status);

      if (res.status === 401 || res.status === 403) {
        console.log('Auth error, redirecting to login');
        handleAuthError({ status: res.status });
        return;
      }

      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setUsers(data.users || data || []);
      } else {
        setError(data.error || data.message || 'Gagal mengambil data users');
      }
    } catch (err) {
      console.error('Fetch users error:', err);
      setError('Terjadi kesalahan saat mengambil data users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + `/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      if (res.ok) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        setDeleteDialog({ open: false, user: null });
      } else {
        const data = await res.json();
        setError(data.error || data.message || 'Gagal menghapus user');
      }
    } catch (err) {
      console.error('Delete user error:', err);
      setError('Terjadi kesalahan saat menghapus user');
    }
  };

  const filteredUsers = users.filter(user => {
    const roleNames = (user.roles || []).map(r=> r.name || '').join(' ');
    return (
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roleNames.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'administrator':
      case 'admin':
        return 'error';
      case 'user':
        return 'primary';
      case 'moderator':
        return 'warning';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    fetchUsers();
    // fetch roles for role select
    (async () => {
      try {
        const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles', { headers: getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          setAvailableRoles(Array.isArray(data) ? data : (data.roles || []));
        }
      } catch (err) {
        console.error('Failed to fetch roles', err);
      }
    })();
  }, []);

  return (
    <PageContainer title="List Users" description="Manage system users">
      <Breadcrumb title="List Users" items={BCrumb} />
      
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search users..."
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
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              color="primary"
              onClick={() => { setAddDialogOpen(true); setFormError(''); }}
              sx={{ width: 225 }}
            >
              Add New User
            </Button>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Native</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                          {searchTerm ? 'No users found matching your search' : 'No users found'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <IconUserCircle size={32} />
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {user.username}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                ID: {user.id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>{user.email || '-'}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {(user.roles || []).length === 0 && <Chip size="small" label="No Role" />}
                            {(user.roles || []).map(r => (
                              <Chip key={r.name} size="small" label={r.name} color={getRoleColor(r.name)} />
                            ))}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {user.native ? (
                            <Chip label="native" size="small" color="secondary" />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Active"
                            color="success"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton size="small" color="primary">
                              <IconEye size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="warning"
                              title={'Edit user'}
                              onClick={() => {
                                setEditUser(user);
                                setEditForm({
                                  username: user.username || '',
                                  email: user.email || '',
                                  name: user.name || '',
                                  roles: (user.roles || []).map(r=> r.name),
                                });
                                setEditOpen(true);
                              }}
                            >
                              <IconEdit size={16} />
                            </IconButton>
                            <span>
                              {user.native ? (
                                <IconButton size="small" color="inherit" disabled title="Native user cannot be deleted">
                                  <IconTrash size={16} />
                                </IconButton>
                              ) : (
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => setDeleteDialog({ open: true, user })}
                                >
                                  <IconTrash size={16} />
                                </IconButton>
                              )}
                            </span>
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, user: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteDialog.user?.native ? (
            <Alert severity="warning">Native user "{deleteDialog.user?.username}" cannot be deleted.</Alert>
          ) : (
            <Typography>
              Are you sure you want to delete user "{deleteDialog.user?.username}"? 
              This action cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, user: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDialog.user?.id)}
            color="error"
            variant="contained"
            disabled={deleteDialog.user?.native}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New User Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => { setAddDialogOpen(false); setFormError(''); }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}

          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Full name"
            fullWidth
            margin="dense"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <Autocomplete
            multiple
            options={availableRoles}
            getOptionLabel={(o)=> o.name || ''}
            value={availableRoles.filter(r=> newUser.roles.includes(r.name))}
            onChange={(_,v)=> setNewUser({ ...newUser, roles: v.map(r=> r.name) })}
            renderInput={(params)=><TextField {...params} label='Roles' margin='dense' placeholder='Select roles' helperText='Choose one or more roles' />}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} disabled={submitLoading}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              setFormError('');
              if (!newUser.username || !newUser.password) {
                setFormError('Username and password are required');
                return;
              }
              setSubmitLoading(true);
              try {
                const res = await fetch(BACKEND_URL + API_PREFIX + '/users', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                  body: JSON.stringify(newUser),
                });
                if (res.status === 401 || res.status === 403) {
                  handleAuthError({ status: res.status });
                  return;
                }
                const data = await res.json();
                if (res.ok) {
                  const createdId = data.id || data.user?.id;
                  const createdUser = { id: createdId, username: newUser.username, email: newUser.email, name: newUser.name, roles: [] };
                  // Optimistically add user
                  setUsers(prev=> [...prev, createdUser]);
                  setAddDialogOpen(false);
                  // Assign roles sequentially
                  if (createdId && newUser.roles.length > 0) {
                    const rolePromises = newUser.roles.map(async (roleName)=> {
                      const resp = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/roles/users', { method:'POST', headers:{ 'Content-Type':'application/json', ...getAuthHeaders() }, body: JSON.stringify({ user_id: createdId, role_name: roleName }) });
                      if(!resp.ok){ notify(`Gagal assign role ${roleName}`, { severity:'error'}); }
                      return resp.ok ? roleName : null;
                    });
                    const assigned = (await Promise.all(rolePromises)).filter(Boolean).map(r=> ({ name:r }));
                    setUsers(prev=> prev.map(u=> u.id===createdId ? { ...u, roles: assigned }: u));
                  }
                  notify('User created', { severity:'success'});
                  setNewUser({ username: '', email: '', name: '', password: '', roles: [] });
                } else {
                  // Backend may create user but fail role binding; show explicit message
                  setFormError(data.error || data.message || 'Failed to create user (role assignment may have failed)');
                  notify('Failed to create user', { severity:'error'});
                }
              } catch (err) {
                console.error('Create user error:', err);
                setFormError('Failed to create user');
                notify('Error creating user', { severity:'error'});
              } finally {
                setSubmitLoading(false);
              }
            }}
            disabled={submitLoading}
          >
            {submitLoading ? <CircularProgress size={20} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onClose={() => { setEditOpen(false); setEditUser(null); }} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Username" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} fullWidth />
            <TextField label="Email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} fullWidth />
            <TextField label="Full name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} fullWidth />
            <Autocomplete
              multiple
              options={availableRoles}
              getOptionLabel={(o)=> o.name || ''}
              value={availableRoles.filter(r=> editForm.roles.includes(r.name))}
              onChange={(_,v)=> setEditForm({ ...editForm, roles: v.map(r=> r.name) })}
              renderInput={(params)=><TextField {...params} label='Roles' placeholder='Select roles' helperText='Choose roles' />}
              fullWidth
              disabled={editUser?.native}
            />
          </Stack>
          {editUser?.native && (
            <Alert severity="info" sx={{ mt: 2 }}>
              This is a native user. Some fields may be restricted by the backend.
            </Alert>
          )}
          <Alert severity="info" sx={{ mt: 2 }}>
            To change password, use the Change Password feature.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setEditOpen(false); setEditUser(null); }} disabled={editSaving}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (!editUser) return;
              setEditSaving(true);
              try {
                // Update basic info
                const res = await fetch(BACKEND_URL + API_PREFIX + `/admin/users/${editUser.id}` , {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                  body: JSON.stringify({ username: editForm.username, email: editForm.email, name: editForm.name })
                });
                if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error || data.message || 'Failed to update user');
                  setEditSaving(false);
                  return;
                }
                // Assign roles (difference set)
                const existingRoles = (editUser.roles || []).map(r=> r.name);
                const toAdd = editForm.roles.filter(r=> !existingRoles.includes(r));
                const finalRoles = new Set(existingRoles);
                for (const rName of toAdd) {
                  const resp = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/roles/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                    body: JSON.stringify({ user_id: editUser.id, role_name: rName })
                  });
                  if (!resp.ok) {
                    notify(`Gagal assign role ${rName}`, { severity:'error'});
                  } else {
                    finalRoles.add(rName);
                  }
                }
                // (Removal not yet supported until backend multi-role removal API exists)
                setUsers(us=> us.map(u=> u.id===editUser.id ? { ...u, roles: Array.from(finalRoles).map(n=> ({ name:n })) } : u));
                notify('User updated', { severity:'success'});
                setEditOpen(false);
                setEditUser(null);
              } catch (e) {
                console.error('Edit user error', e);
                setError('Failed to update user');
                notify('Failed to update user', { severity:'error'});
              } finally { setEditSaving(false); }
            }}
          >
            {editSaving ? <CircularProgress size={18} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ListUsers;
