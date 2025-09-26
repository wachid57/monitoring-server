import{j as r,o as l}from"./index-CJWZi9CB.js";import{B as d}from"./Breadcrumb-DR6zDa-i.js";import{P as m}from"./PageContainer-BR_WMDrZ.js";import{W as x}from"./WelcomeCard-D6AEFXMs.js";import{i as c}from"./login-bg-BYsMJv_b.js";import{P as a}from"./ParentCard-CuAAl3Vl.js";import{C as i}from"./CodeDialog-BDx_UOfm.js";import{C as h}from"./Card-BdzGKbvD.js";import{C as s}from"./CardContent-B4ITIunY.js";import{G as t}from"./Grid2-TKUllLdh.js";import{B as o}from"./Box-B21Vn3Wr.js";import{T as e}from"./Typography-DW8TAfFy.js";import{B as n}from"./Button-BH1WbAiu.js";import{s as g}from"./gold-7jBJE6dI.js";import{B as y}from"./Badge-DkbkFAPD.js";import{A as u}from"./Avatar-YolhUzp1.js";import{S as j}from"./Stack-C8hAk-Ua.js";import{M as C}from"./maintenance-CvprecK7.js";import{s as B}from"./empty-shopping-cart-BJtGGTRp.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardHeader-fWfUcCUC.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";import"./resolveProps-CxWqPvcr.js";import"./usePreviousProps-HKwr4lKR.js";import"./createStack-B05ZxkoV.js";const v=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Banner1 = () => {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.light,
        py: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: '30px' }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid size={{sm: 6}} display="flex" alignItems="center">
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              <Typography variant="h5">Track your every Transaction Easily</Typography>
              <Typography variant="subtitle1" color="textSecondary" my={2}>
                Track and record your every income and expence easily to control your balance
              </Typography>
              <Button variant="contained" color="secondary">
                Download
              </Button>
            </Box>
          </Grid>
          <Grid size={{sm: 4}}>
            <Box mb="-150px">
              <img src={"/images/backgrounds/track-bg.png"} alt={"trackBg"} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Banner1;
