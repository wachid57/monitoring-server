import{j as t,r as M,J as oe}from"./index-CJWZi9CB.js";import{B as le}from"./Breadcrumb-DR6zDa-i.js";import{P as ne}from"./PageContainer-BR_WMDrZ.js";import{P as w}from"./ParentCard-CuAAl3Vl.js";import{C as k}from"./CodeDialog-BDx_UOfm.js";import{u as se}from"./Paper-Dk0UhltF.js";import{g as V,s as _,v as E,_ as m,a as J,h as X,u as de,T as ce}from"./Typography-DW8TAfFy.js";import{a as ue,C as he,b as me}from"./ChartsOverlay-DMH5itXO.js";import{D as pe,n as ge,u as Ce}from"./useChartContainerDimensions-CjTkzPDm.js";import{d as K,f as be,t as $,a as Y,g as q,v as O,E as Ae,R as xe,C as fe,c as Re}from"./ChartsAxisHighlight-YKpwFUDQ.js";import{d as Q,g as I}from"./getPercentageValue-5YEl6dhY.js";import{u as ve}from"./useSkipAnimation-BL3iWm-Y.js";import{S as Z}from"./Stack-C8hAk-Ua.js";import{G}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./ChartsText-CN86VXtv.js";import"./path-DyVhHtw_.js";import"./createStack-B05ZxkoV.js";import"./composeClasses-CkcSq-l_.js";const Pe=["classes","color","cornerRadius","dataIndex","endAngle","id","innerRadius","isFaded","isHighlighted","onClick","outerRadius","paddingAngle","startAngle","highlightScope"];function Be(e){return X("MuiPieArc",e)}V("MuiPieArc",["root","highlighted","faded"]);const je=e=>{const{classes:a,id:i,isFaded:r,isHighlighted:o,dataIndex:l}=e,n={root:["root",`series-${i}`,`data-index-${l}`,o&&"highlighted",r&&"faded"]};return J(n,Be,a)},ye=_(K.path,{name:"MuiPieArc",slot:"Root",overridesResolver:(e,a)=>a.arc})(({theme:e})=>({stroke:(e.vars||e).palette.background.paper,transition:"opacity 0.2s ease-in, fill 0.2s ease-in, filter 0.2s ease-in"}));function Fe(e){const{classes:a,color:i,cornerRadius:r,dataIndex:o,endAngle:l,id:n,innerRadius:s,isFaded:c,isHighlighted:g,onClick:C,outerRadius:x,paddingAngle:f,startAngle:d}=e,R=E(e,Pe),h={id:n,dataIndex:o,classes:a,color:i,isFaded:c,isHighlighted:g},v=je(h),B=be();return t.jsx(ye,m({d:$([d,l,f,s,x,r],(u,P,b,p,A,y)=>Q().cornerRadius(y)({padAngle:b,startAngle:u,endAngle:P,innerRadius:p,outerRadius:A})),visibility:$([d,l],(u,P)=>u===P?"hidden":"visible"),onClick:C,cursor:C?"pointer":"unset",ownerState:h,className:v.root,fill:h.color,opacity:h.isFaded?.3:1,filter:h.isHighlighted?"brightness(120%)":"none",strokeWidth:1,strokeLinejoin:"round"},R,B({type:"pie",seriesId:n,dataIndex:o})))}const De={keys:e=>e.id,from:({innerRadius:e,outerRadius:a,cornerRadius:i,startAngle:r,endAngle:o,paddingAngle:l,color:n,isFaded:s})=>({innerRadius:e,outerRadius:(e+a)/2,cornerRadius:i,startAngle:(r+o)/2,endAngle:(r+o)/2,paddingAngle:l,fill:n,opacity:s?.3:1}),leave:({innerRadius:e,startAngle:a,endAngle:i})=>({innerRadius:e,outerRadius:e,startAngle:(a+i)/2,endAngle:(a+i)/2}),enter:({innerRadius:e,outerRadius:a,startAngle:i,endAngle:r})=>({innerRadius:e,outerRadius:a,startAngle:i,endAngle:r}),update:({innerRadius:e,outerRadius:a,cornerRadius:i,startAngle:r,endAngle:o,paddingAngle:l,color:n,isFaded:s})=>({innerRadius:e,outerRadius:a,cornerRadius:i,startAngle:r,endAngle:o,paddingAngle:l,fill:n,opacity:s?.3:1}),config:{tension:120,friction:14,clamp:!0}},Le={keys:e=>e.id,from:({innerRadius:e,outerRadius:a,arcLabelRadius:i,cornerRadius:r,startAngle:o,endAngle:l,paddingAngle:n})=>({innerRadius:e,outerRadius:(e+a)/2,cornerRadius:r,arcLabelRadius:i,startAngle:(o+l)/2,endAngle:(o+l)/2,paddingAngle:n,opacity:0}),leave:({innerRadius:e,startAngle:a,endAngle:i})=>({innerRadius:e,outerRadius:e,arcLabelRadius:e,startAngle:(a+i)/2,endAngle:(a+i)/2,opacity:0}),enter:({innerRadius:e,outerRadius:a,startAngle:i,endAngle:r,arcLabelRadius:o})=>({innerRadius:e,outerRadius:a,startAngle:i,endAngle:r,arcLabelRadius:o,opacity:1}),update:({innerRadius:e,outerRadius:a,cornerRadius:i,startAngle:r,endAngle:o,paddingAngle:l,arcLabelRadius:n})=>({innerRadius:e,outerRadius:a,cornerRadius:i,startAngle:r,endAngle:o,paddingAngle:l,arcLabelRadius:n,opacity:1}),config:{tension:120,friction:14,clamp:!0}};function ee(e){const{id:a,data:i,faded:r,highlighted:o,paddingAngle:l=0,innerRadius:n=0,arcLabelRadius:s,outerRadius:c,cornerRadius:g=0}=e,{isFaded:C,isHighlighted:x}=Y();return M.useMemo(()=>i.map((d,R)=>{const h={seriesId:a,dataIndex:R},v=x(h),B=!v&&C(h),u=m({additionalRadius:0},B&&r||v&&o||{}),P=Math.max(0,Math.PI*(u.paddingAngle??l)/180),b=Math.max(0,u.innerRadius??n),p=Math.max(0,u.outerRadius??c+u.additionalRadius),A=u.cornerRadius??g,y=u.arcLabelRadius??s??(b+p)/2;return m({},d,u,{isFaded:B,isHighlighted:v,paddingAngle:P,innerRadius:b,outerRadius:p,cornerRadius:A,arcLabelRadius:y})}),[g,n,c,l,s,i,r,o,C,x,a])}const Ge=["slots","slotProps","innerRadius","outerRadius","cornerRadius","paddingAngle","id","highlighted","faded","data","onItemClick","skipAnimation"];function Se(e){const{slots:a,slotProps:i,innerRadius:r=0,outerRadius:o,cornerRadius:l=0,paddingAngle:n=0,id:s,highlighted:c,faded:g={additionalRadius:-5},data:C,onItemClick:x,skipAnimation:f}=e,d=E(e,Ge),R=ee({innerRadius:r,outerRadius:o,cornerRadius:l,paddingAngle:n,id:s,highlighted:c,faded:g,data:C}),h=q(R,m({},De,{immediate:f})),{highlightScope:v}=Y();if(C.length===0)return null;const B=(a==null?void 0:a.pieArc)??Fe;return t.jsx("g",m({},d,{children:h(({startAngle:u,endAngle:P,paddingAngle:b,innerRadius:p,outerRadius:A,cornerRadius:y},F,D,j)=>t.jsx(B,m({startAngle:u,endAngle:P,paddingAngle:b,innerRadius:p,outerRadius:A,cornerRadius:y,id:s,color:F.color,dataIndex:j,highlightScope:v,isFaded:F.isFaded,isHighlighted:F.isHighlighted,onClick:x&&(L=>{x(L,{type:"pie",seriesId:s,dataIndex:j},F)})},i==null?void 0:i.pieArc)))}))}const we=["id","classes","color","startAngle","endAngle","paddingAngle","arcLabelRadius","innerRadius","outerRadius","cornerRadius","formattedArcLabel","isHighlighted","isFaded","style"];function ke(e){return X("MuiPieArcLabel",e)}const Ie=V("MuiPieArcLabel",["root","highlighted","faded"]),Te=e=>{const{classes:a,id:i,isFaded:r,isHighlighted:o}=e,l={root:["root",`series-${i}`,o&&"highlighted",r&&"faded"]};return J(l,ke,a)},Ee=_(K.text,{name:"MuiPieArcLabel",slot:"Root",overridesResolver:(e,a)=>a.root})(({theme:e})=>({fill:(e.vars||e).palette.text.primary,textAnchor:"middle",dominantBaseline:"middle",pointerEvents:"none"})),W=(e,a)=>(i,r,o,l,n)=>{if(!e)return 0;const[s,c]=Q().cornerRadius(n).centroid({padAngle:o,startAngle:i,endAngle:r,innerRadius:l,outerRadius:l});return a==="x"?s:c};function Me(e){const{id:a,classes:i,color:r,startAngle:o,endAngle:l,paddingAngle:n,arcLabelRadius:s,cornerRadius:c,formattedArcLabel:g,isHighlighted:C,isFaded:x,style:f}=e,d=E(e,we),h=Te({id:a,classes:i,color:r,isFaded:x,isHighlighted:C});return t.jsx(Ee,m({className:h.root},d,{style:m({x:$([o,l,n,s,c],W(g,"x")),y:$([o,l,n,s,c],W(g,"y"))},f),children:g}))}const He=["arcLabel","arcLabelMinAngle","arcLabelRadius","cornerRadius","data","faded","highlighted","id","innerRadius","outerRadius","paddingAngle","skipAnimation","slotProps","slots"],ze=["startAngle","endAngle","paddingAngle","innerRadius","outerRadius","arcLabelRadius","cornerRadius"],$e=180/Math.PI;function _e(e,a,i){var o;if(!e||(i.endAngle-i.startAngle)*$e<a)return null;switch(e){case"label":return O(i.label,"arc");case"value":return(o=i.value)==null?void 0:o.toString();case"formattedValue":return i.formattedValue;default:return e(m({},i,{label:O(i.label,"arc")}))}}function Oe(e){const{arcLabel:a,arcLabelMinAngle:i=0,arcLabelRadius:r,cornerRadius:o=0,data:l,faded:n={additionalRadius:-5},highlighted:s,id:c,innerRadius:g,outerRadius:C,paddingAngle:x=0,skipAnimation:f,slotProps:d,slots:R}=e,h=E(e,He),v=ee({innerRadius:g,outerRadius:C,arcLabelRadius:r,cornerRadius:o,paddingAngle:x,id:c,highlighted:s,faded:n,data:l}),B=q(v,m({},Le,{immediate:f}));if(l.length===0)return null;const u=(R==null?void 0:R.pieArcLabel)??Me;return t.jsx("g",m({},h,{children:B((P,b)=>{let{startAngle:p,endAngle:A,paddingAngle:y,innerRadius:F,outerRadius:D,arcLabelRadius:j,cornerRadius:L}=P,T=E(P,ze);return t.jsx(u,m({startAngle:p,endAngle:A,paddingAngle:y,innerRadius:F,outerRadius:D,arcLabelRadius:j,cornerRadius:L,style:T,id:c,color:b.color,isFaded:b.isFaded,isHighlighted:b.isHighlighted,formattedArcLabel:_e(a,i,b)},d==null?void 0:d.pieArcLabel))})}))}function U(e,a){const{height:i,width:r}=a,{cx:o,cy:l}=e,n=Math.min(r,i)/2,s=I(o??"50%",r),c=I(l??"50%",i);return{cx:s,cy:c,availableRadius:n}}function We(e){const{skipAnimation:a,slots:i,slotProps:r,onItemClick:o}=e,l=Ae(),{left:n,top:s,width:c,height:g}=M.useContext(pe),C=ve(a);if(l===void 0)return null;const{series:x,seriesOrder:f}=l;return t.jsxs("g",{children:[f.map(d=>{const{innerRadius:R,outerRadius:h,cornerRadius:v,paddingAngle:B,data:u,cx:P,cy:b,highlighted:p,faded:A}=x[d],{cx:y,cy:F,availableRadius:D}=U({cx:P,cy:b},{width:c,height:g}),j=I(h??D,D),L=I(R??0,D);return t.jsx("g",{transform:`translate(${n+y}, ${s+F})`,children:t.jsx(Se,{innerRadius:L,outerRadius:j,cornerRadius:v,paddingAngle:B,id:d,data:u,skipAnimation:C,highlighted:p,faded:A,onItemClick:o,slots:i,slotProps:r})},d)}),f.map(d=>{const{innerRadius:R,outerRadius:h,arcLabelRadius:v,cornerRadius:B,paddingAngle:u,arcLabel:P,arcLabelMinAngle:b,data:p,cx:A,cy:y}=x[d],{cx:F,cy:D,availableRadius:j}=U({cx:A,cy:y},{width:c,height:g}),L=I(h??j,j),T=I(R??0,j),H=v===void 0?(L+T)/2:I(v,j);return t.jsx("g",{transform:`translate(${n+F}, ${s+D})`,children:t.jsx(Oe,{innerRadius:T,outerRadius:L??j,arcLabelRadius:H,cornerRadius:B,paddingAngle:u,id:d,data:p,skipAnimation:C,arcLabel:P,arcLabelMinAngle:b,slots:i,slotProps:r})},d)})]})}const Ue=["xAxis","yAxis","series","width","height","margin","colors","sx","tooltip","axisHighlight","skipAnimation","legend","topAxis","leftAxis","rightAxis","bottomAxis","children","slots","slotProps","onItemClick","loading","highlightedItem","onHighlightChange","className"],Ne={top:5,bottom:5,left:5,right:100},Ve={top:5,bottom:5,left:100,right:5},S=M.forwardRef(function(a,i){const r=de({props:a,name:"MuiPieChart"}),{xAxis:o,yAxis:l,series:n,width:s,height:c,margin:g,colors:C,sx:x,tooltip:f={trigger:"item"},axisHighlight:d={x:"none",y:"none"},skipAnimation:R,legend:h,topAxis:v=null,leftAxis:B=null,rightAxis:u=null,bottomAxis:P=null,children:b,slots:p,slotProps:A,onItemClick:y,loading:F,highlightedItem:D,onHighlightChange:j,className:L}=r,T=E(r,Ue),H=oe(),ae=m({},H?Ve:Ne,g),ie=m({direction:"column",position:{vertical:"middle",horizontal:H?"left":"right"}},h);return t.jsxs(xe,m({},T,{ref:i,series:n.map(z=>m({type:"pie"},z)),width:s,height:c,margin:ae,xAxis:o??[{id:ge,scaleType:"point",data:[...new Array(Math.max(...n.map(z=>z.data.length)))].map((z,re)=>re)}],yAxis:l,colors:C,sx:x,disableAxisListener:(f==null?void 0:f.trigger)!=="axis"&&(d==null?void 0:d.x)==="none"&&(d==null?void 0:d.y)==="none",highlightedItem:D,onHighlightChange:j,className:L,skipAnimation:R,children:[t.jsx(ue,{topAxis:v,leftAxis:B,rightAxis:u,bottomAxis:P,slots:p,slotProps:A}),t.jsx(We,{slots:p,slotProps:A,onItemClick:y}),t.jsx(he,{loading:F,slots:p,slotProps:A}),t.jsx(me,m({},ie,{slots:p,slotProps:A})),t.jsx(fe,m({},d)),!F&&t.jsx(Re,m({},f,{slots:p,slotProps:A})),b]}))});function Je(){return t.jsx(k,{children:`
'use client'
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BasicPieChart ',
},
]; 


