import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { REACT_API_URL } from 'src/config/constants';
import AuthLogin from '../authForms/AuthLogin';
import 'src/assets/css/login.css';

const Login2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load wave animation JS if needed
    if (window && typeof window !== "undefined") {
      const script = document.createElement('script');
      script.src = '/assets/js/wave.js';
      script.async = true;
      document.body.appendChild(script);
    }
    // Check signup availability
    fetch(REACT_API_URL + 'enable-signup')
      .then(res => res.json())
      .then(data => {
        if (data && (data.enable_sign_up === 1 || data.enable_sign_up === true)) {
          setShowSignup(true);
        }
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(BACKEND_URL + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch {
      setError('Login gagal');
    }
  };

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
                <div className="login-title">Wcloud Proxy Manager</div>
                <form onSubmit={handleLogin} id="login-form">
                  <input
                    className="login-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <input
                    className="login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button className="login-btn" type="submit">SIGN IN</button>
                </form>
                {error && <div id="login-error" style={{ color: 'red' }}>{error}</div>}
                {showSignup && (
                  <div className="login-footer" id="signup-footer">
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
