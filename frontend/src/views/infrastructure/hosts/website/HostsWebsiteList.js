import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
} from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Monitoring' },
  { title: 'Website Hosts' },
];

const ListHosts = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, host: null });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newHost, setNewHost] = useState({ ip: '', hostname: '', alias: '', service: '', hosts_tags: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingHostId, setEditingHostId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchHosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/hosts', { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setHosts(data || []);
      } else {
        setError(data.error || 'Failed to fetch hosts');
      }
    } catch (err) {
      console.error('fetch hosts error', err);
      setError('Failed to fetch hosts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (hostId) => {
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${hostId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
      if (res.ok) {
        setHosts(prev => prev.filter(h => h.id !== hostId));
        setDeleteDialog({ open: false, host: null });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete host');
      }
    } catch (err) {
      console.error('delete host error', err);
      setError('Failed to delete host');
    }
  };

  const filteredHosts = hosts.filter(h =>
    h.hostname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.alias?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => { fetchHosts(); }, []);

  return (
    <PageContainer title="Website Hosts" description="Website-monitored hosts">
      <Breadcrumb title="Website Hosts" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search hosts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }}
                fullWidth
              />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} onClick={() => setAddDialogOpen(true)} sx={{ width: 225 }}>Add Host</Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>IP</TableCell>
                    <TableCell>Hostname</TableCell>
                    <TableCell>Alias</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHosts.length === 0 ? (
                    <TableRow><TableCell colSpan={7} align="center">No hosts found</TableCell></TableRow>
                  ) : (
                    filteredHosts.map((h) => (
                      <TableRow key={h.id}>
                        <TableCell>{h.ip || '-'}</TableCell>
                        <TableCell>{h.hostname || '-'}</TableCell>
                        <TableCell>{h.alias || '-'}</TableCell>
                        <TableCell>{h.service || '-'}</TableCell>
                        <TableCell>{h.hosts_tags || '-'}</TableCell>
                        <TableCell>{h.created_at ? new Date(h.created_at).toLocaleDateString() : '-'}</TableCell>
                        <TableCell align="center">
                                          <Stack direction="row" spacing={1} justifyContent="center">
                                            <IconButton size="small" color="primary"><IconEye size={16} /></IconButton>
                                            <IconButton size="small" color="warning" onClick={() => {
                                              setEditMode(true);
                                              setEditingHostId(h.id);
                                              setNewHost({ ip: h.ip || '', hostname: h.hostname || '', alias: h.alias || '', service: h.service || '', hosts_tags: h.hosts_tags || '' });
                                              setAddDialogOpen(true);
                                            }}><IconEdit size={16} /></IconButton>
                                            <IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, host: h })}><IconTrash size={16} /></IconButton>
                                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, host: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Delete host "{deleteDialog.host?.hostname}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, host: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(deleteDialog.host?.id)}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={() => { setAddDialogOpen(false); setEditMode(false); setEditingHostId(null); }} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Host' : 'Add Host'}</DialogTitle>
        <DialogContent>
          <TextField label="IP" fullWidth margin="dense" value={newHost.ip} onChange={e => setNewHost({...newHost, ip: e.target.value})} />
          <TextField label="Hostname" fullWidth margin="dense" value={newHost.hostname} onChange={e => setNewHost({...newHost, hostname: e.target.value})} />
          <TextField label="Alias" fullWidth margin="dense" value={newHost.alias} onChange={e => setNewHost({...newHost, alias: e.target.value})} />
          <TextField label="Service" fullWidth margin="dense" value={newHost.service} onChange={e => setNewHost({...newHost, service: e.target.value})} />
          <TextField label="Tags" fullWidth margin="dense" value={newHost.hosts_tags} onChange={e => setNewHost({...newHost, hosts_tags: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={async () => {
            setSubmitLoading(true);
            try {
              let res;
              if (editMode && editingHostId) {
                res = await fetch(BACKEND_URL + API_PREFIX + `/hosts/${editingHostId}`, { method: 'PUT', headers: {'Content-Type': 'application/json', ...getAuthHeaders()}, body: JSON.stringify(newHost) });
              } else {
                res = await fetch(BACKEND_URL + API_PREFIX + '/hosts', { method: 'POST', headers: {'Content-Type': 'application/json', ...getAuthHeaders()}, body: JSON.stringify(newHost) });
              }
              if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
              const data = await res.json();
              if (res.ok) {
                fetchHosts();
                setAddDialogOpen(false);
                setNewHost({ ip: '', hostname: '', alias: '', service: '', hosts_tags: '' });
                setEditMode(false);
                setEditingHostId(null);
              } else setError(data.error || (editMode ? 'Failed to update host' : 'Failed to create host'));
            } catch (err) { console.error(err); setError(editMode ? 'Failed to update host' : 'Failed to create host'); }
            finally { setSubmitLoading(false); }
          }}>{submitLoading ? <CircularProgress size={20} /> : (editMode ? 'Save' : 'Create')}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ListHosts;

