import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Grid, Stack, Divider, Chip, Button, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

// Extract host id & service type from URL.
// Supported paths:
//  /infrastructure/hosts/details/:id/icmp/details
//  /infrastructure/hosts/details/:id/website/details
//  /monitoring/hosts/:id/icmp/details
//  /monitoring/hosts/:id/website/details
const parsePath = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  let hostId = null; let service = null;
  const infraIdx = parts.indexOf('infrastructure');
  const monIdx = parts.indexOf('monitoring');
  if (infraIdx !== -1) {
    const hostsIdx = parts.indexOf('hosts');
    if (hostsIdx !== -1 && parts[hostsIdx + 1] === 'details') {
      hostId = parts[hostsIdx + 2];
      service = parts[hostsIdx + 3]; // icmp | website
    }
  } else if (monIdx !== -1) {
    const hostsIdx = parts.indexOf('hosts');
    if (hostsIdx !== -1) {
      hostId = parts[hostsIdx + 1];
      service = parts[hostsIdx + 2];
    }
  }
  if (!['icmp','website'].includes(service)) service = null;
  return { hostId, service };
};

const BCrumbBase = [
  { to: '/', title: 'Home' },
  { to: '/monitoring/hosts', title: 'Hosts' },
];

const statusColor = (s) => (s || '').toLowerCase() === 'ok' ? 'success' : 'error';

