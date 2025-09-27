import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Box, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress, Autocomplete } from '@mui/material';
import { IconPlus, IconSearch, IconTrash } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [ { to: '/', title: 'Home' }, { title: 'Service Groups' }, { title: 'Bindings' } ];

export default function ServiceGroupsBindings(){
  const [bindings,setBindings]=useState([]); const [groups,setGroups]=useState([]); const [services,setServices]=useState([]);
  const [loading,setLoading]=useState(false); const [error,setError]=useState(''); const [searchTerm,setSearchTerm]=useState('');
  const [addDialogOpen,setAddDialogOpen]=useState(false); const [adding,setAdding]=useState(false);
  const [selectedGroup,setSelectedGroup]=useState(null); const [selectedServices,setSelectedServices]=useState([]);
  const [deleteDialog,setDeleteDialog]=useState({open:false, binding:null});

  const fetchAll = async ()=>{ setLoading(true); setError(''); try { const [bg,gr,svc] = await Promise.all([
    fetch(`${BACKEND_URL}${API_PREFIX}/services/groups/bindings`,{headers:getAuthHeaders()}),
    fetch(`${BACKEND_URL}${API_PREFIX}/services/groups`,{headers:getAuthHeaders()}),
    fetch(`${BACKEND_URL}${API_PREFIX}/infrastructure/hosts/1/services`,{headers:getAuthHeaders()}) // placeholder maybe host-specific; adapt later
  ]);
  if(bg.status===401||gr.status===403) { handleAuthError({status:bg.status}); return; }
  const bdata = await bg.json(); const gdata = await gr.json(); const svdata = await svc.json();
  if(bg.ok) setBindings(bdata||[]); if(gr.ok) setGroups(gdata||[]); if(svdata && svdata.services) setServices(svdata.services);
  } catch(e){ console.error(e); setError('Failed fetch data'); } finally { setLoading(false);} };
  useEffect(()=>{ fetchAll(); }, []);

  const filtered = bindings.filter(b=> (b.service_group_name||'').toLowerCase().includes(searchTerm.toLowerCase()) );

  const addBindings = async ()=>{ if(!selectedGroup || selectedServices.length===0) return; setAdding(true); try { for(const svc of selectedServices){ await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups/bindings`, {method:'POST', headers:{'Content-Type':'application/json', ...getAuthHeaders()}, body: JSON.stringify({ service_group_id: selectedGroup.id, service_type: svc.service_type||svc.ServiceType, service_id: svc.service_id||svc.ServiceID }) }); } fetchAll(); setAddDialogOpen(false); setSelectedGroup(null); setSelectedServices([]);} catch(e){ console.error(e); setError('Failed add bindings'); } finally { setAdding(false);} };

  const deleteBinding = async (id)=>{ try { const res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/groups/bindings/${id}`, {method:'DELETE', headers:getAuthHeaders()}); if(res.status===401||res.status===403){handleAuthError({status:res.status}); return;} if(res.ok){ setBindings(prev=> prev.filter(b=> b.id!==id)); setDeleteDialog({open:false, binding:null}); } } catch(e){ console.error(e); setError('Failed delete binding'); } };

  return <PageContainer title='Service Group Bindings' description='Manage service group bindings'><Breadcrumb title='Service Group Bindings' items={BCrumb} />
    <Card><CardContent>
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
        <Box sx={{ minWidth:300 }}>
          <TextField placeholder='Search bindings...' value={searchTerm} onChange={e=> setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position='start'><IconSearch size={20} /></InputAdornment> }} fullWidth />
        </Box>
        <Button variant='contained' startIcon={<IconPlus />} sx={{ width:225 }} onClick={()=> setAddDialogOpen(true)}>Add Binding</Button>
      </Stack>
      {error && <Alert severity='error' sx={{mb:3}}>{error}</Alert>}
      {loading ? <Box display='flex' justifyContent='center' py={4}><CircularProgress /></Box> : <TableContainer component={Paper}><Table><TableHead><TableRow><TableCell>Group</TableCell><TableCell>Service Type</TableCell><TableCell>Service ID</TableCell><TableCell align='center'>Actions</TableCell></TableRow></TableHead><TableBody>{filtered.length===0? <TableRow><TableCell colSpan={4} align='center'>No bindings found</TableCell></TableRow>: filtered.map(b=> <TableRow key={b.id}><TableCell>{b.service_group_name||b.service_group_id}</TableCell><TableCell>{b.service_type}</TableCell><TableCell>{b.service_id}</TableCell><TableCell align='center'><IconButton size='small' color='error' onClick={()=> setDeleteDialog({open:true, binding:b})}><IconTrash size={16} /></IconButton></TableCell></TableRow>)}</TableBody></Table></TableContainer>}
    </CardContent></Card>

    <Dialog open={addDialogOpen} onClose={()=> setAddDialogOpen(false)} fullWidth maxWidth='sm'>
      <DialogTitle>Add Binding</DialogTitle>
      <DialogContent>
        <Autocomplete options={groups} getOptionLabel={o=> o.group_name||`Group ${o.id}`} value={selectedGroup} onChange={(_,v)=> setSelectedGroup(v)} renderInput={p=> <TextField {...p} label='Service Group' margin='dense' />} sx={{mt:1}} />
        <Autocomplete multiple options={services} getOptionLabel={o=> (o.name||o.Name)|| `${o.service_type||o.ServiceType}-${o.service_id||o.ServiceID}`} value={selectedServices} onChange={(_,v)=> setSelectedServices(v)} renderInput={p=> <TextField {...p} label='Services' margin='dense' />} sx={{mt:2}} />
      </DialogContent>
      <DialogActions><Button onClick={()=> setAddDialogOpen(false)}>Cancel</Button><Button variant='contained' onClick={addBindings} disabled={adding}>{adding? <CircularProgress size={20}/>: 'Add'}</Button></DialogActions>
    </Dialog>

    <Dialog open={deleteDialog.open} onClose={()=> setDeleteDialog({open:false, binding:null})}>
      <DialogTitle>Delete Binding</DialogTitle>
      <DialogContent>Hapus binding ini?</DialogContent>
      <DialogActions><Button onClick={()=> setDeleteDialog({open:false, binding:null})}>Cancel</Button><Button variant='contained' color='error' onClick={()=> deleteBinding(deleteDialog.binding?.id)}>Delete</Button></DialogActions>
    </Dialog>
  </PageContainer>;
}
