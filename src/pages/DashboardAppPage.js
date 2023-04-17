// import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
// import Iconify from '../components/iconify';
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { countActivePlayes, countRoleRate, countTopNActive } from '../api/statisticsApi';
import { getBeginWeek, getEndWeek, translateFormat } from '../myuitls/dateUitls';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [userChartData, setUserChartData] = useState({
    title: '',
    xData: [],
    seriesData: []
  })
  useEffect(()=>{
    countActivePlayes("DAY", getBeginWeek(), getEndWeek())
    .then(response => {
        console.log('resp', response);
        const {data} = response
        setUserChartData({
            title: "本周玩家趋势",
            xData: translateFormat(data.data.x),
            legend: ['在线活跃玩家', '在线加入玩家'],
            seriesData: [
              {
                name: '在线活跃玩家',
                type: 'column',
                fill: 'solid',
                data: data.data.y1,
              },
              {
                name: '在线加入玩家',
                type: 'area',
                fill: 'gradient',
                data: data.data.y2,
            }]
        })
    })
    .catch(ereor => {
        console.error(ereor);
    })
  },[])
  
  const [topNActive, setTopNActive] = useState({
    title: '本周前10活跃用户',
    chartData: [],
  })
  useEffect(()=>{
    countTopNActive(10, getBeginWeek(), getEndWeek())
    .then(response => {
        const {data} = response
        setTopNActive({
            title: "本周Top10活跃玩家",
            chartData: data.map(item=>({label: item.name, value: item.count}))
        })
    })
    .catch(ereor => {
        console.error(ereor);
    })
  },[])

  const [roleRate, setRoleRate] = useState({
    title: '本周角色占比',
    chartData: [],
  })
  useEffect(()=>{
    countRoleRate(getBeginWeek(), getEndWeek())
    .then(response => {
        const {data} = response
        setRoleRate({
            title: "本周角色占比",
            chartData: data.map(item=>{
              if (item.role === '') {
                return ({label: "other", value: item.count})
              }
              return ({label: item.role, value: item.count})
            })
        })
    })
    .catch(ereor => {
        console.error(ereor);
    })
  },[])

  return (
    <>
      {/* <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet> */}

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="本周玩家趋势"
              // subheader="(+43%) than last year"
              // chartLabels={[
              //   '01/01/2003',
              //   '02/01/2003',
              //   '03/01/2003',
              //   '04/01/2003',
              //   '05/01/2003',
              //   '06/01/2003',
              //   '07/01/2003',
              //   '08/01/2003',
              //   '09/01/2003',
              //   '10/01/2003',
              //   '11/01/2003',
              // ]}
              
              // chartData={[
              //   {
              //     name: 'Team A',
              //     type: 'column',
              //     fill: 'solid',
              //     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              //   },
              //   {
              //     name: 'Team B',
              //     type: 'area',
              //     fill: 'gradient',
              //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              //   },
              //   {
              //     name: 'Team C',
              //     type: 'line',
              //     fill: 'solid',
              //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              //   },
              // ]}
              chartLabels={userChartData.xData}
              chartData = {userChartData.seriesData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              // title="角色占比"
              // chartData={[
              //   { label: 'America', value: 4344 },
              //   { label: 'Asia', value: 5435 },
              //   { label: 'Europe', value: 1443 },
              //   { label: 'Africa', value: 4443 },
              // ]}
              title={roleRate.title}
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
              // title="游戏时长前10玩家"
              // subheader="(+43%) than last year"
              // chartData={[
              //   { label: 'Italy', value: 400 },
              //   { label: 'Japan', value: 430 },
              //   { label: 'China', value: 448 },
              //   { label: 'Canada', value: 470 },
              //   { label: 'France', value: 540 },
              //   { label: 'Germany', value: 580 },
              //   { label: 'South Korea', value: 690 },
              //   { label: 'Netherlands', value: 1100 },
              //   { label: 'United States', value: 1200 },
              //   { label: 'United Kingdom', value: 1380 },
              // ]}
              title={topNActive.title}
              chartData={topNActive.chartData}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
