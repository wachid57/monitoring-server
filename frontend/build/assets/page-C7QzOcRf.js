import{j as t,b5 as n,b6 as h}from"./index-CJWZi9CB.js";import{B as T}from"./Breadcrumb-DR6zDa-i.js";import{P as v}from"./PageContainer-BR_WMDrZ.js";import{C as c}from"./CodeDialog-BDx_UOfm.js";import{P as p}from"./ParentCard-CuAAl3Vl.js";import{u as m}from"./Paper-Dk0UhltF.js";import{L as l}from"./LineChart-qhcYb1k4.js";import{l as A,A as O,b as g}from"./LineHighlightPlot-BCGKaYbI.js";import{l as P,m as j}from"./ChartsAxisHighlight-YKpwFUDQ.js";import{S as w}from"./Stack-C8hAk-Ua.js";import{u as b}from"./useChartContainerDimensions-CjTkzPDm.js";import{G as S}from"./Grid2-TKUllLdh.js";import"./index.esm-CBP19pFL.js";import"./Typography-DW8TAfFy.js";import"./index-BwqtTtay.js";import"./useSlotProps-Dmx4i6VU.js";import"./Link-DrUusogV.js";import"./Box-B21Vn3Wr.js";import"./Tooltip-BXh8ffn_.js";import"./Popper-DtoIJ5hI.js";import"./getReactNodeRef-CxaND9dZ.js";import"./Portal-BXG2mGLy.js";import"./utils-C-EoFTAL.js";import"./useControlled-Cuh16IWT.js";import"./useId-5Do1p0JB.js";import"./Grow-rhCcvyQJ.js";import"./IconButton-Cf6Oa_Gi.js";import"./DialogContent-iZlfiihu.js";import"./Modal-BmV9fUd8.js";import"./ownerWindow-CPegdbNg.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BJnJs1tW.js";import"./DialogTitle-fL9kXoX8.js";import"./toConsumableArray-DoR21_q0.js";import"./Card-BdzGKbvD.js";import"./CardHeader-fWfUcCUC.js";import"./Divider-lbj2_b8Q.js";import"./dividerClasses-ORbXH3Pu.js";import"./CardContent-B4ITIunY.js";import"./useChartId-D6IeINbA.js";import"./path-DyVhHtw_.js";import"./useSkipAnimation-BL3iWm-Y.js";import"./ChartsOverlay-DMH5itXO.js";import"./ChartsText-CN86VXtv.js";import"./ChartsOnAxisClickHandler-CaWvnAO4.js";import"./ChartsGrid-rc7OgK4l.js";import"./createStack-B05ZxkoV.js";import"./composeClasses-CkcSq-l_.js";function L(){return t.jsx(c,{children:`

"use client";
import React from 'react'
import { useTheme } from "@mui/material";
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'SimpleAreaChart ',
},
]; 


export default function SimpleAreaChart() {
  const monthlyProfits = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const xLabels = ["January", "February", "March", "April", "May", "June", "July"];

    const theme = useTheme();
    const primary = theme.palette.primary.main;

    return (

            <LineChart
                height={300}
                series={[{ data: monthlyProfits, label: 'Profits', area: true, showMark: false, color: primary }]}

                xAxis={[{ scaleType: 'point', data: xLabels }]}
                sx={{
                    [\`& .\${lineElementClasses.root}\`]: {
                     display: 'none',
                    },
                }}
            />
     
    );
}
`})}function H(){const o=[4e3,3e3,2e3,2780,1890,2390,3490],a=["January","February","March","April","May","June","July"],i=m().palette.primary.main;return t.jsx(p,{title:"Simple AreaChart",codeModel:t.jsx(L,{}),children:t.jsx(l,{height:300,series:[{data:o,label:"Profits",area:!0,showMark:!1,color:i}],xAxis:[{scaleType:"point",data:a}],sx:{[`& .${A.root}`]:{display:"none"}}})})}function J(){return t.jsx(c,{children:`

"use client";
import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { useTheme } from "@mui/material";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'StackedAreaChart ',
},
]; 

export default function StackedAreaChart() {
      const monthlyProfits = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const monthlyRevenue = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const monthlyExpenses = [2400, 2210, 0, 2000, 2181, 2500, 2100];
    const xLabels = ["January", "February", "March", "April", "May", "June", "July"];

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const expDatacolor = theme.palette.error.main;

    return (

            <LineChart
                height={300}
                 series={[
                    { data: monthlyRevenue, label: 'Revenue', area: true, stack: 'total', showMark: false, color: primary },
                    { data: monthlyProfits, label: 'Profits', area: true, stack: 'total', showMark: false, color: secondary },
                    {
                        data: monthlyExpenses,
                        label: 'Expenses',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        color: expDatacolor
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                sx={{
                    [\`& .\${lineElementClasses.root}\`]: {
                display: 'none',
                    },
                }}
            />
      
    );
}
`})}function E(){const o=[4e3,3e3,2e3,2780,1890,2390,3490],a=[2400,1398,9800,3908,4800,3800,4300],s=[2400,2210,0,2e3,2181,2500,2100],i=["January","February","March","April","May","June","July"],e=m(),r=e.palette.primary.main,d=e.palette.secondary.main,u=e.palette.error.main;return t.jsx(p,{title:"Stacked Chart",codeModel:t.jsx(J,{}),children:t.jsx(l,{height:300,series:[{data:a,label:"Revenue",area:!0,stack:"total",showMark:!1,color:r},{data:o,label:"Profits",area:!0,stack:"total",showMark:!1,color:d},{data:s,label:"Expenses",area:!0,stack:"total",showMark:!1,color:u}],xAxis:[{scaleType:"point",data:i}],sx:{[`& .${A.root}`]:{display:"none"}}})})}function B(){return t.jsx(c,{children:`

"use client";
import * as React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AreaPlot } from '@mui/x-charts/LineChart';
import { useTheme } from "@mui/material";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'TinyAreaChart ',
},
]; 

export default function TinyAreaChart() {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const xLabels = [
        ' A',
        ' B',
        ' C',
        ' D',
        ' E',
        ' F',
        ' G',
    ];
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    return (
     

            <ChartContainer
                width={800}
                height={300}
                series={[
                    {
                        data: uData,
                        type: 'line',
                        label: 'uv',
                        area: true,
                        stack: 'total',
                        color: primary
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            >
                <AreaPlot />
            </ChartContainer>
    
    );
}

`})}function F(){const o=[4e3,3e3,2e3,2780,1890,2390,3490],a=[" A"," B"," C"," D"," E"," F"," G"],i=m().palette.primary.main;return t.jsx(p,{title:"Tiny Chart",codeModel:t.jsx(B,{}),children:t.jsx(P,{width:800,height:300,series:[{data:o,type:"line",label:"uv",area:!0,stack:"total",color:i}],xAxis:[{scaleType:"point",data:a}],children:t.jsx(O,{})})})}function R(){return t.jsx(c,{children:`

"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'PercentAreaChart ',
},
]; 


const time = [
    new Date(2015, 1, 0),
    new Date(2015, 2, 0),
    new Date(2015, 3, 0),
    new Date(2015, 4, 0),
    new Date(2015, 5, 0),
    new Date(2015, 6, 0),
    new Date(2015, 7, 0),
];
const a = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const b = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const c = [2400, 2210, 2290, 2000, 2181, 2500, 2100];

const getPercents = (array) =>
    array.map((v, index) => (100 * v) / (a[index] + b[index] + c[index]));

export default function PercentAreaChart() {

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const amtDatacolor = theme.palette.error.main;

    return (

            <LineChart
                height={300}
                series={[
                    {
                        data: getPercents(a),
                        type: 'line',
                        label: 'Revenue',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        color: primary
                    },
                    {
                        data: getPercents(b),
                        type: 'line',
                        label: 'Profits',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        color: secondary
                    },
                    {
                        data: getPercents(c),
                        type: 'line',
                        label: 'Expenses',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        color: amtDatacolor
                    },
                ]}
                xAxis={[
                    {
                        scaleType: 'time',
                        data: time,
                        min: time[0].getTime(),
                        max: time[time.length - 1].getTime(),

                    },
                ]}
            />
    );
}
`})}const f=[new Date(2015,1,0),new Date(2015,2,0),new Date(2015,3,0),new Date(2015,4,0),new Date(2015,5,0),new Date(2015,6,0),new Date(2015,7,0)],k=[4e3,3e3,2e3,2780,1890,2390,3490],M=[2400,1398,9800,3908,4800,3800,4300],D=[2400,2210,2290,2e3,2181,2500,2100],y=o=>o.map((a,s)=>100*a/(k[s]+M[s]+D[s]));function $(){const o=m(),a=o.palette.primary.main,s=o.palette.secondary.main,i=o.palette.error.main;return t.jsx(p,{title:"Percent Chart",codeModel:t.jsx(R,{}),children:t.jsx(l,{height:300,series:[{data:y(k),type:"line",label:"Revenue",area:!0,stack:"total",showMark:!1,color:a},{data:y(M),type:"line",label:"Profits",area:!0,stack:"total",showMark:!1,color:s},{data:y(D),type:"line",label:"Expenses",area:!0,stack:"total",showMark:!1,color:i}],xAxis:[{scaleType:"time",data:f,min:f[0].getTime(),max:f[f.length-1].getTime()}]})})}function G(){return t.jsx(c,{children:`
'use client'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'AreaChartConnectNulls ',
},
]; 

export default function AreaChartConnectNulls() {
    const data = [4000, 3000, 2000, null, 1890, 2390, 3490];
     const xData = ["January", "February", "March", "April", "May", "June", "July"];

    const theme = useTheme();
    const primary = theme.palette.primary.main;
 
    return (

            <Stack sx={{ width: '100%' }}>
                <LineChart
                    xAxis={[{ data: xData, scaleType: 'point' }]}
                    series={[{ data, showMark: false, area: true, color: primary }]}
                    height={200}
                    margin={{ top: 10, bottom: 20 }}
                />
                <LineChart
                    xAxis={[{ data: xData, scaleType: 'point' }]}
                    series={[{ data, showMark: false, area: true, connectNulls: true, color: primary}]}
                    height={200}
                    margin={{ top: 10, bottom: 20 }}
                />
            </Stack>
    );
}
      `})}function U(){const o=[4e3,3e3,2e3,null,1890,2390,3490],a=["January","February","March","April","May","June","July"],i=m().palette.primary.main;return t.jsx(p,{title:"ConnectNulls Chart",codeModel:t.jsx(G,{}),children:t.jsxs(w,{sx:{width:"100%"},children:[t.jsx(l,{xAxis:[{data:a,scaleType:"point"}],series:[{data:o,showMark:!1,area:!0,color:i}],height:200,margin:{top:10,bottom:20}}),t.jsx(l,{xAxis:[{data:a,scaleType:"point"}],series:[{data:o,showMark:!1,area:!0,connectNulls:!0,color:i}],height:200,margin:{top:10,bottom:20}})]})})}function N(){return t.jsx(c,{children:`
'use client'
import * as React from 'react';
import { green, red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { useYScale, useDrawingArea } from '@mui/x-charts/hooks';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'AreaChartFillByValue ',
},
]; 



function ColorSwich({ threshold, color1, color2, id }) {

    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

   const scale = useYScale(); // You can provide the axis Id if you have multiple ones
    const y0 = scale(threshold); // The coordinate of of the origine
    const off = y0 !== undefined ? y0 / svgHeight : 0;

    return (
        <defs>
            <linearGradient
                id={id}
                x1="0"
                x2="0"
                y1="0"
                y2={\`\${svgHeight}px\`}
                gradientUnits="userSpaceOnUse" 
            >
            <stop offset={off} stopColor={color1} stopOpacity={1} />
            <stop offset={off} stopColor={color2} stopOpacity={1} />
        </linearGradient>
        </defs >
    );
}

export default function AreaChartFillByValue() {
    const data = [4000, 3000, -1000, 500, -2100, -250, 3490];
    const xData = ["January", "February", "March", "April", "May", "June", "July"];


    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const amtDatacolor = theme.palette.error.main;

    return (


        <Stack direction="column" width="100%" spacing={1}>
            <LineChart
                xAxis={[{ data: xData, scaleType: 'point' }]}
                yAxis={[{ min: -3000, max: 4000 }]}
                series={[{ data, showMark: false, area: true }]}
                height={200}
                margin={{ top: 20, bottom: 30, left: 75 }}
             sx={{
                    [\`& .\${areaElementClasses.root}\`]: { // Dynamic class name
                        fill: 'url(#swich-color-id-1)',
                    },
                }}
            >

                <ColorSwich
                    color1={primary}
                    color2={amtDatacolor}
                    threshold={0}
                    id="swich-color-id-1"
                />
                <rect x={0} y={0} width={5} height="100%" fill="url(#swich-color-id-1)" />
            </LineChart>

            <LineChart
                xAxis={[{ data: xData, scaleType: 'point' }]}
                yAxis={[{ min: -3000, max: 4000 }]}
                series={[{ data, showMark: false, area: true }]}
                height={200}
                margin={{ top: 20, bottom: 30, left: 75 }}
                sx={{
                    [\`& .\${areaElementClasses.root}\`]: {
                fill: 'url(#swich-color-id-2)',
                    },
                }}
            >
            <ColorPalette id="swich-color-id-2" />

            <rect x={0} y={0} width={5} height="100%" fill="url(#swich-color-id-2)" />
        </LineChart>
        </Stack >

    );
}

function ColorPalette({ id }) {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    const scale = useYScale() // You can provide the axis Id if you have multiple ones

    return (
        <defs>
            <linearGradient
                id={id}
                x1="0"
                x2="0"
                y1="0"
                y2={\`\${svgHeight}px\`}
                gradientUnits="userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
            >
                <stop
                    offset={scale(5000) / svgHeight}
                   stopColor={green[400]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(4000) / svgHeight}
                    stopColor={green[400]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(4000) / svgHeight}
                    stopColor={green[300]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(3000) / svgHeight}
                    stopColor={green[300]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(3000) / svgHeight}
                    stopColor={green[200]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(2000) / svgHeight}
                    stopColor={green[200]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(2000) / svgHeight}
                    stopColor={green[100]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(1000) / svgHeight}
                    stopColor={green[100]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(1000) / svgHeight}
                    stopColor={green[50]}
                    stopOpacity={1}
                />
                <stop offset={scale(0) / svgHeight} stopColor={green[50]} stopOpacity={1} />
                <stop offset={scale(0) / svgHeight} stopColor={red[100]} stopOpacity={1} />
                <stop
                    offset={scale(-1000) / svgHeight}
                    stopColor={red[100]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(-1000) / svgHeight}
                    stopColor={red[200]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(-2000) / svgHeight}
                    stopColor={red[200]}
                    stopOpacity={1}
                />
                <stop
                    offset={scale(-3000) / svgHeight}
                    stopColor={red[300]}
                    stopOpacity={1}
                />
            </linearGradient>
        </defs>
    );
}

`})}function V({threshold:o,color1:a,color2:s,id:i}){const{top:e,height:r,bottom:d}=b(),u=e+d+r,x=j()(o),C=x!==void 0?x/u:0;return t.jsx("defs",{children:t.jsxs("linearGradient",{id:i,x1:"0",x2:"0",y1:"0",y2:`${u}px`,gradientUnits:"userSpaceOnUse",children:[t.jsx("stop",{offset:C,stopColor:a,stopOpacity:1}),t.jsx("stop",{offset:C,stopColor:s,stopOpacity:1})]})})}function Y(){const o=[4e3,3e3,-1e3,500,-2100,-250,3490],a=["January","February","March","April","May","June","July"],s=m(),i=s.palette.primary.main,e=s.palette.error.main;return t.jsx(p,{title:" FillByValue Chart",codeModel:t.jsx(N,{}),children:t.jsxs(w,{direction:"column",width:"100%",spacing:1,children:[t.jsxs(l,{xAxis:[{data:a,scaleType:"point"}],yAxis:[{min:-3e3,max:4e3}],series:[{data:o,showMark:!1,area:!0}],height:200,margin:{top:20,bottom:30,left:75},sx:{[`& .${g.root}`]:{fill:"url(#swich-color-id-1)"}},children:[t.jsx(V,{color1:i,color2:e,threshold:0,id:"swich-color-id-1"}),t.jsx("rect",{x:0,y:0,width:5,height:"100%",fill:"url(#swich-color-id-1)"})]}),t.jsxs(l,{xAxis:[{data:a,scaleType:"point"}],yAxis:[{min:-3e3,max:4e3}],series:[{data:o,showMark:!1,area:!0}],height:200,margin:{top:20,bottom:30,left:75},sx:{[`& .${g.root}`]:{fill:"url(#swich-color-id-2)"}},children:[t.jsx(I,{id:"swich-color-id-2"}),t.jsx("rect",{x:0,y:0,width:5,height:"100%",fill:"url(#swich-color-id-2)"})]})]})})}function I({id:o}){const{top:a,height:s,bottom:i}=b(),e=a+i+s,r=j();return t.jsx("defs",{children:t.jsxs("linearGradient",{id:o,x1:"0",x2:"0",y1:"0",y2:`${e}px`,gradientUnits:"userSpaceOnUse",children:[t.jsx("stop",{offset:r(5e3)/e,stopColor:n[400],stopOpacity:1}),t.jsx("stop",{offset:r(4e3)/e,stopColor:n[400],stopOpacity:1}),t.jsx("stop",{offset:r(4e3)/e,stopColor:n[300],stopOpacity:1}),t.jsx("stop",{offset:r(3e3)/e,stopColor:n[300],stopOpacity:1}),t.jsx("stop",{offset:r(3e3)/e,stopColor:n[200],stopOpacity:1}),t.jsx("stop",{offset:r(2e3)/e,stopColor:n[200],stopOpacity:1}),t.jsx("stop",{offset:r(2e3)/e,stopColor:n[100],stopOpacity:1}),t.jsx("stop",{offset:r(1e3)/e,stopColor:n[100],stopOpacity:1}),t.jsx("stop",{offset:r(1e3)/e,stopColor:n[50],stopOpacity:1}),t.jsx("stop",{offset:r(0)/e,stopColor:n[50],stopOpacity:1}),t.jsx("stop",{offset:r(0)/e,stopColor:h[100],stopOpacity:1}),t.jsx("stop",{offset:r(-1e3)/e,stopColor:h[100],stopOpacity:1}),t.jsx("stop",{offset:r(-1e3)/e,stopColor:h[200],stopOpacity:1}),t.jsx("stop",{offset:r(-2e3)/e,stopColor:h[200],stopOpacity:1}),t.jsx("stop",{offset:r(-3e3)/e,stopColor:h[300],stopOpacity:1})]})})}const q=[{to:"/",title:"Home"},{title:" Area Charts"}],Nt=()=>t.jsxs(v,{title:" Area Charts",description:"this is  Area Chart",children:[t.jsx(T,{title:" Area  Charts",items:q}),t.jsxs(S,{container:!0,spacing:3,children:[t.jsx(H,{}),t.jsx(E,{}),t.jsx(F,{}),t.jsx($,{}),t.jsx(U,{}),t.jsx(Y,{})]})]});export{Nt as default};
