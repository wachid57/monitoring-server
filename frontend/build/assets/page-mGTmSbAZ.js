import{r as te,j as e}from"./index-CJWZi9CB.js";import{B as re}from"./Breadcrumb-DR6zDa-i.js";import{P as se}from"./PageContainer-BR_WMDrZ.js";import{P as h}from"./ParentCard-CuAAl3Vl.js";import{C as x}from"./CodeDialog-BDx_UOfm.js";import{u}from"./Paper-Dk0UhltF.js";import{v as ie,_ as t,u as oe}from"./Typography-DW8TAfFy.js";import{B as ne}from"./BarPlot-GWJkoQRw.js";import{C as ce,a as le,b as de}from"./ChartsOverlay-DMH5itXO.js";import{n as me,o as pe}from"./useChartContainerDimensions-CjTkzPDm.js";import{u as he}from"./useId-5Do1p0JB.js";import{R as xe,C as ue,c as ke}from"./ChartsAxisHighlight-YKpwFUDQ.js";import{C as ye,a as be}from"./ChartsOnAxisClickHandler-CaWvnAO4.js";import{C as Ce}from"./ChartsGrid-rc7OgK4l.js";import{G as d}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./index-BwqtTtay.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./useChartId-D6IeINbA.js";import"./useSkipAnimation-BL3iWm-Y.js";import"./ChartsText-CN86VXtv.js";import"./composeClasses-CkcSq-l_.js";const ge=["xAxis","yAxis","series","width","height","margin","colors","dataset","sx","tooltip","onAxisClick","axisHighlight","legend","grid","topAxis","leftAxis","rightAxis","bottomAxis","children","slots","slotProps","skipAnimation","loading","layout","onItemClick","highlightedItem","onHighlightChange","borderRadius","barLabel","className"],We=s=>{const{xAxis:i,yAxis:o,series:a,width:r,height:n,margin:y,colors:b,dataset:W,sx:A,tooltip:m,onAxisClick:B,axisHighlight:c,legend:P,grid:l,topAxis:j,leftAxis:T,rightAxis:G,bottomAxis:S,children:L,slots:C,slotProps:g,skipAnimation:V,loading:w,layout:R,onItemClick:H,highlightedItem:M,onHighlightChange:z,borderRadius:_,barLabel:N,className:E}=s,X=ie(s,ge),D=`${he()}-clip-path`,f=R==="horizontal"||R===void 0&&a.some(p=>p.layout==="horizontal"),I={scaleType:"band",data:Array.from({length:Math.max(...a.map(p=>(p.data??W??[]).length))},(p,ae)=>ae)},Y=t({},X,{series:a.map(p=>t({type:"bar"},p,{layout:f?"horizontal":"vertical"})),width:r,height:n,margin:y,colors:b,dataset:W,xAxis:i??(f?void 0:[t({id:me},I)]),yAxis:o??(f?[t({id:pe},I)]:void 0),sx:A,highlightedItem:M,onHighlightChange:z,disableAxisListener:(m==null?void 0:m.trigger)!=="axis"&&(c==null?void 0:c.x)==="none"&&(c==null?void 0:c.y)==="none"&&!B,className:E,skipAnimation:V}),$={onItemClick:H,slots:C,slotProps:g,borderRadius:_,barLabel:N},F={onAxisClick:B},K={vertical:l==null?void 0:l.vertical,horizontal:l==null?void 0:l.horizontal},O={clipPath:`url(#${D})`},U={id:D},q={slots:C,slotProps:g,loading:w},J={topAxis:j,leftAxis:T,rightAxis:G,bottomAxis:S,slots:C,slotProps:g},Q=t({},f?{y:"band"}:{x:"band"},c),Z=t({},P,{slots:C,slotProps:g}),ee=t({},m,{slots:C,slotProps:g});return{chartContainerProps:Y,barPlotProps:$,axisClickHandlerProps:F,gridProps:K,clipPathProps:U,clipPathGroupProps:O,overlayProps:q,chartsAxisProps:J,axisHighlightProps:Q,legendProps:Z,tooltipProps:ee,children:L}},k=te.forwardRef(function(i,o){const a=oe({props:i,name:"MuiBarChart"}),{chartContainerProps:r,barPlotProps:n,axisClickHandlerProps:y,gridProps:b,clipPathProps:W,clipPathGroupProps:A,overlayProps:m,chartsAxisProps:B,axisHighlightProps:c,legendProps:P,tooltipProps:l,children:j}=We(a);return e.jsxs(xe,t({ref:o},r,{children:[a.onAxisClick&&e.jsx(ye,t({},y)),e.jsx(Ce,t({},b)),e.jsxs("g",t({},A,{children:[e.jsx(ne,t({},n)),e.jsx(ce,t({},m)),e.jsx(ue,t({},c))]})),e.jsx(le,t({},B)),e.jsx(de,t({},P)),!a.loading&&e.jsx(ke,t({},l)),e.jsx(be,t({},W)),j]}))});function Be(){return e.jsx(x,{children:`
            
