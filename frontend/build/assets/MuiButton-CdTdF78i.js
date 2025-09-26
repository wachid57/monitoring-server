import{r as A,c as H,j as t}from"./index-CJWZi9CB.js";import{B as K}from"./Breadcrumb-DR6zDa-i.js";import{P as Z}from"./PageContainer-BR_WMDrZ.js";import{P as D}from"./ParentCard-CuAAl3Vl.js";import{C as l}from"./ChildCard-DQqe3qgH.js";import{S as a}from"./Stack-C8hAk-Ua.js";import{B as o,a as _}from"./Button-BH1WbAiu.js";import{z as C,a4 as m,am as u,X as q,aZ as J,aS as B,aT as g,aU as b,a_ as w,a$ as y,b0 as I}from"./index.esm-CBP19pFL.js";import{g as Q,h as Y,s as G,m as W,j as v}from"./Typography-DW8TAfFy.js";import{r as tt}from"./resolveProps-CxWqPvcr.js";import{u as ot}from"./useId-5Do1p0JB.js";import{c as nt}from"./composeClasses-O3bfDh63.js";import{C as rt}from"./CircularProgress-DjzG6_YG.js";import{T as c}from"./Tooltip-BXh8ffn_.js";import{I as p}from"./IconButton-Cf6Oa_Gi.js";import{F as x}from"./Fab-r5d2esbg.js";import{B as e}from"./ButtonGroup-BKaZuEoO.js";import{C as s}from"./CodeDialog-BDx_UOfm.js";import{G as i}from"./Grid2-TKUllLdh.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./createStack-B05ZxkoV.js";import"./composeClasses-CkcSq-l_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./Grow-rhCcvyQJ.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";function it(r){return Y("MuiLoadingButton",r)}const h=Q("MuiLoadingButton",["root","label","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),et=r=>{const{loading:n,loadingPosition:d,classes:f}=r,k={root:["root",n&&"loading"],label:["label"],startIcon:[n&&`startIconLoading${v(d)}`],endIcon:[n&&`endIconLoading${v(d)}`],loadingIndicator:["loadingIndicator",n&&`loadingIndicator${v(d)}`]},S=nt(k,it,f);return{...f,...S}},at=r=>r!=="ownerState"&&r!=="theme"&&r!=="sx"&&r!=="as"&&r!=="classes",lt=G(o,{shouldForwardProp:r=>at(r)||r==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(r,n)=>[n.root,n.startIconLoadingStart&&{[`& .${h.startIconLoadingStart}`]:n.startIconLoadingStart},n.endIconLoadingEnd&&{[`& .${h.endIconLoadingEnd}`]:n.endIconLoadingEnd}]})(W(({theme:r})=>({display:"inline-flex",[`& .${h.startIconLoadingStart}, & .${h.endIconLoadingEnd}`]:{transition:r.transitions.create(["opacity"],{duration:r.transitions.duration.short}),opacity:0},variants:[{props:{loadingPosition:"center"},style:{transition:r.transitions.create(["background-color","box-shadow","border-color"],{duration:r.transitions.duration.short}),[`&.${h.loading}`]:{color:"transparent"}}},{props:({ownerState:n})=>n.loadingPosition==="start"&&n.fullWidth,style:{[`& .${h.startIconLoadingStart}, & .${h.endIconLoadingEnd}`]:{transition:r.transitions.create(["opacity"],{duration:r.transitions.duration.short}),opacity:0,marginRight:-8}}},{props:({ownerState:n})=>n.loadingPosition==="end"&&n.fullWidth,style:{[`& .${h.startIconLoadingStart}, & .${h.endIconLoadingEnd}`]:{transition:r.transitions.create(["opacity"],{duration:r.transitions.duration.short}),opacity:0,marginLeft:-8}}}]}))),st=G("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(r,n)=>{const{ownerState:d}=r;return[n.loadingIndicator,n[`loadingIndicator${v(d.loadingPosition)}`]]}})(W(({theme:r})=>({position:"absolute",visibility:"visible",display:"flex",variants:[{props:{loadingPosition:"start",size:"small"},style:{left:10}},{props:({loadingPosition:n,ownerState:d})=>n==="start"&&d.size!=="small",style:{left:14}},{props:{variant:"text",loadingPosition:"start"},style:{left:6}},{props:{loadingPosition:"center"},style:{left:"50%",transform:"translate(-50%)",color:(r.vars||r).palette.action.disabled}},{props:{loadingPosition:"end",size:"small"},style:{right:10}},{props:({loadingPosition:n,ownerState:d})=>n==="end"&&d.size!=="small",style:{right:14}},{props:{variant:"text",loadingPosition:"end"},style:{right:6}},{props:({ownerState:n})=>n.loadingPosition==="start"&&n.fullWidth,style:{position:"relative",left:-10}},{props:({ownerState:n})=>n.loadingPosition==="end"&&n.fullWidth,style:{position:"relative",right:-10}}]}))),E=G("span",{name:"MuiLoadingButton",slot:"Label",overridesResolver:(r,n)=>[n.label]})({display:"inherit",alignItems:"inherit",justifyContent:"inherit"}),$=A.forwardRef(function(n,d){const f=A.useContext(_),k=tt(f,n),S=H({props:k,name:"MuiLoadingButton"}),{children:L,disabled:F=!1,id:U,loading:z=!1,loadingIndicator:N,loadingPosition:V="center",variant:P="text",...X}=S,O=ot(U),R=N??t.jsx(rt,{"aria-labelledby":O,color:"inherit",size:16}),j={...S,disabled:F,loading:z,loadingIndicator:R,loadingPosition:V,variant:P},T=et(j),M=z?t.jsx(st,{className:T.loadingIndicator,ownerState:j,children:R}):null;return t.jsxs(lt,{disabled:F||z,id:O,ref:d,...X,variant:P,classes:T,ownerState:j,children:[j.loadingPosition==="end"?t.jsx(E,{className:T.label,children:L}):M,j.loadingPosition==="end"?M:t.jsx(E,{className:T.label,children:L})]})}),ct=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"contained",color:"primary",children:"Primary"}),t.jsx(o,{variant:"contained",color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",variant:"contained",color:"primary",children:"Link"})]}),dt=()=>t.jsxs(a,{gap:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"contained",color:"primary",children:"Primary"}),t.jsx(o,{variant:"contained",color:"secondary",children:"Secondary"}),t.jsx(o,{variant:"contained",color:"error",children:"Error"}),t.jsx(o,{variant:"contained",color:"warning",children:"Warning"}),t.jsx(o,{variant:"contained",color:"success",children:"Success"})]}),ut=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx($,{loading:!0,loadingIndicator:"Loading…",variant:"contained",color:"error",startIcon:t.jsx(C,{width:18}),children:"Left Icon"}),t.jsx($,{loading:!0,variant:"contained",color:"secondary",endIcon:t.jsx(C,{width:18}),children:"Right Icon"})]}),xt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},alignItems:"center",justifyContent:"center",children:[t.jsx(o,{variant:"contained",size:"small",children:"Small"}),t.jsx(o,{variant:"contained",size:"medium",children:"Medium"}),t.jsx(o,{variant:"contained",size:"large",children:"Large"})]}),ht=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"outlined",color:"primary",children:"Primary"}),t.jsx(o,{variant:"outlined",color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",variant:"outlined",color:"primary",children:"Link"})]}),mt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"outlined",color:"error",startIcon:t.jsx(C,{width:18}),children:"Left Icon"}),t.jsx(o,{variant:"outlined",color:"secondary",endIcon:t.jsx(m,{width:18}),children:"Right Icon"})]}),pt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},alignItems:"center",justifyContent:"center",children:[t.jsx(o,{variant:"outlined",size:"small",children:"Small"}),t.jsx(o,{variant:"outlined",size:"medium",children:"Medium"}),t.jsx(o,{variant:"outlined",size:"large",children:"Large"})]}),jt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{color:"primary",children:"Primary"}),t.jsx(o,{color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",color:"primary",children:"Link"})]}),Bt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{color:"primary",children:"Primary"}),t.jsx(o,{color:"secondary",children:"Secondary"}),t.jsx(o,{color:"error",children:"Error"}),t.jsx(o,{color:"warning",children:"Warning"}),t.jsx(o,{color:"success",children:"Success"})]}),gt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(o,{color:"error",startIcon:t.jsx(C,{width:18}),children:"Left Icon"}),t.jsx(o,{color:"secondary",endIcon:t.jsx(m,{width:18}),children:"Right Icon"})]}),bt=()=>t.jsxs(a,{spacing:1,direction:"row",alignItems:"center",justifyContent:"center",children:[t.jsx(o,{size:"small",children:"Small"}),t.jsx(o,{size:"medium",children:"Medium"}),t.jsx(o,{size:"large",children:"Large"})]}),wt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained",color:"primary","aria-label":"primary-bell",children:t.jsx(u,{width:18})})}),t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained",color:"secondary","aria-label":"secondary-bell",children:t.jsx(u,{width:18})})}),t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained",color:"error","aria-label":"error-bell",children:t.jsx(u,{width:18})})}),t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained",color:"warning","aria-label":"warning-bell",children:t.jsx(u,{width:18})})}),t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained",color:"success","aria-label":"success-bell",children:t.jsx(u,{width:18})})})]}),yt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained","aria-label":"small-bell",children:t.jsx(u,{width:16})})}),t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained",size:"medium","aria-label":"medium-bell",children:t.jsx(u,{width:19})})}),t.jsx(c,{title:"Bell",children:t.jsx(p,{variant:"contained","aria-label":"large-bell",children:t.jsx(u,{width:21})})})]}),It=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(c,{title:"Send",children:t.jsx(x,{color:"primary","aria-label":"send",children:t.jsx(m,{width:20})})}),t.jsx(c,{title:"Add",children:t.jsx(x,{color:"secondary","aria-label":"plus",children:t.jsx(q,{width:20})})}),t.jsx(x,{disabled:!0,"aria-label":"clipboard",children:t.jsx(J,{width:20})})]}),ft=()=>t.jsx(t.Fragment,{children:t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",alignItems:"center",children:[t.jsx(c,{title:"Send",children:t.jsx(x,{color:"primary","aria-label":"send",children:t.jsx(m,{width:20})})}),t.jsx(c,{title:"Send",children:t.jsx(x,{color:"secondary","aria-label":"send",children:t.jsx(m,{width:20})})}),t.jsx(c,{title:"Send",children:t.jsx(x,{color:"warning","aria-label":"send",children:t.jsx(m,{width:20})})}),t.jsx(c,{title:"Send",children:t.jsx(x,{color:"error","aria-label":"send",children:t.jsx(m,{width:20})})}),t.jsx(c,{title:"Send",children:t.jsx(x,{color:"success","aria-label":"send",children:t.jsx(m,{width:20})})})]})}),St=()=>t.jsx(t.Fragment,{children:t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(c,{title:"Bell",children:t.jsx(x,{size:"small",color:"primary","aria-label":"small-bell",children:t.jsx(u,{width:16})})}),t.jsx(c,{title:"Bell",children:t.jsx(x,{size:"medium",color:"secondary","aria-label":"medium-bell",children:t.jsx(u,{width:18})})}),t.jsx(c,{title:"Bell",children:t.jsx(x,{size:"large",color:"warning","aria-label":"large-bell",children:t.jsx(u,{width:20})})})]})}),Tt=()=>t.jsxs(a,{spacing:1,children:[t.jsxs(e,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{variant:"contained",elevation:0,"aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),vt=()=>t.jsxs(a,{spacing:1,justifyContent:"center",children:[t.jsxs(e,{size:"small",variant:"outlined","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{size:"large",variant:"outlined","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Ct=()=>t.jsxs(a,{spacing:1,direction:"row",children:[t.jsxs(e,{orientation:"vertical",variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{orientation:"vertical",variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{orientation:"vertical",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),kt=()=>t.jsxs(a,{spacing:2,direction:{xs:"column",sm:"row",lg:"column"},justifyContent:"center",children:[t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(e,{variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{variant:"contained",color:"secondary","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{variant:"contained",color:"error","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{color:"success",variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(e,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(B,{width:18})}),t.jsx(o,{children:t.jsx(g,{width:18})}),t.jsx(o,{children:t.jsx(b,{width:18})})]}),t.jsxs(e,{variant:"outlined",color:"secondary","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(B,{width:18})}),t.jsx(o,{children:t.jsx(g,{width:18})}),t.jsx(o,{children:t.jsx(b,{width:18})})]}),t.jsxs(e,{variant:"outlined",color:"warning","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(B,{width:18})}),t.jsx(o,{children:t.jsx(g,{width:18})}),t.jsx(o,{children:t.jsx(b,{width:18})})]}),t.jsxs(e,{variant:"outlined",color:"error","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(B,{width:18})}),t.jsx(o,{children:t.jsx(g,{width:18})}),t.jsx(o,{children:t.jsx(b,{width:18})})]}),t.jsxs(e,{variant:"outlined",color:"success","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(B,{width:18})}),t.jsx(o,{children:t.jsx(g,{width:18})}),t.jsx(o,{children:t.jsx(b,{width:18})})]})]}),t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(e,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(w,{width:18})}),t.jsx(o,{children:t.jsx(y,{width:18})}),t.jsx(o,{children:t.jsx(I,{width:18})})]}),t.jsxs(e,{color:"secondary",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(w,{width:18})}),t.jsx(o,{children:t.jsx(y,{width:18})}),t.jsx(o,{children:t.jsx(I,{width:18})})]}),t.jsxs(e,{color:"warning",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(w,{width:18})}),t.jsx(o,{children:t.jsx(y,{width:18})}),t.jsx(o,{children:t.jsx(I,{width:18})})]}),t.jsxs(e,{color:"error",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(w,{width:18})}),t.jsx(o,{children:t.jsx(y,{width:18})}),t.jsx(o,{children:t.jsx(I,{width:18})})]}),t.jsxs(e,{color:"success",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(w,{width:18})}),t.jsx(o,{children:t.jsx(y,{width:18})}),t.jsx(o,{children:t.jsx(I,{width:18})})]})]})]}),zt=()=>t.jsxs(a,{spacing:1,direction:"column",justifyContent:"center",children:[t.jsxs(e,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{color:"secondary",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(e,{color:"error",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Gt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import {  Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="contained" color="primary">
      Primary
    </Button>
    <Button variant="contained" color="secondary">
      Secondary
    </Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" variant="contained" color="primary">
      Link
    </Button>
</Stack>`})}),Lt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import {  Button, Stack } from '@mui/material';

<Stack gap={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="contained" color="primary">
        Primary
    </Button>
    <Button variant="contained" color="secondary">
        Secondary
    </Button>
    <Button variant="contained" color="error">
        Error
    </Button>
    <Button variant="contained" color="warning">
        Warning
    </Button>
    <Button variant="contained" color="success">
        Success
    </Button>
</Stack>`})}),Ft=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Stack } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import LoadingButton from '@mui/lab/LoadingButton';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <LoadingButton loading loadingIndicator="Loading…"
      variant="contained"
      color="error"
      startIcon={<IconTrash width={18} />}
    >
      Left Icon
    </LoadingButton >
    <LoadingButton loading
      variant="contained"
      color="secondary"
      endIcon={<IconTrash width={18} />}
    >
      Right Icon
    </LoadingButton >
</Stack>`})}),Pt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="contained" size="small">
      Small
    </Button>
    <Button variant="contained" size="medium">
      Medium
    </Button>
    <Button variant="contained" size="large">
      Large
    </Button>
</Stack>`})}),Ot=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="error">
      Error
    </Button>
    <Button variant="outlined" color="warning">
      Warning
    </Button>
    <Button variant="outlined" color="success">
      Success
    </Button>
