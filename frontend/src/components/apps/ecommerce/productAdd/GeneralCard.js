import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import TiptapEdit from 'src/views/forms/from-tiptap/TiptapEdit';

const GeneralCard = () => {
  return (
    <Box p={3}>
      <Typography variant="h5">General</Typography>

      <Grid container mt={3}>
        {/* 1 */}
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            Product Name{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="p_name" placeholder="Product Name" fullWidth />
          <Typography variant="body2">
            A product name is required and recommended to be unique.
          </Typography>
        </Grid>

        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="desc">Description</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <TiptapEdit />
          <Typography variant="body2">
            Set a description to the product for better visibility.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralCard;