'use client'
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material';

   const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'SimpleBarChart ',
  },
]; 

export default function SimpleBarChart() {

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
      const xLabels = [
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ];

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    return (
      
            <BarChart
                height={300}
                borderRadius={6}
                series={[
                    { data: pData, label: 'Page Views', id: 'pvId', color: primary },
                    { data: uData, label: ' Visitors', id: 'uvId', color: secondary },
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band', categoryGapRatio: 0.8,
                    barGapRatio: 0.8 }]}
            />
   
    );
}
`})}function v(){const s=[4e3,3e3,2e3,2780,1890,2390,3490],i=[2400,1398,9800,3908,4800,3800,4300],o=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],a=u(),r=a.palette.primary.main,n=a.palette.secondary.main;return e.jsx(h,{title:"Simple Chart",codeModel:e.jsx(Be,{}),children:e.jsx(k,{height:300,borderRadius:6,series:[{data:i,label:"Page Views",id:"pId",color:r},{data:s,label:" Visitors",id:"uId",color:n}],xAxis:[{data:o,scaleType:"band",categoryGapRatio:.8,barGapRatio:.8}]})})}function fe(){return e.jsx(x,{children:`
"use client"

import React from "react";
import { BarPlot } from "@mui/x-charts";
import { useTheme } from "@mui/material/styles";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'StackedBarChart ',
},
];

function StackedBarChart() {

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
      const xLabels = [
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ];

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    return (
      
            <BarChart
                height={300}
                borderRadius={6}
                series={[
                    { data: pData, label: 'Page Views', id: 'pvId', stack: 'total', color: primary },
                    { data: uData, label: 'Visitors', id: 'uvId', stack: 'total', color: secondary },
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band',categoryGapRatio: 0.8,
                    barGapRatio: 0.8 }]}
            />
    
    )
}

export default StackedBarChart;
`})}function Ae(){const s=[4e3,3e3,2e3,2780,1890,2390,3490],i=[2400,1398,9800,3908,4800,3800,4300],o=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],a=u(),r=a.palette.primary.main,n=a.palette.secondary.main;return e.jsx(h,{title:"Stacked Chart",codeModel:e.jsx(fe,{}),children:e.jsx(k,{height:300,borderRadius:6,series:[{data:i,label:"Page Views",id:"pvId",stack:"total",color:r},{data:s,label:"Visitors",id:"uvId",stack:"total",color:n}],xAxis:[{data:o,scaleType:"band",categoryGapRatio:.8,barGapRatio:.8}]})})}function Pe(){return e.jsx(x,{children:`
    
'use client'
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'MixedBarChart ',
},
]; 


function MixedBarChart() {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const amtData = [2400, 2210, 2290, 2000, 2181, 2500, 2100];

    const xLabels = [
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ];
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const light = theme.palette.success.main;

    return (
            <BarChart
               borderRadius={6}
                height={300}
                series={[
                    { data: pData, label: 'Page Views', stack: 'stack1', color: primary },
                    { data: amtData, label: ' Visitors', color: success },
                    { data: uData, label: 'Revenue ', stack: 'stack1', color: secondary },
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band',categoryGapRatio: 0.8,
                    barGapRatio: 0.8 }]}
            />

    )
}

export default MixedBarChart
`})}function je(){const s=[4e3,3e3,2e3,2780,1890,2390,3490],i=[2400,1398,9800,3908,4800,3800,4300],o=[2400,2210,2290,2e3,2181,2500,2100],a=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],r=u(),n=r.palette.primary.main,y=r.palette.secondary.main,b=r.palette.success.main;return e.jsx(h,{title:"Mixed Chart",codeModel:e.jsx(Pe,{}),children:e.jsx(k,{borderRadius:6,height:300,series:[{data:i,label:"Page Views",stack:"stack1",color:n},{data:o,label:" Visitors",color:b},{data:s,label:"Revenue ",stack:"stack1",color:y}],xAxis:[{data:a,scaleType:"band",categoryGapRatio:.8,barGapRatio:.8}]})})}function Re(){return e.jsx(x,{children:`
            
'use client'
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material';

   const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'PositiveAndNegativeBarChart ',
  },
]; 


function PositiveAndNegativeBarChart() {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, -9800, 3908, 4800, -3800, 4300];

      const xLabels = [
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ];
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const success = theme.palette.success.main;

    return (

            <BarChart
              
                height={300}
                borderRadius={6}
                series={[
                    {
                        data: pData,
                        label: 'Page Views',
                        color: primary
                    },
                    {
                        data: uData,
                        label: ' Visitors',
                        color: success
                    },
                ]}
                xAxis={[
                    {
                        data: xLabels,
                        scaleType: 'band',
                        categoryGapRatio: 0.8,
                        barGapRatio: 0.8
                    },
                ]}
                yAxis={[{ max: 10000 }]}
            />
    )
}

