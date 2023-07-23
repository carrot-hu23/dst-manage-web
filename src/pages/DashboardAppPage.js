import {useTranslation} from "react-i18next";
import {useTheme} from '@mui/material/styles';
import {Grid, Container, Typography, CardHeader, Box, Card} from '@mui/material';
import { Timeline } from 'antd';
// components
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {
    AppCurrentVisits,
    AppWebsiteVisits,
    AppConversionRates,
} from '../sections/@dashboard/app';
import {countActivePlayers, countRoleRate, countTopNActive, lastThNRegenerateApi} from '../api/statisticsApi';
import {getBeginWeek, getEndWeek, translateFormat} from '../utils/dateUitls';
import {dstRolesMap} from "../utils/dst";


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const {t} = useTranslation()

    const theme = useTheme();
    const {cluster} = useParams()
    const [userChartData, setUserChartData] = useState({
        title: '',
        xData: [],
        seriesData: []
    })
    useEffect(() => {
        countActivePlayers(cluster, "DAY", getBeginWeek(), getEndWeek())
            .then(response => {
                const {data} = response
                setUserChartData({
                    title: t('playerActiveOfThisWeek'),
                    xData: translateFormat(data.data.x),
                    legend: [t('activePlayer'), t('joinPlayer')],
                    seriesData: [
                        {
                            name: t('activePlayer'),
                            type: 'column',
                            fill: 'solid',
                            data: data.data.y1,
                        },
                        {
                            name: t('joinPlayer'),
                            type: 'area',
                            fill: 'gradient',
                            data: data.data.y2,
                        }]
                })
            })
            .catch(ereor => {
                console.error(ereor);
            })
    }, [])

    const [topNActive, setTopNActive] = useState({
        title: t('top10PlayerRankingsOfThisWeek'),
        chartData: [],
    })
    useEffect(() => {
        countTopNActive(cluster, 10, getBeginWeek(), getEndWeek())
            .then(response => {
                const {data} = response
                setTopNActive({
                    title: t('top10PlayerRankingsOfThisWeek'),
                    chartData: data.map(item => ({label: item.name, value: item.count}))
                })
            })
            .catch(ereor => {
                console.error(ereor);
            })
    }, [])

    const [roleRate, setRoleRate] = useState({
        title: t('roleRatioOfThisTheWeek'),
        chartData: [],
    })
    useEffect(() => {
        countRoleRate(cluster, getBeginWeek(), getEndWeek())
            .then(response => {
                const {data} = response
                setRoleRate({
                    title: t('roleRatioOfThisTheWeek'),
                    chartData: data.map(item => {
                        if (item.role === '') {
                            return ({label: "other", value: item.count})
                        }
                        return ({label: dstRolesMap[item.role], value: item.count})
                    })
                })
            })
            .catch(ereor => {
                console.error(ereor);
            })
    }, [])

    const [timelineList, setTimelineList] = useState([])
    useEffect(()=>{
        lastThNRegenerateApi(cluster, 10)
            .then(response => {
                const {data} = response
                const regenerates = data.map(regenerate=>{
                    const  data = new Date(regenerate.CreatedAt)
                    return {children: data.toLocaleString()}
                })
                setTimelineList(regenerates)
            })
            .catch(ereor => {
                console.error(ereor);
            })

    },[])

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, Welcome back
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits
                            title={t('playerActiveOfThisWeek')}
                            chartLabels={userChartData.xData}
                            chartData={userChartData.seriesData}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title={t('roleRatioOfThisTheWeek')}
                            chartData={roleRate.chartData}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                        />

                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title={t('top10PlayerRankingsOfThisWeek')}
                            chartData={topNActive.chartData}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <Card >
                            <CardHeader title={"最近重置时间线"} />
                            <br/>
                            <Box sx={{ mx: 3 }} dir="ltr">
                                <Timeline
                                    items={timelineList}
                                />
                            </Box>
                        </Card>

                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
