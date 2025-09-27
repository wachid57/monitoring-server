import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams } from 'react-router';
import {
  Card, CardContent, Typography, CircularProgress, Alert, Box, Grid, Stack, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, LinearProgress,
  Snackbar, Select, MenuItem, FormControl
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
// Note: MenuItem already included in the grouped import block at top (Snackbar, Select, MenuItem, ...) so removed duplicate import.
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { useNotify } from 'src/components/notifications/NotificationProvider';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/infrastructure/hosts/list', title: 'Hosts' },
  { title: 'Details' }
];

// Helper to fetch JSON with auth
async function fetchJSON(url) {
  const res = await fetch(url, { headers: getAuthHeaders() });
  if (res.status === 401 || res.status === 403) {
    handleAuthError({ status: res.status });
    throw new Error('Unauthorized');
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export default function HostDetails() {
  const { id } = useParams();
  const [host, setHost] = useState(null);
  const [rawServices, setRawServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opBusy, setOpBusy] = useState(false);
  // Dialog states
  const [editingIcmp, setEditingIcmp] = useState(null);
  const [editingHttp, setEditingHttp] = useState(null);
  const [deleting, setDeleting] = useState(null); // { type: 'icmp'|'http', item }
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // legacy, will be removed after migration to notify
  const [creatingType, setCreatingType] = useState(null); // 'icmp' | 'http'
  const [menuAnchor, setMenuAnchor] = useState(null); // anchor element for row menu
  const [menuSvc, setMenuSvc] = useState(null); // selected service row
  const [refreshInterval, setRefreshInterval] = useState(0); // seconds, 0=off
  const [addAnchor, setAddAnchor] = useState(null);
  // load function must be declared before doPingRefresh (dependency order)
  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const agg = await fetchJSON(`${BACKEND_URL}${API_PREFIX}/infrastructure/hosts/${id}/services`);
      setHost(agg.host);
      setRawServices(agg.services || []);
      // legacy arrays no longer returned; clear them
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const notifyCtx = useNotify();

  const doPingRefresh = useCallback(async()=>{
    if(!host) return; setOpBusy(true);
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/infrastructure/hosts/${host.ID||host.id}/services/ping-refresh`, {method:'POST', headers: getAuthHeaders()});
      if(res.status===401||res.status===403){handleAuthError({status:res.status}); return;}
      if(!res.ok){ const dj= await res.json(); throw new Error(dj.error||'Refresh failed'); }
      await load();
      notifyCtx.notify('Services refreshed', { severity:'success'});
    } catch(e){ setError(e.message);} finally { setOpBusy(false);} 
  }, [host, load, notifyCtx]);

  useEffect(()=>{
    if(!refreshInterval) return;
    const idTimer = setInterval(()=>{ doPingRefresh(); }, refreshInterval * 1000);
    return ()=> clearInterval(idTimer);
  }, [refreshInterval, doPingRefresh]);

  useEffect(() => { load(); }, [load]);

  // Helpers
  const formatAge = (created) => {
    if(!created) return '-';
    const dt = new Date(created);
    const diff = Date.now() - dt.getTime();
    const mins = Math.floor(diff/60000);
    if(mins < 60) return mins + 'm';
    const hrs = Math.floor(mins/60);
    if(hrs < 24) return hrs + 'h';
    const days = Math.floor(hrs/24); return days + 'd';
  };
  const formatChecked = (interval) => interval ? `every ${interval}s` : '-';
  // Combined services list
  const services = useMemo(()=>{
    return rawServices.map(s=>({
      id: s.ID || s.id,
      raw: s,
      type: s.service_type || s.ServiceType,
      status: s.status || s.Status || 'UNKNOWN',
      name: s.name || s.Name,
      summary: s.summary || s.Summary,
      interval: null,
      created: s.CreatedAt || s.created_at,
      // Map back to source for edit/delete paths (need type & service_id)
      serviceId: s.service_id || s.ServiceID,
      latency: s.last_latency_ms || s.LastLatencyMs,
      uptime: s.uptime_pct || s.UptimePct,
    }));
  }, [rawServices]);

  return (
    <>
      <PageContainer title="Host Details" description="Host and attached services">
      <Breadcrumb title="Host Details" items={BCrumb} />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>
      ) : !host ? (
        <Alert severity="warning">Host not found</Alert>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" spacing={1}>
                  <Typography variant="h6" fontWeight={600}>Services</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize:18, color:'text.secondary' }} />
                      <FormControl size="small" sx={{ minWidth:100 }}>
                      <Select value={refreshInterval} onChange={e=>setRefreshInterval(Number(e.target.value))} displayEmpty>
                        <MenuItem value={0}>Off</MenuItem>
                        <MenuItem value={5}>5s</MenuItem>
                        <MenuItem value={10}>10s</MenuItem>
                        <MenuItem value={15}>15s</MenuItem>
                        <MenuItem value={30}>30s</MenuItem>
                        <MenuItem value={45}>45s</MenuItem>
                        <MenuItem value={60}>60s</MenuItem>
                      </Select>
                      </FormControl>
                    </Stack>
                    <Button size="small" startIcon={<BuildIcon fontSize="small" />} disabled={opBusy} onClick={async()=>{ if(!host) return; setOpBusy(true); try { const res = await fetch(`${BACKEND_URL}${API_PREFIX}/infrastructure/hosts/${host.ID||host.id}/services/rebuild`, {method:'POST', headers: getAuthHeaders()}); if(res.status===401||res.status===403){handleAuthError({status:res.status}); return;} if(!res.ok){ const dj= await res.json(); throw new Error(dj.error||'Rebuild failed'); } await load(); notifyCtx.notify('Services rebuilt', { severity:'success'}); } catch(e){ setError(e.message); notifyCtx.notify(e.message,{severity:'error'});} finally { setOpBusy(false);} }}>Rebuild</Button>
                    <Button size="small" startIcon={<RefreshIcon fontSize="small" />} disabled={opBusy} onClick={doPingRefresh}>Refresh</Button>
                    <Button size="small" variant="contained" startIcon={<AddIcon fontSize="small" />} onClick={(e)=>setAddAnchor(e.currentTarget)}>Add Service</Button>
                    <Menu anchorEl={addAnchor} open={!!addAnchor} onClose={()=>setAddAnchor(null)}>
                      <MenuItem onClick={()=>{ setCreatingType('icmp'); setAddAnchor(null); }}>ICMP</MenuItem>
                      <MenuItem onClick={()=>{ setCreatingType('http'); setAddAnchor(null); }}>HTTP</MenuItem>
                    </Menu>
                  </Stack>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Service Name</TableCell>
                        <TableCell>Summary</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Checked</TableCell>
                        <TableCell>Perf-o-meter</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {services.length === 0 ? (
                        <TableRow><TableCell colSpan={7} align="center">No services</TableCell></TableRow>
                      ) : services.map(svc => (
                        <TableRow key={`${svc.type}-${svc.id}`}>
                          <TableCell>
                            <Chip size="small" color={svc.status==='OK' ? 'success':'default'} label={svc.status} />
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Chip size="small" label={svc.type.toUpperCase()} />
                              <Typography variant="body2" sx={{ fontWeight:500 }}>{svc.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell><Typography variant="body2" noWrap maxWidth={220}>{svc.summary}</Typography></TableCell>
                          <TableCell>{formatAge(svc.created)}</TableCell>
                          <TableCell>{formatChecked(svc.interval)}</TableCell>
                          <TableCell sx={{ minWidth:140 }}>
                            <LinearProgress variant="determinate" value={(()=>{ const l=svc.latency; if(l==null) return 50; return Math.max(5, Math.min(100, (200 - l)/2)); })()} />
                          </TableCell>
                          <TableCell align="center" sx={{ width:48 }}>
                            <IconButton size="small" onClick={(e)=>{ setMenuAnchor(e.currentTarget); setMenuSvc(svc); }}>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
  </PageContainer>
  {editingIcmp && (
      <EditDialog
        type="icmp"
        open={!!editingIcmp}
        item={editingIcmp}
        saving={saving}
        onClose={()=>setEditingIcmp(null)}
        onSave={async (data)=>{
          setSaving(true);
          try {
            const idc = editingIcmp.ID || editingIcmp.id;
            const res = await fetch(`${BACKEND_URL}${API_PREFIX}/services/availability/icmp/${idc}`, {
              method:'PUT',
              headers:{ 'Content-Type':'application/json', ...getAuthHeaders() },
              body: JSON.stringify(data)
            });
            if(res.status===401||res.status===403) return handleAuthError({status:res.status});
            if(!res.ok){ const dj= await res.json(); throw new Error(dj.error||'Update failed'); }
            setEditingIcmp(null); load(); notifyCtx.notify('ICMP check updated', { severity:'success'});
          } catch(e){ setError(e.message); } finally { setSaving(false);} }}
      />)}
  {editingHttp && (
      <EditDialog
        type="http"
        open={!!editingHttp}
        item={editingHttp}
        saving={saving}
        onClose={()=>setEditingHttp(null)}
        onSave={async (data)=>{
          setSaving(true);
          try {
            const idh = editingHttp.ID || editingHttp.id;
            const res = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/checker/http-curl/${idh}`, {
              method:'PUT',
              headers:{ 'Content-Type':'application/json', ...getAuthHeaders() },
              body: JSON.stringify(data)
            });
            if(res.status===401||res.status===403) return handleAuthError({status:res.status});
            if(!res.ok){ const dj= await res.json(); throw new Error(dj.error||'Update failed'); }
            setEditingHttp(null); load(); notifyCtx.notify('HTTP check updated', { severity:'success'});
          } catch(e){ setError(e.message); } finally { setSaving(false);} }}
      />)}
  {deleting && (
      <DeleteConfirm
        open={!!deleting}
        title={`Delete ${deleting.type.toUpperCase()} Check`}
        description={`Are you sure want to delete this ${deleting.type} check?`}
        onClose={()=>setDeleting(null)}
        onConfirm={async ()=>{
          try {
            const idd = deleting.item.ID || deleting.item.id;
            const base = deleting.type==='icmp'
              ? `${BACKEND_URL}${API_PREFIX}/services/availability/icmp/${idd}`
              : `${BACKEND_URL}${API_PREFIX}/monitoring/checker/http-curl/${idd}`;
            const res = await fetch(base, { method:'DELETE', headers: getAuthHeaders() });
            if(res.status===401||res.status===403) return handleAuthError({status:res.status});
            if(!res.ok){ const dj= await res.json(); throw new Error(dj.error||'Delete failed'); }
            setDeleting(null); load(); notifyCtx.notify(`${deleting.type.toUpperCase()} check deleted`, { severity:'success'});
          } catch(e){ setError(e.message);} }}
      />)}
  {creatingType && (
      <EditDialog
        type={creatingType}
        open={!!creatingType}
        item={{}}
        creating
        saving={saving}
        onClose={()=>setCreatingType(null)}
        onSave={async (data)=>{
          setSaving(true);
          try {
            // attach host id (use json field name expected by backend)
            data.host_id = host.ID || host.id;
            const endpoint = creatingType==='icmp'
              ? `${BACKEND_URL}${API_PREFIX}/services/availability/icmp`
              : `${BACKEND_URL}${API_PREFIX}/monitoring/checker/http-curl`;
            const res = await fetch(endpoint, {
              method:'POST',
              headers:{ 'Content-Type':'application/json', ...getAuthHeaders() },
              body: JSON.stringify(data)
            });
            if(res.status===401||res.status===403) return handleAuthError({status:res.status});
            if(!res.ok){ const dj= await res.json(); throw new Error(dj.error||'Create failed'); }
            setCreatingType(null); load(); notifyCtx.notify(`${creatingType.toUpperCase()} check created`, { severity:'success'});
          } catch(e){ setError(e.message); } finally { setSaving(false);} }}
      />)}
  {/* Legacy Snackbar removed; notifications handled via NotificationProvider */}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={()=>{ setMenuAnchor(null); setMenuSvc(null); }}
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
        transformOrigin={{vertical:'top', horizontal:'right'}}
      >
        <MenuItem onClick={async()=>{
          if(menuSvc){
            try {
              let endpoint = '';
              if(menuSvc.type==='icmp') endpoint = `${BACKEND_URL}${API_PREFIX}/monitoring/checker/icmp/${menuSvc.serviceId}`;
              else if(menuSvc.type==='http') endpoint = `${BACKEND_URL}${API_PREFIX}/monitoring/checker/http-curl/${menuSvc.serviceId}`;
              if(endpoint){
                const res = await fetch(endpoint, { headers: getAuthHeaders() });
                if(res.status===401||res.status===403){ handleAuthError({status:res.status}); return; }
                if(!res.ok){ throw new Error('Load failed'); }
                const data = await res.json();
                if(menuSvc.type==='icmp') setEditingIcmp(data); else setEditingHttp(data);
              }
            } catch(err){ setError(err.message); }
          }
          setMenuAnchor(null); setMenuSvc(null);
        }}>Edit</MenuItem>
        <MenuItem onClick={()=>{
          if(menuSvc){
            setDeleting({ type: menuSvc.type, item: menuSvc.raw });
          }
          setMenuAnchor(null); setMenuSvc(null);
        }} sx={{ color:'error.main' }}>Delete</MenuItem>
      </Menu>
    </>
  );
}

