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
  Autocomplete,
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
import { useNotify } from 'src/components/notifications/NotificationProvider';
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
  // Role-permission state
  const [roles, setRoles] = useState([]);
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, role: null });
  const [editDialog, setEditDialog] = useState({ open:false, role:null });

  // Add Binding dialog (choose Role then multi Permission)
  const [addOpen, setAddOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [allPermissions, setAllPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [rolesForSelect, setRolesForSelect] = useState([]);

  const fetchRoles = async () => {
    setLoading(true);
    setError('');
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles', {
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
  const list = Array.isArray(data) ? data : (data.roles || []);
  setRoles(list);
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
    notify.notify('Permission removed', { severity:'success'});
      } else {
        const data = await res.json();
        setError(data.error || data.message || 'Gagal menghapus permission dari role');
    notify.notify('Gagal menghapus permission', { severity:'error'});
      }
    } catch (err) {
      console.error('Remove permission error:', err);
      setError('Terjadi kesalahan saat menghapus permission');
  notify.notify('Error hapus permission', { severity:'error'});
    }
  };

  const loadRolesAndPermissions = async () => {
    try {
      const [rRes, pRes] = await Promise.all([
  fetch(BACKEND_URL + API_PREFIX + '/admin/roles', { headers: getAuthHeaders() }),
  fetch(BACKEND_URL + API_PREFIX + '/admin/permissions', { headers: getAuthHeaders() })
      ]);
      if (rRes.status===401||rRes.status===403) return handleAuthError({status:rRes.status});
      if (pRes.status===401||pRes.status===403) return handleAuthError({status:pRes.status});
      const rData = await rRes.json();
      const pData = await pRes.json();
      const rList = Array.isArray(rData)?rData:(rData.roles||[]);
      setRolesForSelect(rList);
      setAllPermissions(Array.isArray(pData)?pData:(pData.permissions||[]));
    } catch(e){ console.error(e); }
  };

  useEffect(()=>{ if(addOpen) loadRolesAndPermissions(); }, [addOpen]);

  const handleAddBinding = async () => {
    if(!selectedRole || selectedPermissions.length===0){ setError('Role dan minimal satu Permission diperlukan'); return; }
    setAdding(true); setError('');
    try {
      for(const perm of selectedPermissions){
        const resp = await fetch(BACKEND_URL + API_PREFIX + `/roles/${selectedRole.id}/permissions/${perm.id}`, {
          method:'POST',
          headers: getAuthHeaders()
        });
        if(resp.status===401||resp.status===403){ handleAuthError({status:resp.status}); break; }
      }
      setAddOpen(false);
      setSelectedRole(null);
      setSelectedPermissions([]);
      fetchRoles();
      notify.notify('Permissions ditambahkan ke role', { severity:'success'});
    } catch(e){ console.error(e); setError('Gagal menambahkan permissions'); notify.notify('Gagal menambahkan', {severity:'error'});} finally { setAdding(false);} 
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
              Add Binding
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
                            <IconButton size="small" color="primary" onClick={()=> setEditDialog({ open:true, role })}>
                              <IconEdit size={16} />
                            </IconButton>
                            <IconButton size="small" color="error" disabled={role.native} onClick={()=> setDeleteDialog({ open:true, role })}>
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

      {/* Edit Role Placeholder Dialog (future: permission adjustments) */}
      <Dialog open={editDialog.open} onClose={()=> setEditDialog({ open:false, role:null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Role Permissions</DialogTitle>
        <DialogContent>
          {editDialog.role && (
            <Stack spacing={2} mt={1}>
              <Typography variant="subtitle2">Role: {editDialog.role.name}</Typography>
              <Typography variant="caption" color="text.secondary">Tambah atau hapus permission di bawah:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {(roles.find(r=>r.id===editDialog.role.id)?.Permissions||editDialog.role.permissions||[]).map(p=> (
                  <Chip key={p.id} label={p.name} size="small" onDelete={()=> handleRemovePermission(editDialog.role.id, p.id)} />
                ))}
              </Stack>
              <Autocomplete
                multiple
                options={allPermissions.filter(p=> !(editDialog.role.Permissions||editDialog.role.permissions||[]).some(ep=> ep.id===p.id))}
                getOptionLabel={(o)=> o.name }
                onChange={async (_,vals)=> {
                  // assign each newly selected permission
                  for(const perm of vals){
                    const resp = await fetch(BACKEND_URL + API_PREFIX + `/roles/${editDialog.role.id}/permissions/${perm.id}`, { method:'POST', headers: getAuthHeaders() });
                    if(resp.status===401||resp.status===403){ handleAuthError({status:resp.status}); break; }
                  }
                  fetchRoles();
                  // keep dialog open; refresh local role object
                  const updated = roles.find(r=> r.id===editDialog.role.id);
                  setEditDialog(prev=> ({...prev, role: updated||prev.role }));
                }}
                renderInput={(params)=><TextField {...params} label="Tambah Permissions" placeholder="Cari permission" />}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setEditDialog({ open:false, role:null })}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Binding Dialog: Role + Permissions */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Permissions ke Role</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Autocomplete
              options={rolesForSelect}
              getOptionLabel={(o)=> o.name || `Role ${o.id}`}
              value={selectedRole}
              onChange={(_,v)=> setSelectedRole(v)}
              renderInput={(params)=><TextField {...params} label="Role" placeholder="Pilih role" />}
              fullWidth
            />
            <Autocomplete
              multiple
              options={allPermissions}
              getOptionLabel={(o)=> o.name || `Perm ${o.id}`}
              value={selectedPermissions}
              onChange={(_,v)=> setSelectedPermissions(v)}
              renderInput={(params)=><TextField {...params} label="Permissions" placeholder="Pilih permissions" />}
              fullWidth
              filterSelectedOptions
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBinding} variant="contained" disabled={adding}>
            {adding ? <CircularProgress size={18} /> : 'Tambah'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default PermissionBindings;
