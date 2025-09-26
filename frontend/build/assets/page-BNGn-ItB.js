import{j as i,r as j,b as M}from"./index-CJWZi9CB.js";import{B as ue}from"./Breadcrumb-DR6zDa-i.js";import{P as Ie}from"./PageContainer-BR_WMDrZ.js";import{c as Q,S as xe,e as h,r as _}from"./Paper-Dk0UhltF.js";import{P as X}from"./ParentCard-CuAAl3Vl.js";import{C as Y}from"./CodeDialog-BDx_UOfm.js";import{s as y,d as N,_ as c,A as G,v as fe}from"./Typography-DW8TAfFy.js";import{T as ge,t as be,S as Z,u as F,h as q,a as O,b as Ce,g as Te,i as U,c as he,d as ve,e as ye}from"./TreeItem-BGN2dIpQ.js";import{B as $}from"./Box-B21Vn3Wr.js";import{C as we}from"./Collapse-BBh64Xxr.js";import{C as Pe}from"./Checkbox-H4Hg7Z4o.js";import{u as ke}from"./useSlotProps-Dmx4i6VU.js";import{A as Se}from"./Avatar-YolhUzp1.js";import{G as je}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./Link-DrUusogV.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./SwitchBase-D_lOZTBK.js";import"./useFormControl-D8zMB56u.js";import"./composeClasses-CkcSq-l_.js";const Re=Q(i.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4z"}),"AddBox"),Be=Q(i.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 10H7v-2h10z"}),"IndeterminateCheckBox");function Ee(){return i.jsx(Y,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
 const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BasicCustomIcons ',
},
]; 