// Reusable Edit Dialog Component

function EditDialog({ type, open, item, onClose, onSave, saving, creating }) {
  const [form, setForm] = useState(()=>({
    friendly_name: item.friendly_name || item.FriendlyName || '',
    hostname: item.hostname || item.Hostname || '',
    interval_sec: item.interval_sec || item.IntervalSec || 60,
    retries: item.retries || item.Retries || 0,
    expected_status: item.expected_status || item.ExpectedStatus || 200,
    url: item.url || item.URL || '',
    keyword: item.keyword || item.Keyword || ''
  }));
  const onChange = (k,v)=> setForm(f=>({...f,[k]:v}));
  const submit = ()=>{
    const payload = { friendly_name: form.friendly_name, interval_sec: Number(form.interval_sec)||60, retries: Number(form.retries)||0 };
    if(type==='icmp') { payload.hostname = form.hostname; }
    else { payload.url = form.url; payload.expected_status = Number(form.expected_status)||200; if(form.keyword) payload.keyword = form.keyword; }
    onSave(payload);
  };
  return (<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{creating ? 'Create' : 'Edit'} {type.toUpperCase()} Check</DialogTitle>
    <DialogContent dividers>
      <Stack spacing={2} mt={1}>
        <TextField label="Friendly Name" value={form.friendly_name} onChange={e=>onChange('friendly_name', e.target.value)} fullWidth />
        {type==='icmp' && <TextField label="Hostname" value={form.hostname} onChange={e=>onChange('hostname', e.target.value)} fullWidth />}
        {type==='http' && <TextField label="URL" value={form.url} onChange={e=>onChange('url', e.target.value)} fullWidth />}
        {type==='http' && <TextField label="Expected Status" type="number" value={form.expected_status} onChange={e=>onChange('expected_status', e.target.value)} fullWidth />}
        {type==='http' && <TextField label="Keyword" value={form.keyword} onChange={e=>onChange('keyword', e.target.value)} fullWidth />}
        <TextField label="Interval (sec)" type="number" value={form.interval_sec} onChange={e=>onChange('interval_sec', e.target.value)} fullWidth />
        <TextField label="Retries" type="number" value={form.retries} onChange={e=>onChange('retries', e.target.value)} fullWidth />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" disabled={saving} onClick={submit}>{saving? (creating ? 'Saving...' : 'Saving...') : (creating ? 'Create' : 'Save')}</Button>
    </DialogActions>
  </Dialog>);
}

function DeleteConfirm({ open, title, description, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
