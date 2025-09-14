import React, { useEffect } from 'react';
import {
  CardContent,
  Typography,
  Button,
  CardMedia,
  IconButton,
  Stack,
  Skeleton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import BlankCard from '../../shared/BlankCard';
import ParentCard from '../../shared/ParentCard';

import GiftCardCode from './code/GiftCardCode';

import img1 from 'src/assets/images/products/s1.jpg';
import img2 from 'src/assets/images/products/s2.jpg';

import { IconGift } from '@tabler/icons';

const giftCard = [
  {
    title: 'Andrew Grant',
    avatar: img1,
  },
  {
    title: 'Leo Pratt',
    avatar: img2,
  },
];

const GiftCard = () => {
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParentCard title="Gift Card" codeModel={<GiftCardCode />}>
      <Grid container spacing={3}>
        {giftCard.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <BlankCard>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="h6" mb={1}>
                    {card.title}
                  </Typography>

                  <IconButton color="secondary">
                    <IconGift width={20} />
                  </IconButton>
                </Stack>
                {isLoading ? (
                  <Skeleton variant="square" animation="wave" width="100%" height={160}></Skeleton>
                ) : (
                  <CardMedia
                    component="img"
                    image={card.avatar}
                    sx={{ height: 160, borderRadius: 2 }}
                  />
                )}
                <Stack spacing={2} mt={3}>
                  <Button size="large" variant="contained" color="primary">
                    Gift to Friend ($50.00)
                  </Button>
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </ParentCard>
  );
};

export default GiftCard;
