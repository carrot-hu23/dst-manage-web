import {Box, Card} from "@mui/material";
import {ConfigProvider, DatePicker, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import EChartComponent from "./EChartComponent";
import {countActivePlayers} from "../../api/statisticsApi";
import {getBeginWeek, getEndWeek, translateFormat} from "../../utils/dateUitls";

dayjs.locale('zh-cn');

const {RangePicker} = DatePicker;

export default () => {
    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [chartOptions, setChartOptions] = useState()

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
            countActivePlayersApi(start.valueOf(), end.valueOf(), false)
        } else {
            // 处理用户清空选择的情况
            setSelectedRange([]);
        }
    };

    function countActivePlayersApi(start, end, isLoading) {
        if (isLoading) {
            setLoading(true)
        }
        countActivePlayers(cluster, "DAY", start, end)
            .then(response => {
                const {data} = response
                setChartOptions({
                    title: {
                        text: '活跃玩家'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['活跃玩家', '加入玩家'],
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: translateFormat(data.data.x),
                        // axisLabel: {
                        //     rotate: 45, // 设置 X 轴标签的旋转角度
                        //     textStyle: {
                        //         color: '#333', // 设置标签颜色
                        //         fontSize: 12 // 设置标签字体大小
                        //     }
                        // }
                    },
                    yAxis: {
                        type: 'value',
                        // type: 'dashed' // 设置 y 轴轴线类型，可选值：'solid', 'dashed', 'dotted'
                    },
                    series: [
                        {
                            name: '活跃玩家',
                            type: 'line',
                            smooth: true,
                            data: data.data.y1,
                            lineStyle: {
                                // color: '#ff0000',
                                width: 3,
                                // type: 'dashed'
                            },
                            itemStyle: {
                                color: '#edc82d',
                                // borderColor: '#0000ff',
                                borderWidth: 8,
                            },
                            // symbol: 'circle',
                            // symbolSize: 8,
                            areaStyle: {
                                color: 'rgba(237,200,45, 0.1)' // 设置折线图区域填充颜色及透明度
                            }
                        },
                        {
                            name: '加入玩家',
                            type: 'bar',
                            data: data.data.y2,
                            barWidth: '24%',
                            itemStyle: {
                                color: '#2265d0', // 设置柱子的颜色
                                borderRadius: [5, 5, 0, 0]
                            },
                        },
                    ],
                })
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
            if (isLoading) {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        countActivePlayersApi(getBeginWeek(), getEndWeek(), true)
    }, [])

    return (<>
        <ConfigProvider locale={locale}>
            <Card>
                <Box sx={{p: 2}} dir="ltr">
                    <Skeleton loading={loading}>
                        <div style={{
                            paddingBottom: 8
                        }}>
                            <RangePicker
                                defaultValue={defaultRange}
                                format="YYYY-MM-DD"
                                locale="zh-cn" // 可选，设置为中文或其他语言
                                onChange={handleRangeChange}
                                needConfirm
                            />
                        </div>
                        <EChartComponent options={chartOptions} title={'活跃玩家'}/>
                    </Skeleton>
                </Box>
            </Card>
        </ConfigProvider>
    </>)
}