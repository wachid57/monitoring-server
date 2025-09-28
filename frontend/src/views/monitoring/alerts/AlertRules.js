import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel, IconButton, Tooltip, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';
import PageContainer from 'src/components/container/PageContainer';

const AlertRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ host_id:'', service_type:'icmp', threshold_latency_ms:'', max_consecutive_failures:'', cooldown_sec:60, enabled:true });
  const [error, setError] = useState('');

  const load = async ()=> {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/alerts/rules/`, { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      const data = await res.json();
      setRules(Array.isArray(data)? data: []);
    } catch(e){ setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(()=>{ load(); },[]);

  const openCreate = () => { setEditing(null); setForm({ host_id:'', service_type:'icmp', threshold_latency_ms:'', max_consecutive_failures:'', cooldown_sec:60, enabled:true }); setOpen(true); };
  const openEdit = (r) => { setEditing(r); setForm({ host_id: r.host_id, service_type: r.service_type, threshold_latency_ms: r.threshold_latency_ms??'', max_consecutive_failures: r.max_consecutive_failures??'', cooldown_sec: r.cooldown_sec, enabled: r.enabled }); setOpen(true); };

  const save = async () => {
    try {
      const payload = {
        host_id: parseInt(form.host_id)||0,
        service_type: form.service_type||'icmp',
        cooldown_sec: parseInt(form.cooldown_sec)||0,
        enabled: !!form.enabled,
      };
      if(form.threshold_latency_ms!=='') payload.threshold_latency_ms = parseFloat(form.threshold_latency_ms);
      if(form.max_consecutive_failures!=='') payload.max_consecutive_failures = parseInt(form.max_consecutive_failures);
      const method = editing? 'PUT':'POST';
      const url = editing? `${BACKEND_URL}${API_PREFIX}/monitoring/alerts/rules/${editing.id}` : `${BACKEND_URL}${API_PREFIX}/monitoring/alerts/rules/`;
      const res = await fetch(url,{ method, headers:{...getAuthHeaders(),'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      if(!res.ok){ const d = await res.json().catch(()=>({})); throw new Error(d.error||'save failed'); }
      setOpen(false); load();
    } catch(e){ setError(e.message); }
  };

  const remove = async (r) => {
    if(!window.confirm('Delete rule?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/alerts/rules/${r.id}`, { method:'DELETE', headers: getAuthHeaders() });
      if(!res.ok){ const d = await res.json().catch(()=>({})); throw new Error(d.error||'delete failed'); }
      load();
    } catch(e){ setError(e.message); }
  };

  return (
    <PageContainer title="Alert Rules" description="Threshold & failure alert configuration">
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Typography variant="h5" sx={{ flexGrow:1 }}>Alert Rules</Typography>
        <Tooltip title="Reload"><span><IconButton size="small" onClick={load}><RefreshIcon fontSize="inherit" /></IconButton></span></Tooltip>
        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={openCreate}>New Rule</Button>
      </Stack>
      {error && <Typography color="error" variant="body2" sx={{ mb:2 }}>{error}</Typography>}
      <Card variant="outlined">
        <CardContent>
          <Box component="table" sx={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr>
                {['ID','Host','Service','Latency > (ms)','Max Fails','Cooldown(s)','Enabled','Updated','Actions'].map(h=> <th key={h} style={{ textAlign:'left', padding:6, borderBottom:'1px solid #ccc' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {(!rules || rules.length===0) && (
                <tr><td colSpan={9} style={{ padding:8, fontStyle:'italic' }}>{loading? 'Loading...':'No rules.'}</td></tr>
              )}
              {rules.map(r=>{
                return (
                  <tr key={r.id} style={{ borderBottom:'1px solid #eee' }}>
                    <td style={{ padding:6 }}>{r.id}</td>
                    <td style={{ padding:6 }}>{r.host_id}</td>
                    <td style={{ padding:6 }}>{r.service_type}</td>
                    <td style={{ padding:6 }}>{r.threshold_latency_ms ?? '-'}</td>
                    <td style={{ padding:6 }}>{r.max_consecutive_failures ?? '-'}</td>
                    <td style={{ padding:6 }}>{r.cooldown_sec}</td>
                    <td style={{ padding:6 }}><Chip size="small" label={r.enabled? 'YES':'NO'} color={r.enabled? 'success':'default'} /></td>
                    <td style={{ padding:6 }}>{r.updated_at? new Date(r.updated_at).toLocaleString(): '-'}</td>
                    <td style={{ padding:4 }}>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" onClick={()=> openEdit(r)}>Edit</Button>
                        <IconButton size="small" color="error" onClick={()=> remove(r)}><DeleteIcon fontSize="inherit" /></IconButton>
                      </Stack>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={()=> setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing? 'Edit Alert Rule':'New Alert Rule'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField size="small" label="Host ID" value={form.host_id} onChange={e=> setForm(f=>({...f, host_id:e.target.value}))} />
            <TextField size="small" label="Service Type" value={form.service_type} onChange={e=> setForm(f=>({...f, service_type:e.target.value}))} />
            <TextField size="small" label="Latency Threshold (ms)" value={form.threshold_latency_ms} onChange={e=> setForm(f=>({...f, threshold_latency_ms:e.target.value}))} />
            <TextField size="small" label="Max Consecutive Failures" value={form.max_consecutive_failures} onChange={e=> setForm(f=>({...f, max_consecutive_failures:e.target.value}))} />
            <TextField size="small" label="Cooldown (sec)" value={form.cooldown_sec} onChange={e=> setForm(f=>({...f, cooldown_sec:e.target.value}))} />
            <FormControlLabel control={<Switch checked={form.enabled} onChange={e=> setForm(f=>({...f, enabled: e.target.checked}))} />} label="Enabled" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default AlertRules;
