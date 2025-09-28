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
import Autocomplete from '@mui/material/Autocomplete';
import { useNotify } from 'src/components/notifications/NotificationProvider';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Admin' },
  { title: 'Roles' },
  { title: 'Role Bindings' },
];

const RolesBindings = () => {
  const notify = useNotify();
  const [bindings, setBindings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editBinding, setEditBinding] = useState(null); // {id,user_id,role_id}

  const fetchBindings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles/bindings', { headers: getAuthHeaders() });
      const text = await res.text();
      let json = [];
      try { json = text ? JSON.parse(text) : []; } catch(parseErr){ /* non-JSON error */ }
      if (!res.ok) {
        const msg = json?.error || `Gagal load bindings (status ${res.status})`;
        setError(msg);
        return;
      }
      const list = Array.isArray(json) ? json : (json.bindings || []);
      setBindings(list);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch bindings (network)');
    } finally { setLoading(false); }
  };
  const fetchRoles = async () => {
    try { const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles', { headers: getAuthHeaders() }); if(res.ok){ const data=await res.json(); setRoles(Array.isArray(data)?data:(data.roles||[])); }} catch(e){ console.error(e);} };
  const fetchUsers = async () => {
    try { const res = await fetch(BACKEND_URL + API_PREFIX + '/users', { headers: getAuthHeaders() }); if(res.ok){ const data=await res.json(); setUsers(data.users || data || []); }} catch(e){ console.error(e);} };
  useEffect(()=>{ fetchBindings(); fetchRoles(); fetchUsers(); }, []);

  const handleAdd = async () => {
    if(!selectedUser || !selectedRole){ setError('User & Role wajib dipilih'); return; }
    setSubmitLoading(true); setError('');
    try {
      const resp = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles/bindings', { method:'POST', headers:{ 'Content-Type':'application/json', ...getAuthHeaders() }, body: JSON.stringify({ user_id:selectedUser.id, role_id:selectedRole.id }) });
      const data = await resp.json().catch(()=>({}));
      if(resp.ok){ notify.notify('Binding berhasil dibuat',{severity:'success'}); fetchBindings(); setAddOpen(false); setSelectedUser(null); setSelectedRole(null);} else { setError(data.error||'Gagal menambah binding'); notify.notify('Gagal menambah binding',{severity:'error'});} }
    catch(e){ console.error(e); setError('Gagal menambah binding'); notify.notify('Error menambah binding',{severity:'error'});} finally { setSubmitLoading(false);} };

  const openEdit = (b) => {
    setEditBinding({ id:b.id, user_id: b.user_id || b.user?.id, role_id: b.role_id || b.role?.id });
    setSelectedUser(users.find(u=> u.id === (b.user_id || b.user?.id)) || null);
    setSelectedRole(roles.find(r=> r.id === (b.role_id || b.role?.id)) || null);
    setEditOpen(true);
  };
  const handleEdit = async () => {
    if(!editBinding?.id || !selectedRole){ setError('Role wajib dipilih'); return; }
    setSubmitLoading(true);
    try { const resp = await fetch(`${BACKEND_URL}${API_PREFIX}/admin/roles/bindings/${editBinding.id}`, { method:'PUT', headers:{ 'Content-Type':'application/json', ...getAuthHeaders() }, body: JSON.stringify({ user_id: editBinding.user_id, role_id: selectedRole.id }) }); const data = await resp.json().catch(()=>({})); if(resp.ok){ notify.notify('Binding diperbarui',{severity:'success'}); fetchBindings(); setEditOpen(false); setEditBinding(null);} else { setError(data.error||'Gagal update'); notify.notify('Gagal update binding',{severity:'error'});} } catch(e){ console.error(e); setError('Gagal update binding'); notify.notify('Error update binding',{severity:'error'});} finally { setSubmitLoading(false);} };
  const handleDelete = async (id) => { try { const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/roles/bindings/' + id, { method:'DELETE', headers: getAuthHeaders() }); if(res.ok){ notify.notify('Binding dihapus',{severity:'success'}); setBindings(bs=> bs.filter(b=> b.id!==id)); } else { const data=await res.json(); setError(data.error||'Gagal hapus'); notify.notify('Gagal hapus binding',{severity:'error'});} } catch(e){ console.error(e); setError('Gagal hapus'); notify.notify('Error hapus binding',{severity:'error'});} };

  // filter
  const filtered = bindings.filter(b=>{ const q=searchTerm.toLowerCase(); if(!q) return true; return (b.user?.username||'').toLowerCase().includes(q) || (b.role?.name||'').toLowerCase().includes(q); });

  return (
    <PageContainer title="Role Bindings" description="Bind users to roles">
      <Breadcrumb title="Role Bindings" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField placeholder="Search..." value={searchTerm} onChange={e=> setSearchTerm(e.target.value)} InputProps={{ startAdornment:(<InputAdornment position='start'><IconSearch size={20}/></InputAdornment>)}} fullWidth />
            </Box>
            <Button variant="contained" startIcon={<IconPlus/>} onClick={()=> setAddOpen(true)} sx={{ width:225}}>Add Binding</Button>
          </Stack>
          {error && <Alert severity='error' sx={{mb:2}}>{error}</Alert>}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell><TableCell>User</TableCell><TableCell>Role</TableCell><TableCell>Created</TableCell><TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading && filtered.length === 0 && !error && (
                  <TableRow>
                    <TableCell colSpan={5} align='center' sx={{py:4}}>
                      <Typography variant='body2' color='textSecondary'>Belum ada binding.</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map(b=> (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.user?.username || b.user_id}</TableCell>
                    <TableCell>{b.role?.name || b.role_id}</TableCell>
                    <TableCell>{b.created_at ? new Date(b.created_at).toLocaleDateString(): '-'}</TableCell>
                    <TableCell align='center'>
                      <Stack direction='row' spacing={1} justifyContent='center'>
                        <IconButton size='small' color='warning' onClick={()=> openEdit(b)}><IconEdit size={16}/></IconButton>
                        <IconButton size='small' color='error' onClick={()=> handleDelete(b.id)}><IconTrash size={16}/></IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog open={addOpen} onClose={()=> setAddOpen(false)} fullWidth maxWidth='sm'>
        <DialogTitle>Tambah User-Role Binding</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Autocomplete options={users} getOptionLabel={o=> o.username || o.name || `User ${o.id}`} value={selectedUser} onChange={(_,v)=> setSelectedUser(v)} renderInput={p=> <TextField {...p} label='User' placeholder='Cari user'/>} fullWidth />
            <Autocomplete options={roles} getOptionLabel={o=> o.name || `Role ${o.id}`} value={selectedRole} onChange={(_,v)=> setSelectedRole(v)} renderInput={p=> <TextField {...p} label='Role' placeholder='Cari role'/>} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant='contained' disabled={submitLoading}>{submitLoading? <CircularProgress size={18}/>:'Bind'}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={()=> { setEditOpen(false); setEditBinding(null);} } fullWidth maxWidth='sm'>
        <DialogTitle>Edit Binding</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label='User' value={users.find(u=> u.id===editBinding?.user_id)?.username || editBinding?.user_id || ''} disabled fullWidth />
            <Autocomplete options={roles} getOptionLabel={o=> o.name || `Role ${o.id}`} value={selectedRole} onChange={(_,v)=> setSelectedRole(v)} renderInput={p=> <TextField {...p} label='Role'/>} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> { setEditOpen(false); setEditBinding(null); }}>Cancel</Button>
          <Button onClick={handleEdit} variant='contained' disabled={submitLoading}>{submitLoading? <CircularProgress size={18}/>:'Save'}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default RolesBindings;