export default PositiveAndNegativeBarChart

`})}function De(){const s=[4e3,3e3,2e3,2780,1890,2390,3490],i=[2400,1398,-9800,3908,4800,-3800,4300],o=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],a=u(),r=a.palette.primary.main,n=a.palette.success.main;return e.jsx(h,{title:"Positive And Negative Chart",codeModel:e.jsx(Re,{}),children:e.jsx(k,{height:300,borderRadius:6,series:[{data:i,label:"Page Views",color:r},{data:s,label:" Visitors",color:n}],xAxis:[{data:o,scaleType:"band",categoryGapRatio:.8,barGapRatio:.8}],yAxis:[{max:1e4}]})})}function Ie(){return e.jsx(x,{children:`
  
'use client'
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material';


const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BarChartStackedBySignChart ',
},
]; 


function BarChartStackedBySignChart() {
  const pData = [2400, 1398, -9800, 3908, 4800, -3800, 4300];
  const uData = [4000, -3000, -2000, 2780, -1890, 2390, 3490];

  const xLabels = [
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ];
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
   
      <BarChart
      borderRadius={6}
        height={300}
        series={[
          { data: pData, label: 'Page Views', id: 'pvId', stack: 'stack1', color: primary },
          { data: uData, label: 'Visitors', id: 'uvId', stack: 'stack1', color: secondary },
        ]}
        xAxis={[{ data: xLabels, scaleType: 'band' ,categoryGapRatio: 0.8,
          barGapRatio: 0.8}]}
      />
 
  )
}

export default BarChartStackedBySignChart

`})}function ve(){const s=[2400,1398,-9800,3908,4800,-3800,4300],i=[4e3,-3e3,-2e3,2780,-1890,2390,3490],o=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],a=u(),r=a.palette.primary.main,n=a.palette.secondary.main;return e.jsx(h,{title:"StackedBySign Chart",codeModel:e.jsx(Ie,{}),children:e.jsx(k,{borderRadius:6,height:300,series:[{data:s,label:"Page Views",id:"pvId",stack:"stack1",color:r},{data:i,label:" Visitors",id:"uvId",stack:"stack1",color:n}],xAxis:[{data:o,scaleType:"band",categoryGapRatio:.8,barGapRatio:.8}]})})}function Te(){return e.jsx(x,{children:`
  
'use client'
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BiaxialBarChart ',
},
]; 


function BiaxialBarChart() {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

     const xLabels = [
      "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"
  ];

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    return (
            <BarChart
              borderRadius={6}
                height={300}
                series={[
                    {
                        data: pData,
                        label: "Page Views",
                        id: "pvId",
                        color: primary,

                        yAxisId: "leftAxisId",
                    },
                    {
                        data: uData,
                        label: "Visitors",
                        id: "uvId",
                        color: secondary,

                        yAxisId: "rightAxisId",
                    },
                ]}
                xAxis={[{ data: xLabels, scaleType: "band",categoryGapRatio: 0.8,
                    barGapRatio: 0.8 }]}
                yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
                rightAxis="rightAxisId"
            />
    );
}

export default BiaxialBarChart;

`})}function Ge(){const s=[4e3,3e3,2e3,2780,1890,2390,3490],i=[2400,1398,9800,3908,4800,3800,4300],o=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],a=u(),r=a.palette.primary.main,n=a.palette.secondary.main;return e.jsx(h,{title:"Biaxial Chart",codeModel:e.jsx(Te,{}),children:e.jsx(k,{borderRadius:6,height:300,series:[{data:i,label:"Page Views",id:"pvId",color:r,yAxisId:"leftAxisId"},{data:s,label:"Visitors",id:"uvId",color:n,yAxisId:"rightAxisId"}],xAxis:[{data:o,scaleType:"band",categoryGapRatio:.8,barGapRatio:.8}],yAxis:[{id:"leftAxisId"},{id:"rightAxisId"}],rightAxis:"rightAxisId"})})}const Se=[{to:"/",title:"Home"},{title:"Bar Charts"}],Pa=()=>e.jsxs(se,{title:"Bar Charts",description:"this is Bar Chart",children:[e.jsx(re,{title:"Bar Charts",items:Se}),e.jsxs(d,{container:!0,spacing:3,children:[e.jsx(d,{size:{md:6},children:e.jsx(v,{})}),e.jsx(d,{size:{md:6},children:e.jsx(je,{})}),e.jsx(d,{size:{md:6},children:e.jsx(De,{})}),e.jsx(d,{size:{md:6},children:e.jsx(ve,{})}),e.jsx(d,{size:{md:6},children:e.jsx(Ge,{})}),e.jsx(d,{size:{md:6},children:e.jsx(Ae,{})}),e.jsx(d,{size:{md:6},children:e.jsx(v,{})})]})]});export{Pa as default};
