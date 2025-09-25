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

const PermissionList = () => {
  // Permissions state
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, role: null });

  // Add Role dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchPermissions = async () => {
    setLoading(true);
    setError('');
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + '/permissions/', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setPermissions(Array.isArray(data) ? data : (data.permissions || []));
      } else {
        setError(data.error || data.message || 'Gagal mengambil data permissions');
      }
    } catch (err) {
      console.error('Fetch roles error:', err);
      setError('Terjadi kesalahan saat mengambil data roles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (permId) => {
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + `/permissions/${permId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }

      if (res.ok) {
        setPermissions(prev => prev.filter(p => p.id !== permId));
        setDeleteDialog({ open: false, role: null });
      } else {
        const data = await res.json();
        setError(data.error || data.message || 'Gagal menghapus permission');
      }
    } catch (err) {
      console.error('Delete role error:', err);
      setError('Terjadi kesalahan saat menghapus role');
    }
  };

  const handleAddPermission = async () => {
    if (!newRoleName || !newRoleDesc) {
      setError('Permission name and description are required');
      return;
    }
    setAdding(true);
    setError('');
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + '/permissions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ name: newRoleName, description: newRoleDesc, module: 'general', action: 'read' })
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
        fetchPermissions();
      } else {
        setError(data.error || data.message || 'Gagal menambahkan permission');
      }
    } catch (err) {
      console.error('Add role error:', err);
      setError('Terjadi kesalahan saat menambahkan role');
    } finally {
      setAdding(false);
    }
  };

  const filteredPermissions = permissions.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.module?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.action?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
  fetchPermissions();
  }, []);

  return (
    <PageContainer title="List Permissions" description="Manage system permissions">
      <Breadcrumb title="List Permissions" items={BCrumb} />
      
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search permissions..."
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
              Add Permission
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Module</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPermissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                          {searchTerm ? 'No permissions found matching your search' : 'No permissions found'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPermissions.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {p.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{p.description || '-'}</TableCell>
                        <TableCell>{p.module || '-'}</TableCell>
                        <TableCell>{p.action || '-'}</TableCell>
                        <TableCell>
                          {p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}
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
                              onClick={() => setDeleteDialog({ open: true, role: p })}
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
    Are you sure you want to delete permission "{deleteDialog.role?.name}"? 
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
        <DialogTitle>Add Permission</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Permission Name"
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
          <Button onClick={handleAddPermission} variant="contained" disabled={adding}>
            {adding ? <CircularProgress size={18} /> : 'Add Permission'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default PermissionList;
