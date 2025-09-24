import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { Link } from "react-router";
import { getUserInfo, clearAuthData, getAuthHeaders } from 'src/utils/auth';
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

  const truncate = (s, n = 6) => {
    if (!s) return '';
    return s.length > n ? s.substring(0, n) + '..' : s;
  };

  const handleLogout = async () => {
    try {
      // call backend logout to invalidate session
      await fetch(BACKEND_URL + API_PREFIX + '/auth/logout', { method: 'POST', headers: getAuthHeaders() });
    } catch (err) {
      console.warn('logout request failed', err);
    }
    // clear local auth data and redirect to login
    clearAuthData();
    window.location.href = '/auth/login';
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
            <Typography variant="h6" color="textPrimary">
              {truncate(userInfo?.name || userInfo?.username || 'Administrator', 8)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {truncate(userInfo?.role || 'System Administrator', 8)}
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