// Build sparkline from events (OK vs not OK) over time.
const Sparkline = ({ events }) => {
  if (!Array.isArray(events) || events.length === 0) return null;
  const width = 160; const height = 24;
  const sorted = [...events].sort((a,b)=> new Date(a.occurred_at||a.occurredAt) - new Date(b.occurred_at||b.occurredAt));
  const minT = new Date(sorted[0].occurred_at||sorted[0].occurredAt).getTime();
  const maxT = new Date(sorted[sorted.length-1].occurred_at||sorted[sorted.length-1].occurredAt).getTime();
  const span = maxT - minT || 1;
  const points = sorted.map(ev => {
    const t = new Date(ev.occurred_at||ev.occurredAt).getTime();
    const x = ((t - minT)/span) * width;
    const y = ( (ev.status||'').toUpperCase() === 'OK') ? height*0.2 : height*0.8;
    return { x, y, status: ev.status };
  });
  const pathD = points.map((p,i)=> `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display:'block'}}>
      <path d={pathD} fill="none" stroke="#1976d2" strokeWidth={1.5} />
      {points.map((p,i)=>(<circle key={i} cx={p.x} cy={p.y} r={2} fill={(p.status||'').toUpperCase()==='OK'? '#2e7d32':'#d32f2f'} />))}
    </svg>
  );
};

const UnifiedServiceDetails = () => {
  const { hostId, service } = useMemo(parsePath, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [host, setHost] = useState(null);
  const [serviceObj, setServiceObj] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [range, setRange] = useState('24h'); // 24h | 7d | 30d

  useEffect(() => {
    const load = async () => {
      if (!hostId || !service) { setError('Invalid path'); setLoading(false); return; }
      try {
        const hostRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}`, { headers: getAuthHeaders() });
        if (hostRes.status === 401 || hostRes.status === 403) return handleAuthError({ status: hostRes.status });
        if (!hostRes.ok) { const d = await hostRes.json().catch(()=>({})); throw new Error(d.error || 'Failed load host'); }
        const hostData = await hostRes.json();
        setHost(hostData);

        const servicesRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}/services`, { headers: getAuthHeaders() });
        if (!servicesRes.ok) { const d = await servicesRes.json().catch(()=>({})); throw new Error(d.error || 'Failed load services'); }
        const services = await servicesRes.json();
        const svc = Array.isArray(services) ? services.find(s => {
          const t = (s.type || s.service_type || '').toLowerCase();
          if (service === 'icmp') return t === 'icmp';
          if (service === 'website') return t === 'http' || t === 'https' || t === 'website';
          return false;
        }) : null;
        setServiceObj(svc || null);

        // Availability
    const to = new Date().toISOString();
    let windowMs = 24*3600*1000;
    if (range === '7d') windowMs = 7*24*3600*1000;
    else if (range === '30d') windowMs = 30*24*3600*1000;
    const from = new Date(Date.now() - windowMs).toISOString();
        const availRes = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/hosts/availability/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&service_type=${service}&host_id=${hostId}`, { headers: getAuthHeaders() });
        if (availRes.ok) setAvailability(await availRes.json());
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [hostId, service, range]);

  const title = service === 'icmp' ? 'ICMP Details' : 'Website Details';
  const header = service === 'icmp' ? 'ICMP Service' : 'Website Service';

  if (loading) return <PageContainer title={title}><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
  if (error) return <PageContainer title={title}><Alert severity="error">{error}</Alert></PageContainer>;

  const events = availability?.events;
  const hasEvents = Array.isArray(events) && events.length > 0;
  const showAvailability = availability && (availability.uptime_percentage != null || hasEvents);

  return (
    <PageContainer title={title} description={`Host ${service.toUpperCase()} service details`}>
      <Breadcrumb title={title} items={[...BCrumbBase, { title }]} />
      <Box mt={2} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">{header} - {host?.hostname || host?.ip}</Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Host</Typography>
                    <Typography>{host?.hostname || host?.ip}</Typography>
                  </Grid>
                  {service === 'website' && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">URL</Typography>
                      <Typography>{serviceObj?.url || host?.url || '-'}</Typography>
                    </Grid>
                  )}
                  {service === 'website' && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Method</Typography>
                      <Typography>{serviceObj?.method || host?.method || 'GET'}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Interval</Typography>
                    <Typography>{serviceObj?.interval || host?.heartbeat_interval || '-'} sec</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Last Status</Typography>
                    <Chip label={(serviceObj?.status || 'UNKNOWN').toUpperCase()} color={statusColor(serviceObj?.status)} size="small" />
                  </Grid>
                  {serviceObj?.latency_ms != null && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Latency</Typography>
                      <Typography>{serviceObj.latency_ms} ms</Typography>
                    </Grid>
                  )}
                  {serviceObj?.response_time_ms != null && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Response Time</Typography>
                      <Typography>{serviceObj.response_time_ms} ms</Typography>
                    </Grid>
                  )}
                </Grid>
                {showAvailability && (
                  <>
                    <Divider />
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                      <Typography variant="h6" sx={{ mr:1 }}>Availability ({range})</Typography>
                      <ToggleButtonGroup size="small" value={range} exclusive onChange={(e,val)=> val && setRange(val)}>
                        <ToggleButton value="24h">24h</ToggleButton>
                        <ToggleButton value="7d">7d</ToggleButton>
                        <ToggleButton value="30d">30d</ToggleButton>
                      </ToggleButtonGroup>
                      <Tooltip title="Menampilkan uptime & events dalam rentang waktu dipilih"><span /></Tooltip>
                    </Stack>
                    <Box>
                      {availability.uptime_percentage != null && (
                        <>
                          <Typography variant="body2">Uptime: {availability.uptime_percentage}%</Typography>
                          <Typography variant="body2">Downtime: {availability.downtime_percentage}%</Typography>
                        </>
                      )}
                      {hasEvents && (
                        <Box mt={2}>
                          <Typography variant="subtitle2" sx={{ display:'flex', alignItems:'center', gap:1 }}>
                            Recent Events <Sparkline events={events.slice(0,50)} />
                          </Typography>
                          <Stack spacing={1} mt={1}>
                            {events.slice(0,10).map(ev => (
                              <Box key={ev.id} sx={{ display:'flex', alignItems:'center', gap:1 }}>
                                <Chip size="small" label={ev.status} color={statusColor(ev.status)} />
                                <Typography variant="caption">{new Date(ev.occurred_at || ev.occurredAt).toLocaleString()}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">Actions</Typography>
                <Button variant="contained" size="small" onClick={() => window.history.back()}>Back</Button>
                <Divider />
                <Typography variant="h6">Raw JSON</Typography>
                <Box sx={{ maxHeight:300, overflow:'auto', fontSize:12, fontFamily:'monospace', background:'#fafafa', p:1, border:'1px solid #eee' }}>
                  <pre style={{ margin:0 }}>{JSON.stringify({ host, service: serviceObj, availability }, null, 2)}</pre>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UnifiedServiceDetails;
