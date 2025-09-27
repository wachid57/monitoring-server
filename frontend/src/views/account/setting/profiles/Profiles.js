import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/account/setting/profiles', title: 'Account' },
  { title: 'Profile Settings' },
];

/* Simple profile settings view placeholder */
const Profiles = () => {
  const [form, setForm] = React.useState({ fullName: '', email: '', company: '', title: '' });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend profile endpoint if available
    console.log('Save profile', form);
  };

  return (
    <PageContainer title="Profile Settings" description="User profile settings page">
      <Breadcrumb title="Profile Settings" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                <Avatar sx={{ width: 96, height: 96 }}>P</Avatar>
                <div>
                  <Typography variant="h5" gutterBottom>User Profile</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update your account's basic profile information.
                  </Typography>
                </div>
              </Stack>
              <Divider sx={{ my: 3 }} />
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth type="email" label="Email" name="email" value={form.email} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Company" name="company" value={form.company} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Job Title" name="title" value={form.title} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" color="primary" type="submit">Save Changes</Button>
                      <Button variant="outlined" color="secondary" type="reset" onClick={() => setForm({ fullName: '', email: '', company: '', title: '' })}>Reset</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Profiles;
