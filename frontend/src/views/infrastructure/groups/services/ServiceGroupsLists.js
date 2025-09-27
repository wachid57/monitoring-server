import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress } from '@mui/material';
import { IconPlus, IconSearch, IconEdit, IconTrash, IconEye } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [ { to: '/', title: 'Home' }, { title: 'Service Groups' }, { title: 'List Service Groups' } ];

export default function ServiceGroupsLists(){
  const [groups, setGroups] = useState([]); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
  const [searchTerm,setSearchTerm]=useState('');
  const [deleteDialog,setDeleteDialog]=useState({open:false, group:null});
  const [addDialogOpen,setAddDialogOpen]=useState(false);
  const [editMode,setEditMode]=useState(false); const [editingId,setEditingId]=useState(null); const [submitLoading,setSubmitLoading]=useState(false);
  const [form,setForm]=useState({ group_name:'', alias:'', groups_tags:'', keterangan:'' });

  const fetchGroups = async ()=>{ setLoading(true); setError(''); try { const res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups`, { headers:getAuthHeaders()}); if(res.status===401||res.status===403){handleAuthError({status:res.status}); return;} const data = await res.json(); if(res.ok){ setGroups(data||[]);} else setError(data.error||'Failed fetch service groups'); } catch(e){ console.error(e); setError('Failed fetch service groups'); } finally { setLoading(false);} };
  useEffect(()=>{ fetchGroups(); }, []);

  const filtered = groups.filter(g=> (g.group_name||'').toLowerCase().includes(searchTerm.toLowerCase()) || (g.alias||'').toLowerCase().includes(searchTerm.toLowerCase()) || (g.keterangan||'').toLowerCase().includes(searchTerm.toLowerCase()));

  const saveGroup = async ()=>{ setSubmitLoading(true); try { const payload={ group_name:form.group_name, alias:form.alias, groups_tags:form.groups_tags, keterangan:form.keterangan }; let res; if(editMode && editingId){ res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups/${editingId}`, {method:'PUT', headers:{'Content-Type':'application/json', ...getAuthHeaders()}, body:JSON.stringify(payload)});} else { res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups`, {method:'POST', headers:{'Content-Type':'application/json', ...getAuthHeaders()}, body:JSON.stringify(payload)});} if(res.status===401||res.status===403){handleAuthError({status:res.status}); return;} const data= await res.json(); if(res.ok){ fetchGroups(); setAddDialogOpen(false); setForm({group_name:'', alias:'', groups_tags:'', keterangan:''}); setEditMode(false); setEditingId(null);} else setError(data.error||'Failed save group'); } catch(e){ console.error(e); setError('Failed save group'); } finally { setSubmitLoading(false);} };

  const deleteGroup = async (id)=>{ try { const res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups/${id}`, {method:'DELETE', headers:getAuthHeaders()}); if(res.status===401||res.status===403){handleAuthError({status:res.status}); return;} if(res.ok){ setGroups(prev=>prev.filter(g=>g.id!==id)); setDeleteDialog({open:false, group:null}); } else { const dj= await res.json(); setError(dj.error||'Failed delete group'); } } catch(e){ console.error(e); setError('Failed delete group'); } };

  return <PageContainer title="List Service Groups" description="Manage service groups"><Breadcrumb title="List Service Groups" items={BCrumb} />
    <Card><CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box sx={{ minWidth:300 }}>
          <TextField placeholder="Search group..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} InputProps={{ startAdornment:<InputAdornment position='start'><IconSearch size={20} /></InputAdornment> }} fullWidth />
        </Box>
        <Button variant="contained" startIcon={<IconPlus />} sx={{ width:225 }} onClick={()=>setAddDialogOpen(true)}>Add Group</Button>
      </Stack>
      {error && <Alert severity='error' sx={{mb:3}}>{error}</Alert>}
      {loading ? <Box display='flex' justifyContent='center' py={4}><CircularProgress /></Box> : <TableContainer component={Paper}><Table><TableHead><TableRow><TableCell>Group Name</TableCell><TableCell>Alias</TableCell><TableCell>Tags</TableCell><TableCell>Keterangan</TableCell><TableCell>Created</TableCell><TableCell align='center'>Actions</TableCell></TableRow></TableHead><TableBody>{filtered.length===0 ? <TableRow><TableCell colSpan={7} align='center'>No service groups found</TableCell></TableRow> : filtered.map(g=> <TableRow key={g.id}><TableCell>{g.group_name||'-'}</TableCell><TableCell>{g.alias||'-'}</TableCell><TableCell>{g.groups_tags||'-'}</TableCell><TableCell>{g.keterangan||'-'}</TableCell><TableCell>{g.created_at? new Date(g.created_at).toLocaleDateString(): '-'}</TableCell><TableCell align='center'><Stack direction='row' spacing={1} justifyContent='center'><IconButton size='small' color='primary'><IconEye size={16} /></IconButton><IconButton size='small' color='warning' onClick={()=>{ setEditMode(true); setEditingId(g.id); setForm({ group_name:g.group_name||'', alias:g.alias||'', groups_tags:g.groups_tags||'', keterangan:g.keterangan||'' }); setAddDialogOpen(true); }}><IconEdit size={16} /></IconButton><IconButton size='small' color='error' onClick={()=> setDeleteDialog({open:true, group:g})}><IconTrash size={16} /></IconButton></Stack></TableCell></TableRow>)}</TableBody></Table></TableContainer>}
    </CardContent></Card>

    <Dialog open={deleteDialog.open} onClose={()=> setDeleteDialog({open:false, group:null})}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Hapus group "{deleteDialog.group?.group_name}"?</DialogContent>
      <DialogActions><Button onClick={()=> setDeleteDialog({open:false, group:null})}>Cancel</Button><Button color='error' variant='contained' onClick={()=> deleteGroup(deleteDialog.group?.id)}>Delete</Button></DialogActions>
    </Dialog>

    <Dialog open={addDialogOpen} onClose={()=> { setAddDialogOpen(false); setEditMode(false); setEditingId(null);} } fullWidth maxWidth='sm'>
      <DialogTitle>{editMode? 'Edit Group':'Add Group'}</DialogTitle>
      <DialogContent>
        <TextField label='Group Name' fullWidth margin='dense' value={form.group_name} onChange={e=> setForm({...form, group_name:e.target.value})} />
        <TextField label='Alias' fullWidth margin='dense' value={form.alias} onChange={e=> setForm({...form, alias:e.target.value})} />
        <TextField label='Groups Tags' fullWidth margin='dense' value={form.groups_tags} onChange={e=> setForm({...form, groups_tags:e.target.value})} />
        <TextField label='Keterangan' fullWidth margin='dense' multiline minRows={2} value={form.keterangan} onChange={e=> setForm({...form, keterangan:e.target.value})} />
      </DialogContent>
      <DialogActions><Button onClick={()=> setAddDialogOpen(false)}>Cancel</Button><Button variant='contained' onClick={saveGroup} disabled={submitLoading}>{submitLoading? <CircularProgress size={20} />: editMode? 'Save':'Create'}</Button></DialogActions>
    </Dialog>
  </PageContainer>;
}
