import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Gallery from 'src/views/apps/user-profile/Gallery';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Gallery' }];
export default function GalleryView() {
  return (
    <PageContainer title="Gallery" description="User gallery">
      <Breadcrumb title="Gallery" items={BCrumb} />
      <Gallery />
    </PageContainer>
  );
}
