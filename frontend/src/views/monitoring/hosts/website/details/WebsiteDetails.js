import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Grid, Stack, Divider, Chip, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const extractHostId = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  // patterns: /infrastructure/hosts/details/:id/website/details OR /monitoring/hosts/:id/website/details
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
  { title: 'Website Details' },
];

const WebsiteDetails = () => {
  const hostId = extractHostId();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [host, setHost] = useState(null);
  const [httpService, setHttpService] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!hostId) { setError('Invalid host id'); setLoading(false); return; }
      try {
        const hostRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}`, { headers: getAuthHeaders() });
        if (hostRes.status === 401 || hostRes.status === 403) return handleAuthError({ status: hostRes.status });
        if (!hostRes.ok) { const d = await hostRes.json().catch(()=>({})); throw new Error(d.error || 'Failed load host'); }
        const hostData = await hostRes.json();
        setHost(hostData);

        const servicesRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}/services`, { headers: getAuthHeaders() });
        if (!servicesRes.ok) { const d = await servicesRes.json().catch(()=>({})); throw new Error(d.error || 'Failed load services'); }
        const services = await servicesRes.json();
        const http = Array.isArray(services) ? services.find(s => {
          const t = (s.type || s.service_type || '').toLowerCase();
          return t === 'http' || t === 'https' || t === 'website';
        }) : null;
        setHttpService(http || null);

        const to = new Date().toISOString();
        const from = new Date(Date.now() - 24*3600*1000).toISOString();
        const availRes = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/hosts/availability/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&service_type=website&host_id=${hostId}`, { headers: getAuthHeaders() });
        if (availRes.ok) { setAvailability(await availRes.json()); }
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [hostId]);

  if (loading) return <PageContainer title="Website Details"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
  if (error) return <PageContainer title="Website Details"><Alert severity="error">{error}</Alert></PageContainer>;

  return (
    <PageContainer title="Website Details" description="Host HTTP/Website service details">
      <Breadcrumb title="Website Details" items={BCrumb} />
      <Box mt={2} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">Website Service - {host?.hostname || host?.ip}</Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Host</Typography>
                    <Typography>{host?.hostname || host?.ip}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">URL</Typography>
                    <Typography>{httpService?.url || host?.url || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Method</Typography>
                    <Typography>{httpService?.method || host?.method || 'GET'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Interval</Typography>
                    <Typography>{httpService?.interval || host?.heartbeat_interval || '-'} sec</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Last Status</Typography>
                    <Chip label={(httpService?.status || 'UNKNOWN').toUpperCase()} color={(httpService?.status || 'unknown') === 'ok' ? 'success':'warning'} size="small" />
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
                  <pre style={{ margin:0 }}>{JSON.stringify({ host, httpService, availability }, null, 2)}</pre>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WebsiteDetails;
