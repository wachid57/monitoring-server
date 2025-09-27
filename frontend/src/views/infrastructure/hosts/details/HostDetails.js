import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import {
  Card, CardContent, Typography, CircularProgress, Alert, Box, Grid, Stack, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
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
  const [error, setError] = useState('');

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

  return (
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
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>ICMP Checks</Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Hostname</TableCell>
                        <TableCell>Interval(s)</TableCell>
                        <TableCell>Retries</TableCell>
                        <TableCell>Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {icmpChecks.length === 0 ? (
                        <TableRow><TableCell colSpan={5} align="center">No ICMP checks</TableCell></TableRow>
                      ) : icmpChecks.map(ch => (
                        <TableRow key={ch.ID || ch.id}>
                          <TableCell>{ch.friendly_name || ch.FriendlyName || '-'}</TableCell>
                          <TableCell>{ch.hostname || ch.Hostname || '-'}</TableCell>
                          <TableCell>{ch.interval_sec || ch.IntervalSec || '-'}</TableCell>
                          <TableCell>{ch.retries || ch.Retries || '-'}</TableCell>
                          <TableCell><Chip size="small" label={ch.monitor_type || ch.MonitorType || 'icmp'} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>HTTP Curl Checks</Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Interval(s)</TableCell>
                        <TableCell>Retries</TableCell>
                        <TableCell>Expect</TableCell>
                        <TableCell>Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {httpChecks.length === 0 ? (
                        <TableRow><TableCell colSpan={6} align="center">No HTTP checks</TableCell></TableRow>
                      ) : httpChecks.map(ch => (
                        <TableRow key={ch.ID || ch.id}>
                          <TableCell>{ch.friendly_name || ch.FriendlyName || '-'}</TableCell>
                          <TableCell>{ch.url || ch.URL || '-'}</TableCell>
                          <TableCell>{ch.interval_sec || ch.IntervalSec || '-'}</TableCell>
                          <TableCell>{ch.retries || ch.Retries || '-'}</TableCell>
                          <TableCell>{ch.expected_status || ch.ExpectedStatus || '-'}</TableCell>
                          <TableCell><Chip size="small" label={ch.monitor_type || ch.MonitorType || 'http'} /></TableCell>
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
  );
}
