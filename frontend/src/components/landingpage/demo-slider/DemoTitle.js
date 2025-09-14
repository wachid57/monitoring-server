import React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';
import AnimationFadeIn from '../animation/Animation';
import Avatar from '@mui/material/Avatar';

// images
import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';

const DemoTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid size={{ xs: 12, sm: 10, lg: 8 }}>
        <AnimationFadeIn>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src={img1} sx={{ width: 28, height: 28 }} />
              <Avatar alt="Travis Howard" src={img2} sx={{ width: 28, height: 28 }} />
              <Avatar alt="Cindy Baker" src={img3} sx={{ width: 28, height: 28 }} />
            </AvatarGroup>
            <Typography variant="h6">52,589+</Typography>
            <Typography variant="h6" color="textSecondary">
              developers & agencies using our templates
            </Typography>
          </Stack>
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{
              fontSize: {
                lg: '36px',
                xs: '25px',
              },
              lineHeight: {
                lg: '43px',
                xs: '30px',
              },
            }}
          >
            Production Ready & Developer Friendly Material UI React Admin Template
          </Typography>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

export default DemoTitle;
