import{T as c,j as o}from"./index-CJWZi9CB.js";import{B as u}from"./Breadcrumb-DR6zDa-i.js";import{P as x}from"./PageContainer-BR_WMDrZ.js";import{P}from"./ParentCard-CuAAl3Vl.js";import{C as s}from"./ChildCard-DQqe3qgH.js";import{B as y}from"./Button-BH1WbAiu.js";import{P as m}from"./Popover-C4QiusQk.js";import{B as h}from"./Box-B21Vn3Wr.js";import{T as n}from"./Typography-DW8TAfFy.js";import{C as d}from"./CodeDialog-BDx_UOfm.js";import{G as l}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./resolveProps-CxWqPvcr.js";import"./isHostComponent-DVu5iVWx.js";import"./useSlot-BJnJs1tW.js";import"./Modal-BmV9fUd8.js";import"./getReactNodeRef-CxaND9dZ.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./utils-C-EoFTAL.js";import"./Portal-BXG2mGLy.js";import"./debounce-Be36O1Ab.js";import"./Grow-rhCcvyQJ.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";const g=()=>{const[e,r]=c.useState(null),a=v=>{r(v.currentTarget)},i=()=>{r(null)},t=!!e,p=t?"simple-popover":void 0;return o.jsxs(o.Fragment,{children:[o.jsx(y,{"aria-describedby":p,variant:"contained",onClick:a,children:"Open Popover"}),o.jsx(m,{id:p,open:t,anchorEl:e,onClose:i,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:o.jsxs(h,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Basic Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},f=()=>{const[e,r]=c.useState(null),a=p=>{r(p.currentTarget)},i=()=>{r(null)},t=!!e;return o.jsxs(o.Fragment,{children:[o.jsx(n,{"aria-owns":t?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:a,onMouseLeave:i,children:"Hover with a Popover."}),o.jsx(m,{id:"mouse-over-popover",sx:{pointerEvents:"none"},open:t,anchorEl:e,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:i,disableRestoreFocus:!0,children:o.jsxs(h,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Hover Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},j=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
import React from "react";
import { 
    Popover, 
    Typography, 
    Button, 
    Box 
} from '@mui/material';


const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

return (
    <>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
            <Box p={2}>
                <Typography variant="h6" mb={1}>
                    Basic Popover
                </Typography>
                <Typography color="textSecondary">
                    The component is built on top of the Modal component.
                </Typography>
            </Box>
        </Popover>
    </>
);`})}),C=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
import React from "react";
import { 
  Popover, 
  Box, 
  Typography 
} from '@mui/material';


const [anchorEl, setAnchorEl] = React.useState(null);

const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
};

const handlePopoverClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);

return (
    <>
        <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            Hover with a Popover.
        </Typography>
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Box p={2}>
                <Typography variant="h6" mb={1}>
                    Hover Popover
                </Typography>
                <Typography color="textSecondary">
                    The component is built on top of the Modal component.
                </Typography>
            </Box>
      </Popover>
    </>
);`})}),E=[{to:"/",title:"Home"},{title:"Popover"}],mo=()=>o.jsxs(x,{title:"Popover",description:"this is Popover page",children:[o.jsx(u,{title:"Popover",items:E}),o.jsx(P,{title:"Popover",children:o.jsxs(l,{container:!0,spacing:3,children:[o.jsx(l,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Click",codeModel:o.jsx(j,{}),children:o.jsx(g,{})})}),o.jsx(l,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Hover",codeModel:o.jsx(C,{}),children:o.jsx(f,{})})})]})})]});export{mo as default};
