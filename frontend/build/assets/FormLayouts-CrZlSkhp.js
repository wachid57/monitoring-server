import{T as c,j as e}from"./index-CJWZi9CB.js";import{C as o}from"./CustomTextField-DO2tpUr9.js";import{C as b}from"./CustomCheckbox-BUgU_PFM.js";import{C as t}from"./CustomFormLabel-Dc-sew0o.js";import{P as x}from"./ParentCard-CuAAl3Vl.js";import{F as s}from"./FormControlLabel-gVATSXRg.js";import{B as m}from"./Button-BH1WbAiu.js";import{C as w}from"./CustomSelect-DzMMXHqr.js";import{C}from"./CustomRadio-DyAH45s4.js";import{C as F}from"./CodeDialog-BDx_UOfm.js";import{G as a}from"./Grid2-TKUllLdh.js";import{F as d}from"./FormControl-CoJ51_a0.js";import{R as T}from"./RadioGroup-l8yaqKVv.js";import{M as I}from"./MenuItem-DU8MVoCc.js";import{A as L}from"./Alert-NqiMgJWO.js";import{B as R}from"./Box-B21Vn3Wr.js";import{av as S,a3 as W,an as g}from"./index.esm-CBP19pFL.js";import{S as B}from"./Stack-C8hAk-Ua.js";import{O as p}from"./Select-BdS4d3Pw.js";import{I as h}from"./InputAdornment-DP5E7Axe.js";import{P as M}from"./PageContainer-BR_WMDrZ.js";import{B as A}from"./Breadcrumb-DR6zDa-i.js";import"./Typography-DW8TAfFy.js";import"./TextField-ZPSYDyyk.js";import"./useSlot-BJnJs1tW.js";import"./Paper-Dk0UhltF.js";import"./useId-5Do1p0JB.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-D8zMB56u.js";import"./Checkbox-H4Hg7Z4o.js";import"./SwitchBase-D_lOZTBK.js";import"./useControlled-Cuh16IWT.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./resolveProps-CxWqPvcr.js";import"./Radio-B3uekYEz.js";import"./createChainedFunction-BO_9K8Jh.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useSlotProps-Dmx4i6VU.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./composeClasses-CkcSq-l_.js";import"./utils-DoM3o7-Q.js";import"./isMuiElement-DUOjtQlD.js";import"./FormGroup-D9nEVC8h.js";import"./List-CPHbMiuQ.js";import"./listItemTextClasses-C__13pSQ.js";import"./Close-4pq8Nglm.js";import"./createStack-B05ZxkoV.js";import"./index-BwqtTtay.js";import"./Popover-C4QiusQk.js";import"./isHostComponent-DVu5iVWx.js";import"./debounce-Be36O1Ab.js";import"./Link-DrUusogV.js";const P=()=>{const[l,u]=c.useState({checkedB:!1}),n=i=>{u({...l,[i.target.name]:i.target.checked})};return e.jsx(x,{title:"Ordrinary Form",children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"email-address",children:"Email"}),e.jsx(o,{id:"email-address",helperText:"We'll never share your email with anyone else.",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"ordinary-outlined-password-input",children:"Password"}),e.jsx(o,{id:"ordinary-outlined-password-input",type:"password",autoComplete:"current-password",variant:"outlined",fullWidth:!0,sx:{mb:"10px"}}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedB,onChange:n,name:"checkedB",color:"primary"}),label:"Check Me Out!",sx:{mb:1}}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",children:"Submit"})})]})})},O=()=>e.jsx(e.Fragment,{children:e.jsx(F,{children:`
import React from 'react';
import { FormControlLabel, Button, RadioGroup, FormControl, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import Radio, { RadioProps } from '@mui/material/Radio';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 19,
  height: 19,
  marginLeft: '4px',
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
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: 'none',
  width: 19,
  height: 19,
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      "url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E")",
    content: '""',
  },
});