</Stack>`})}),Rt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button
        variant="outlined"
        color="error"
        startIcon={<IconTrash width={18} />}
    >
        Left Icon
    </Button>
    <Button
        variant="outlined"
        color="secondary"
        endIcon={<IconSend width={18} />}
    >
        Right Icon
    </Button>
</Stack>`})}),Mt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="outlined" size="small">
      Small
    </Button>
    <Button variant="outlined" size="medium">
      Medium
    </Button>
    <Button variant="outlined" size="large">
      Large
    </Button>
</Stack>`})}),At=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" color="primary">
      Link
    </Button>
</Stack>`})}),Dt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="error">Error</Button>
    <Button color="warning">Warning</Button>
    <Button color="success">Success</Button>
</Stack>`})}),Et=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Button color="error" startIcon={<IconTrash width={18} />}>
      Left Icon
    </Button>
    <Button color="secondary" endIcon={<IconSend width={18} />}>
      Right Icon
    </Button>
</Stack>`})}),$t=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
</Stack>`})}),Wt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton color="primary" aria-label="primary-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="secondary" aria-label="secondary-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="error" aria-label="error-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="warning" aria-label="warning-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="success" aria-label="success-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
</Stack>`})}),Ut=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton aria-label="small-bell">
        <IconBell width={16} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton size="medium" aria-label="medium-bell">
        <IconBell width={19} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton aria-label="large-bell">
        <IconBell width={21} />
      </IconButton>
    </Tooltip>
