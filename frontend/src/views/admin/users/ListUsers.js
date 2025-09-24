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
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

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
  const [newUser, setNewUser] = useState({ username: '', email: '', name: '', password: '', role: 'User' });
  const [availableRoles, setAvailableRoles] = useState([]);
  const [formError, setFormError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching users from:', BACKEND_URL + API_PREFIX + '/users');
      console.log('Auth headers:', getAuthHeaders());
      
      const res = await fetch(BACKEND_URL + API_PREFIX + '/users', {
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
  };  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
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
        const res = await fetch(BACKEND_URL + API_PREFIX + '/users/roles', { headers: getAuthHeaders() });
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
            <Typography variant="h5">Users Management</Typography>
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              color="primary"
              onClick={() => { setAddDialogOpen(true); setFormError(''); }}
            >
              Add New User
            </Button>
          </Stack>

          <Box mb={3}>
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
              sx={{ minWidth: 300 }}
            />
          </Box>

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
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
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
                          <Chip
                            label={user.role || 'User'}
                            color={getRoleColor(user.role)}
                            size="small"
                          />
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
                            <IconButton size="small" color="warning">
                              <IconEdit size={16} />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => setDeleteDialog({ open: true, user })}
                            >
                              <IconTrash size={16} />
                            </IconButton>
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
          <Typography>
            Are you sure you want to delete user "{deleteDialog.user?.username}"? 
            This action cannot be undone.
          </Typography>
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
          <TextField
            select
            SelectProps={{ native: true }}
            label="Role"
            fullWidth
            margin="dense"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            helperText="Choose a role"
          >
            <option value="">Select role</option>
            {availableRoles.map((r) => (
              <option key={r.id} value={r.name}>{r.name}</option>
            ))}
          </TextField>
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
                  // refresh users
                  fetchUsers();
                  setAddDialogOpen(false);
                  setNewUser({ username: '', email: '', name: '', password: '', role: 'User' });
                } else {
                  setFormError(data.error || data.message || 'Failed to create user');
                }
              } catch (err) {
                console.error('Create user error:', err);
                setFormError('Failed to create user');
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
    </PageContainer>
  );
};

export default ListUsers;