`})}),f=()=>r.jsx(a,{title:"Transection",codeModel:r.jsx(v,{}),children:r.jsx(h,{elevation:0,sx:{backgroundColor:p=>p.palette.secondary.light,py:0,overflow:"hidden",position:"relative"},children:r.jsx(s,{sx:{p:"30px"},children:r.jsxs(t,{container:!0,spacing:3,justifyContent:"space-between",children:[r.jsx(t,{size:{sm:6},display:"flex",alignItems:"center",children:r.jsxs(o,{sx:{textAlign:{xs:"center",sm:"left"}},children:[r.jsx(e,{variant:"h5",children:"Track your every Transaction Easily"}),r.jsx(e,{variant:"subtitle1",color:"textSecondary",my:2,children:"Track and record your every income and expence easily to control your balance"}),r.jsx(n,{variant:"contained",color:"secondary",children:"Download"})]})}),r.jsx(t,{size:{sm:4},children:r.jsx(o,{mb:"-90px",children:r.jsx("img",{src:c,alt:c})})})]})})})}),b=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import React from 'react';
import { CardContent, Typography, Button, Card, Box } from '@mui/material';

const Banner2 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Typography variant="subtitle1" textAlign="center" mb={2} textTransform="uppercase" color="textSecondary">
          Level Up
        </Typography>
        <Box textAlign="center">
          <Image src={"/images/backgrounds/gold.png"} width={150} height={150} alt="star" style={{ width: '150px'}} />

          <Typography variant="h5">You reach all Notifications</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>Congratulations,<br/> Tap to continue next task.</Typography>

          <Button color="primary" variant="contained" size="large">
            Yes, Got it!
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner2;
`})}),T=()=>r.jsx(a,{title:"Notification",codeModel:r.jsx(b,{}),children:r.jsxs(s,{sx:{p:"30px"},children:[r.jsx(e,{variant:"subtitle1",textAlign:"center",mb:2,textTransform:"uppercase",color:"textSecondary",children:"Level Up"}),r.jsxs(o,{textAlign:"center",children:[r.jsx("img",{src:g,alt:"star",width:150}),r.jsx(e,{variant:"h5",children:"You reach all Notifications"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Congratulations,",r.jsx("br",{})," Tap to continue next task."]}),r.jsx(n,{color:"primary",variant:"contained",size:"large",children:"Yes, Got it!"})]})]})}),w=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import React from 'react';
import { CardContent, Typography, Button, Avatar, Badge, Box, Stack, Card } from '@mui/material';

const Banner3 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Mutual Friend Revealed
        </Typography>
        <Box textAlign="center">
          <Badge badgeContent={1} color="error" overlap="circular">
            <Avatar src={"/images/profile/user-1.jpg"} alt="userBg" sx={{ width: 140, height: 140 }} />
          </Badge>

          <Typography variant="h5" mt={3}>
            Tommoie Henderson
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Accept the request and <br/> type a message
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button color="primary" variant="contained" size="large">
              Accept
            </Button>
            <Button color="error" variant="outlined" size="large">
              Remove
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner3;

`})}),z=()=>r.jsx(a,{title:"Friend Card",codeModel:r.jsx(w,{}),children:r.jsxs(s,{sx:{p:"30px"},children:[r.jsx(e,{variant:"h5",textAlign:"center",mb:3,children:"Mutual Friend Revealed"}),r.jsxs(o,{textAlign:"center",children:[r.jsx(y,{badgeContent:1,color:"error",overlap:"circular",children:r.jsx(u,{src:l,alt:"userBg",sx:{width:140,height:140}})}),r.jsx(e,{variant:"h5",mt:3,children:"Tommoie Henderson"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Accept the request and ",r.jsx("br",{})," type a message"]}),r.jsxs(j,{direction:"row",spacing:2,justifyContent:"center",children:[r.jsx(n,{color:"primary",variant:"contained",size:"large",children:"Accept"}),r.jsx(n,{color:"error",variant:"outlined",size:"large",children:"Remove"})]})]})]})}),A=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import React from 'react';
import { CardContent, Typography, Button, Card, Box } from '@mui/material';

const Banner4 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Box textAlign="center">
          <img src={"/images/backgrounds/maintenance2.svg"} width={200} height={200} alt="star" style={{ width: '200px' }} />

          <Typography variant="h5" mt={3}>Oops something went wrong!</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Trying again to bypasses these<br /> temporary error.
          </Typography>

          <Button color="error" variant="contained" size="large">
            Retry
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner4;
`})}),k=()=>r.jsx(a,{title:"Error",codeModel:r.jsx(A,{}),children:r.jsx(s,{sx:{p:"30px"},children:r.jsxs(o,{textAlign:"center",children:[r.jsx("img",{src:C,alt:"star",width:200}),r.jsx(e,{variant:"h5",mt:3,children:"Oops something went wrong!"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Trying again to bypasses these",r.jsx("br",{})," temporary error."]}),r.jsx(n,{color:"error",variant:"contained",size:"large",children:"Retry"})]})})}),S=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import React from 'react';
import { CardContent, Typography, Button, Box,  Card } from '@mui/material';

const Banner5 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Box textAlign="center">
          <img src={"/images/products/empty-shopping-cart.svg"} width={200} height={200} alt="star" style={{ width: '200px' }} />

          <Typography variant="h5" mt={3}>Oop, Your cart is empty!</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Get back to shopping and get<br /> rewards from it.
          </Typography>

          <Button color="primary" variant="contained" size="large">
            Go for shopping!
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner5;
`})}),G=()=>r.jsx(a,{title:"Empty Cart",codeModel:r.jsx(S,{}),children:r.jsx(s,{sx:{p:"30px"},children:r.jsxs(o,{textAlign:"center",children:[r.jsx("img",{src:B,alt:"star",width:200}),r.jsx(e,{variant:"h5",mt:3,children:"Oop, Your cart is empty!"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Get back to shopping and get",r.jsx("br",{})," rewards from it."]}),r.jsx(n,{color:"primary",variant:"contained",size:"large",children:"Go for shopping!"})]})})}),R=[{to:"/",title:"Home"},{title:"Banner"}],wr=()=>r.jsxs(m,{title:"Banner",description:"this is Banner page",children:[r.jsx(d,{title:"Banner",items:R}),r.jsxs(t,{container:!0,spacing:3,children:[r.jsx(t,{size:{xs:12,lg:8},children:r.jsxs(t,{container:!0,spacing:3,columns:{xs:12,sm:6},children:[r.jsx(t,{size:12,children:r.jsx(x,{})}),r.jsx(t,{size:12,children:r.jsx(f,{})}),r.jsx(t,{size:"grow",children:r.jsx(k,{})}),r.jsx(t,{size:"grow",children:r.jsx(G,{})})]})}),r.jsx(t,{size:{xs:12,lg:4},children:r.jsxs(t,{container:!0,spacing:3,columns:{xs:12},children:[r.jsx(t,{size:12,children:r.jsx(T,{})}),r.jsx(t,{size:12,children:r.jsx(z,{})})]})})]})]});export{wr as default};
