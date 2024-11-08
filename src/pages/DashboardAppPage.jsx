import {useTranslation} from "react-i18next";
import {Grid, Container, CardHeader, Box, Card} from '@mui/material';
import {ConfigProvider, DatePicker, Segmented, Space, Timeline} from 'antd';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import i18n from "i18next";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import {
    AppCurrentVisits,
    AppWebsiteVisits,
    AppConversionRates,
} from '../sections/@dashboard/app';
import {countActivePlayers, countRoleRate, countTopNActive, lastThNRegenerateApi} from '../api/statisticsApi';
import {getBeginWeek, getEndWeek, translateFormat} from '../utils/dateUitls';
import {dstRolesMap} from "../utils/dst";
import RoleVisits from "@/pages/Chart/RoleVisits";
import UserStatistic from "@/pages/Chart/UserStatistic";


dayjs.locale('zh-cn');
const {RangePicker} = DatePicker;

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const {t} = useTranslation()
    const currentLocale = i18n.language.startsWith('zh') ? zhCN : enUS;
    const {cluster} = useParams()

    const today = dayjs();
    const startOfWeek = today.startOf('week');
    const endOfWeek = today.endOf('week');
    const defaultRange = [startOfWeek, endOfWeek];
    const [selectedRange, setSelectedRange] = useState([]);

    // 处理日期范围选择变化
    const handleRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            const [start, end] = dates;
            setSelectedRange([start, end]);
            count(start.valueOf(), end.valueOf())
        } else {
            // 处理用户清空选择的情况
            setSelectedRange([]);
        }
    };

    const [userChartData, setUserChartData] = useState({
        title: '',
        xData: [],
        seriesData: []
    })

    const [topNActive, setTopNActive] = useState({
        title: t('top10PlayerRankingsOfThisWeek'),
        chartData: [],
    })

    const [roleRate, setRoleRate] = useState({
        title: t('roleRatioOfThisTheWeek'),
        chartData: [],
    })

    const [timelineList, setTimelineList] = useState([])

    function count(start, end) {
        countActivePlayers(cluster, "DAY", start, end)
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

        countTopNActive(cluster, 10, start, end)
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

        countRoleRate(cluster, start, end)
            .then(response => {
                const {data} = response
                setRoleRate({
                    title: t('roleRatioOfThisTheWeek'),
                    chartData: data.map(item => {
                        if (item.role === '') {
                            return ({label: "other", value: item.count})
                        }
                        if (!(item.role in dstRolesMap)) {
                            return ({label: item.role, value: item.count})
                        }
                        return ({label: dstRolesMap[item.role], value: item.count})
                    })
                })
            })
            .catch(ereor => {
                console.error(ereor);
            })
    }

    useEffect(() => {
        count(getBeginWeek(), getEndWeek())
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

    }, [])


    return (
        <>
            <ConfigProvider locale={currentLocale}>
                <Container maxWidth="xxl">
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <Space wrap size={16}>
                                <RangePicker
                                    defaultValue={defaultRange}
                                    format="YYYY-MM-DD"
                                    // locale="zh-cn" // 可选，设置为中文或其他语言
                                    onChange={handleRangeChange}
                                    needConfirm
                                />
                                <Segmented
                                    options={[t('time.this.week'), t('time.last.week'), t('time.this.month'), t('time.last.month')]}
                                    onChange={(value) => {
                                        if (value === t('time.last.week')) {
                                            count(dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD').valueOf(), dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD').valueOf())
                                        } else if (value === t('time.this.month')) {
                                            count(dayjs().startOf('month').format('YYYY-MM-DD').valueOf(), dayjs().endOf('month').format('YYYY-MM-DD').valueOf())
                                        } else if (value === t('time.last.month')) {
                                            count(dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD').valueOf(), dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD').valueOf())
                                        } else {
                                            // 本周
                                            count(dayjs().startOf('week').format('YYYY-MM-DD').valueOf(), dayjs().endOf('week').format('YYYY-MM-DD').valueOf())
                                        }
                                    }}
                                />
                            </Space>
                        </Box>
                    </Card>
                    <br/>
                    <UserStatistic />
                    <br/>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={6}>
                            <AppWebsiteVisits
                                title={t('playerActiveOfThisWeek')}
                                chartLabels={userChartData.xData}
                                chartData={userChartData.seriesData}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            {/*
                            <AppCurrentVisits
                                title={t('roleRatioOfThisTheWeek')}
                                chartData={roleRate.chartData}

                            />
                            */}
                            <RoleVisits chartData={roleRate.chartData} title={t('roleRatioOfThisTheWeek')} />

                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <AppConversionRates
                                title={t('top10PlayerRankingsOfThisWeek')}
                                chartData={topNActive.chartData}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Card >
                                <CardHeader title={t("lastRegenerateLine")} />
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
            </ConfigProvider>
        </>
    );
}