import{j as e,r as u}from"./index-CJWZi9CB.js";import{B as I}from"./Breadcrumb-DR6zDa-i.js";import{P as h}from"./PageContainer-BR_WMDrZ.js";import{C as l}from"./CodeDialog-BDx_UOfm.js";import{P as s}from"./ParentCard-CuAAl3Vl.js";import{S as o}from"./Stack-C8hAk-Ua.js";import{B as d}from"./Button-BH1WbAiu.js";import{B as p}from"./Box-B21Vn3Wr.js";import{S as c,T as i}from"./TreeItem-BGN2dIpQ.js";import{u as T}from"./useTreeViewApiRef-CWuOYFC8.js";import{G as g}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./Typography-DW8TAfFy.js";import"./index-BwqtTtay.js";import"./Paper-Dk0UhltF.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./createStack-B05ZxkoV.js";import"./composeClasses-CkcSq-l_.js";import"./resolveProps-CxWqPvcr.js";import"./Checkbox-H4Hg7Z4o.js";import"./SwitchBase-D_lOZTBK.js";import"./useFormControl-D8zMB56u.js";import"./Collapse-BBh64Xxr.js";function k(){return e.jsx(l,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ControlledExpansionTree ',
},
]; 


function ControlledExpansionTree() {
    const [expandedItems, setExpandedItems] = React.useState([]);

    const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

    const handleExpandClick = () => {
        setExpandedItems((oldExpanded) =>
            oldExpanded.length === 0
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
                    <Button onClick={handleExpandClick}>
                        {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
                    </Button>
                </div>
                <Box sx={{ minHeight: 352, minWidth: 250 }}>
                    <SimpleTreeView
                        expandedItems={expandedItems}
                        onExpandedItemsChange={handleExpandedItemsChange}
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

export default ControlledExpansionTree
              `})}function b(){const[t,m]=u.useState([]),a=(n,x)=>{m(x)},r=()=>{m(n=>n.length===0?["grid","grid-community","grid-pro","grid-premium","pickers","pickers-community","pickers-pro","charts","charts-community","tree-view","tree-view-community"]:[])};return e.jsx(s,{title:"Expansion Treeview",codeModel:e.jsx(k,{}),children:e.jsxs(o,{spacing:2,children:[e.jsx("div",{children:e.jsx(d,{onClick:r,children:t.length===0?"Expand all":"Collapse all"})}),e.jsx(p,{sx:{minHeight:352,minWidth:250},children:e.jsxs(c,{expandedItems:t,onExpandedItemsChange:a,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}function j(){return e.jsx(l,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
            
const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ApiMethodSetItemExpansion ',
},
]; 

export default function ApiMethodSetItemExpansion() {
    const apiRef = useTreeViewApiRef();

    const handleExpandClick = (event) => {
    apiRef.current.setItemExpansion(event, 'grid', true);
  };

    const handleCollapseClick = (event) => {
    apiRef.current.setItemExpansion(event, 'grid', false);
  };

    return (
            <Stack spacing={2}>
                <Stack spacing={2} direction="row">
                    <Button onClick={handleExpandClick}>Expand Data Grid</Button>
                    <Button onClick={handleCollapseClick}>Collapse Data Grid</Button>
                </Stack>
                <Box sx={{ minHeight: 352, minWidth: 250 }}>
                    <SimpleTreeView apiRef={apiRef}>
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
 
    );
}


`})}function w(){const t=T(),m=r=>{t.current.setItemExpansion(r,"grid",!0)},a=r=>{t.current.setItemExpansion(r,"grid",!1)};return e.jsx(s,{title:"SetItemExpansion Treeview",codeModel:e.jsx(j,{}),children:e.jsxs(o,{spacing:2,children:[e.jsxs(o,{spacing:2,direction:"row",children:[e.jsx(d,{onClick:m,children:"Expand Data Grid"}),e.jsx(d,{onClick:a,children:"Collapse Data Grid"})]}),e.jsx(p,{sx:{minHeight:352,minWidth:250},children:e.jsxs(c,{apiRef:t,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}const C=[{to:"/",title:"Home"},{title:"Simple Treeview "}],Ie=()=>e.jsxs(h,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[e.jsx(I,{title:"Simple Treeview",items:C}),e.jsxs(g,{container:!0,spacing:3,children:[e.jsx(b,{}),e.jsx(w,{})]})]});export{Ie as default};
