import React from 'react';
import Grid from '@mui/material/Grid2';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from 'src/components/apps/userprofile/profile/IntroCard';
import PhotosCard from 'src/components/apps/userprofile/profile/PhotosCard';
import Post from 'src/components/apps/userprofile/profile/Post';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'User Profile' }];

const Profile = () => (
  <PageContainer title="User Profile" description="User profile page">
    <Breadcrumb title="User Profile" items={BCrumb} />
    <Grid container spacing={3}>
      <Grid size={12}>
        <ProfileBanner />
      </Grid>
      <Grid size={{ lg: 4, md: 12 }}>
        <IntroCard />
        <PhotosCard />
      </Grid>
      <Grid size={{ lg: 8, md: 12 }}>
        {/* Posts Card */}
        <Post />
      </Grid>
    </Grid>
  </PageContainer>
);

export default Profile;