const CustomTreeItem = styled(TreeItem)({
    [\`& .\${treeItemClasses.iconContainer}\`]: {
                '& .close': {
                opacity: 0.3,
        },
    },
});

function CloseSquare(props) {
    return (
            <SvgIcon
                className="close"
                fontSize="inherit"
                style={{ width: 14, height: 14 }}
                {...props}
            >
                {/* tslint:disable-next-line: max-line-length */}
                <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
            </SvgIcon>
            );
}

export default function BasicCustomIcons() {
    return (

            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView
                    defaultExpandedItems={['grid']}
                    slots={{
                        expandIcon: AddBoxIcon,
                        collapseIcon: IndeterminateCheckBoxIcon,
                        endIcon: CloseSquare,
                    }}
                >
                    <CustomTreeItem itemId="grid" label="Data Grid">
                        <CustomTreeItem itemId="grid-community" label="@mui/x-data-grid" />
                        <CustomTreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                        <CustomTreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                    </CustomTreeItem>
                    <CustomTreeItem itemId="pickers" label="Date and Time Pickers">
                        <CustomTreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                        <CustomTreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                    </CustomTreeItem>
                    <CustomTreeItem itemId="charts" label="Charts">
                        <CustomTreeItem itemId="charts-community" label="@mui/x-charts" />
                    </CustomTreeItem>
                    <CustomTreeItem itemId="tree-view" label="Tree View">
                        <CustomTreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
                    </CustomTreeItem>
                </SimpleTreeView>
            </Box>

            );
}


            `})}const g=y(ge)({[`& .${be.iconContainer}`]:{"& .close":{opacity:.3}}});function Me(e){return i.jsx(xe,{className:"close",fontSize:"inherit",style:{width:14,height:14},...e,children:i.jsx("path",{d:"M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z"})})}function Ae(){return i.jsx(X,{title:"CustomIcons Treeview",codeModel:i.jsx(Ee,{}),children:i.jsx($,{sx:{minHeight:352,minWidth:250},children:i.jsxs(Z,{defaultExpandedItems:["grid"],slots:{expandIcon:Re,collapseIcon:Be,endIcon:Me},children:[i.jsxs(g,{itemId:"grid",label:"Data Grid",children:[i.jsx(g,{itemId:"grid-community",label:"@mui/x-data-grid"}),i.jsx(g,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),i.jsx(g,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),i.jsxs(g,{itemId:"pickers",label:"Date and Time Pickers",children:[i.jsx(g,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),i.jsx(g,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),i.jsx(g,{itemId:"charts",label:"Charts",children:i.jsx(g,{itemId:"charts-community",label:"@mui/x-charts"})}),i.jsx(g,{itemId:"tree-view",label:"Tree View",children:i.jsx(g,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})})}const H=e=>Array.isArray(e)?e.length>0&&e.some(H):!!e,Le=({itemId:e,children:s})=>{const{instance:r,selection:{multiSelect:I},publicAPI:x}=F(),p={expandable:H(s),expanded:r.isItemExpanded(e),focused:r.isItemFocused(e),selected:r.isItemSelected(e),disabled:r.isItemDisabled(e),editing:r!=null&&r.isItemBeingEdited?r==null?void 0:r.isItemBeingEdited(e):!1,editable:r.isItemEditable?r.isItemEditable(e):!1},v=a=>{if(p.disabled)return;p.focused||r.focusItem(a,e);const b=I&&(a.shiftKey||a.ctrlKey||a.metaKey);p.expandable&&!(b&&r.isItemExpanded(e))&&r.toggleItemExpansion(a,e)},m=a=>{if(p.disabled)return;p.focused||r.focusItem(a,e),I&&(a.shiftKey||a.ctrlKey||a.metaKey)?a.shiftKey?r.expandSelectionRange(a,e):r.selectItem({event:a,itemId:e,keepExistingSelection:!0}):r.selectItem({event:a,itemId:e,shouldBeSelected:!0})},T=a=>{const b=a.nativeEvent.shiftKey;I&&b?r.expandSelectionRange(a,e):r.selectItem({event:a,itemId:e,keepExistingSelection:I,shouldBeSelected:a.target.checked})},u=()=>{q(r,O)&&r.isItemEditable(e)&&(r.isItemBeingEdited(e)?r.setEditedItemId(null):r.setEditedItemId(e))};return{interactions:{handleExpansion:v,handleSelection:m,handleCheckboxSelection:T,toggleItemEditing:u,handleSaveItemLabel:(a,b)=>{q(r,O)&&r.isItemBeingEditedRef(e)&&(r.updateItemLabel(e,b),u(),r.focusItem(a,e))},handleCancelItemLabelEditing:a=>{q(r,O)&&r.isItemBeingEditedRef(e)&&(u(),r.focusItem(a,e))}},status:p,publicAPI:x}},De=e=>{const{runItemPlugins:s,items:{onItemClick:r,disabledItemsFocusable:I,indentationAtItemLevel:x},selection:{disableSelection:p,checkboxSelection:v},expansion:{expansionTrigger:m},treeId:T,instance:u,publicAPI:w}=F(),k=j.useContext(Ce),{id:B,itemId:a,label:b,children:E,rootRef:A}=e,{rootRef:ee,contentRef:te,propsEnhancers:f}=s(e),{interactions:P,status:d}=Le({itemId:a,children:E}),L=j.useRef(null),D=j.useRef(null),z=N(A,ee,L),oe=N(te,D),K=j.useRef(null),ie=Te({itemId:a,treeId:T,id:B}),re=u.canItemBeTabbed(a)?0:-1,V={rootRefObject:L,contentRefObject:D,interactions:P},ne=o=>t=>{var l;if((l=o.onFocus)==null||l.call(o,t),t.defaultMuiPrevented)return;const n=!d.disabled||I;!d.focused&&n&&t.currentTarget===t.target&&u.focusItem(t,a)},se=o=>t=>{var l,C,R,W,J;if((l=o.onBlur)==null||l.call(o,t),t.defaultMuiPrevented)return;const n=u.getItemDOMElement(a);d.editing||t.relatedTarget&&U(t.relatedTarget,n)&&(t.target&&((R=(C=t.target)==null?void 0:C.dataset)==null?void 0:R.element)==="labelInput"&&U(t.target,n)||((J=(W=t.relatedTarget)==null?void 0:W.dataset)==null?void 0:J.element)==="labelInput")||u.removeFocusedItem()},ae=o=>t=>{var n,l,C;(n=o.onKeyDown)==null||n.call(o,t),!(t.defaultMuiPrevented||((C=(l=t.target)==null?void 0:l.dataset)==null?void 0:C.element)==="labelInput")&&u.handleItemKeyDown(t,a)},le=o=>t=>{var n;(n=o.onDoubleClick)==null||n.call(o,t),!t.defaultMuiPrevented&&P.toggleItemEditing()},ce=o=>t=>{var n,l;(n=o.onClick)==null||n.call(o,t),r==null||r(t,a),!(t.defaultMuiPrevented||(l=K.current)!=null&&l.contains(t.target))&&(m==="content"&&P.handleExpansion(t),v||P.handleSelection(t))},me=o=>t=>{var n;(n=o.onMouseDown)==null||n.call(o,t),!t.defaultMuiPrevented&&(t.shiftKey||t.ctrlKey||t.metaKey||d.disabled)&&t.preventDefault()},de=o=>t=>{var n;(n=o.onChange)==null||n.call(o,t),!t.defaultMuiPrevented&&(p||d.disabled||P.handleCheckboxSelection(t))},pe=o=>t=>{var n;(n=o.onClick)==null||n.call(o,t),!t.defaultMuiPrevented&&m==="iconContainer"&&P.handleExpansion(t)};return{getRootProps:(o={})=>{var R;const t=c({},h(e),h(o));let n;d.selected?n=!0:p||d.disabled?n=void 0:n=!1;const l=c({},t,{ref:z,role:"treeitem",tabIndex:re,id:ie,"aria-expanded":d.expandable?d.expanded:void 0,"aria-selected":n,"aria-disabled":d.disabled||void 0},o,{onFocus:ne(t),onBlur:se(t),onKeyDown:ae(t)});x&&(l.style={"--TreeView-itemDepth":typeof k=="function"?k(a):k});const C=((R=f.root)==null?void 0:R.call(f,c({},V,{externalEventHandlers:t})))??{};return c({},l,C)},getContentProps:(o={})=>{var C;const t=h(o),n=c({},t,o,{ref:oe,onClick:ce(t),onMouseDown:me(t),status:d});x&&(n.indentationAtItemLevel=!0);const l=((C=f.content)==null?void 0:C.call(f,c({},V,{externalEventHandlers:t})))??{};return c({},n,l)},getGroupTransitionProps:(o={})=>{const t=h(o),n=c({},t,{unmountOnExit:!0,component:"ul",role:"group",in:d.expanded,children:E},o);return x&&(n.indentationAtItemLevel=!0),n},getIconContainerProps:(o={})=>{const t=h(o);return c({},t,o,{onClick:pe(t)})},getCheckboxProps:(o={})=>{const t=h(o);return c({},t,{visible:v,ref:K,checked:d.selected,disabled:p||d.disabled,tabIndex:-1},o,{onChange:de(t)})},getLabelProps:(o={})=>{const t=c({},h(o)),n=c({},t,{children:b},o,{onDoubleClick:le(t)});return u.isTreeViewEditable&&(n.editable=d.editable),n},getLabelInputProps:(o={})=>{var l;const t=h(o),n=((l=f.labelInput)==null?void 0:l.call(f,{rootRefObject:L,contentRefObject:D,externalEventHandlers:t,interactions:P}))??{};return c({},o,n)},getDragAndDropOverlayProps:(o={})=>{var l;const t=h(o),n=((l=f.dragAndDropOverlay)==null?void 0:l.call(f,c({},V,{externalEventHandlers:t})))??{};return c({},o,n)},rootRef:z,status:d,publicAPI:w}},Ve=De;function qe(e){const{slots:s,slotProps:r,status:I}=e,x=F(),p=c({},x.icons.slots,{expandIcon:x.icons.slots.expandIcon??he,collapseIcon:x.icons.slots.collapseIcon??ve}),v=x.icons.slotProps;let m;s!=null&&s.icon?m="icon":I.expandable?I.expanded?m="collapseIcon":m="expandIcon":m="endIcon";const T=(s==null?void 0:s[m])??p[m],u=ke({elementType:T,externalSlotProps:w=>c({},_(v[m],w),_(r==null?void 0:r[m],w)),ownerState:{}});return T?i.jsx(T,c({},u)):null}const Oe=["visible"],Ge=y("li",{name:"MuiTreeItem2",slot:"Root",overridesResolver:(e,s)=>s.root})({listStyle:"none",margin:0,padding:0,outline:0}),Fe=y("div",{name:"MuiTreeItem2",slot:"Content",overridesResolver:(e,s)=>s.content,shouldForwardProp:e=>G(e)&&e!=="status"&&e!=="indentationAtItemLevel"})(({theme:e})=>({padding:e.spacing(.5,1),borderRadius:e.shape.borderRadius,width:"100%",boxSizing:"border-box",position:"relative",display:"flex",alignItems:"center",gap:e.spacing(1),cursor:"pointer",WebkitTapHighlightColor:"transparent","&:hover":{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},variants:[{props:{indentationAtItemLevel:!0},style:{paddingLeft:`calc(${e.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`}},{props:({status:s})=>s.disabled,style:{opacity:(e.vars||e).palette.action.disabledOpacity,backgroundColor:"transparent"}},{props:({status:s})=>s.focused,style:{backgroundColor:(e.vars||e).palette.action.focus}},{props:({status:s})=>s.selected,style:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity)}}}},{props:({status:s})=>s.selected&&s.focused,style:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}]})),$e=y("div",{name:"MuiTreeItem2",slot:"Label",overridesResolver:(e,s)=>s.label,shouldForwardProp:e=>G(e)&&e!=="editable"})(({theme:e})=>c({width:"100%",boxSizing:"border-box",minWidth:0,position:"relative",overflow:"hidden"},e.typography.body1,{variants:[{props:({editable:s})=>s,style:{paddingLeft:"2px"}}]})),ze=y("div",{name:"MuiTreeItem2",slot:"IconContainer",overridesResolver:(e,s)=>s.iconContainer})({width:16,display:"flex",flexShrink:0,justifyContent:"center","& svg":{fontSize:18}}),Ke=y(we,{name:"MuiTreeItem2",slot:"GroupTransition",overridesResolver:(e,s)=>s.groupTransition,shouldForwardProp:e=>G(e)&&e!=="indentationAtItemLevel"})({margin:0,padding:0,paddingLeft:"var(--TreeView-itemChildrenIndentation)",variants:[{props:{indentationAtItemLevel:!0},style:{paddingLeft:0}}]}),We=y(j.forwardRef((e,s)=>{const{visible:r}=e,I=fe(e,Oe);return r?i.jsx(Pe,c({},I,{ref:s})):null}),{name:"MuiTreeItem2",slot:"Checkbox",overridesResolver:(e,s)=>s.checkbox})({padding:0});function Je(){return i.jsx(Y,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
  TreeItem2Checkbox,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
            
 const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'CustomTreeItemView ',
},
]; 


const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
    padding: theme.spacing(0.5, 1),
  }));
  
  
  
  const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;
    const {
      getRootProps,
      getContentProps,
      getIconContainerProps,
      getCheckboxProps,
      getLabelProps,
      getGroupTransitionProps,
      status,
    } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });
  
    return (
      <TreeItem2Provider itemId={itemId}>
        <TreeItem2Root {...getRootProps(other)}>
          <CustomTreeItemContent {...getContentProps()}>
            <TreeItem2IconContainer {...getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </TreeItem2IconContainer>
            <TreeItem2Checkbox {...getCheckboxProps()} />
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              <Avatar
                sx={(theme) => ({
                  background: theme.palette.primary.main,
                  width: 24,
                  height: 24,
                  fontSize: '0.8rem',
                })}
              >
                {(label )[0]}
              </Avatar>
              <TreeItem2Label {...getLabelProps()} />
            </Box>
          </CustomTreeItemContent>
          {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
        </TreeItem2Root>
      </TreeItem2Provider>
    );
  });
  
  export default function CustomTreeItemView() {
    return (
    
  
        <Box sx={{ minHeight: 200, minWidth: 250 }}>
          <SimpleTreeView defaultExpandedItems={['3']}>
            <CustomTreeItem itemId="1" label="Amelia Hart">
              <CustomTreeItem itemId="2" label="Jane Fisher" />
            </CustomTreeItem>
            <CustomTreeItem itemId="3" label="Bailey Monroe">
              <CustomTreeItem itemId="4" label="Freddie Reed" />
              <CustomTreeItem itemId="5" label="Georgia Johnson">
                <CustomTreeItem itemId="6" label="Samantha Malone" />
              </CustomTreeItem>
            </CustomTreeItem>
          </SimpleTreeView>
        </Box>
   
    );
  }
                 `})}const _e=y(Fe)(({theme:e})=>({padding:e.spacing(.5,1)})),S=j.forwardRef(function(s,r){const{id:I,itemId:x,label:p,disabled:v,children:m,...T}=s,{getRootProps:u,getContentProps:w,getIconContainerProps:k,getCheckboxProps:B,getLabelProps:a,getGroupTransitionProps:b,status:E}=Ve({id:I,itemId:x,children:m,label:p,disabled:v,rootRef:r});return i.jsx(ye,{itemId:x,children:i.jsxs(Ge,{...u(T),children:[i.jsxs(_e,{...w(),children:[i.jsx(ze,{...k(),children:i.jsx(qe,{status:E})}),i.jsx(We,{...B()}),i.jsxs($,{sx:{flexGrow:1,display:"flex",gap:1},children:[i.jsx(Se,{sx:A=>({background:A.palette.primary.main,width:24,height:24,fontSize:"0.8rem"}),children:p[0]}),i.jsx($e,{...a()})]})]}),m&&i.jsx(Ke,{...b()})]})})});function Ne(){return i.jsx(X,{title:"CustomTreeItem",codeModel:i.jsx(Je,{}),children:i.jsx($,{sx:{minHeight:200,minWidth:250},children:i.jsxs(Z,{defaultExpandedItems:["3"],children:[i.jsx(S,{itemId:"1",label:"Amelia Hart",children:i.jsx(S,{itemId:"2",label:"Jane Fisher"})}),i.jsxs(S,{itemId:"3",label:"Bailey Monroe",children:[i.jsx(S,{itemId:"4",label:"Freddie Reed"}),i.jsx(S,{itemId:"5",label:"Georgia Johnson",children:i.jsx(S,{itemId:"6",label:"Samantha Malone"})})]})]})})})}const Ue=[{to:"/",title:"Home"},{title:"Simple Treeview "}],Wt=()=>i.jsxs(Ie,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[i.jsx(ue,{title:"Simple Treeview",items:Ue}),i.jsxs(je,{container:!0,spacing:3,children:[i.jsx(Ae,{}),i.jsx(Ne,{})]})]});export{Wt as default};
