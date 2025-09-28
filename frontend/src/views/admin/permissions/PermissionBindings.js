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
  Tooltip,
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
  // Role-permission state (simple: list roles and counts)
  const [roles, setRoles] = useState([]);
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, role: null });
  const [editDialog, setEditDialog] = useState({ open:false, role:null });
  const [permissions, setPermissions] = useState([]);
  const [addRole, setAddRole] = useState(null);
  const [addPerms, setAddPerms] = useState([]);
  const [bulkPerms, setBulkPerms] = useState([]);
  const [bulkAdding, setBulkAdding] = useState(false);
  const [bulkRemovePerms, setBulkRemovePerms] = useState([]);
  const [bulkRemoving, setBulkRemoving] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = React.useRef(null);

  // Add Binding dialog (user + multi roles or role + multi permissions?). Based on request: select user (single) and roles (multi) to assign.
  const [addOpen, setAddOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

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
  const res = await fetch(BACKEND_URL + API_PREFIX + `/admin/roles/${roleId}/permissions/${permissionId}`, {
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

  const loadUsersAndRoles = async () => {
    try {
      const [uRes, rRes] = await Promise.all([
  fetch(BACKEND_URL + API_PREFIX + '/admin/users', { headers: getAuthHeaders() }),
  fetch(BACKEND_URL + API_PREFIX + '/admin/roles', { headers: getAuthHeaders() })
      ]);
      if (uRes.status===401||uRes.status===403) return handleAuthError({status:uRes.status});
      if (rRes.status===401||rRes.status===403) return handleAuthError({status:rRes.status});
      const uData = await uRes.json();
      const rData = await rRes.json();
      setUsers(Array.isArray(uData)?uData:(uData.users||[]));
      setAllRoles(Array.isArray(rData)?rData:(rData.roles||[]));
    } catch(e){ console.error(e); }
  };

  const fetchPermissions = async () => {
    try {
  const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/permissions/', { headers: getAuthHeaders() });
      if(res.ok){
        const data = await res.json();
        setPermissions(Array.isArray(data)?data:(data.permissions||[]));
      } 
    } catch(e){ console.error(e);}
  };

  useEffect(()=>{ if(addOpen || editDialog.open) fetchPermissions(); }, [addOpen, editDialog.open]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddBinding = async () => {
    if(!addRole || addPerms.length===0){ setError('Role & minimal satu permission diperlukan'); return; }
    setAdding(true); setError('');
    // optimistic update
    setRoles(rs=> rs.map(r=> r.id===addRole.id ? { ...r, Permissions:[...(r.Permissions||r.permissions||[]), ...addPerms.filter(p=> !(r.Permissions||r.permissions||[]).some(ep=> ep.id===p.id))] } : r));
    try {
      for(const perm of addPerms){
  const resp = await fetch(`${BACKEND_URL}${API_PREFIX}/admin/roles/${addRole.id}/permissions/${perm.id}`, { method:'POST', headers: getAuthHeaders() });
        if(!resp.ok){ notify.notify(`Gagal tambah ${perm.name}`, { severity:'error'}); }
      }
      notify.notify('Permissions ditambahkan ke role', { severity:'success'});
      setAddOpen(false); setAddRole(null); setAddPerms([]); fetchRoles();
    } catch(e){ console.error(e); setError('Gagal menambah permissions'); notify.notify('Gagal menambah permissions', { severity:'error'});} finally { setAdding(false);} 
  };

  const colorPool = ['primary','secondary','success','warning','info','default','error'];
const hashString = (str='') => {
  let h = 0; for (let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) & 0xffffffff; }
  return Math.abs(h);
};
const getChipColor = (name) => colorPool[ hashString(name) % colorPool.length ];

  const handleAddPermissionFromEdit = async (role, perm) => {
    if(!role || !perm) return; // optimistic
    setRoles(rs=> rs.map(r=> r.id===role.id ? { ...r, Permissions:[...(r.Permissions||r.permissions||[]), perm] } : r));
    try {
  const resp = await fetch(`${BACKEND_URL}${API_PREFIX}/admin/roles/${role.id}/permissions/${perm.id}`, { method:'POST', headers: getAuthHeaders() });
      if(resp.ok) notify.notify('Permission ditambahkan',{severity:'success'});
      else notify.notify('Gagal menambah permission',{severity:'error'});
    } catch(e){ console.error(e); notify.notify('Error tambah permission',{severity:'error'});}
  };

  const handleBulkAddPermissions = async () => {
    if(!editDialog.role || bulkPerms.length===0) return;
    setBulkAdding(true);
    // optimistic
    setRoles(rs=> rs.map(r=> r.id===editDialog.role.id ? { ...r, Permissions:[...(r.Permissions||r.permissions||[]), ...bulkPerms.filter(p=> !(r.Permissions||r.permissions||[]).some(ep=> ep.id===p.id))] } : r));
    try {
      for(const perm of bulkPerms){
        const resp = await fetch(`${BACKEND_URL}${API_PREFIX}/admin/roles/${editDialog.role.id}/permissions/${perm.id}`, { method:'POST', headers: getAuthHeaders() });
        if(!resp.ok) notify.notify(`Fail ${perm.name}`, { severity:'error'});
      }
      notify.notify('Bulk permissions added', { severity:'success'});
      setBulkPerms([]);
      fetchRoles();
    } catch(e){ console.error(e); notify.notify('Bulk add error',{severity:'error'});} finally { setBulkAdding(false);} 
  };

  const exportCSV = () => {
    const header = ['role_id','role_name','permission_id','permission_name'];
    const rows = filteredRoles.flatMap(r=> (r.Permissions||r.permissions||[]).map(p=> [r.id, '"'+(r.name||'')+'"', p.id, '"'+(p.name||'')+'"']));
    const csv = [header.join(','), ...rows.map(r=> r.join(','))].join('\n');
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'role_permissions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleBulkRemovePermissions = async () => {
    if(!editDialog.role || bulkRemovePerms.length===0) return;
    setBulkRemoving(true);
    setRoles(rs=> rs.map(r=> r.id===editDialog.role.id ? { ...r, Permissions:(r.Permissions||r.permissions||[]).filter(p=> !bulkRemovePerms.some(bp=> bp.id===p.id)) } : r));
    try {
      for(const perm of bulkRemovePerms){
        const resp = await fetch(`${BACKEND_URL}${API_PREFIX}/admin/roles/${editDialog.role.id}/permissions/${perm.id}`, { method:'DELETE', headers: getAuthHeaders() });
        if(!resp.ok) notify.notify(`Fail remove ${perm.name}`, { severity:'error'});
      }
      notify.notify('Bulk permissions removed', { severity:'success'});
      setBulkRemovePerms([]);
      fetchRoles();
    } catch(e){ console.error(e); notify.notify('Bulk remove error',{severity:'error'});} finally { setBulkRemoving(false);} 
  };

  const handleImportCSV = (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result || '';
        const lines = String(text).split(/\r?\n/).map(l=> l.trim()).filter(Boolean);
        // accept either header or raw list; if first line contains comma and 'permission' treat as header
        let names = [];
        if(lines.length===0){ notify.notify('CSV kosong',{severity:'warning'}); return; }
        if(lines[0].toLowerCase().includes('permission')){
          // assume columns, detect by splitting comma
          const headerParts = lines[0].split(',').map(h=> h.trim().toLowerCase());
          const permIdx = headerParts.findIndex(h=> h.includes('permission'));
          if(permIdx>=0){
            names = lines.slice(1).map(l=> l.split(',')[permIdx]?.replace(/^"|"$/g,'').trim()).filter(Boolean);
          }
        } else {
          // treat each line as permission name (maybe with commas) -> take first cell
          names = lines.map(l=> l.split(',')[0].replace(/^"|"$/g,'').trim()).filter(Boolean);
        }
        if(names.length===0){ notify.notify('Tidak ada nama permission ditemukan',{severity:'warning'}); return; }
        const toAdd = permissions.filter(p=> names.includes(p.name) && !( (roles.find(r=> r.id===editDialog.role.id)?.Permissions || editDialog.role.Permissions || editDialog.role.permissions || []).some(ep=> ep.id===p.id)));
        if(toAdd.length===0){ notify.notify('Tidak ada permission baru untuk ditambah',{severity:'info'}); return; }
        setBulkPerms(prev=> [...prev, ...toAdd.filter(p=> !prev.some(pp=> pp.id===p.id))]);
        notify.notify(`${toAdd.length} permissions queued from CSV`, { severity:'success'});
      } catch(err){ console.error(err); notify.notify('Import CSV gagal',{severity:'error'});} finally { setImporting(false); if(fileInputRef.current) fileInputRef.current.value=''; }
    };
    reader.onerror = ()=> { notify.notify('Gagal membaca file',{severity:'error'}); setImporting(false); };
    reader.readAsText(file);
  };

  const filteredRoles = roles.filter(role => {
    const textMatch = role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase());
    if(!textMatch) return false;
    if(roleFilter) return role.id === roleFilter.id;
    return true;
  });

  return (
    <PageContainer title="Role Permission Bindings" description="Manage role-permission relationships">
      <Breadcrumb title="Role Permission Bindings" items={BCrumb} />
      
      <Card>
        <CardContent>
          <Stack direction={{ xs:'column', md:'row' }} spacing={2} justifyContent="space-between" alignItems={{ md:'center' }} mb={3}>
            <Stack direction={{ xs:'column', sm:'row' }} spacing={2} flexGrow={1} alignItems={{ sm:'center' }}>
              <Box sx={{ minWidth: 260 }}>
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
                  size="small"
                />
              </Box>
              <Box sx={{ minWidth: 260 }}>
                <Autocomplete
                  options={roles}
                  size="small"
                  value={roleFilter}
                  onChange={(_,v)=> setRoleFilter(v)}
                  getOptionLabel={o=> o?.name || ''}
                  renderInput={(params)=><TextField {...params} label="Filter Role" placeholder="Select role" />}
                  clearOnEscape
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={exportCSV}
              >Export CSV</Button>
              <Button
                variant="contained"
                startIcon={<IconPlus />}
                color="primary"
                onClick={() => setAddOpen(true)}
                sx={{ alignSelf:{ xs:'stretch', md:'auto' } }}
              >
                Add Binding
              </Button>
            </Stack>
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
                            {(role.Permissions || role.permissions || []).map((p, idx) => {
                              const color = getChipColor(p.name);
                              const variant = idx % 2 === 0 ? 'filled' : 'outlined';
                              return (
                                <Chip
                                  key={p.id}
                                  label={p.name}
                                  size="small"
                                  color={color}
                                  variant={variant}
                                  onDelete={() => handleRemovePermission(role.id, p.id)}
                                />
                              );
                            })}
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

      {/* Edit Role Permissions Dialog */}
      <Dialog open={editDialog.open} onClose={()=> setEditDialog({ open:false, role:null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Role Permissions</DialogTitle>
        <DialogContent>
          {editDialog.role && (
            <Stack spacing={2} mt={1}>
              <Autocomplete
                options={roles}
                value={roles.find(r=> r.id===editDialog.role.id) || editDialog.role}
                onChange={(_,v)=> { if(v) setEditDialog({ open:true, role:v }); }}
                getOptionLabel={o=> o?.name || ''}
                renderInput={(p)=><TextField {...p} label="Role" size="small" />}
              />
              <Typography variant="caption" color="text.secondary">Tambah atau hapus permission di bawah:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {(roles.find(r=> r.id===editDialog.role.id)?.Permissions || editDialog.role.Permissions || editDialog.role.permissions || []).map((p,i)=> {
                  const color = getChipColor(p.name);
                  const variant = i % 2 === 0 ? 'filled' : 'outlined';
                  return <Chip key={p.id} label={p.name} size="small" color={color} variant={variant} onDelete={()=> handleRemovePermission(editDialog.role.id, p.id)} />
                })}
              </Stack>
              <Autocomplete
                options={permissions.filter(p=> !( (roles.find(r=> r.id===editDialog.role.id)?.Permissions || editDialog.role.Permissions || editDialog.role.permissions || []).some(ep=> ep.id===p.id)))}
                getOptionLabel={(o)=> o.name }
                onChange={(_,v)=> { if(v) handleAddPermissionFromEdit(editDialog.role, v); }}
                renderInput={(params)=><TextField {...params} label="Tambah Permission (single)" placeholder="Ketik untuk cari" size="small" />}
              />
              <Autocomplete
                multiple
                options={permissions.filter(p=> !( (roles.find(r=> r.id===editDialog.role.id)?.Permissions || editDialog.role.Permissions || editDialog.role.permissions || []).some(ep=> ep.id===p.id)))}
                getOptionLabel={(o)=> o.name }
                value={bulkPerms}
                onChange={(_,v)=> setBulkPerms(v)}
                renderInput={(params)=><TextField {...params} label="Bulk Tambah Permissions" placeholder="Pilih beberapa" size="small" helperText="Pilih beberapa lalu klik 'Add Bulk'" />}
                filterSelectedOptions
              />
              <Stack direction="row" spacing={1}>
                <Button disabled={bulkPerms.length===0 || bulkAdding} onClick={()=> setBulkPerms([])}>Reset</Button>
                <Button variant="contained" disabled={bulkPerms.length===0 || bulkAdding} onClick={handleBulkAddPermissions}>{bulkAdding? <CircularProgress size={16}/>:'Add Bulk'}</Button>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <input ref={fileInputRef} type="file" accept=".csv,text/csv" style={{ display:'none' }} onChange={handleImportCSV} />
                <Button variant="outlined" disabled={importing} onClick={()=> fileInputRef.current && fileInputRef.current.click()}>{importing? 'Importing...' : 'Import CSV'}</Button>
              </Stack>
              <Autocomplete
                multiple
                options={(roles.find(r=> r.id===editDialog.role.id)?.Permissions || editDialog.role.Permissions || editDialog.role.permissions || [])}
                getOptionLabel={(o)=> o.name }
                value={bulkRemovePerms}
                onChange={(_,v)=> setBulkRemovePerms(v)}
                renderInput={(params)=><TextField {...params} label="Bulk Remove Permissions" placeholder="Pilih yang akan dihapus" size="small" helperText="Pilih beberapa lalu klik 'Remove Bulk'" />}
                filterSelectedOptions
              />
              <Stack direction="row" spacing={1}>
                <Button disabled={bulkRemovePerms.length===0 || bulkRemoving} onClick={()=> setBulkRemovePerms([])}>Reset Remove</Button>
                <Button color="error" variant="contained" disabled={bulkRemovePerms.length===0 || bulkRemoving} onClick={handleBulkRemovePermissions}>{bulkRemoving? <CircularProgress size={16}/>:'Remove Bulk'}</Button>
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setEditDialog({ open:false, role:null })}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Binding Dialog with Autocomplete */}
      <Dialog open={addOpen} onClose={()=> setAddOpen(false)} maxWidth='sm' fullWidth>
      <DialogTitle>Tambah Permissions ke Role</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Autocomplete options={roles} getOptionLabel={o=> o.name || `Role ${o.id}`} value={addRole} onChange={(_,v)=> setAddRole(v)} renderInput={(p)=><TextField {...p} label='Role' placeholder='Cari role'/>} fullWidth />
            <Autocomplete multiple options={permissions} getOptionLabel={o=> o.name || `Perm ${o.id}`} value={addPerms} onChange={(_,v)=> setAddPerms(v)} renderInput={(p)=><TextField {...p} label='Permissions' placeholder='Cari permissions' helperText='Pilih satu atau lebih'/>} fullWidth filterSelectedOptions />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBinding} variant='contained' disabled={adding}>{adding? <CircularProgress size={18}/>:'Add'}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default PermissionBindings;
