import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useParams } from 'react-router';
import {
  Card, CardContent, Typography, CircularProgress, Alert, Box, Grid, Stack, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, LinearProgress,
  Snackbar
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
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
  const [icmpChecks, setIcmp] = useState([]);
  const [httpChecks, setHttp] = useState([]);
  const [loading, setLoading] = useState(true);
  // Dialog states
  const [editingIcmp, setEditingIcmp] = useState(null);
  const [editingHttp, setEditingHttp] = useState(null);
  const [deleting, setDeleting] = useState(null); // { type: 'icmp'|'http', item }
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [creatingType, setCreatingType] = useState(null); // 'icmp' | 'http'

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
  const agg = await fetchJSON(`${BACKEND_URL}${API_PREFIX}/infrastructure/hosts/${id}/services`);
      setHost(agg.host);
      setIcmp(agg.icmp_checks || []);
      setHttp(agg.http_checks || []);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

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
    const mapIcmp = icmpChecks.map(ch=>({
      id: ch.ID || ch.id,
      raw: ch,
      type: 'icmp',
      status: 'OK', // placeholder until real status available
      name: ch.friendly_name || ch.FriendlyName || (ch.hostname || ch.Hostname) || 'ICMP',
      summary: (ch.hostname || ch.Hostname || '-') + ' / interval ' + (ch.interval_sec || ch.IntervalSec || '-') + 's',
      interval: ch.interval_sec || ch.IntervalSec,
      created: ch.CreatedAt || ch.created_at,
    }));
    const mapHttp = httpChecks.map(ch=>({
      id: ch.ID || ch.id,
      raw: ch,
      type: 'http',
      status: 'OK',
      name: ch.friendly_name || ch.FriendlyName || (ch.url || ch.URL) || 'HTTP',
      summary: (ch.url || ch.URL || '-') + ' exp ' + (ch.expected_status || ch.ExpectedStatus || 200),
      interval: ch.interval_sec || ch.IntervalSec,
      created: ch.CreatedAt || ch.created_at,
    }));
    return [...mapIcmp, ...mapHttp];
  }, [icmpChecks, httpChecks]);

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
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight={600} gutterBottom>Host Info</Typography>
                <Stack spacing={0.6}>
                  <Typography variant="body2"><strong>ID:</strong> {host.ID || host.id}</Typography>
                  <Typography variant="body2"><strong>IP:</strong> {host.IP || host.ip || '-'}</Typography>
                  <Typography variant="body2"><strong>Hostname:</strong> {host.Hostname || host.hostname || '-'}</Typography>
                  <Typography variant="body2"><strong>Alias:</strong> {host.Alias || host.alias || '-'}</Typography>
                  <Typography variant="body2"><strong>Service:</strong> {host.Service || host.service || '-'}</Typography>
                  <Typography variant="body2"><strong>Tags:</strong> {host.HostsTags || host.hosts_tags || '-'}</Typography>
                  <Typography variant="body2"><strong>Created:</strong> {host.CreatedAt ? new Date(host.CreatedAt).toLocaleString() : (host.created_at ? new Date(host.created_at).toLocaleString() : '-')}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight={600}>Services</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={()=>setCreatingType('icmp')}>Add ICMP</Button>
                    <Button size="small" variant="contained" onClick={()=>setCreatingType('http')}>Add HTTP</Button>
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
                        <TableCell align="center">Actions</TableCell>
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
                            <LinearProgress variant="determinate" value={Math.min(100, (svc.interval ? (60 / svc.interval)*10 : 50))} />
                          </TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Typography onClick={() => (svc.type==='icmp'? setEditingIcmp(svc.raw): setEditingHttp(svc.raw))} sx={{ cursor:'pointer', fontSize:12, color:'primary.main' }}>Edit</Typography>
                              <Typography onClick={() => setDeleting({ type: svc.type, item: svc.raw })} sx={{ cursor:'pointer', fontSize:12, color:'error.main' }}>Delete</Typography>
                            </Stack>
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
            setEditingIcmp(null); load(); setSuccessMsg('ICMP check updated');
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
            setEditingHttp(null); load(); setSuccessMsg('HTTP check updated');
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
            setDeleting(null); load(); setSuccessMsg(`${deleting.type.toUpperCase()} check deleted`);
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
            // attach host id
            data.HostID = host.ID || host.id;
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
            setCreatingType(null); load(); setSuccessMsg(`${creatingType.toUpperCase()} check created`);
          } catch(e){ setError(e.message); } finally { setSaving(false);} }}
      />)}
      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={()=>setSuccessMsg('')}
        message={successMsg}
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
      />
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
    const payload = { FriendlyName: form.friendly_name, IntervalSec: Number(form.interval_sec)||60, Retries: Number(form.retries)||0 };
    if(type==='icmp') { payload.Hostname = form.hostname; }
    else { payload.URL = form.url; payload.ExpectedStatus = Number(form.expected_status)||200; if(form.keyword) payload.Keyword = form.keyword; }
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