export default function BasicPieChart() {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const Datacolor = theme.palette.error.main;
    return (
     

            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'series A', color: primary },
                            { id: 1, value: 15, label: 'series B', color: secondary },
                            { id: 2, value: 20, label: 'series C', color: Datacolor },
                        ],
                    },

                ]}
               
                height={300}
            />
     
    );
}
  `})}function Xe(){const e=se(),a=e.palette.primary.main,i=e.palette.secondary.main,r=e.palette.error.main;return t.jsx(w,{title:"Basic Chart",codeModel:t.jsx(Je,{}),children:t.jsx(S,{series:[{data:[{id:0,value:10,label:"series A",color:a},{id:1,value:15,label:"series B",color:i},{id:2,value:20,label:"series C",color:r}]}],height:300})})}function Ke(){return t.jsx(k,{children:`
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'TwoLevelPieChart ',
},
]; 


function TwoLevelPieChart() {
    const data1 = [
      { label: "Group A", value: 400, color: "#5D87FF" },
      { label: "Group B", value: 300, color: "#0074BA" },
      { label: "Group C", value: 300, color: "#763EBD" },
      { label: "Group D", value: 200, color: "#0A7EA4" },
    ];
    const data2 = [
      { label: "A1", value: 100, color: "#01C0C8" },
      { label: "A2", value: 300, color: "#FA896B" },
      { label: "B1", value: 100, color: "#01C0C8" },
      { label: "B2", value: 80, color: "#0074BA" },
      { label: "B3", value: 40, color: "#49BEFF" },
      { label: "B4", value: 30, color: "#47D7BC" },
      { label: "B5", value: 50, color: "#FFCD56" },
      { label: "C1", value: 100, color: "#95CFD5" },
      { label: "C2", value: 200, color: "#CCDA4E" },
      { label: "D1", value: 150, color: "#0A7EA4" },
      { label: "D2", value: 50, color: "#FB9678" },
    ];
  
    return (
      <PieChart
        series={[
          {
            innerRadius: 0,
            outerRadius: 80,
            data: data1,
          },
          {
            innerRadius: 100,
            outerRadius: 120,
            data: data2,
          },
        ]}
        width={400}
        height={300}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    );
  }
  
  export default TwoLevelPieChart;
  
