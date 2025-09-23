import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { getUserInfo, clearAuthData, getToken } from 'src/utils/auth';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userData = getUserInfo();
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = getToken();
      if (token) {
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
      clearAuthData();
      window.location.href = '/auth/login';
    }
  };

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt={userInfo?.name || userInfo?.username || 'User'} src={img1} />

          <Box>
            <Typography variant="h6" color="textPrimary" noWrap sx={{ maxWidth: 120 }}>
              {(() => {
                const n = userInfo?.name || userInfo?.username || 'Administrator';
                return n.length > 6 ? n.slice(0, 6) + '..' : n;
              })()}
            </Typography>
            <Typography variant="caption" color="textSecondary" noWrap sx={{ display: 'block', maxWidth: 120 }}>
              {(() => {
                const r = userInfo?.role || 'System Administrator';
                return r.length > 6 ? r.slice(0, 6) + '..' : r;
              })()}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" onClick={handleLogout} aria-label="logout" size="small">
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
