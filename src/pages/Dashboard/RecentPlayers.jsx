import {Box, Card} from "@mui/material";
import {ConfigProvider, DatePicker, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import EChartComponent from "./EChartComponent";
import {countRoleRate} from "../../api/statisticsApi";
import {getBeginWeek, getEndWeek} from "../../utils/dateUitls";
import {dstRolesMap} from "../../utils/dst";

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
        countRoleRate(cluster, start, end)
            .then(response => {
                const {data} = response
                setChartOptions({
                    title: {
                        text: '角色占比',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: '角色占比',
                            type: 'pie',
                            radius: '50%',
                            data: data?.map(item => {
                                if (item.role === '') {
                                    return ({name: "other", value: item.count})
                                }
                                if (!(item.role in dstRolesMap)) {
                                    return ({name: item.role, value: item.count})
                                }
                                return ({name: dstRolesMap[item.role], value: item.count})
                            }),
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
                    // color: ['#ff9a9e', '#fad0c4', '#a18cd1', '#a1c4fd'] // 设置饼图的颜色
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
                        <EChartComponent options={chartOptions} title={'角色占比'}/>
                    </Skeleton>
                </Box>
            </Card>
        </ConfigProvider>
    </>)
}