`})}function Ye(){const e=[{label:"Group A",value:400,color:"#5D87FF"},{label:"Group B",value:300,color:"#0074BA"},{label:"Group C",value:300,color:"#763EBD"},{label:"Group D",value:200,color:"#0A7EA4"}],a=[{label:"A1",value:100,color:"#01C0C8"},{label:"A2",value:300,color:"#FA896B"},{label:"B1",value:100,color:"#01C0C8"},{label:"B2",value:80,color:"#0074BA"},{label:"B3",value:40,color:"#49BEFF"},{label:"B4",value:30,color:"#47D7BC"},{label:"B5",value:50,color:"#FFCD56"},{label:"C1",value:100,color:"#95CFD5"},{label:"C2",value:200,color:"#CCDA4E"},{label:"D1",value:150,color:"#0A7EA4"},{label:"D2",value:50,color:"#FB9678"}];return t.jsx(w,{title:"TwoLevel Chart",codeModel:t.jsx(Ke,{}),children:t.jsx(S,{series:[{innerRadius:0,outerRadius:80,data:e},{innerRadius:100,outerRadius:120,data:a}],width:400,height:300,slotProps:{legend:{hidden:!0}}})})}function qe(){return t.jsx(k,{children:`
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
  
const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'StraightAnglePieChart ',
},
]; 

    const data = [
        { label: 'Group A', value: 400, color: "#5D87FF" },
        { label: 'Group B', value: 300, color: "#0074BA" },
        { label: 'Group C', value: 300, color: "#01C0C8" },
        { label: 'Group D', value: 200, color: "#CCDA4E" },
        { label: 'Group E', value: 278, color: "#FB9678" },
        { label: 'Group F', value: 189, color: "#47D7BC" },
    ];
    
    export default function StraightAnglePieChart() {
    
            return (
            <PieChart
                series={[
                    {
                        startAngle: -90,
                        endAngle: 90,
                        data,
                    },
                ]}
                height={300}
            />
   
  )
}
  `})}function Qe(){const e=[{label:"Group A",value:400,color:"#5D87FF"},{label:"Group B",value:300,color:"#0074BA"},{label:"Group C",value:300,color:"#01C0C8"},{label:"Group D",value:200,color:"#CCDA4E"},{label:"Group E",value:278,color:"#FB9678"},{label:"Group F",value:189,color:"#49BEFF"}];return t.jsx(w,{title:"StraightAngle Chart",codeModel:t.jsx(qe,{}),children:t.jsx(S,{series:[{startAngle:-90,endAngle:90,data:e}],height:300})})}function Ze(){return t.jsx(k,{children:`
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'TwoSimplePieChart ',
},
]; 