const BpIcon2 = styled('span')(({ theme }) => ({
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

const BpCheckedIcon2 = styled(BpIcon2)(({ theme }) => ({
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

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));

function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      color={props.color ? props.color : 'default'}
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon2
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon2 />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const numbers = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
  {
    value: 'four',
    label: 'Four',
  },
];

const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
});

const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
};

const [value, setValue] = React.useState('');

const handleChange2 = (event) => {
    setValue(event.target.value);
};

const [number, setNumber] = React.useState('');

const handleChange3 = (event) => {
    setNumber(event.target.value);
};

<form>
  <CustomFormLabel
    sx={{
      mt: 0,
    }}
    htmlFor="default-value"
  >
    Default Text
  </CustomFormLabel>
  <CustomTextField
    id="default-value"
    variant="outlined"
    defaultValue="George deo"
    fullWidth
  />
  <CustomFormLabel htmlFor="email-text">Email</CustomFormLabel>
  <CustomTextField id="email-text" type="email" variant="outlined" fullWidth />
  <CustomFormLabel htmlFor="default-outlined-password-input">Password</CustomFormLabel>

  <CustomTextField
    id="default-outlined-password-input"
    type="password"
    autoComplete="current-password"
    variant="outlined"
    fullWidth
  />
  <CustomFormLabel htmlFor="outlined-multiline-static">Textarea</CustomFormLabel>

  <CustomTextField
    id="outlined-multiline-static"
    multiline
    rows={4}
    variant="outlined"
    fullWidth
  />
  <CustomFormLabel htmlFor="readonly-text">Read Only</CustomFormLabel>

  <CustomTextField
    id="readonly-text"
    defaultValue="Hello World"
    slotProps={{
      input: {
        readOnly: true,
      },
    }}
    variant="outlined"
    fullWidth
  />
  <Grid container spacing={0} my={2}>
    <Grid size={{ lg: 4, md: 6, sm: 12 }}>
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            color="primary"
          />
        }
        label="Check this custom checkbox"
      />
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Check this custom checkbox"
      />
      <FormControlLabel
        control={
          <CustomCheckbox
            checked={state.checkedC}
            onChange={handleChange}
            name="checkedC"
            color="primary"
          />
        }
        label="Check this custom checkbox"
      />
    </Grid>
    <Grid size={{ lg: 4, md: 6, sm: 12 }}>
      <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange2}>
          <FormControlLabel
            value="radio1"
            control={<CustomRadio />}
            label="Toggle this custom radio"
          />
          <FormControlLabel
            value="radio2"
            control={<CustomRadio />}
            label="Toggle this custom radio"
          />
          <FormControlLabel
            value="radio3"
            control={<CustomRadio />}
            label="Toggle this custom radio"
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  </Grid>
  <CustomFormLabel htmlFor="standard-select-number">Select</CustomFormLabel>
  <CustomSelect
    fullWidth
    id="standard-select-number"
    variant="outlined"
    value={number}
    onChange={handleChange3}
    sx={{
      mb: 2,
    }}
  >
    {numbers.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </CustomSelect>
  <div>
    <Button color="primary" variant="contained">
      Submit
    </Button>
  </div>
  </form>
`})}),G=[{value:"one",label:"One"},{value:"two",label:"Two"},{value:"three",label:"Three"},{value:"four",label:"Four"}],z=()=>{const[l,u]=c.useState({checkedA:!1,checkedB:!1,checkedC:!1}),n=r=>{u({...l,[r.target.name]:r.target.checked})},[i,j]=c.useState(""),f=r=>{j(r.target.value)},[y,v]=c.useState(""),k=r=>{v(r.target.value)};return e.jsx(x,{title:"Default Form",codeModel:e.jsx(O,{}),children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"default-value",children:"Default Text"}),e.jsx(o,{id:"default-value",variant:"outlined",defaultValue:"George deo",fullWidth:!0}),e.jsx(t,{htmlFor:"email-text",children:"Email"}),e.jsx(o,{id:"email-text",type:"email",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"default-outlined-password-input",children:"Password"}),e.jsx(o,{id:"default-outlined-password-input",type:"password",autoComplete:"current-password",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"outlined-multiline-static",children:"Textarea"}),e.jsx(o,{id:"outlined-multiline-static",multiline:!0,rows:4,variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"readonly-text",children:"Read Only"}),e.jsx(o,{id:"readonly-text",defaultValue:"Hello World",slotProps:{input:{readOnly:!0}},variant:"outlined",fullWidth:!0}),e.jsxs(a,{container:!0,spacing:0,my:2,children:[e.jsxs(a,{size:{lg:4,md:6,sm:12},children:[e.jsx(s,{control:e.jsx(b,{checked:l.checkedA,onChange:n,name:"checkedA",color:"primary"}),label:"Check this custom checkbox"}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedB,onChange:n,name:"checkedB",color:"primary"}),label:"Check this custom checkbox"}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedC,onChange:n,name:"checkedC",color:"primary"}),label:"Check this custom checkbox"})]}),e.jsx(a,{size:{lg:4,md:6,sm:12},children:e.jsx(d,{component:"fieldset",children:e.jsxs(T,{"aria-label":"gender",name:"gender1",value:i,onChange:f,children:[e.jsx(s,{value:"radio1",control:e.jsx(C,{}),label:"Toggle this custom radio"}),e.jsx(s,{value:"radio2",control:e.jsx(C,{}),label:"Toggle this custom radio"}),e.jsx(s,{value:"radio3",control:e.jsx(C,{}),label:"Toggle this custom radio"})]})})})]}),e.jsx(t,{htmlFor:"standard-select-number",children:"Select"}),e.jsx(w,{fullWidth:!0,id:"standard-select-number",variant:"outlined",value:y,onChange:k,sx:{mb:2},children:G.map(r=>e.jsx(I,{value:r.value,children:r.label},r.value))}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",children:"Submit"})})]})})},V=()=>e.jsx(e.Fragment,{children:e.jsx(F,{children:`
import React from 'react';
import {
  Box,
  FormControlLabel,
  Button,
  MenuItem,
  FormControl,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon2 = styled('span')(({ theme }) => ({
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

const BpCheckedIcon2 = styled(BpIcon2)(({ theme }) => ({
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

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon2
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon2 />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const currencies = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];

const [currency, setCurrency] = React.useState('');

const handleChange2 = (event) => {
    setCurrency(event.target.value);
};

const [selectedValue, setSelectedValue] = React.useState('');

const handleChange3 = (event) => {
    setSelectedValue(event.target.value);
};

const [country, setCountry] = React.useState('');

const handleChange4 = (event) => {
    setCountry(event.target.value);
};

<Alert severity="info">Person Info</Alert>
<form>
  <Grid container spacing={3} mb={3}>
    <Grid size={{lg: 6, md: 12, sm: 12}} >
      <CustomFormLabel htmlFor="fname-text">First Name</CustomFormLabel>
      <CustomTextField id="fname-text" variant="outlined" fullWidth />
      <CustomFormLabel htmlFor="standard-select-currency">Select Gender</CustomFormLabel>
      <CustomSelect
        id="standard-select-currency"
        value={currency}
        onChange={handleChange2}
        fullWidth
        variant="outlined"

      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
      <CustomFormLabel>Membership</CustomFormLabel>

      <FormControl
        sx={{
          width: '100%',
        }}
      >
        <Box>
          <FormControlLabel
            checked={selectedValue === 'a'}
            onChange={handleChange3}
            value="a"
            label="Free"
            name="radio-button-demo"
            control={<CustomRadio />}
            inputprops={{ 'aria-label': 'A' }}
          />
          <FormControlLabel
            checked={selectedValue === 'b'}
            onChange={handleChange3}
            value="b"
            label="Paid"
            control={<CustomRadio />}
            name="radio-button-demo"
            inputprops={{ 'aria-label': 'B' }}
          />
        </Box>
      </FormControl>
    </Grid>
    <Grid size={{lg: 6, md: 12, sm: 12}}>
      <CustomFormLabel htmlFor="lname-text">Last Name</CustomFormLabel>

      <CustomTextField id="lname-text" variant="outlined" fullWidth />
      <CustomFormLabel htmlFor="date">Date of Birth</CustomFormLabel>

      <CustomTextField
        id="date"
        type="date"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}

      />
    </Grid>
  </Grid>
</form>
<Alert severity="info">Address</Alert>
<Grid container spacing={3} mb={3} mt={1}>
  <Grid size={12}>
    <CustomFormLabel
      sx={{
        mt: 0,
      }}
      htmlFor="street-text"
    >
      Street
    </CustomFormLabel>

    <CustomTextField id="street-text" variant="outlined" fullWidth />
  </Grid>
  <Grid size={12}>
    <CustomFormLabel
      sx={{
        mt: 0,
      }}
      htmlFor="city-text"
    >
      City
    </CustomFormLabel>
    <CustomTextField id="city-text" variant="outlined" fullWidth />
  </Grid>
  <Grid size={12}>
    <CustomFormLabel
      sx={{
        mt: 0,
      }}
      htmlFor="state-text"
    >
      State
    </CustomFormLabel>
    <CustomTextField id="state-text" variant="outlined" fullWidth />
  </Grid>
  <Grid size={12}>
    <CustomFormLabel
      sx={{
        mt: 0,
      }}
      htmlFor="post-text"
    >
      Post Code
    </CustomFormLabel>
    <CustomTextField id="post-text" variant="outlined" fullWidth />
  </Grid>
  <Grid size={12}>
    <CustomFormLabel
      sx={{
        mt: 0,
      }}
      htmlFor="country-text"
    >
      Country
    </CustomFormLabel>
    <CustomSelect
      id="country-select"
      value={country}
      onChange={handleChange4}
      fullWidth
      variant="outlined"

    >
      {countries.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </CustomSelect>
  </Grid>
</Grid>

<>
  <Button
    variant="contained"
    color="error"
    sx={{
      mr: 1,
    }}
  >
    Cancel
  </Button>
  <Button variant="contained" color="primary">
    Submit
  </Button>
</>
`})}),E=[{value:"female",label:"Female"},{value:"male",label:"Male"},{value:"other",label:"Other"}],D=[{value:"india",label:"India"},{value:"uk",label:"United Kingdom"},{value:"srilanka",label:"Srilanka"}],U=()=>{const[l,u]=c.useState(""),n=r=>{u(r.target.value)},[i,j]=c.useState(""),f=r=>{j(r.target.value)},[y,v]=c.useState(""),k=r=>{v(r.target.value)};return e.jsx("div",{children:e.jsxs(x,{title:"Basic Header Form",codeModel:e.jsx(V,{}),footer:e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"contained",color:"error",sx:{mr:1},children:"Cancel"}),e.jsx(m,{variant:"contained",color:"primary",children:"Submit"})]}),children:[e.jsx(L,{severity:"info",children:"Person Info"}),e.jsx("form",{children:e.jsxs(a,{container:!0,spacing:3,mb:3,children:[e.jsxs(a,{size:{lg:6,md:12,sm:12},children:[e.jsx(t,{htmlFor:"fname-text",children:"First Name"}),e.jsx(o,{id:"fname-text",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"standard-select-currency",children:"Select Gender"}),e.jsx(w,{id:"standard-select-currency",value:l,onChange:n,fullWidth:!0,variant:"outlined",children:E.map(r=>e.jsx(I,{value:r.value,children:r.label},r.value))}),e.jsx(t,{children:"Membership"}),e.jsx(d,{sx:{width:"100%"},children:e.jsxs(R,{children:[e.jsx(s,{checked:i==="a",onChange:f,value:"a",label:"Free",name:"radio-button-demo",control:e.jsx(C,{}),inputprops:{"aria-label":"A"}}),e.jsx(s,{checked:i==="b",onChange:f,value:"b",label:"Paid",control:e.jsx(C,{}),name:"radio-button-demo",inputprops:{"aria-label":"B"}})]})})]}),e.jsxs(a,{size:{lg:6,md:12,sm:12},children:[e.jsx(t,{htmlFor:"lname-text",children:"Last Name"}),e.jsx(o,{id:"lname-text",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"date",children:"Date of Birth"}),e.jsx(o,{id:"date",type:"date",variant:"outlined",fullWidth:!0,InputLabelProps:{shrink:!0}})]})]})}),e.jsx(L,{severity:"info",children:"Address"}),e.jsxs(a,{container:!0,spacing:3,mb:3,mt:1,children:[e.jsxs(a,{size:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"street-text",children:"Street"}),e.jsx(o,{id:"street-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{size:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"city-text",children:"City"}),e.jsx(o,{id:"city-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{size:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"state-text",children:"State"}),e.jsx(o,{id:"state-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{size:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"post-text",children:"Post Code"}),e.jsx(o,{id:"post-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{size:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"country-text",children:"Country"}),e.jsx(w,{id:"country-select",value:y,onChange:k,fullWidth:!0,variant:"outlined",children:D.map(r=>e.jsx(I,{value:r.value,children:r.label},r.value))})]})]})]})})},N=()=>e.jsx(x,{title:"Readonly Form",children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"ro-name",children:"Name"}),e.jsx(o,{id:"ro-name",variant:"outlined",defaultValue:"Wrappixel",fullWidth:!0,slotProps:{input:{readOnly:!0}}}),e.jsx(t,{htmlFor:"ro-email-address",children:"Email"}),e.jsx(o,{id:"ro-email-address",helperText:"We'll never share your email with anyone else.",variant:"outlined",defaultValue:"info@wrappixel.com",fullWidth:!0,slotProps:{input:{readOnly:!0}}}),e.jsx(t,{htmlFor:"ro-outlined-password-input",children:"Password"}),e.jsx(o,{id:"ro-outlined-password-input",type:"password",autoComplete:"current-password",defaultValue:"info@wrappixel.com",variant:"outlined",fullWidth:!0,slotProps:{input:{readOnly:!0}},sx:{mb:2}}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",children:"Submit"})})]})}),q=()=>e.jsx(x,{title:"Disabled Form",children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"df-name",children:"Name"}),e.jsx(o,{id:"df-name",variant:"outlined",fullWidth:!0,disabled:!0,sx:{"& .MuiOutlinedInput-notchedOutline":{borderColor:l=>`${l.palette.mode==="dark"?"rgba(255, 255, 255, 0.12) !important":"#dee3e9 !important"}`}}}),e.jsx(t,{htmlFor:"df-email-address",children:"Email"}),e.jsx(o,{id:"df-email-address",helperText:"We'll never share your email with anyone else.",variant:"outlined",fullWidth:!0,disabled:!0,sx:{"& .MuiOutlinedInput-notchedOutline":{borderColor:l=>`${l.palette.mode==="dark"?"rgba(255, 255, 255, 0.12) !important":"#dee3e9 !important"}`}}}),e.jsx(t,{htmlFor:"df-outlined-password-input",children:"Password"}),e.jsx(o,{id:"df-outlined-password-input",type:"password",autoComplete:"current-password",variant:"outlined",fullWidth:!0,disabled:!0,sx:{mb:2,"& .MuiOutlinedInput-notchedOutline":{borderColor:l=>`${l.palette.mode==="dark"?"rgba(255, 255, 255, 0.12) !important":"#dee3e9 !important"}`}}}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",disabled:!0,children:"Submit"})})]})}),H=()=>e.jsx(e.Fragment,{children:e.jsx(F,{children:`
import React from 'react';
import {
  Button,
  FormControlLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { IconLock, IconMail, IconUser } from '@tabler/icons';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 19,
  height: 19,
  marginLeft: '4px',
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
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: 'none',
  width: 19,
  height: 19,
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      "url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E")",
    content: '""',
  },
});

// Inspired by blueprintjs
function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      color={props.color ? props.color : 'default'}
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const [state, setState] = React.useState({
    checkedA: false,
});

const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
};

<form>
    <FormControl fullWidth>
        <CustomFormLabel
            sx={{
              mt: 0,
            }}
            htmlFor="username-text"
        >
            Username
        </CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconUser width={20} />
              </InputAdornment>
            }
            id="username-text"
            placeholder="Username"
            fullWidth
        />
    </FormControl>
    <FormControl fullWidth>
        <CustomFormLabel htmlFor="mail-text">Email</CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconMail width={20} />
              </InputAdornment>
            }
            id="mail-text"
            placeholder="Email"
            fullWidth
        />
    </FormControl>
    <FormControl fullWidth>
        <CustomFormLabel htmlFor="pwd-text">Password</CustomFormLabel>
        <OutlinedInput
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <IconLock width={20} />
              </InputAdornment>
            }
            id="pwd-text"
            placeholder="Password"
            fullWidth
        />
    </FormControl>
    <FormControl fullWidth>
        <CustomFormLabel htmlFor="cpwd-text">Confirm Password</CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconLock width={20} />
              </InputAdornment>
            }
            id="cpwd-text"
            placeholder="Confirm Password"
            fullWidth
        />
    </FormControl>

    <FormControlLabel
        control={
            <CustomCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />
        }
        sx={{
            mt: '10px',
        }}
        label="Remember Me!"
    />
