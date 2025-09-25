import React, { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Box, TextField, InputAdornment, Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Alert, CircularProgress } from '@mui/material';
import { IconSearch, IconPlus } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Notifications' },
  { title: 'Notifications' },
];

export default function NotificationsList() {
  const [q, setQ] = useState('');
  const [loading] = useState(false);
  const [error] = useState('');

  useEffect(() => {}, []);

  return (
    <PageContainer title="Notifications" description="Manage notifications">
      <Breadcrumb title="Notifications" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField fullWidth placeholder="Search..." value={q} onChange={(e)=>setQ(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }} />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} sx={{ width: 225 }}>Add Notification</Button>
          </Stack>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} align="center">No data</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