const data1 = [
    { label: 'Group A', value: 400, color: "#5D87FF" },
    { label: 'Group B', value: 300, color: "#0074BA" },
    { label: 'Group C', value: 300, color: "#763EBD" },
    { label: 'Group D', value: 200, color: "#0A7EA4" },
    { label: 'Group E', value: 278, color: "#01C0C8" },
    { label: 'Group F', value: 189, color: "#FA896B" },
];

const data2 = [
    { label: 'Group A', value: 2400, color: "#01C0C8" },
    { label: 'Group B', value: 4567, color: "#0074BA" },
    { label: 'Group C', value: 1398, color: "#49BEFF" },
    { label: 'Group D', value: 9800, color: "#47D7BC" },
    { label: 'Group E', value: 3908, color: "#FFCD56" },
    { label: 'Group F', value: 4800, color: "#95CFD5" },
];


export default function TwoSimplePieChart() {
    return (
      

            <PieChart
                series={[
                  {
                        outerRadius: 80,
                        data: data1,
                        cx: 100,
                        cy: 200,
                    },
                    {
                        data: data2,
                        cx: 300,
                        cy: 100,
                        innerRadius: 40,
                        outerRadius: 80,
                    },
                ]}
                height={300}
                slotProps={{
                    legend: { hidden: true },
                }}
            />
    
    );
}
         `})}const et=[{label:"Group A",value:400,color:"#5D87FF"},{label:"Group B",value:300,color:"#0074BA"},{label:"Group C",value:300,color:"#763EBD"},{label:"Group D",value:200,color:"#0A7EA4"},{label:"Group E",value:278,color:"#01C0C8"},{label:"Group F",value:189,color:"#FA896B"}],tt=[{label:"Group A",value:2400,color:"#01C0C8"},{label:"Group B",value:4567,color:"#0074BA"},{label:"Group C",value:1398,color:"#49BEFF"},{label:"Group D",value:9800,color:"#47D7BC"},{label:"Group E",value:3908,color:"#FFCD56"},{label:"Group F",value:4800,color:"#95CFD5"}];function at(){return t.jsx(w,{title:"TwoSimple Chart",codeModel:t.jsx(Ze,{}),children:t.jsx(S,{series:[{outerRadius:80,data:et,cx:100,cy:200},{data:tt,cx:300,cy:100,innerRadius:40,outerRadius:80}],height:300,slotProps:{legend:{hidden:!0}}})})}function it(){return t.jsx(k,{children:`
