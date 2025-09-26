import{r as f,j as t}from"./index-CJWZi9CB.js";import{I as O}from"./InlineItemCard-CDwCPQ6B.js";import{B as Q}from"./Breadcrumb-DR6zDa-i.js";import{P as U}from"./PageContainer-BR_WMDrZ.js";import{P as Y}from"./ParentCard-CuAAl3Vl.js";import{C as d}from"./ChildCard-DQqe3qgH.js";import{C as m}from"./CodeDialog-BDx_UOfm.js";import{z as w,X as S}from"./index.esm-CBP19pFL.js";import{d as _,s as R}from"./Typography-DW8TAfFy.js";import{T as o,t as F}from"./Tooltip-BXh8ffn_.js";import{G as s}from"./Grid2-TKUllLdh.js";import{S as j}from"./Stack-C8hAk-Ua.js";import{I}from"./IconButton-Cf6Oa_Gi.js";import{B as i}from"./Button-BH1WbAiu.js";import{F as P}from"./Fab-r5d2esbg.js";import{B as tt}from"./Box-B21Vn3Wr.js";import{F as ot}from"./Modal-BmV9fUd8.js";import{u as it}from"./Paper-Dk0UhltF.js";import{T as et,r as rt,g as b}from"./utils-C-EoFTAL.js";import{g as nt}from"./getReactNodeRef-CxaND9dZ.js";import"./index-BwqtTtay.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./DialogContent-iZlfiihu.js";import"./useId-5Do1p0JB.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./Popper-DtoIJ5hI.js";import"./Portal-BXG2mGLy.js";import"./useControlled-Cuh16IWT.js";import"./Grow-rhCcvyQJ.js";import"./composeClasses-CkcSq-l_.js";import"./createStack-B05ZxkoV.js";import"./resolveProps-CxWqPvcr.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";const lt={entering:{transform:"none"},entered:{transform:"none"}},st=f.forwardRef(function(a,W){const n=it(),A={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:B,appear:L=!0,children:h,easing:v,in:y,onEnter:E,onEntered:k,onEntering:N,onExit:C,onExited:M,onExiting:D,style:x,timeout:T=A,TransitionComponent:z=et,...Z}=a,u=f.useRef(null),q=_(u,nt(h),W),l=e=>r=>{if(e){const c=u.current;r===void 0?e(c):e(c,r)}},G=l(N),V=l((e,r)=>{rt(e);const c=b({style:x,timeout:T,easing:v},{mode:"enter"});e.style.webkitTransition=n.transitions.create("transform",c),e.style.transition=n.transitions.create("transform",c),E&&E(e,r)}),X=l(k),$=l(D),H=l(e=>{const r=b({style:x,timeout:T,easing:v},{mode:"exit"});e.style.webkitTransition=n.transitions.create("transform",r),e.style.transition=n.transitions.create("transform",r),C&&C(e)}),K=l(M),J=e=>{B&&B(u.current,e)};return t.jsx(z,{appear:L,in:y,nodeRef:u,onEnter:V,onEntered:X,onEntering:G,onExit:H,onExited:K,onExiting:$,addEndListener:J,timeout:T,...Z,children:(e,r)=>f.cloneElement(h,{style:{transform:"scale(0)",visibility:e==="exited"&&!y?"hidden":void 0,...lt[e],...x,...h.props.style},ref:q,...r})})}),at=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import React from "react";
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { IconPlus, IconTrash } from '@tabler/icons';

<Stack direction="row" spacing={2} alignItems="center">
    <Tooltip title="Delete">
        <IconButton>
            <IconTrash width={20} height={20} />
        </IconButton>
    </Tooltip>
    <Tooltip title="Add">
        <Button variant="outlined" color="primary">
            Button
        </Button>
    </Tooltip>
    <Tooltip title="Delete">
        <IconButton color="error">
            <IconTrash width={20} height={20} />
        </IconButton>
    </Tooltip>
    <Tooltip title="Add">
        <Fab color="secondary">
            <IconPlus width={20} height={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),ct=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import React from "react";
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { IconPlus } from '@tabler/icons';

