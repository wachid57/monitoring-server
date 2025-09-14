import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';

import { Grid2 as Grid } from "@mui/material";
import SimpleLineChart from "src/components/muicharts/linescharts/linechart/SimpleLineChart";
import TinyLineChart from "src/components/muicharts/linescharts/linechart/TinyLineChart";
import DashedLineChart from "src/components/muicharts/linescharts/linechart/DashedLineChart";
import BiaxialLineChart from "src/components/muicharts/linescharts/linechart/BiaxialLineChart";
import LineChartWithReferenceLines from "src/components/muicharts/linescharts/linechart/LineChartWithReferenceLinesChart";
import LinewithforecastChart from "src/components/muicharts/linescharts/linechart/LinewithforecastChart";

const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Line Charts",
    },
];

const LineChart = () => {
    return (
        <PageContainer title=" Line Charts" description="this is  Line Charts">
            <Breadcrumb title=" Line  Charts" items={BCrumb} />
            <Grid container spacing={3}>

                <SimpleLineChart />


                <TinyLineChart />


                <DashedLineChart />


                <BiaxialLineChart />


                <LineChartWithReferenceLines />


                <LinewithforecastChart />


            </Grid>
        </PageContainer>
    );
};

export default LineChart;
