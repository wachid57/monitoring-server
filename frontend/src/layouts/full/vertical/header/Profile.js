import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton } from '@mui/material';
import * as dropdownData from './data';

import { IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import unlimitedImg from 'src/assets/images/backgrounds/unlimited-bg.png';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

// Enhanced logout function with session cleanup
const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      // Call logout API to blacklist token and cleanup session
      await fetch(BACKEND_URL + API_PREFIX + '/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (err) {
    console.error('Logout API error:', err);
  } finally {
    // Clear all local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('loginTime');
    window.location.href = '/auth/login';
  }
};

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">User Profile</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar src={ProfileImg} alt={ProfileImg} sx={{ width: 95, height: 95 }} />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600} noWrap sx={{ maxWidth: 200 }}>
                  {(() => {
                    const u = userInfo?.username || 'User';
                    return u.length > 6 ? u.slice(0, 6) + '..' : u;
                  })()}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" noWrap sx={{ maxWidth: 200 }}>
                  {(() => {
                    const r = userInfo?.role || 'User';
                    return r.length > 6 ? r.slice(0, 6) + '..' : r;
                  })()}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {userInfo?.email || 'user@example.com'}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.href}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              {/* <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5" mb={2}>
                      Unlimited <br />
                      Access
                    </Typography>
                    <Button variant="contained" color="primary">
                      Upgrade
                    </Button>
                  </Box>
                  <img src={unlimitedImg} alt="unlimited" className="signup-bg"></img>
                </Box>
              </Box> */}
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleLogout} // ubah dari Link ke fungsi logout
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