<Box textAlign="center">
    <Tooltip title="Delete" arrow>
        <Fab color="secondary">
            <IconPlus width={20} height={20} />
        </Fab>
    </Tooltip>
</Box>
`})}),dt=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import React from "react";
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  ['& .{tooltipClasses.tooltip}']: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  ['& .{tooltipClasses.tooltip}']: {
    maxWidth: 'none',
  },
});

const longText = '
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
';

import { IconPlus, IconTrash } from '@tabler/icons';

<Stack spacing={1} direction="row">
    <Tooltip title={longText}>
        <Button variant="outlined">Default Width [300px]</Button>
    </Tooltip>
    <CustomWidthTooltip title={longText}>
        <Button color="secondary" variant="outlined">Custom Width [500px]</Button>
    </CustomWidthTooltip>
    <NoMaxWidthTooltip title={longText}>
        <Button color="warning" variant="outlined">No wrapping</Button>
    </NoMaxWidthTooltip>
</Stack>`})}),mt=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import React from "react";
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

<Stack spacing={1} direction="row">
    <Tooltip title="Add">
        <Button variant="outlined" color="primary">Grow</Button>
    </Tooltip>
    <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Add"
    >
        <Button variant="outlined" color="secondary">Fade</Button>
    </Tooltip>
    <Tooltip TransitionComponent={Zoom} title="Add">
        <Button variant="outlined" color="warning">Zoom</Button>
    </Tooltip>
