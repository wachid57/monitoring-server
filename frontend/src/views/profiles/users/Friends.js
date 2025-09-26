import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Friends from 'src/views/apps/user-profile/Friends';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Friends' }];
export default function FriendsView() {
  return (
    <PageContainer title="Friends" description="User friends">
      <Breadcrumb title="Friends" items={BCrumb} />
      <Friends />
    </PageContainer>
  );
}