</Stack>`})}),Nt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconClipboard, IconPlus, IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Send">
      <Fab color="primary" aria-label="send">
        <IconSend width={20} />
      </Fab>
    </Tooltip>
    <Tooltip title="Add">
      <Fab color="secondary" aria-label="plus">
        <IconPlus width={20} />
      </Fab>
    </Tooltip>
    <Fab disabled aria-label="clipboard">
      <IconClipboard width={20} />
    </Fab>
</Stack>`})}),Vt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconSend } from '@tabler/icons';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
    <Tooltip title="Send">
        <Fab color="primary" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="secondary" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="warning" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="error" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="success" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),Xt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
        <Fab size="small" color="primary" aria-label="small-bell">
          <IconBell width={16} />
        </Fab>
    </Tooltip>
    <Tooltip title="Bell">
        <Fab size="medium" color="secondary" aria-label="medium-bell">
          <IconBell width={18} />
        </Fab>
    </Tooltip>
    <Tooltip title="Bell">
        <Fab size="large" color="warning" aria-label="large-bell">
          <IconBell width={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),Ht=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import {  Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} >
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="text" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),Kt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} justifyContent="center">
    <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup size="large" variant="outlined" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),Zt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} direction="row">
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>

    <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>

    <ButtonGroup orientation="vertical" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),_t=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} direction="column" justifyContent="center">
    <ButtonGroup variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup color="secondary" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup color="error" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),qt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward } from '@tabler/icons';

