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
    title: 'Roles',
  },
  {
    title: 'List Roles',
  },
];

const ListUsers = () => {
  // Roles state
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, role: null });

  // Add Role dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    setError('');
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + '/users/roles', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      const data = await res.json();
      console.log('GET /users/roles', res.status, data);
      if (res.ok) {
        // API returns array of roles; support both {roles: [...]} and [] shapes
        setRoles(Array.isArray(data) ? data : (data.roles || []));
      } else {
        setError(data.error || data.message || 'Gagal mengambil data roles');
      }
    } catch (err) {
      console.error('Fetch roles error:', err);
      setError('Terjadi kesalahan saat mengambil data roles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roleId) => {
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + `/users/roles/${roleId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      if (res.ok) {
        setRoles(prev => prev.filter(r => r.id !== roleId));
        setDeleteDialog({ open: false, role: null });
      } else {
        const data = await res.json();
        setError(data.error || data.message || 'Gagal menghapus role');
      }
    } catch (err) {
      console.error('Delete role error:', err);
      setError('Terjadi kesalahan saat menghapus role');
    }
  };

  const handleAddRole = async () => {
    if (!newRoleName) {
      setError('Role name is required');
      return;
    }
    setAdding(true);
    setError('');
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + '/users/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ name: newRoleName, description: newRoleDesc })
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      const data = await res.json();
      console.log('POST /users/roles', res.status, data);
      if (res.ok) {
        setAddOpen(false);
        setNewRoleName('');
        setNewRoleDesc('');
        // Refresh list
        fetchRoles();
      } else {
        setError(data.error || data.message || 'Gagal menambahkan role');
      }
    } catch (err) {
      console.error('Add role error:', err);
      setError('Terjadi kesalahan saat menambahkan role');
    } finally {
      setAdding(false);
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <PageContainer title="List Roles" description="Manage system roles">
      <Breadcrumb title="List Roles" items={BCrumb} />
      
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Roles Management</Typography>
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              color="primary"
              onClick={() => setAddOpen(true)}
            >
              Add New Role
            </Button>
          </Stack>

          <Box mb={3}>
            <TextField
              placeholder="Search roles..."
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRoles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                          {searchTerm ? 'No roles found matching your search' : 'No roles found'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>{role.id}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {role.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{role.description || '-'}</TableCell>
                        <TableCell>
                          {role.created_at ? new Date(role.created_at).toLocaleDateString() : '-'}
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
                              onClick={() => setDeleteDialog({ open: true, role })}
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
        onClose={() => setDeleteDialog({ open: false, role: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete role "{deleteDialog.role?.name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, role: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDialog.role?.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRole} variant="contained" disabled={adding}>
            {adding ? <CircularProgress size={18} /> : 'Add Role'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ListUsers;
