import React, { useState, useEffect } from 'react';
import { Card, CardContent, Stack, Box, TextField, InputAdornment, Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Alert, CircularProgress } from '@mui/material';
import { IconSearch, IconPlus } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Admin' },
  { title: 'Users' },
  { title: 'User Groups' },
];

// Simple list of user groups (reusing backend /admin/users/groups/list alias -> currently using /admin/groups/list)
export default function UserGroupsList() {
  const [groups, setGroups] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGroups = async () => {
    setLoading(true); setError('');
    try {
      // Using existing admin groups endpoint as backend alias for now
      const res = await fetch(BACKEND_URL + API_PREFIX + '/admin/groups/list', { headers: getAuthHeaders() });
      if (res.status === 401 || res.status === 403) { handleAuthError({ status: res.status }); return; }
      const data = await res.json();
      if(res.ok){ setGroups(Array.isArray(data)? data : (data.groups || [])); } else { setError(data.error || 'Failed to load groups'); }
    } catch(e){ console.error(e); setError('Failed to load groups'); }
    finally { setLoading(false); }
  };

  useEffect(()=> { fetchGroups(); }, []);

  const filtered = groups.filter(g => (g.name||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <PageContainer title="User Groups" description="Manage user groups">
      <Breadcrumb title="User Groups" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField fullWidth placeholder="Search user groups..." value={q} onChange={(e)=>setQ(e.target.value)}
                InputProps={{ startAdornment:(<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }} />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} sx={{ width:225 }}>Add Group</Button>
          </Stack>
          {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={5} align="center">No groups</TableCell></TableRow>
                  ) : filtered.map(g => (
                    <TableRow key={g.id}>
                      <TableCell>{g.name}</TableCell>
                      <TableCell>{g.description || '-'}</TableCell>
                      <TableCell>{g.user_count || '-'}</TableCell>
                      <TableCell>{g.created_at ? new Date(g.created_at).toLocaleDateString() : '-'}</TableCell>
                      <TableCell align="center">-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
