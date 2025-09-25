import React from 'react';
import { Card, CardContent, Stack, Box, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Settings' },
  { title: 'Profile Settings' },
];

export default function ProfileSettings() {
  return (
    <PageContainer title="Profile Settings" description="Manage your profile">
      <Breadcrumb title="Profile Settings" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack spacing={2} maxWidth={480}>
            <TextField label="Full Name" fullWidth />
            <TextField label="Email" fullWidth />
            <TextField label="Password" type="password" fullWidth />
            <Box>
              <Button variant="contained">Save Changes</Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
