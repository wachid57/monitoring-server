import React, { useEffect, useState } from 'react';
import { CardContent, Typography, MenuItem, Box, Avatar, Button, Stack, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import useChangePassword from 'src/hooks/useChangePassword';

// images
import user1 from 'src/assets/images/profile/user-1.jpg';

// locations
const locations = [
  {
    value: 'us',
    label: 'United States',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'russia',
    label: 'Russia',
  },
];

// currency
const currencies = [
  {
    value: 'us',
    label: 'US Dollar ($)',
  },
  {
    value: 'uk',
    label: 'United Kingdom (Pound)',
  },
  {
    value: 'india',
    label: 'India (INR)',
  },
  {
    value: 'russia',
    label: 'Russia (Ruble)',
  },
];

const AccountTab = () => {
  const [location, setLocation] = React.useState('india');
  const [currency, setCurrency] = React.useState('india');
  const [userInfo, setUserInfo] = useState(null);

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleChangePassword,
    reset
  } = useChangePassword();

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUserInfo(JSON.parse(userData));
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, []);

  const handleChange1 = (event) => {
    setLocation(event.target.value);
  };

  const handleChange2 = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Profile
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Change your profile picture from here
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={user1}
                  alt={user1}
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="outlined" color="error">
                    Reset
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your password please confirm here
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleChangePassword}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Current Password
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                variant="outlined"
                fullWidth
                type="password"
                required
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">New Password</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
                fullWidth
                type="password"
                required
                helperText="Minimal 8 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">Confirm Password</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                fullWidth
                type="password"
                required
              />
              
              <Box mt={3} display="flex" gap={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={reset}
                  disabled={loading}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid size={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Personal Details
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your personal detail , edit and save from here
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    Your Name
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value="Mathew Anderson"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Store Name
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value="Maxima Studio"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    Location
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={location}
                    onChange={handleChange1}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {/* 4 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-currency"
                  >
                    Currency
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-currency"
                    variant="outlined"
                    value={currency}
                    onChange={handleChange2}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Email
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value="info@modernize.com"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Phone
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value="+91 12345 65478"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid size={12}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    Address
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value="814 Howard Street, 120065, India"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            Save
          </Button>
          <Button size="large" variant="text" color="error">
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
