import React from 'react';
import {
  Avatar,
  Box,
  CardContent,
  IconButton,
  Typography,
  Button,
  Divider,
  Stack,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

// components
import BlankCard from '../../shared/BlankCard';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical, IconShield, IconClock } from '@tabler/icons';
import useSessionManager from 'src/hooks/useSessionManager';

const SecurityTab = () => {
  const {
    sessions,
    loading,
    error,
    revokeSession,
    getCurrentSession,
    getActiveSessionsCount,
    formatLastActivity
  } = useSessionManager();

  const currentSession = getCurrentSession();

  const handleRevokeSession = async (sessionId) => {
    if (window.confirm('Apakah Anda yakin ingin merevoke session ini? Pengguna akan logout dari device tersebut.')) {
      await revokeSession(sessionId);
    }
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {/* Session Management */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Session Management
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Kelola device yang terhubung ke akun Anda. Anda dapat merevoke session yang mencurigakan.
                </Typography>
                <Chip 
                  icon={<IconShield size={16} />}
                  label={`${getActiveSessionsCount()} Active Sessions`}
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {loading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <Stack spacing={2}>
                  {sessions.map((session, index) => {
                    const isCurrentSession = currentSession?.session_id === session.session_id;
                    
                    return (
                      <Box
                        key={session.session_id || index}
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: isCurrentSession ? 'primary.main' : 'grey.300',
                          borderRadius: 1,
                          bgcolor: isCurrentSession ? 'primary.50' : 'background.paper'
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                            {session.device_info?.includes('Mobile') ? 
                              <IconDeviceMobile size="24" /> : 
                              <IconDeviceLaptop size="24" />
                            }
                          </Avatar>
                          
                          <Box flex={1}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                              <Typography variant="h6">
                                {session.device_info || 'Unknown Device'}
                              </Typography>
                              {isCurrentSession && (
                                <Chip 
                                  label="Current Session" 
                                  size="small" 
                                  color="primary"
                                />
                              )}
                            </Stack>
                            
                            <Typography variant="body2" color="textSecondary" mb={1}>
                              IP: {session.ip_address || 'Unknown'}
                            </Typography>
                            
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <IconClock size={16} />
                              <Typography variant="body2" color="textSecondary">
                                Last active: {formatLastActivity(session.last_activity)}
                              </Typography>
                            </Stack>
                          </Box>
                          
                          {!isCurrentSession && (
                            <IconButton
                              color="error"
                              onClick={() => handleRevokeSession(session.session_id)}
                              size="small"
                            >
                              <IconDotsVertical size="20" />
                            </IconButton>
                          )}
                        </Stack>
                        
                        {!isCurrentSession && (
                          <Box mt={2}>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleRevokeSession(session.session_id)}
                            >
                              Revoke Session
                            </Button>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                  
                  {sessions.length === 0 && !loading && (
                    <Typography variant="body1" textAlign="center" py={4} color="textSecondary">
                      Tidak ada session aktif ditemukan
                    </Typography>
                  )}
                </Stack>
              )}
            </CardContent>
          </BlankCard>
        </Grid>

        {/* Two-factor Authentication (Placeholder) */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Two-factor Authentication
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Fitur ini akan tersedia dalam update mendatang untuk meningkatkan keamanan akun Anda.
                </Typography>
                <Button variant="contained" color="primary" disabled>
                  Coming Soon
                </Button>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SecurityTab;
                </Button>
              </Stack>

              <Divider />

              {/* list 1 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Authentication App</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Google auth app
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Setup
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* list 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Another e-mail</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    E-mail to send verification link
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Setup
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* list 3 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">SMS Recovery</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Your phone number or something
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Setup
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <BlankCard>
            <CardContent>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}
              >
                <IconDeviceLaptop size="26" />
              </Avatar>

              <Typography variant="h5" mt={2}>
                Devices
              </Typography>
              <Typography color="textSecondary" mt={1} mb={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
              </Typography>
              <Button variant="contained" color="primary">
                Sign out from all devices
              </Button>

              {/* list 1 */}
              <Stack direction="row" spacing={2} py={2} mt={3} alignItems="center">
                <IconDeviceMobile size="26" />

                <Box>
                  <Typography variant="h6">iPhone 14</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    London UK, Oct 23 at 1:15 AM
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Divider />
              {/* list 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <IconDeviceLaptop size="26" />

                <Box>
                  <Typography variant="h6">Macbook Air </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Gujarat India, Oct 24 at 3:15 AM
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Stack>
                <Button variant="text" color="primary">
                  Need Help ?
                </Button>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary">
          Save
        </Button>
        <Button size="large" variant="text" color="error">
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default SecurityTab;
