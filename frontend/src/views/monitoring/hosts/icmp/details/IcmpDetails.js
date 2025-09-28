import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Grid, Stack, Divider, Chip, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

// Simple utility to derive host id from path (support both monitoring & infrastructure prefixes)
const extractHostId = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  // patterns we expect: /infrastructure/hosts/details/:id/icmp/details OR /monitoring/hosts/:id/icmp/details
  const infraIdx = parts.indexOf('infrastructure');
  const monIdx = parts.indexOf('monitoring');
  if (infraIdx !== -1) {
    const i = parts.indexOf('hosts');
    if (i !== -1 && parts[i + 1] === 'details') return parts[i + 2];
  }
  if (monIdx !== -1) {
    const i = parts.indexOf('hosts');
    if (i !== -1) return parts[i + 1];
  }
  return null;
};

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/monitoring/hosts', title: 'Hosts' },
  { title: 'ICMP Details' },
];

const IcmpDetails = () => {
  const hostId = extractHostId();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [host, setHost] = useState(null);
  const [icmpService, setIcmpService] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!hostId) { setError('Invalid host id'); setLoading(false); return; }
      try {
        // Fetch host base info
        const hostRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}`, { headers: getAuthHeaders() });
        if (hostRes.status === 401 || hostRes.status === 403) return handleAuthError({ status: hostRes.status });
        if (!hostRes.ok) {
          const d = await hostRes.json().catch(() => ({}));
            throw new Error(d.error || 'Failed load host');
        }
        const hostData = await hostRes.json();
        setHost(hostData);

        // Fetch all services for host to locate ICMP
        const servicesRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}/services`, { headers: getAuthHeaders() });
        if (!servicesRes.ok) {
          const d = await servicesRes.json().catch(() => ({}));
          throw new Error(d.error || 'Failed load services');
        }
        const services = await servicesRes.json();
        const icmp = Array.isArray(services) ? services.find(s => (s.type || s.service_type || '').toLowerCase() === 'icmp') : null;
        setIcmpService(icmp || null);

        // Availability summary (past 24h default)
        const to = new Date().toISOString();
        const from = new Date(Date.now() - 24*3600*1000).toISOString();
        const availRes = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/hosts/availability/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&service_type=icmp&host_id=${hostId}`, { headers: getAuthHeaders() });
        if (availRes.ok) {
          const av = await availRes.json();
          setAvailability(av);
        }
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [hostId]);

  if (loading) return <PageContainer title="ICMP Details"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
  if (error) return <PageContainer title="ICMP Details"><Alert severity="error">{error}</Alert></PageContainer>;

  return (
    <PageContainer title="ICMP Details" description="Host ICMP service details">
      <Breadcrumb title="ICMP Details" items={BCrumb} />
      <Box mt={2} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">ICMP Service - {host?.hostname || host?.ip}</Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Host</Typography>
                    <Typography>{host?.hostname || host?.ip}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">IP</Typography>
                    <Typography>{host?.ip || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Interval</Typography>
                    <Typography>{icmpService?.interval || host?.heartbeat_interval || '-'} sec</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Last Status</Typography>
                    <Chip label={(icmpService?.status || 'UNKNOWN').toUpperCase()} color={(icmpService?.status || 'unknown') === 'ok' ? 'success':'warning'} size="small" />
                  </Grid>
                </Grid>
                <Divider />
                <Typography variant="h6">Availability (24h)</Typography>
                {availability ? (
                  <Box>
                    <Typography variant="body2">Uptime: {availability.uptime_percentage ?? '-'}%</Typography>
                    <Typography variant="body2">Downtime: {availability.downtime_percentage ?? '-'}%</Typography>
                    {Array.isArray(availability.events) && availability.events.length > 0 && (
                      <Box mt={2}>
                        <Typography variant="subtitle2">Recent Events</Typography>
                        <Stack spacing={1} mt={1}>
                          {availability.events.slice(0,10).map(ev => (
                            <Box key={ev.id} sx={{ display:'flex', alignItems:'center', gap:1 }}>
                              <Chip size="small" label={ev.status} color={ev.status === 'OK' ? 'success':'error'} />
                              <Typography variant="caption">{new Date(ev.occurred_at || ev.occurredAt).toLocaleString()}</Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                ) : <Typography variant="body2">No availability data.</Typography>}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">Actions</Typography>
                <Button variant="outlined" size="small" onClick={() => window.history.back()}>Back</Button>
                <Divider />
                <Typography variant="h6">Raw JSON</Typography>
                <Box sx={{ maxHeight:300, overflow:'auto', fontSize:12, fontFamily:'monospace', background:'#fafafa', p:1, border:'1px solid #eee' }}>
                  <pre style={{ margin:0 }}>{JSON.stringify({ host, icmpService, availability }, null, 2)}</pre>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default IcmpDetails;