</form>

<Stack direction="row" spacing={2}>
  <Button
    color="primary"
    variant="contained">
    Submit
  </Button>
  <Button variant="contained" color="error">
    Cancel
  </Button>
</Stack>
`})}),$=()=>{const[l,u]=c.useState({checkedA:!1}),n=i=>{u({...l,[i.target.name]:i.target.checked})};return e.jsx(x,{title:"Form with Left Icon",codeModel:e.jsx(H,{}),footer:e.jsx(e.Fragment,{children:e.jsxs(B,{direction:"row",spacing:2,children:[e.jsx(m,{color:"primary",variant:"contained",children:"Submit"}),e.jsx(m,{variant:"contained",color:"error",children:"Cancel"})]})}),children:e.jsxs("form",{children:[e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{sx:{mt:0},htmlFor:"username-text",children:"Username"}),e.jsx(p,{startAdornment:e.jsx(h,{position:"start",children:e.jsx(S,{width:20})}),id:"username-text",placeholder:"Username",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"mail-text",children:"Email"}),e.jsx(p,{startAdornment:e.jsx(h,{position:"start",children:e.jsx(W,{width:20})}),id:"mail-text",placeholder:"Email",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"pwd-text",children:"Password"}),e.jsx(p,{type:"password",startAdornment:e.jsx(h,{position:"start",children:e.jsx(g,{width:20})}),id:"pwd-text",placeholder:"Password",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"cpwd-text",children:"Confirm Password"}),e.jsx(p,{startAdornment:e.jsx(h,{position:"start",children:e.jsx(g,{width:20})}),id:"cpwd-text",placeholder:"Confirm Password",fullWidth:!0})]}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedA,onChange:n,name:"checkedA"}),sx:{mt:"10px"},label:"Remember Me!"})]})})},K=()=>{const[l,u]=c.useState({checkedB:!1}),n=i=>{u({...l,[i.target.name]:i.target.checked})};return e.jsx(x,{title:"Form with Right Icon",footer:e.jsx(e.Fragment,{children:e.jsxs(B,{direction:"row",spacing:1,children:[e.jsx(m,{color:"primary",variant:"contained",children:"Submit"}),e.jsx(m,{variant:"contained",color:"error",children:"Cancel"})]})}),children:e.jsxs("form",{children:[e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{sx:{mt:0},htmlFor:"username2-text",children:"Username"}),e.jsx(p,{endAdornment:e.jsx(h,{position:"end",children:e.jsx(S,{width:20})}),id:"username2-text",placeholder:"Username",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"mail2-text",children:"Email"}),e.jsx(p,{endAdornment:e.jsx(h,{position:"end",children:e.jsx(W,{width:20})}),id:"mail2-text",placeholder:"Email",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"pwd2-text",children:"Password"}),e.jsx(p,{type:"password",endAdornment:e.jsx(h,{position:"end",children:e.jsx(g,{width:20})}),id:"pwd2-text",placeholder:"Password",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"cpwd2-text",children:"Confirm Password"}),e.jsx(p,{endAdornment:e.jsx(h,{position:"end",children:e.jsx(g,{width:20})}),id:"cpwd2-text",placeholder:"Confirm Password",fullWidth:!0})]}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedB,onChange:n,name:"checkedB"}),sx:{mt:"10px"},label:"Remember Me!"})]})})},J=()=>e.jsx(e.Fragment,{children:e.jsx(F,{children:`
import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

