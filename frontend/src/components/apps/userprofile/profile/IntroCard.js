import React from 'react';
import { Stack, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin, IconPencil } from '@tabler/icons';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

const emptyDetail = { introduction: '', institution: '', contact_email: '', website: '', location: '' };

const IntroCard = () => {
  const [detail, setDetail] = React.useState(emptyDetail);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [snack, setSnack] = React.useState({ open: false, message: '', severity: 'success' });

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
  const res = await fetch(`${BACKEND_URL}${API_PREFIX}/account/setting/profiles/user-profile`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Load failed');
      const data = await res.json();
      setDetail({
        introduction: data.introduction || '',
        institution: data.institution || '',
        contact_email: data.contact_email || '',
        website: data.website || '',
        location: data.location || '',
      });
    } catch (e) {
      setSnack({ open: true, message: e.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}${API_PREFIX}/account/setting/profiles/user-profile`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          introduction: detail.introduction,
          institution: detail.institution,
          contact_email: detail.contact_email,
          website: detail.website,
          location: detail.location,
        })
      });
      if (!res.ok) throw new Error('Save failed');
      setSnack({ open: true, message: 'Profile updated', severity: 'success' });
      setOpen(false);
      load();
    } catch (e) {
      handleAuthError(e);
      setSnack({ open: true, message: e.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ChildCard>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontWeight={600} variant="h4">Introduction</Typography>
        <IconButton size="small" onClick={() => setOpen(true)} aria-label="edit-profile">
          <IconPencil size={18} />
        </IconButton>
      </Stack>
      {loading ? <CircularProgress size={24} /> : (
        <>
          <Typography color="textSecondary" variant="subtitle2" mb={2} sx={{ whiteSpace: 'pre-line' }}>
            {detail.introduction || 'No introduction yet.'}
          </Typography>
          <Stack direction="row" gap={2} alignItems="center" mb={3}>
            <IconBriefcase size="21" />
            <Typography variant="h6">{detail.institution || '-'}</Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={3}>
            <IconMail size="21" />
            <Typography variant="h6">{detail.contact_email || '-'}</Typography>
          </Stack>
            <Stack direction="row" gap={2} alignItems="center" mb={3}>
            <IconDeviceDesktop size="21" />
            <Typography variant="h6">{detail.website || '-'}</Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={1}>
            <IconMapPin size="21" />
            <Typography variant="h6">{detail.location || '-'}</Typography>
          </Stack>
        </>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile Detail</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField label="Introduction" multiline minRows={3} value={detail.introduction} onChange={(e) => setDetail({ ...detail, introduction: e.target.value })} />
            <TextField label="Institution" value={detail.institution} onChange={(e) => setDetail({ ...detail, institution: e.target.value })} />
            <TextField label="Contact Email" type="email" value={detail.contact_email} onChange={(e) => setDetail({ ...detail, contact_email: e.target.value })} />
            <TextField label="Website" value={detail.website} onChange={(e) => setDetail({ ...detail, website: e.target.value })} />
            <TextField label="Location" value={detail.location} onChange={(e) => setDetail({ ...detail, location: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>{snack.message}</Alert>
      </Snackbar>
    </ChildCard>
  );
};

export default IntroCard;
