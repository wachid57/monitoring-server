import React from 'react';
import { Card, CardContent, Stack, Box, TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Settings' },
  { title: 'System Settings' },
];

export default function SystemSettings() {
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [snack, setSnack] = React.useState({ open: false, message: '', severity: 'success' });
  const [form, setForm] = React.useState({ site_name: '', base_url: '', smtp_server: '' });

  const loadSettings = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1.0/system/settings', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed load');
      const data = await res.json();
      // data is array of {key,value}
      const map = {};
      data.forEach((d) => { map[d.key] = d.value; });
      setForm({
        site_name: map.site_name || '',
        base_url: map.base_url || '',
        smtp_server: map.smtp_server || '',
      });
    } catch (e) {
      setSnack({ open: true, message: 'Load failed: ' + e.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { loadSettings(); }, [loadSettings]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveAll = async () => {
    setSaving(true);
    try {
      // send each key as upsert
      for (const [key, value] of Object.entries(form)) {
        await fetch('/api/v1.0/system/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ key, value }),
        });
      }
      setSnack({ open: true, message: 'Settings saved', severity: 'success' });
      loadSettings();
    } catch (e) {
      setSnack({ open: true, message: 'Save failed: ' + e.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer title="System Settings" description="Manage system settings">
      <Breadcrumb title="System Settings" items={BCrumb} />
      <Card>
        <CardContent>
          {loading ? <CircularProgress size={28} /> : (
            <Stack spacing={2} maxWidth={480}>
              <TextField label="Site Name" name="site_name" value={form.site_name} onChange={handleChange} fullWidth />
              <TextField label="Base URL" name="base_url" value={form.base_url} onChange={handleChange} fullWidth />
              <TextField label="SMTP Server" name="smtp_server" value={form.smtp_server} onChange={handleChange} fullWidth />
              <Box>
                <Button variant="contained" disabled={saving} onClick={saveAll}>{saving ? 'Saving...' : 'Save Settings'}</Button>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
