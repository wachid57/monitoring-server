import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Button, Box, CircularProgress, Alert, Stack, Divider } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/monitoring/hosts', title: 'Hosts' },
  { title: 'Edit' },
];

const HostDetails = ({ match, location }) => {
  // This project sometimes uses window.location-based routing. We'll parse id from the path.
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getIdFromPath = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    // expected /monitoring/hosts/:id
    return parts.length > 2 ? parts[2] : null;
  };

  const id = getIdFromPath();

  useEffect(() => {
    const fetchHost = async () => {
      setLoading(true);
      try {
        const res = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${id}`, { headers: getAuthHeaders() });
        if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Failed to load host');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setHost(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load host');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchHost();
    else { setError('Invalid host id'); setLoading(false); }
  }, [id]);

  if (loading) return <PageContainer title="Host details"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
  if (error) return <PageContainer title="Host details"><Alert severity="error">{error}</Alert></PageContainer>;

  return (
    <PageContainer title="Edit" description="Host details and configuration">
  <Breadcrumb title="Edit" items={BCrumb} />

  {/* add some spacing below breadcrumb so card top/border is visible */}
  <Box mt={2} />

  <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">{host.hostname || host.ip || 'Host details'}</Typography>
                <Typography color="textSecondary">{host.alias || ''}</Typography>
                <Divider />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Monitor Type</Typography>
                    <Typography>{host.monitor_type || 'HTTP(s)'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">URL / IP</Typography>
                    <Typography>{host.ip || host.url || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Heartbeat Interval</Typography>
                    <Typography>{host.heartbeat_interval || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Timeout</Typography>
                    <Typography>{host.timeout || '-'}</Typography>
                  </Grid>
                </Grid>

                <Divider />

                <Typography variant="h6">Advanced</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Retries</Typography>
                    <Typography>{host.retries ?? 0}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Tags</Typography>
                    <Typography>{host.hosts_tags || '-'}</Typography>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">Notifications</Typography>
                <Button variant="contained" color="success">Setup Notification</Button>

                <Divider />

                <Typography variant="h6">Proxy</Typography>
                <Button variant="contained" color="success">Setup Proxy</Button>

                <Divider />

                <Typography variant="h6">HTTP Options</Typography>
                <Typography variant="subtitle2">Method</Typography>
                <Typography>{host.method || 'GET'}</Typography>
                <Typography variant="subtitle2">Body Encoding</Typography>
                <Typography>{host.body_encoding || 'JSON'}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HostDetails;

