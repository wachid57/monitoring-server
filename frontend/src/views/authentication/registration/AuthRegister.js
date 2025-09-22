import React from 'react';
import { Box, Typography, Button, Divider, Alert } from '@mui/material';
import { Link } from 'react-router';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from '../authForms/AuthSocialButtons';
import { useRegister } from '../../../hooks/auth';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleRegister
  } = useRegister();

  const onRegisterSuccess = () => {
    window.location.href = '/auth/login';
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={e => handleRegister(e, onRegisterSuccess)}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">Full Name</CustomFormLabel>
          <CustomTextField 
            id="name" 
            variant="outlined" 
            fullWidth 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          
          <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
          <CustomTextField 
            id="username" 
            variant="outlined" 
            fullWidth 
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            helperText="Minimal 3 karakter, hanya huruf, angka, dan underscore"
          />
          
          <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
          <CustomTextField 
            id="email" 
            type="email"
            variant="outlined" 
            fullWidth 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField 
            id="password" 
            type="password"
            variant="outlined" 
            fullWidth 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            helperText="Minimal 8 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus"
          />
          
          <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
          <CustomTextField 
            id="confirmPassword" 
            type="password"
            variant="outlined" 
            fullWidth 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </Stack>

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

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
