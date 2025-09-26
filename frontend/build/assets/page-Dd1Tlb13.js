import{j as e,r as p}from"./index-CJWZi9CB.js";import{B as u}from"./Breadcrumb-DR6zDa-i.js";import{P as x}from"./PageContainer-BR_WMDrZ.js";import{C as t}from"./CodeDialog-BDx_UOfm.js";import{P as r}from"./ParentCard-CuAAl3Vl.js";import{B as m}from"./Box-B21Vn3Wr.js";import{S as l,T as i}from"./TreeItem-BGN2dIpQ.js";import{S as I}from"./Stack-C8hAk-Ua.js";import{B as h}from"./Button-BH1WbAiu.js";import{G as T}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./Typography-DW8TAfFy.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Checkbox-H4Hg7Z4o.js";import"./SwitchBase-D_lOZTBK.js";import"./useFormControl-D8zMB56u.js";import"./Collapse-BBh64Xxr.js";import"./createStack-B05ZxkoV.js";import"./composeClasses-CkcSq-l_.js";import"./resolveProps-CxWqPvcr.js";function b(){return e.jsx(t,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

 const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'MultiSelectTreeView ',
},
]; 

function MultiSelectTreeView() {
    return (
       
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView multiSelect>
                    <TreeItem itemId="grid" label="Data Grid">
                        <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                        <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                        <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                    </TreeItem>
                    <TreeItem itemId="pickers" label="Date and Time Pickers">
                        <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                        <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="charts" label="Charts">
                        <TreeItem itemId="charts-community" label="@mui/x-charts" />
                    </TreeItem>
                    <TreeItem itemId="tree-view" label="Tree View">
                        <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
                    </TreeItem>
                </SimpleTreeView>
            </Box>
     
    )
}

export default MultiSelectTreeView

              `})}function g(){return e.jsx(r,{title:"MultiSelect Treeview",codeModel:e.jsx(b,{}),children:e.jsx(m,{sx:{minHeight:352,minWidth:250},children:e.jsxs(l,{multiSelect:!0,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})})}function S(){return e.jsx(t,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'CheckboxSelection ',
},
]; 

export default function CheckboxSelection() {
    return (
            <Box sx={{ minHeight: 352, minWidth: 290 }}>
                <SimpleTreeView checkboxSelection>
                    <TreeItem itemId="grid" label="Data Grid">
                        <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                        <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                        <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                    </TreeItem>
                    <TreeItem itemId="pickers" label="Date and Time Pickers">
                        <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                        <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="charts" label="Charts">
                        <TreeItem itemId="charts-community" label="@mui/x-charts" />
                    </TreeItem>
                    <TreeItem itemId="tree-view" label="Tree View">
                        <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
                    </TreeItem>
                </SimpleTreeView>
            </Box>
    );
}


                `})}function j(){return e.jsx(r,{title:"CheckboxSelection",codeModel:e.jsx(S,{}),children:e.jsx(m,{sx:{minHeight:352,minWidth:290},children:e.jsxs(l,{checkboxSelection:!0,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})})}function k(){return e.jsx(t,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Button from '@mui/material/Button';

 const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ControlledSelectiontree ',
},
]; 


function ControlledSelectiontree() {
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleSelectedItemsChange = (event, ids) => {
        setSelectedItems(ids);
    };

    const handleSelectClick = () => {
        setSelectedItems((oldSelected) =>
            oldSelected.length === 0
                ? [
                    'grid',
                    'grid-community',
                    'grid-pro',
                    'grid-premium',
                    'pickers',
                    'pickers-community',
                    'pickers-pro',
                    'charts',
                    'charts-community',
                    'tree-view',
                    'tree-view-community',
                ]
                : [],
        );
    };

    return (
       

            <Stack spacing={2}>
                <div>
                    <Button onClick={handleSelectClick}>
                        {selectedItems.length === 0 ? 'Select all' : 'Unselect all'}
                    </Button>
                </div>
                <Box sx={{ minHeight: 352, minWidth: 250 }}>
                    <SimpleTreeView
                        selectedItems={selectedItems}
                        onSelectedItemsChange={handleSelectedItemsChange}
                        multiSelect
                    >
                        <TreeItem itemId="grid" label="Data Grid">
                            <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                            <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                            <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                        </TreeItem>
                        <TreeItem itemId="pickers" label="Date and Time Pickers">
                            <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                            <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                        </TreeItem>
                        <TreeItem itemId="charts" label="Charts">
                            <TreeItem itemId="charts-community" label="@mui/x-charts" />
                        </TreeItem>
                        <TreeItem itemId="tree-view" label="Tree View">
                            <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
                        </TreeItem>
                    </SimpleTreeView>
                </Box>
            </Stack>
   
    )
}

export default ControlledSelectiontree
            
            `})}function w(){const[d,o]=p.useState([]),c=(a,n)=>{o(n)},s=()=>{o(a=>a.length===0?["grid","grid-community","grid-pro","grid-premium","pickers","pickers-community","pickers-pro","charts","charts-community","tree-view","tree-view-community"]:[])};return e.jsx(r,{title:"ControlledSelectiontree",codeModel:e.jsx(k,{}),children:e.jsxs(I,{spacing:2,children:[e.jsx("div",{children:e.jsx(h,{onClick:s,children:d.length===0?"Select all":"Unselect all"})}),e.jsx(m,{sx:{minHeight:352,minWidth:250},children:e.jsxs(l,{selectedItems:d,onSelectedItemsChange:c,multiSelect:!0,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}const v=[{to:"/",title:"Home"},{title:"Simple Treeview "}],Ie=()=>e.jsxs(x,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[e.jsx(u,{title:"Simple Treeview",items:v}),e.jsxs(T,{container:!0,spacing:3,children:[e.jsx(g,{}),e.jsx(j,{}),e.jsx(w,{})]})]});export{Ie as default};
