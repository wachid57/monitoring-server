import React, { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Box, TextField, InputAdornment, Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Alert, CircularProgress } from '@mui/material';
import { IconSearch, IconPlus } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Reports' },
  { title: 'Manual Reports' },
];

export default function ManualReports() {
  const [q, setQ] = useState('');
  const [loading] = useState(false);
  const [error] = useState('');

  useEffect(() => {}, []);

  return (
    <PageContainer title="Manual Reports" description="Generate manual reports">
      <Breadcrumb title="Manual Reports" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField fullWidth placeholder="Search..." value={q} onChange={(e)=>setQ(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><IconSearch size={20} /></InputAdornment>) }} />
            </Box>
            <Button variant="contained" startIcon={<IconPlus />} sx={{ width: 225 }}>New Report</Button>
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
                    <TableCell>Period</TableCell>
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
