import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
// useNavigate tidak tersedia di react-router, jadi tetap pakai window.location

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import 'src/assets/css/login.css';

const Login2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      const script = document.createElement('script');
      script.src = '/assets/js/wave.js';
      script.async = true;
      document.body.appendChild(script);
    }
    // Check signup availability (panggil dari AuthLogin jika perlu)
    // setShowSignup(true); // Atur sesuai kebutuhan
  }, []);

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            size={{ xs: 12, sm: 12, lg: 5, xl: 4 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <div className="login-container">
                <div className="login-logo">
                  <img src="/assets/img/logo_wpm.svg" alt="Wcloud Logo" />
                </div>
                <Typography variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
                  Wcloud Proxy Manager
                </Typography>
                <form onSubmit={handleLogin} id="login-form">
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    SIGN IN
                  </Button>
                </form>
                {error && <div id="login-error" style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                {showSignup && (
                  <div className="login-footer" id="signup-footer" style={{ marginTop: 16 }}>
                    <a href="/signup">SIGN UP</a>
                  </div>
                )}
              </div>
              <AuthLogin
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
