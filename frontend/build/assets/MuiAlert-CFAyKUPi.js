import{j as e,T as h}from"./index-CJWZi9CB.js";import{h as d}from"./index.esm-CBP19pFL.js";import{B as m}from"./Breadcrumb-DR6zDa-i.js";import{P as u}from"./PageContainer-BR_WMDrZ.js";import{P as p}from"./ParentCard-CuAAl3Vl.js";import{C as r}from"./ChildCard-DQqe3qgH.js";import{C as l}from"./CodeDialog-BDx_UOfm.js";import{G as t}from"./Grid2-TKUllLdh.js";import{S as s}from"./Stack-C8hAk-Ua.js";import{A as i}from"./Alert-NqiMgJWO.js";import{A as n}from"./AlertTitle-nggzh6a7.js";import{B as c}from"./Button-BH1WbAiu.js";import{C as x}from"./Collapse-BBh64Xxr.js";import{I as f}from"./IconButton-Cf6Oa_Gi.js";import"./Typography-DW8TAfFy.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";import"./createStack-B05ZxkoV.js";import"./Close-4pq8Nglm.js";import"./resolveProps-CxWqPvcr.js";const j=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="error">
        This is an error alert — check it out!
    </Alert>
    <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
    </Alert>
    <Alert variant="filled" severity="info">
        This is an info alert — check it out!
    </Alert>
    <Alert variant="filled" severity="success">
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="outlined" severity="error">
        This is an error alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="warning">
        This is a warning alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="info">
        This is an info alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),g=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
    </Alert>
</Stack>`})}),A=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import {
  Stack,
  Button,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="warning">
        This is a success alert — check it out!
    </Alert>
    <Alert
        variant="filled"
        severity="info"
        action={
            <Button color="inherit" size="small">
                UNDO
            </Button>
        }
    >
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),k=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Collapse in={open}>
        <Alert
            variant="filled"
            severity="info"
            sx={{ mb: 1 }}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <IconX width={20} />
                </IconButton>
            }
        >
            Close me!
        </Alert>
    </Collapse>
</Stack>
<Button
    disabled={open}
    variant="contained"
    onClick={() => {
        setOpen(true);
    }}
>
    Re-open
</Button>`})}),T=[{to:"/",title:"Home"},{title:"Alert"}],ue=()=>{const[o,a]=h.useState(!0);return e.jsxs(u,{title:"Alert",description:"this is Alert page",children:[e.jsx(m,{title:"Alert",items:T}),e.jsx(p,{title:"Alert",children:e.jsxs(t,{container:!0,spacing:3,children:[e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Basic",children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{severity:"error",icon:!1,children:"This is an error alert — check it out!"}),e.jsx(i,{severity:"warning",icon:!1,children:"This is a warning alert — check it out!"}),e.jsx(i,{severity:"info",icon:!1,children:"This is an info alert — check it out!"}),e.jsx(i,{severity:"success",icon:!1,children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Filled",codeModel:e.jsx(j,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"filled",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Outlined",codeModel:e.jsx(v,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Description",codeModel:e.jsx(g,{}),children:e.jsxs(s,{spacing:1,children:[e.jsxs(i,{severity:"error",children:[e.jsx(n,{children:"Error"}),"This is an error alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"warning",children:[e.jsx(n,{children:"Warning"}),"This is a warning alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"info",children:[e.jsx(n,{children:"Info"}),"This is an info alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"success",children:[e.jsx(n,{children:"Success"}),"This is a success alert — ",e.jsx("strong",{children:"check it out!"})]})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Action",codeModel:e.jsx(A,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"filled",severity:"warning",onClose:()=>{},children:"This is a success alert — check it out!"}),e.jsx(i,{variant:"filled",severity:"info",action:e.jsx(c,{color:"inherit",size:"small",children:"UNDO"}),children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsxs(r,{title:"Transition",codeModel:e.jsx(k,{}),children:[e.jsx(s,{spacing:1,children:e.jsx(x,{in:o,children:e.jsx(i,{variant:"filled",severity:"info",sx:{mb:1},action:e.jsx(f,{"aria-label":"close",color:"inherit",size:"small",onClick:()=>{a(!1)},children:e.jsx(d,{width:20})}),children:"Close me!"})})}),e.jsx(c,{disabled:o,variant:"contained",onClick:()=>{a(!0)},children:"Re-open"})]})})]})})]})};export{ue as default};