</Stack>`})}),pt=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import React from "react";
import { styled } from '@mui/material/styles';
import { Button, Card } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

<Card>
    <Tooltip title="Top Start" placement="top-start">
        <Button variant="outlined" color="primary">Top Start</Button>
    </Tooltip>
    <Tooltip title="Top" placement="top">
        <Button variant="outlined" color="secondary">Top</Button>
    </Tooltip>
    <Tooltip title="Top End" placement="top-end">
        <Button variant="outlined" color="warning">Top End</Button>
    </Tooltip>
    <Tooltip title="Left Start" placement="left-start">
        <Button variant="outlined" color="success">Left Start</Button>
    </Tooltip>
    <Tooltip title="Left" placement="left">
        <Button variant="outlined" color="error">Left</Button>
    </Tooltip>
    <Tooltip title="Left End" placement="left-end">
        <Button variant="outlined" color="primary">Left End</Button>
    </Tooltip>
    <Tooltip title="Right Start" placement="right-start">
        <Button variant="outlined" color="secondary">Right Start</Button>
    </Tooltip>
    <Tooltip title="Right" placement="right">
        <Button variant="outlined" color="warning">Right</Button>
    </Tooltip>
    <Tooltip title="Right End" placement="right-end">
        <Button variant="outlined" color="success">Right End</Button>
    </Tooltip>
    <Tooltip title="Bottom Start" placement="bottom-start">
        <Button variant="outlined" color="error">Bottom Start</Button>
    </Tooltip>
    <Tooltip title="Bottom" placement="bottom">
        <Button variant="outlined" color="primary">Bottom</Button>
    </Tooltip>
    <Tooltip title="Bottom End" placement="bottom-end">
        <Button variant="outlined" color="secondary">Bottom End</Button>
    </Tooltip>
</Card>`})}),ut=[{to:"/",title:"Home"},{title:"Tooltip"}],ht=R(({className:p,...a})=>t.jsx(o,{...a,classes:{popper:p}}))({[`& .${F.tooltip}`]:{maxWidth:500}}),xt=R(({className:p,...a})=>t.jsx(o,{...a,classes:{popper:p}}))({[`& .${F.tooltip}`]:{maxWidth:"none"}}),g=`
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`,ro=()=>t.jsxs(U,{title:"Tooltip",description:"this is Tooltip page",children:[t.jsx(Q,{title:"Tooltip",items:ut}),t.jsx(Y,{title:"Tooltip",children:t.jsxs(s,{container:!0,spacing:3,children:[t.jsx(s,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(d,{title:"Simple",codeModel:t.jsx(at,{}),children:t.jsxs(j,{direction:{xs:"column",sm:"row"},spacing:2,alignItems:"center",children:[t.jsx(o,{title:"Delete",children:t.jsx(I,{children:t.jsx(w,{width:20,height:20})})}),t.jsx(o,{title:"Add",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Button"})}),t.jsx(o,{title:"Delete",children:t.jsx(I,{color:"error",children:t.jsx(w,{width:20,height:20})})}),t.jsx(o,{title:"Add",children:t.jsx(P,{color:"secondary",children:t.jsx(S,{width:20,height:20})})})]})})}),t.jsx(s,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(d,{title:"Arrow",codeModel:t.jsx(ct,{}),children:t.jsx(tt,{textAlign:"center",children:t.jsx(o,{title:"Delete",arrow:!0,children:t.jsx(P,{color:"secondary",children:t.jsx(S,{width:20,height:20})})})})})}),t.jsx(s,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(d,{title:"Variable Width",codeModel:t.jsx(dt,{}),children:t.jsxs(j,{spacing:1,direction:{xs:"column",sm:"row"},children:[t.jsx(o,{title:g,children:t.jsx(i,{variant:"outlined",children:"Default Width [300px]"})}),t.jsx(ht,{title:g,children:t.jsx(i,{color:"secondary",variant:"outlined",children:"Custom Width [500px]"})}),t.jsx(xt,{title:g,children:t.jsx(i,{color:"warning",variant:"outlined",children:"No wrapping"})})]})})}),t.jsx(s,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(d,{title:"Transitions",codeModel:t.jsx(mt,{}),children:t.jsxs(j,{spacing:1,direction:"row",children:[t.jsx(o,{title:"Add",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Grow"})}),t.jsx(o,{TransitionComponent:ot,TransitionProps:{timeout:600},title:"Add",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Fade"})}),t.jsx(o,{TransitionComponent:st,title:"Add",children:t.jsx(i,{variant:"outlined",color:"warning",children:"Zoom"})})]})})}),t.jsx(s,{size:12,display:"flex",alignItems:"stretch",children:t.jsx(d,{title:"Positions",codeModel:t.jsx(pt,{}),children:t.jsxs(O,{children:[t.jsx(o,{title:"Top Start",placement:"top-start",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Top Start"})}),t.jsx(o,{title:"Top",placement:"top",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Top"})}),t.jsx(o,{title:"Top End",placement:"top-end",children:t.jsx(i,{variant:"outlined",color:"warning",children:"Top End"})}),t.jsx(o,{title:"Left Start",placement:"left-start",children:t.jsx(i,{variant:"outlined",color:"success",children:"Left Start"})}),t.jsx(o,{title:"Left",placement:"left",children:t.jsx(i,{variant:"outlined",color:"error",children:"Left"})}),t.jsx(o,{title:"Left End",placement:"left-end",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Left End"})}),t.jsx(o,{title:"Right Start",placement:"right-start",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Right Start"})}),t.jsx(o,{title:"Right",placement:"right",children:t.jsx(i,{variant:"outlined",color:"warning",children:"Right"})}),t.jsx(o,{title:"Right End",placement:"right-end",children:t.jsx(i,{variant:"outlined",color:"success",children:"Right End"})}),t.jsx(o,{title:"Bottom Start",placement:"bottom-start",children:t.jsx(i,{variant:"outlined",color:"error",children:"Bottom Start"})}),t.jsx(o,{title:"Bottom",placement:"bottom",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Bottom"})}),t.jsx(o,{title:"Bottom End",placement:"bottom-end",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Bottom End"})})]})})})]})})]});export{ro as default};
