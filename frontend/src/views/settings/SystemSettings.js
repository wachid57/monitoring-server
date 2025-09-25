import React from 'react';
import { Card, CardContent, Stack, Box, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Settings' },
  { title: 'System Settings' },
];

export default function SystemSettings() {
  return (
    <PageContainer title="System Settings" description="Manage system settings">
      <Breadcrumb title="System Settings" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack spacing={2} maxWidth={480}>
            <TextField label="Site Name" fullWidth />
            <TextField label="Base URL" fullWidth />
            <TextField label="SMTP Server" fullWidth />
            <Box>
              <Button variant="contained">Save Settings</Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