import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'PieChartWithCustomizedLabel ',
},
]; 

const data = [
    { label: 'Group A', value: 400, color: '#5D87FF' },
    { label: 'Group B', value: 300, color: '#0074BA' },
    { label: 'Group C', value: 300, color: '#01C0C8' },
    { label: 'Group D', value: 200, color: '#CCDA4E' },
];

const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return \`\${(percent * 100).toFixed(0)}%\`;
};

            export default function PieChartWithCustomizedLabel() {
    return (
      
                <PieChart
                    series={[
                        {
                            outerRadius: 80,
                            data,
                            arcLabel: getArcLabel,
                        },
                    ]}
                    sx={{
                        [\`& .\${pieArcLabelClasses.root}\`]: {
                            fill: 'white',
                            fontSize: 14,
                        },
                    }}
                    {...sizing}
                />
      
            );
}
            `})}const te=[{label:"Group A",value:400,color:"#5D87FF"},{label:"Group B",value:300,color:"#0074BA"},{label:"Group C",value:300,color:"#01C0C8"},{label:"Group D",value:200,color:"#CCDA4E"}],rt={margin:{right:5},width:200,height:200,legend:{hidden:!0}},ot=te.map(e=>e.value).reduce((e,a)=>e+a,0),lt=e=>`${(e.value/ot*100).toFixed(0)}%`;function nt(){return t.jsx(w,{title:"CustomizedLabel Chart",codeModel:t.jsx(it,{}),children:t.jsx(S,{series:[{outerRadius:80,data:te,arcLabel:lt}],sx:{[`& .${Ie.root}`]:{fill:"white",fontSize:14}},...rt})})}function st(){return t.jsx(k,{children:`
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'PieChartWithPaddingAngleChart ',
},
]; 


const data = [
    { label: 'Group A', value: 400, color: "#5D87FF" },
    { label: 'Group B', value: 300, color: "#FA896B" },
    { label: 'Group C', value: 300, color: "#FFCD56" },
    { label: 'Group D', value: 200, color: "#95CFD5" },
];

export default function PieChartWithPaddingAngleChart() {
    return (
     

            <Stack direction="row">
                <PieChart
                    series={[
                        {
                            paddingAngle: 5,
                            innerRadius: 60,
                            outerRadius: 80,
                            data,
                        },
                    ]}
                    margin={{ right: 5 }}
                    width={200}
                    height={200}
                    legend={{ hidden: true }}
                />
                <PieChart
                    series={[
                        {
                            startAngle: -90,
                            endAngle: 90,
                            paddingAngle: 5,
                            innerRadius: 60,
                            outerRadius: 80,
                            data,

                        },
                    ]}
                    margin={{ right: 5 }}
                    width={200}
                    height={200}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                />
            </Stack>
    
    );
}

            `})}const N=[{label:"Group A",value:400,color:"#5D87FF"},{label:"Group B",value:300,color:"#FA896B"},{label:"Group C",value:300,color:"#FFCD56"},{label:"Group D",value:200,color:"#95CFD5"}];function dt(){return t.jsx(w,{title:"PaddingAngle Chart",codeModel:t.jsx(st,{}),children:t.jsxs(Z,{direction:"row",children:[t.jsx(S,{series:[{paddingAngle:5,innerRadius:60,outerRadius:80,data:N}],margin:{right:5},width:200,height:200,legend:{hidden:!0}}),t.jsx(S,{series:[{startAngle:-90,endAngle:90,paddingAngle:5,innerRadius:60,outerRadius:80,data:N}],margin:{right:5},width:200,height:200,slotProps:{legend:{hidden:!0}}})]})})}function ct(){return t.jsx(k,{children:`
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'PieChartWithCenterLabelChart ',
},
]; 


const data = [
  { value: 5, label: 'A', color: '#5D87FF' },
  { value: 10, label: 'B', color: '#0074BA' },
  { value: 15, label: 'C', color: '#01C0C8' },
  { value: 20, label: 'D', color: '#CCDA4E' },
];

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
      <StyledText x={left + width / 2} y={top + height / 2}>
          {children}
      </StyledText>
  );
}

export default function PieChartWithCenterLabelChart() {
  return (
   

          <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
              <PieCenterLabel>Center label</PieCenterLabel>
          </PieChart>

  );
}


            `})}const ut=[{value:5,label:"A",color:"#5D87FF"},{value:10,label:"B",color:"#0074BA"},{value:15,label:"C",color:"#01C0C8"},{value:20,label:"D",color:"#CCDA4E"}],ht={width:400,height:200},mt=_("text")(({theme:e})=>({fill:e.palette.text.primary,textAnchor:"middle",dominantBaseline:"central",fontSize:20}));function pt({children:e}){const{width:a,height:i,left:r,top:o}=Ce();return t.jsx(mt,{x:r+a/2,y:o+i/2,children:e})}function gt(){return t.jsx(w,{title:"CenterLabel Chart",codeModel:t.jsx(ct,{}),children:t.jsx(S,{series:[{data:ut,innerRadius:80}],...ht,children:t.jsx(pt,{children:"Center label"})})})}function Ct(){return t.jsx(k,{children:`
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
      
const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'OnSeriesItemClickChart ',
},
]; 

const items = [
  { value: 10, label: 'Series A ( no Id )', color: '#CCDA4E' },
  { id: 'id_B', value: 15, label: 'Series B', color: '#0074BA' },
  { id: 'id_C', value: 20, label: 'Series C', color: '#01C0C8' },
];

const formatObject = (obj) => {
  if (obj === null) {
      return '  undefined';
  }
  return JSON.stringify(obj, null, 2)
      .split('
')
      .map((l) => \`  \${l}\`)
      .join('
');
};

export default function OnSeriesItemClickChart() {
  const [identifier, setIdentifier] = React.useState(null);
      const [id, setId] = React.useState(undefined);

        const handleClick = (event, itemIdentifier, item) => {
        setId(item.id);
        setIdentifier(itemIdentifier);
    };


      return (
   

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Typography
            component="pre"
            sx={{ maxWidth: { xs: '100%', md: '50%', flexShrink: 1 }, overflow: 'auto' }}
          >
            {\`item id: \${id ?? 'undefined'}

                 item identifier:
                 \${formatObject(identifier)}\`}
          </Typography>

          <PieChart
            series={[
              {
                data: items,
              },
            ]}
            onItemClick={handleClick}
            width={400}
            height={200}
            margin={{ right: 200 }}
          />
        </Stack>
 
      );
}


      `})}const bt=[{value:10,label:"Series A ( no Id )",color:"#CCDA4E"},{id:"id_B",value:15,label:"Series B",color:"#0074BA"},{id:"id_C",value:20,label:"Series C",color:"#01C0C8"}],At=e=>e===null?"  undefined":JSON.stringify(e,null,2).split(`
`).map(a=>`  ${a}`).join(`
`);function xt(){const[e,a]=M.useState(null),[i,r]=M.useState(void 0),o=(l,n,s)=>{r(s.id),a(n)};return t.jsx(w,{title:"OnSeriesItemClick Chart",codeModel:t.jsx(Ct,{}),children:t.jsxs(Z,{direction:{xs:"column",md:"row"},alignItems:{xs:"flex-start",md:"center"},justifyContent:"space-between",sx:{width:"100%"},children:[t.jsx(ce,{component:"pre",sx:{maxWidth:{xs:"100%",md:"50%",flexShrink:1},overflow:"auto"},children:`item id: ${i??"undefined"}

                   item identifier:
                   ${At(e)}`}),t.jsx(S,{series:[{data:bt}],onItemClick:o,width:400,height:200,margin:{right:200}})]})})}const ft=[{to:"/",title:"Home"},{title:"PieCharts"}],ua=()=>t.jsxs(ne,{title:"PieCharts",description:"this is PieCharts ",children:[t.jsx(le,{title:"PieCharts",items:ft}),t.jsxs(G,{container:!0,spacing:3,children:[t.jsx(G,{size:{md:6},children:t.jsx(Xe,{})}),t.jsx(G,{size:{md:6},children:t.jsx(Ye,{})}),t.jsx(G,{size:{md:6},children:t.jsx(Qe,{})}),t.jsx(G,{size:{md:6},children:t.jsx(at,{})}),t.jsx(G,{size:{md:6},children:t.jsx(nt,{})}),t.jsx(G,{size:{md:6},children:t.jsx(gt,{})}),t.jsx(G,{size:{md:6},children:t.jsx(dt,{})}),t.jsx(G,{size:{md:6},children:t.jsx(xt,{})})]})]});export{ua as default};
