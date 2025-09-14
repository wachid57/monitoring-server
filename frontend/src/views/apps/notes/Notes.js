import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import NoteSidebar from '../../../components/apps/notes/NoteSidebar';
import NoteContent from '../../../components/apps/notes/NoteContent';
import AppCard from 'src/components/shared/AppCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Notes',
  },
];

const Notes = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));


  return (
    <PageContainer title="Note App" description="this is Note App">
      <Breadcrumb title="Note app" items={BCrumb} />
      <AppCard>
        {lgDown ?
          <NoteSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          : <NoteSidebar
            isMobileSidebarOpen={true}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />}

        <Box flexGrow={1}>
          <NoteContent toggleNoteSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Notes;
