import{j as r,o as a,p as n,q as l,s as h,t as x}from"./index-CJWZi9CB.js";import{B as p}from"./Breadcrumb-DR6zDa-i.js";import{P as g}from"./PageContainer-BR_WMDrZ.js";import{P as j}from"./ParentCard-CuAAl3Vl.js";import{C as e}from"./ChildCard-DQqe3qgH.js";import{T as s}from"./index.esm-CBP19pFL.js";import{C as c}from"./CodeDialog-BDx_UOfm.js";import{G as i}from"./Grid2-TKUllLdh.js";import{S as o}from"./Stack-C8hAk-Ua.js";import{A as t}from"./Avatar-YolhUzp1.js";import{A as d}from"./AvatarGroup-qlVMkkT6.js";import{B as m}from"./Badge-DkbkFAPD.js";import"./Typography-DW8TAfFy.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";import"./createStack-B05ZxkoV.js";import"./usePreviousProps-HKwr4lKR.js";const v=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, Stack } from '@mui/material';

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar alt="Remy Sharp" src={User1} />
    <Avatar alt="Travis Howard" src={User2} />
    <Avatar alt="Cindy Baker" src={User3} />
</Stack>
`})}),A=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, Stack } from '@mui/material';


<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
    <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
    <Avatar sx={{ bgcolor: 'error.main' }}>C</Avatar>
    <Avatar sx={{ bgcolor: 'warning.main' }}>D</Avatar>
    <Avatar sx={{ bgcolor: 'success.main' }}>E</Avatar>
</Stack>
`})}),u=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar sx={{ bgcolor: 'primary.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'error.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'warning.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'success.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
</Stack>`})}),y=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar sx={{ bgcolor: 'primary.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'primary.main' }} variant="square">
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'primary.main' }} variant="rounded">
        <IconMoodSmile width={24} />
    </Avatar>
</Stack>`})}),S=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, AvatarGroup, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';


<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src={User1} />
        <Avatar alt="Travis Howard" src={User2} />
        <Avatar alt="Cindy Baker" src={User3} />
    </AvatarGroup>
</Stack>`})}),w=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, AvatarGroup, Stack } from '@mui/material';


<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src={User1} />
        <Avatar alt="Travis Howard" sx={{ width: 56, height: 56 }} src={User2} />
        <Avatar alt="Cindy Baker" sx={{ width: 56, height: 56 }} src={User3} />
    </AvatarGroup>
</Stack>`})}),f=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, AvatarGroup, Stack } from '@mui/material';


<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup>
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <Avatar sx={{ width: 22, height: 22 }} alt="Remy Sharp" src={User4} />
            }
        >
            <Avatar alt="Travis Howard" src={User2} />
        </Badge>
    </AvatarGroup>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
    >
        <Avatar alt="Remy Sharp" src={User3} />
    </Badge>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="warning"
    >
        <Avatar alt="Remy Sharp" src={"User4"} />
    </Badge>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="error"
    >
        <Avatar alt="Remy Sharp" src={User5} />
    </Badge>
</Stack>`})}),C=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import React from "react";
import { Avatar, Stack } from '@mui/material';


<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar alt="Remy Sharp" src={User1} sx={{ width: 24, height: 24 }} />
    <Avatar alt="Remy Sharp" src={User2} sx={{ width: 32, height: 32 }} />
    <Avatar alt="Remy Sharp" src={User3} />
    <Avatar alt="Remy Sharp" src={User4} sx={{ width: 50, height: 50 }} />
    <Avatar alt="Remy Sharp" src={User5} sx={{ width: 60, height: 60 }} />
    <Avatar alt="Remy Sharp" src={User6} sx={{ width: 65, height: 65 }} />
</Stack>`})}),b=[{to:"/",title:"Home"},{title:"Avatar"}],pr=()=>r.jsxs(g,{title:"Avatar",description:"this is Avatar page",children:[r.jsx(p,{title:"Avatar",items:b}),r.jsx(j,{title:"Avatar",children:r.jsxs(i,{container:!0,spacing:3,children:[r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Image avatars",codeModel:r.jsx(v,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{alt:"Remy Sharp",src:a}),r.jsx(t,{alt:"Travis Howard",src:n}),r.jsx(t,{alt:"Cindy Baker",src:l})]})})}),r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Letter avatars",codeModel:r.jsx(A,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{sx:{bgcolor:"primary.main"},children:"A"}),r.jsx(t,{sx:{bgcolor:"secondary.main"},children:"B"}),r.jsx(t,{sx:{bgcolor:"error.main"},children:"C"}),r.jsx(t,{sx:{bgcolor:"warning.main"},children:"D"}),r.jsx(t,{sx:{bgcolor:"success.main"},children:"E"})]})})}),r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Icon avatars",codeModel:r.jsx(u,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{sx:{bgcolor:"primary.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"secondary.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"error.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"warning.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"success.main"},children:r.jsx(s,{width:24})})]})})}),r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Variant",codeModel:r.jsx(y,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{sx:{bgcolor:"primary.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"primary.main"},variant:"square",children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"primary.main"},variant:"rounded",children:r.jsx(s,{width:24})})]})})}),r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Grouped",codeModel:r.jsx(S,{}),children:r.jsx(o,{direction:"row",spacing:1,justifyContent:"center",children:r.jsxs(d,{max:4,children:[r.jsx(t,{alt:"Remy Sharp",src:a}),r.jsx(t,{alt:"Travis Howard",src:n}),r.jsx(t,{alt:"Cindy Baker",src:l})]})})})}),r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Grouped Size",codeModel:r.jsx(w,{}),children:r.jsx(o,{direction:"row",spacing:1,justifyContent:"center",children:r.jsxs(d,{max:4,children:[r.jsx(t,{alt:"Remy Sharp",sx:{width:56,height:56},src:a}),r.jsx(t,{alt:"Travis Howard",sx:{width:56,height:56},src:n}),r.jsx(t,{alt:"Cindy Baker",sx:{width:56,height:56},src:l})]})})})}),r.jsx(i,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"With Badge",codeModel:r.jsx(f,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(d,{children:r.jsx(m,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:r.jsx(t,{sx:{width:22,height:22},alt:"Remy Sharp",src:a}),children:r.jsx(t,{alt:"Travis Howard",src:n})})}),r.jsx(m,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",color:"success",children:r.jsx(t,{alt:"Remy Sharp",src:l})}),r.jsx(m,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",color:"warning",children:r.jsx(t,{alt:"Remy Sharp",src:h})}),r.jsx(m,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",color:"error",children:r.jsx(t,{alt:"Remy Sharp",src:x})})]})})}),r.jsx(i,{size:{xs:12,lg:8,sm:6},display:"flex",alignItems:"stretch",children:r.jsx(e,{title:"Sizes",codeModel:r.jsx(C,{}),children:r.jsxs(o,{direction:{xs:"column",sm:"row"},spacing:1,justifyContent:"center",children:[r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:24,height:24}}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:32,height:32}}),r.jsx(t,{alt:"Remy Sharp",src:a}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:50,height:50}}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:60,height:60}}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:65,height:65}})]})})})]})})]});export{pr as default};
