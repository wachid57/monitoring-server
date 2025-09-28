import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';
import {
  Card, CardContent, Stack, Box, TextField, InputAdornment, IconButton,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper,
  Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert
} from '@mui/material';
import { IconSearch, IconPlus, IconEdit, IconX, IconCheck } from '@tabler/icons';
import { useNotify } from 'src/components/notifications/NotificationProvider';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Admin' },
  { title: 'Users' },
  { title: 'Groups' },
  { title: 'Bindings' },
];

// Utility to group assignments by user
function groupByUser(rows){
  const map = {};
  rows.forEach(r=>{
    if(!map[r.user_id]) map[r.user_id] = { user_id: r.user_id, username: r.username, groups: [] };
    map[r.user_id].groups.push({ id: r.group_id, name: r.group_name });
  });
  return Object.values(map);
}

const UserGroupBindings = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [openAssign, setOpenAssign] = useState(false);
  const [form, setForm] = useState({ user_id: '', group_ids: [] });
  const [saving, setSaving] = useState(false);
  const [rowEdit, setRowEdit] = useState(null); // user_id currently editing
  const [rowGroupsDraft, setRowGroupsDraft] = useState([]);
  const notifyCtx = useNotify();
  const notify = notifyCtx?.notify || (()=>{});
  const [error, setError] = useState('');

  const fetchAssignments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/groups/users', { headers: getAuthHeaders() });
      if(res.status === 401 || res.status === 403){ handleAuthError({ status: res.status }); return; }
      const data = await res.json();
      if(res.ok){
        setAssignments(groupByUser(Array.isArray(data) ? data : (data.assignments||[])));
      } else {
        setError(data.error || 'Gagal mengambil bindings');
      }
    } catch(e){
      console.error(e); setError('Error fetch data');
    } finally { setLoading(false); }
  };

  const fetchUsersAndGroups = async () => {
    try {
      const [uRes, gRes] = await Promise.all([
        fetch(BACKEND_URL + API_PREFIX + '/admin/users', { headers: getAuthHeaders() }),
        fetch(BACKEND_URL + API_PREFIX + '/admin/groups/list', { headers: getAuthHeaders() }),
      ]);
      if(uRes.ok){
        const uData = await uRes.json();
        setAllUsers(uData.users || uData || []);
      }
      if(gRes.ok){
        const gData = await gRes.json();
        setAllGroups(Array.isArray(gData) ? gData : (gData.groups||[]));
      }
    } catch(e){ console.error('fetch users/groups failed', e); }
  };

  useEffect(()=>{ fetchAssignments(); fetchUsersAndGroups(); }, []);

  const filtered = assignments.filter(a=>
    a.username.toLowerCase().includes(search.toLowerCase()) ||
    a.groups.some(g=> g.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageContainer title="User Group Bindings" description="Manage user group memberships">
      <Breadcrumb title="User Group Bindings" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search user or group..."
                value={search}
                onChange={e=> setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><IconSearch size={18} /></InputAdornment> }}
                fullWidth
              />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} onClick={()=>{ setOpenAssign(true); setForm({ user_id:'', group_ids: []}); }}>Assign Groups</Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={5}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Groups</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={3} align="center">No bindings found</TableCell></TableRow>
                  ) : filtered.map(row => {
                    const editing = rowEdit === row.user_id;
                    return (
                      <TableRow key={row.user_id}>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>
                          {editing ? (
                            <TextField
                              select
                              value={rowGroupsDraft}
                              onChange={e=> {
                                const values = Array.from(e.target.selectedOptions).map(o=> parseInt(o.value,10));
                                setRowGroupsDraft(values);
                              }}
                              SelectProps={{ native:true, multiple:true }}
                              size="small"
                              helperText="CTRL/CMD multi-select; kosongkan untuk clear"
                              fullWidth
                            >
                              {allGroups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
                            </TextField>
                          ) : (
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {row.groups.map(g=> <Chip key={g.id} label={g.name} size="small" />)}
                              {row.groups.length === 0 && <Chip label="(none)" size="small" variant="outlined" />}
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell>{editing ? rowGroupsDraft.length : row.groups.length}</TableCell>
                        <TableCell align="right">
                          {editing ? (
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <IconButton size="small" color="success" onClick={async ()=> {
                                setSaving(true);
                                try {
                                  const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/groups/users', {
                                    method:'POST',
                                    headers:{ 'Content-Type':'application/json', ...getAuthHeaders() },
                                    body: JSON.stringify({ user_id: row.user_id, group_ids: rowGroupsDraft })
                                  });
                                  if(res.ok){ await fetchAssignments(); notify('Updated', { severity:'success'}); setRowEdit(null); }
                                  else { const d = await res.json(); notify(d.error || 'Failed update', { severity:'error'}); }
                                } catch(e){ console.error(e); notify('Error update', { severity:'error'});} finally { setSaving(false);} 
                              }}><IconCheck size={18} /></IconButton>
                              <IconButton size="small" color="warning" onClick={()=> { setRowEdit(null); setRowGroupsDraft([]); }}><IconX size={18} /></IconButton>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <IconButton size="small" onClick={()=> { setRowEdit(row.user_id); setRowGroupsDraft(row.groups.map(g=> g.id)); }}><IconEdit size={18} /></IconButton>
                              <Button size="small" color="error" variant="outlined" onClick={async ()=> {
                                // Clear groups quickly
                                try {
                                  const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/groups/users', { method:'POST', headers:{ 'Content-Type':'application/json', ...getAuthHeaders() }, body: JSON.stringify({ user_id: row.user_id, group_ids: [] }) });
                                  if(res.ok){ await fetchAssignments(); notify('Cleared', { severity:'success'});} else { const d = await res.json(); notify(d.error || 'Failed clear', { severity:'error'});} 
                                } catch(e){ console.error(e); notify('Error clear', { severity:'error'});} 
                              }}>Clear</Button>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={openAssign} onClose={()=> setOpenAssign(false)} fullWidth maxWidth="sm">
        <DialogTitle>Assign Groups to User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="User"
              value={form.user_id}
              onChange={e=> setForm({ ...form, user_id: e.target.value })}
              SelectProps={{ native: true }}
              fullWidth
            >
              <option value="">-- Select User --</option>
              {allUsers.map(u=> <option key={u.id} value={u.id}>{u.username}</option>)}
            </TextField>
            <TextField
              select
              label="Groups"
              value={form.group_ids}
              onChange={e=> {
                const values = Array.from(e.target.selectedOptions).map(o=> parseInt(o.value,10));
                setForm({ ...form, group_ids: values });
              }}
              SelectProps={{ native: true, multiple: true }}
              helperText="Hold CTRL / CMD to multi-select"
              fullWidth
              size="small"
            >
              {allGroups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpenAssign(false)} disabled={saving}>Cancel</Button>
          <Button
            color="warning"
            disabled={saving || !form.user_id}
            onClick={async ()=> {
              setSaving(true);
              try {
                const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/groups/users', {
                  method:'POST', headers:{ 'Content-Type':'application/json', ...getAuthHeaders() }, body: JSON.stringify({ user_id: parseInt(form.user_id,10), group_ids: [] })
                });
                const data = await res.json();
                if(res.ok){ await fetchAssignments(); notify('Groups cleared', { severity:'success'}); setOpenAssign(false);} else { notify(data.error || 'Failed clear groups', { severity:'error'}); }
              } catch(e){ console.error(e); notify('Error clearing groups', { severity:'error'});} finally { setSaving(false);} 
            }}
          >Clear All</Button>
          <Button
            variant="contained"
            disabled={saving || !form.user_id}
            onClick={async ()=> {
              setSaving(true);
              try {
                const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/users/groups/users', {
                  method:'POST',
                  headers:{ 'Content-Type':'application/json', ...getAuthHeaders() },
                  body: JSON.stringify({ user_id: parseInt(form.user_id,10), group_ids: form.group_ids })
                });
                const data = await res.json();
                if(res.ok){
                  // Optimistic: refetch assignments quick
                  await fetchAssignments();
                  notify('Groups assigned', { severity:'success'});
                  setOpenAssign(false);
                } else {
                  notify(data.error || 'Failed assign groups', { severity:'error'});
                }
              } catch(e){
                console.error(e); notify('Error assigning groups', { severity:'error'});
              } finally { setSaving(false); }
            }}
          >
            {saving ? <CircularProgress size={20} /> : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default UserGroupBindings;
