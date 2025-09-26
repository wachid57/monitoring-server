import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Followers from 'src/views/apps/user-profile/Followers';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Followers' }];
export default function FollowersView() {
  return (
    <PageContainer title="Followers" description="User followers">
      <Breadcrumb title="Followers" items={BCrumb} />
      <Followers />
    </PageContainer>
  );
}
