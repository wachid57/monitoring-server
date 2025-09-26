import{j as e,T as u}from"./index-CJWZi9CB.js";import{P as g}from"./ParentCard-CuAAl3Vl.js";import{C as s}from"./ChildCard-DQqe3qgH.js";import{B as C}from"./Breadcrumb-DR6zDa-i.js";import{P as k}from"./PageContainer-BR_WMDrZ.js";import{C as t}from"./CustomRadio-DyAH45s4.js";import{B as d}from"./Box-B21Vn3Wr.js";import{F as n}from"./FormControlLabel-gVATSXRg.js";import{R as l}from"./Radio-B3uekYEz.js";import{R}from"./RadioGroup-l8yaqKVv.js";import{C as m}from"./CodeDialog-BDx_UOfm.js";import{G as c}from"./Grid2-TKUllLdh.js";import"./Card-BdzGKbvD.js";import"./Typography-DW8TAfFy.js";import"./Paper-Dk0UhltF.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./formControlState-Dq1zat_P.js";import"./useSlot-BJnJs1tW.js";import"./useFormControl-D8zMB56u.js";import"./SwitchBase-D_lOZTBK.js";import"./useControlled-Cuh16IWT.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useId-5Do1p0JB.js";import"./FormGroup-D9nEVC8h.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";const f=()=>e.jsxs(d,{textAlign:"center",children:[e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"primary",checked:!0}),label:"Primary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"secondary",checked:!0}),label:"Secondary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"success",checked:!0}),label:"Success",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"error",checked:!0}),label:"Error",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"warning",checked:!0}),label:"Warning",labelPlacement:"end"})]}),x={inputProps:{"aria-label":"Checkbox demo"}},j=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,...x}),e.jsx(l,{disabled:!0,...x}),e.jsx(l,{color:"default",...x})]})},h={inputProps:{"aria-label":"Checkbox demo"}},y=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,color:"primary",...h}),e.jsx(l,{checked:a,onChange:r,color:"secondary",...h}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.success.main,"&.Mui-checked":{color:o=>o.palette.success.main}}}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.error.main,"&.Mui-checked":{color:o=>o.palette.error.main}}}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.warning.main,"&.Mui-checked":{color:o=>o.palette.warning.main}}})]})},P=()=>{const[a,i]=u.useState("a"),r=p=>{i(p.target.value)},o=p=>({checked:a===p,onChange:r,value:p,name:"size-radio-button-demo",inputProps:{"aria-label":p}});return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{...o("a"),size:"small"}),e.jsx(l,{...o("b")}),e.jsx(l,{...o("c"),sx:{"& .MuiSvgIcon-root":{fontSize:28}}})]})},b={inputProps:{"aria-label":"Checkbox demo"}},B=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(t,{checked:a,onChange:r,...b}),e.jsx(t,{disabled:!0,...b}),e.jsx(t,{color:"default",...b})]})},v=()=>e.jsx(d,{textAlign:"center",children:e.jsxs(R,{row:!0,"aria-label":"position",name:"position",defaultValue:"top",children:[e.jsx(n,{value:"top",control:e.jsx(t,{}),label:"Top",labelPlacement:"top"}),e.jsx(n,{value:"start",control:e.jsx(t,{}),label:"Start",labelPlacement:"start"}),e.jsx(n,{value:"bottom",control:e.jsx(t,{}),label:"Bottom",labelPlacement:"bottom"}),e.jsx(n,{value:"end",control:e.jsx(t,{}),label:"End"})]})}),S=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      {...props}
    />
  );
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
      <CustomRadio checked={checked} onChange={handleChange} {...label} />

      <CustomRadio disabled {...label} />
      <CustomRadio color="default" {...label} />
</Box>
`})}),I=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      {...props}
    />
  );
}


<Box textAlign="center">
    <FormControlLabel
        value="end"
        control={<CustomRadio color="primary" checked />}
        label="Primary"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="secondary" checked />}
        label="Secondary"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="success" checked />}
        label="Success"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="error" checked />}
        label="Danger"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="warning" checked />}
        label="Warning"
        labelPlacement="end"
    />
</Box>`})}),w=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, Radio } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <Radio checked={checked} onChange={handleChange} {...label} />

    <Radio disabled {...label} />
    <Radio color="default" {...label} />
</Box>
`})}),F=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, Radio } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
      <Radio checked={checked} onChange={handleChange} color="primary" {...label} />

      <Radio checked={checked} onChange={handleChange} color="secondary" {...label} />

      <Radio
        checked={checked}
        onChange={handleChange}
        {...label}
        sx={{
          color: (theme) => theme.palette.success.main,
          '&.Mui-checked': {
            color: (theme) => theme.palette.success.main,
          },
        }}
      />

      <Radio
        checked={checked}
        onChange={handleChange}
        {...label}
        sx={{
          color: (theme) => theme.palette.error.main,
          '&.Mui-checked': {
            color: (theme) => theme.palette.error.main,
          },
        }}
      />

      <Radio
        checked={checked}
        onChange={handleChange}
        {...label}
        sx={{
          color: (theme) => theme.palette.warning.main,
          '&.Mui-checked': {
            color: (theme) => theme.palette.warning.main,
          },
        }}
      />
    </Box>
`})}),M=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, Radio } from '@mui/material';

const [selectedValue, setSelectedValue] = React.useState('a');
const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
};
    
const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange2,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
});

<Box textAlign="center">
    <Radio {...controlProps('a')} size="small" />
    <Radio {...controlProps('b')} />
    <Radio
        {...controlProps('c')}
        sx={{
            '& .MuiSvgIcon-root': {
                fontSize: 28,
            },
        }}
    />
</Box>`})}),z=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, RadioGroup, FormControlLabel  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      {...props}
    />
  );
}

<Box textAlign="center">
    <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel value="top" control={<CustomRadio />} label="Top" labelPlacement="top" />
        <FormControlLabel
            value="start"
            control={<CustomRadio />}
            label="Start"
            labelPlacement="start"
        />
        <FormControlLabel
            value="bottom"
            control={<CustomRadio />}
            label="Bottom"
            labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<CustomRadio />} label="End" />
    </RadioGroup>
</Box>
`})}),L=[{to:"/",title:"Home"},{title:"Radio"}],Pe=()=>e.jsxs(k,{title:"Radio",description:"this is Radio page",children:[e.jsx(C,{title:"Radio",items:L}),e.jsx(g,{title:"Radio",children:e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Custom",codeModel:e.jsx(S,{}),children:e.jsx(B,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Color with Label",codeModel:e.jsx(I,{}),children:e.jsx(f,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default",codeModel:e.jsx(w,{}),children:e.jsx(j,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default Colors",codeModel:e.jsx(F,{}),children:e.jsx(y,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Sizes",codeModel:e.jsx(M,{}),children:e.jsx(P,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Position",codeModel:e.jsx(z,{}),children:e.jsx(v,{})})})]})})]});export{Pe as default};