<form>
    <CustomFormLabel
        sx={{
            mt: 0,
        }}
        htmlFor="success-input"
    >
        Success Input
    </CustomFormLabel>
    <CustomTextField
        id="success-input"
        variant="outlined"
        defaultValue="Success value"
        fullWidth
        required
        sx={{
            '& input:valid + fieldset': {
              borderColor: '#39cb7f',
            },
            '& input:invalid + fieldset': {
              borderColor: '#fc4b6c',
            },
        }}
    />
    <CustomFormLabel htmlFor="error-input">Error Input</CustomFormLabel>
    <CustomTextField
        id="error-input"
        variant="outlined"
        fullWidth
        required
        error
    />
    <FormControl fullWidth error>
        <CustomFormLabel htmlFor="error-text-input">Input with Error text</CustomFormLabel>
        <CustomTextField
            id="error-text-input"
            variant="outlined"
            fullWidth
            required
            error
            helperText="Incorrect entry."
        />
    </FormControl>
</form>
`})}),Q=()=>e.jsx(x,{title:"Input Variants",codeModel:e.jsx(J,{}),children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"success-input",children:"Success Input"}),e.jsx(o,{id:"success-input",variant:"outlined",defaultValue:"Success value",fullWidth:!0,required:!0,sx:{"& input:valid + fieldset":{borderColor:"#39cb7f"},"& input:invalid + fieldset":{borderColor:"#fc4b6c"}}}),e.jsx(t,{htmlFor:"error-input",children:"Error Input"}),e.jsx(o,{id:"error-input",variant:"outlined",fullWidth:!0,required:!0,error:!0}),e.jsxs(d,{fullWidth:!0,error:!0,children:[e.jsx(t,{htmlFor:"error-text-input",children:"Input with Error text"}),e.jsx(o,{id:"error-text-input",variant:"outlined",fullWidth:!0,required:!0,error:!0,helperText:"Incorrect entry."})]})]})}),X=[{to:"/",title:"Home"},{title:"Form Layouts"}],dt=()=>e.jsxs(M,{title:"Form Layouts",description:"this is innerpage",children:[e.jsx(A,{title:"Form Layouts",items:X}),e.jsxs(a,{container:!0,spacing:3,children:[e.jsx(a,{size:12,children:e.jsx(P,{})}),e.jsx(a,{size:12,children:e.jsx(Q,{})}),e.jsx(a,{size:12,children:e.jsx(z,{})}),e.jsx(a,{size:12,children:e.jsx(U,{})}),e.jsx(a,{size:12,children:e.jsx(N,{})}),e.jsx(a,{size:12,children:e.jsx(q,{})}),e.jsx(a,{size:{xs:12,lg:6},children:e.jsx($,{})}),e.jsx(a,{size:{xs:12,lg:6},children:e.jsx(K,{})})]})]});export{dt as default};