<Stack spacing={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }} justifyContent="center">
    <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="error" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          color="success"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
    </Stack>
    <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="warning" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="error" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="success" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="secondary" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="warning" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="error" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="success" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
    </Stack>
</Stack>`})}),Jt=[{to:"/",title:"Home"},{title:"Button"}],No=()=>t.jsxs(Z,{title:"Buttons",description:"this is Buttons page",children:[t.jsx(K,{title:"Button",items:Jt}),t.jsxs(i,{container:!0,spacing:3,children:[t.jsx(i,{size:12,children:t.jsx(D,{title:"Buttons",children:t.jsxs(i,{container:!0,spacing:3,children:[t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Default",codeModel:t.jsx(Gt,{}),children:t.jsx(ct,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Colors",codeModel:t.jsx(Lt,{}),children:t.jsx(dt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Loading Buttons",codeModel:t.jsx(Ft,{}),children:t.jsx(ut,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Sizes",codeModel:t.jsx(Pt,{}),children:t.jsx(xt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Outlined",codeModel:t.jsx(Ot,{}),children:t.jsx(ht,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Outlined Icon",codeModel:t.jsx(Rt,{}),children:t.jsx(mt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Outline Size",codeModel:t.jsx(Mt,{}),children:t.jsx(pt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text",codeModel:t.jsx(At,{}),children:t.jsx(jt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text Color",codeModel:t.jsx(Dt,{}),children:t.jsx(Bt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text Icon",codeModel:t.jsx(Et,{}),children:t.jsx(gt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text Sizes",codeModel:t.jsx($t,{}),children:t.jsx(bt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Icon Color",codeModel:t.jsx(Wt,{}),children:t.jsx(wt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Icon Sizes",codeModel:t.jsx(Ut,{}),children:t.jsx(yt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"FAB",codeModel:t.jsx(Nt,{}),children:t.jsx(It,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"FAB Color",codeModel:t.jsx(Vt,{}),children:t.jsx(ft,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"FAB Size",codeModel:t.jsx(Xt,{}),children:t.jsx(St,{})})})]})})}),t.jsx(i,{size:12,children:t.jsx(D,{title:"Button Group",children:t.jsxs(i,{container:!0,spacing:3,children:[t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Default",codeModel:t.jsx(Ht,{}),children:t.jsx(Tt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Sizes",codeModel:t.jsx(Kt,{}),children:t.jsx(vt,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Verical",codeModel:t.jsx(Zt,{}),children:t.jsx(Ct,{})})}),t.jsx(i,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text",codeModel:t.jsx(_t,{}),children:t.jsx(zt,{})})}),t.jsx(i,{size:12,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Color",codeModel:t.jsx(qt,{}),children:t.jsx(kt,{})})})]})})})]})]});export{No as default};
