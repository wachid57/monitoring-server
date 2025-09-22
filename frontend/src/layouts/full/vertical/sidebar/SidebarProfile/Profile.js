import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { Link } from "react-router";
import { getUserInfo } from 'src/utils/auth';

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
              {userInfo?.name || userInfo?.username || 'Administrator'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {userInfo?.role || 'System Administrator'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" component={Link} to="/auth/login" aria-label="logout" size="small">
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
