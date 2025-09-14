import React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// components
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BasicLayout from '../../components/forms/form-horizontal/BasicLayout';
import BasicIcons from '../../components/forms/form-horizontal/BasicIcons';
import FormSeparator from '../../components/forms/form-horizontal/FormSeparator';
import FormLabelAlignment from '../../components/forms/form-horizontal/FormLabelAlignment';
import CollapsibleForm from '../../components/forms/form-horizontal/CollapsibleForm';
import FormTabs from '../../components/forms/form-horizontal/FormTabs';

import BasicLayoutCode from '../../components/forms/form-horizontal/code/BasicIconsCode';
import BasicIconsCode from '../../components/forms/form-horizontal/code/BasicIconsCode';
import FormSeparatorCode from '../../components/forms/form-horizontal/code/FormSeparatorCode';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Horizontal Form',
  },
];

const FormHorizontal = () => {
  return (
    <PageContainer title="Horizontal Form" description="this is Horizontal Form page">
      {/* breadcrumb */}
      <Breadcrumb title="Horizontal Form" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid size={12}>
          <ParentCard title="Basic Layout" codeModel={<BasicLayoutCode />}>
            <BasicLayout />
          </ParentCard>
        </Grid>
        <Grid size={12}>
          <ParentCard title="Basic with Icons" codeModel={<BasicIconsCode />}>
            <BasicIcons />
          </ParentCard>
        </Grid>
        <Grid size={12}>
          <ParentCard title="Form Separator" codeModel={<FormSeparatorCode />}>
            <FormSeparator />
          </ParentCard>
        </Grid>
        <Grid size={12}>
          <ParentCard title="Form Label Alignment">
            <FormLabelAlignment />
          </ParentCard>
        </Grid>
        <Grid size={12}>
          <Typography variant="h5" mb={3}>
            Collapsible Section
          </Typography>
          <CollapsibleForm />
        </Grid>
        <Grid size={12}>
          <Typography variant="h5" mb={3}>
            Form with Tabs
          </Typography>
          <FormTabs />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FormHorizontal;
