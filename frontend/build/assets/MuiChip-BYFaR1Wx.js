import{j as a,o as c,p as d,t as m}from"./index-CJWZi9CB.js";import{B as D}from"./Breadcrumb-DR6zDa-i.js";import{P as u}from"./PageContainer-BR_WMDrZ.js";import{P as x}from"./ParentCard-CuAAl3Vl.js";import{C as i}from"./ChildCard-DQqe3qgH.js";import{I as n}from"./InlineItemCard-CDwCPQ6B.js";import{C as s}from"./CodeDialog-BDx_UOfm.js";import{aq as t,f as h,ar as p}from"./index.esm-CBP19pFL.js";import{G as o}from"./Grid2-TKUllLdh.js";import{C as e}from"./Chip-DQyB0PyW.js";import{A as l}from"./Avatar-YolhUzp1.js";import"./Typography-DW8TAfFy.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";const v=()=>a.jsx(a.Fragment,{children:a.jsx(s,{children:`
import React from 'react';
import { 
Avatar, 
Chip,
Card 
}  from '@mui/material';
import { IconMoodHappy } from '@tabler/icons';


<Card>
    <Chip avatar={<Avatar>M</Avatar>} label="Default Filled" />
    <Chip
    avatar={<Avatar>M</Avatar>}
    label="Default Deletable"
    onDelete={handleDelete}
    />
    <Chip
    avatar={<Avatar alt="Natacha" src={User1} />}
    label="Primary Filled"
    color="primary"
    />
    <Chip
    avatar={<Avatar alt="Natacha" src={User1} />}
    label="Primary Deletable"
    color="primary"
    onDelete={handleDelete}
    />
    <Chip icon={<IconMoodHappy />} label="Secondary Filled" color="secondary" />
    <Chip
    icon={<IconMoodHappy />}
    label="Secondary Deletable"
    color="secondary"
    onDelete={handleDelete}
    />
    <Chip
    avatar={<Avatar alt="Natacha" src={User2} />}
    label="Default Filled"
    color="success"
    />
    <Chip
    avatar={<Avatar alt="Natacha" src={User2} />}
    label="Default Deletable"
    color="success"
    onDelete={handleDelete}
    />
    <Chip icon={<IconMoodHappy />} label="Default Filled" color="warning" />
    <Chip
    icon={<IconMoodHappy />}
    label="Default Deletable"
    color="warning"
    onDelete={handleDelete}
    />
    <Chip
    avatar={<Avatar alt="Natacha" src={User3} />}
    label="Default Filled"
    color="error"
    />
    <Chip
    avatar={<Avatar alt="Natacha" src={User3} />}
    label="Default Deletable"
    color="error"
    onDelete={handleDelete}
    />
</Card>`})}),j=()=>a.jsx(a.Fragment,{children:a.jsx(s,{children:`
import React from 'react';
import { 
Avatar, 
Chip,
Card
}  from '@mui/material';

import { IconMoodHappy } from '@tabler/icons';


<Card>
    <Chip variant="outlined" avatar={<Avatar>M</Avatar>} label="Default Filled" />
    <Chip
      variant="outlined"
      avatar={<Avatar>M</Avatar>}
      label="Default Deletable"
      onDelete={handleDelete}
    />
    <Chip
      variant="outlined"
      avatar={<Avatar alt="Natacha" src={User1} />}
      label="Default Filled"
      color="primary"
    />
    <Chip
      variant="outlined"
      avatar={<Avatar alt="Natacha" src={User1} />}
      label="Default Deletable"
      color="primary"
      onDelete={handleDelete}
    />
    <Chip
      variant="outlined"
      icon={<IconMoodHappy />}
      label="Default Filled"
      color="secondary"
    />
    <Chip
      variant="outlined"
      icon={<IconMoodHappy />}
      label="Default Deletable"
      color="secondary"
      onDelete={handleDelete}
    />
    <Chip
      variant="outlined"
      avatar={<Avatar alt="Natacha" src={User2} />}
      label="Default Filled"
      color="success"
    />
    <Chip
      variant="outlined"
      avatar={<Avatar alt="Natacha" src={User2} />}
      label="Default Deletable"
      color="success"
      onDelete={handleDelete}
    />
    <Chip
      variant="outlined"
      icon={<IconMoodHappy />}
      label="Default Filled"
      color="warning"
    />
    <Chip
      variant="outlined"
      icon={<IconMoodHappy />}
      label="Default Deletable"
      color="warning"
      onDelete={handleDelete}
    />
    <Chip
      variant="outlined"
      avatar={<Avatar alt="Natacha" src={User3} />}
      label="Default Filled"
      color="error"
    />
    <Chip
      variant="outlined"
      avatar={<Avatar alt="Natacha" src={User3} />}
      label="Default Deletable"
      color="error"
      onDelete={handleDelete}
    />
</Card>`})}),b=()=>a.jsx(a.Fragment,{children:a.jsx(s,{children:`
import React from 'react';
import { 
Avatar, 
Chip,
Card
}  from '@mui/material';

import { 
IconCheck, 
IconChecks } from '@tabler/icons';

<Card>
    <Chip
        label="Custom Icon" color="primary" avatar={<Avatar >M</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconCheck width={20} />}
    />
    <Chip
        label="Custom Icon" color="secondary" avatar={<Avatar >S</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconChecks width={20} />}
    />
</Card>`})}),C=()=>a.jsx(a.Fragment,{children:a.jsx(s,{children:`
import React from 'react';
import { 
Avatar, 
Chip,
Card
}  from '@mui/material';

<Card>
    <Chip
      label="Custom Icon"
      variant="outlined"
      color="primary"
      avatar={<Avatar>M</Avatar>}
      onDelete={handleDelete}
      deleteIcon={<IconCheck width={20} />}
    />
    <Chip
      label="Custom Icon"
      variant="outlined"
      color="secondary"
      avatar={<Avatar>S</Avatar>}
      onDelete={handleDelete}
      deleteIcon={<IconChecks width={20} />}
    />
</Card>`})}),f=()=>a.jsx(a.Fragment,{children:a.jsx(s,{children:`
import React from 'react';
import { 
Avatar, 
Chip,
Card
}  from '@mui/material';

<Card>
    <Chip
        label="Custom Icon" disabled avatar={<Avatar >M</Avatar>}
        onDelete={handleDelete}
    />
    <Chip
        label="Custom Icon" color="primary" disabled avatar={<Avatar >S</Avatar>}
        onDelete={handleDelete}
    />
</Card>`})}),y=()=>a.jsx(a.Fragment,{children:a.jsx(s,{children:`
import React from 'react';
import { 
Avatar, 
Chip,
Card
}  from '@mui/material';

<Card>
    <Chip label="Small" size="small" color="primary" />
    <Chip label="Normal" color="primary" />
</Card>`})}),I=[{to:"/",title:"Home"},{title:"Chip"}],ca=()=>{const r=()=>{console.info("You clicked the delete icon.")};return a.jsxs(u,{title:"Chip",description:"this is Chip page",children:[a.jsx(D,{title:"Chip",items:I}),a.jsx(x,{title:"Accordion",children:a.jsxs(o,{container:!0,spacing:3,children:[a.jsx(o,{size:12,display:"flex",alignItems:"stretch",children:a.jsx(i,{title:"Filled",codeModel:a.jsx(v,{}),children:a.jsxs(n,{children:[a.jsx(e,{avatar:a.jsx(l,{children:"M"}),label:"Default Filled"}),a.jsx(e,{avatar:a.jsx(l,{children:"M"}),label:"Default Deletable",onDelete:r}),a.jsx(e,{avatar:a.jsx(l,{alt:"Natacha",src:c}),label:"Primary Filled",color:"primary"}),a.jsx(e,{avatar:a.jsx(l,{alt:"Natacha",src:c}),label:"Primary Deletable",color:"primary",onDelete:r}),a.jsx(e,{icon:a.jsx(t,{}),label:"Secondary Filled",color:"secondary"}),a.jsx(e,{icon:a.jsx(t,{}),label:"Secondary Deletable",color:"secondary",onDelete:r}),a.jsx(e,{avatar:a.jsx(l,{alt:"Natacha",src:d}),label:"Default Filled",color:"success"}),a.jsx(e,{avatar:a.jsx(l,{alt:"Natacha",src:d}),label:"Default Deletable",color:"success",onDelete:r}),a.jsx(e,{icon:a.jsx(t,{}),label:"Default Filled",color:"warning"}),a.jsx(e,{icon:a.jsx(t,{}),label:"Default Deletable",color:"warning",onDelete:r}),a.jsx(e,{avatar:a.jsx(l,{alt:"Natacha",src:m}),label:"Default Filled",color:"error"}),a.jsx(e,{avatar:a.jsx(l,{alt:"Natacha",src:m}),label:"Default Deletable",color:"error",onDelete:r})]})})}),a.jsx(o,{size:12,display:"flex",alignItems:"stretch",children:a.jsx(i,{title:"Outlined",codeModel:a.jsx(j,{}),children:a.jsxs(n,{children:[a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{children:"M"}),label:"Default Filled"}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{children:"M"}),label:"Default Deletable",onDelete:r}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{alt:"Natacha",src:c}),label:"Default Filled",color:"primary"}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{alt:"Natacha",src:c}),label:"Default Deletable",color:"primary",onDelete:r}),a.jsx(e,{variant:"outlined",icon:a.jsx(t,{}),label:"Default Filled",color:"secondary"}),a.jsx(e,{variant:"outlined",icon:a.jsx(t,{}),label:"Default Deletable",color:"secondary",onDelete:r}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{alt:"Natacha",src:d}),label:"Default Filled",color:"success"}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{alt:"Natacha",src:d}),label:"Default Deletable",color:"success",onDelete:r}),a.jsx(e,{variant:"outlined",icon:a.jsx(t,{}),label:"Default Filled",color:"warning"}),a.jsx(e,{variant:"outlined",icon:a.jsx(t,{}),label:"Default Deletable",color:"warning",onDelete:r}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{alt:"Natacha",src:m}),label:"Default Filled",color:"error"}),a.jsx(e,{variant:"outlined",avatar:a.jsx(l,{alt:"Natacha",src:m}),label:"Default Deletable",color:"error",onDelete:r})]})})}),a.jsx(o,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:a.jsx(i,{title:"Custom Icon",codeModel:a.jsx(b,{}),children:a.jsxs(n,{children:[a.jsx(e,{label:"Custom Icon",color:"primary",avatar:a.jsx(l,{children:"M"}),onDelete:r,deleteIcon:a.jsx(h,{width:20})}),a.jsx(e,{label:"Custom Icon",color:"secondary",avatar:a.jsx(l,{children:"S"}),onDelete:r,deleteIcon:a.jsx(p,{width:20})})]})})}),a.jsx(o,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:a.jsx(i,{title:"Custom outlined Icon",codeModel:a.jsx(C,{}),children:a.jsxs(n,{children:[a.jsx(e,{label:"Custom Icon",variant:"outlined",color:"primary",avatar:a.jsx(l,{children:"M"}),onDelete:r,deleteIcon:a.jsx(h,{width:20})}),a.jsx(e,{label:"Custom Icon",variant:"outlined",color:"secondary",avatar:a.jsx(l,{children:"S"}),onDelete:r,deleteIcon:a.jsx(p,{width:20})})]})})}),a.jsx(o,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:a.jsx(i,{title:"Disabled",codeModel:a.jsx(f,{}),children:a.jsxs(n,{children:[a.jsx(e,{label:"Custom Icon",disabled:!0,avatar:a.jsx(l,{children:"M"}),onDelete:r}),a.jsx(e,{label:"Custom Icon",color:"primary",disabled:!0,avatar:a.jsx(l,{children:"S"}),onDelete:r})]})})}),a.jsx(o,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:a.jsx(i,{title:"Sizes",codeModel:a.jsx(y,{}),children:a.jsxs(n,{children:[a.jsx(e,{label:"Small",size:"small",color:"primary"}),a.jsx(e,{label:"Normal",color:"primary"})]})})})]})})]})};export{ca as default};
