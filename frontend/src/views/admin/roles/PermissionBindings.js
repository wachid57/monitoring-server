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

const PermissionBindings = () => {
  // Role-permission state (simple: list roles and counts)
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
      if (res.ok) {
        // API returns roles with Permissions preloaded
        setRoles(Array.isArray(data) ? data : (data.roles || []));
      } else {
        setError(data.error || data.message || 'Gagal mengambil data roles/permissions');
      }
    } catch (err) {
      console.error('Fetch roles/permissions error:', err);
      setError('Terjadi kesalahan saat mengambil data roles/permissions');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePermission = async (roleId, permissionId) => {
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + `/roles/${roleId}/permissions/${permissionId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      if (res.ok) {
        // Refresh role permissions
        fetchRoles();
      } else {
        const data = await res.json();
        setError(data.error || data.message || 'Gagal menghapus permission dari role');
      }
    } catch (err) {
      console.error('Remove permission error:', err);
      setError('Terjadi kesalahan saat menghapus permission');
    }
  };

  const handleAddBinding = async () => {
    if (!newRoleName || !newRoleDesc) {
      setError('RoleId and PermissionId required');
      return;
    }
    setAdding(true);
    setError('');
    try {
      // For simplicity this example keeps add dialog placeholder; real UI should select role and permission
      const res = await fetch(BACKEND_URL + API_PREFIX + `/roles/${newRoleName}/permissions/${newRoleDesc}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setAddOpen(false);
        setNewRoleName('');
        setNewRoleDesc('');
        // Refresh list
        fetchRoles();
      } else {
        setError(data.error || data.message || 'Gagal menambahkan binding');
      }
    } catch (err) {
      console.error('Add binding error:', err);
      setError('Terjadi kesalahan saat menambahkan binding');
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
    <PageContainer title="Role Permission Bindings" description="Manage role-permission relationships">
      <Breadcrumb title="Role Permission Bindings" items={BCrumb} />
      
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
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
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              color="primary"
              onClick={() => setAddOpen(true)}
              sx={{ width: 225 }}
            >
              Add Binding (roleId/permissionId quick)
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
                    <TableCell>Role</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Permissions</TableCell>
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
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>{role.name}</Typography>
                        </TableCell>
                        <TableCell>{role.description || '-'}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {(role.Permissions || role.permissions || []).map((p) => (
                              <Chip key={p.id} label={p.name} size="small" onDelete={() => handleRemovePermission(role.id, p.id)} />
                            ))}
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton size="small" color="primary">
                              <IconEye size={16} />
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
        <DialogTitle>Add Binding (Quick)</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Role ID" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} fullWidth />
            <TextField label="Permission ID" value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBinding} variant="contained" disabled={adding}>
            {adding ? <CircularProgress size={18} /> : 'Add Binding'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default PermissionBindings;
