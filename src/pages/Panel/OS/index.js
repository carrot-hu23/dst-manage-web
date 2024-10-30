/* eslint-disable react/prop-types */
import {StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useEffect, useState} from 'react';
import {Progress, Tooltip} from 'antd';
import {useTranslation} from "react-i18next";
import {getSystemInfoApi} from "../../../api/systeminfoApi";
import {useTheme} from "../../../hooks/useTheme";

function formatData(data, num) {
    return data.toFixed(num)
}

const {Statistic, Divider} = StatisticCard;

export default () => {

    const {theme} = useTheme();
    const {t} = useTranslation()
    const [responsive, setResponsive] = useState(false);
    const [systeminfo, setSysteminfo] = useState({})

    const cpuUsedPercent = formatData(systeminfo?.cpu?.cpuUsedPercent || 0, 2);
    const cpuPercent = systeminfo?.cpu?.cpuPercent || []
    const cpuCores = systeminfo?.cpu?.cores
    const memTotal = formatData(systeminfo?.mem?.total || 0, 2);
    const memUsedPercent = formatData(systeminfo?.mem?.usedPercent || 0, 2);
    const memUsed = formatData(systeminfo?.mem?.used || 0, 2);
    const memAvailable = formatData(systeminfo?.mem?.available || 0, 2);

    const diskTotal = (systeminfo?.disk?.devices || []).map((item) => Number(item.total))
        // eslint-disable-next-line no-restricted-globals
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskFree = (systeminfo?.disk?.devices || []).map((item) => Number(item.total - (item.total * item.usage * 0.01)))
        // eslint-disable-next-line no-restricted-globals
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskUsage = formatData((diskTotal - diskFree) / diskTotal * 100, 2);

    useEffect(() => {
        getSystemInfoApi()
            .then(resp => {
                if (resp.code === 200) {
                    setSysteminfo(resp.data)
                }
            })

    }, [])
    useEffect(() => {
        const timerId = setInterval(() => {
            getSystemInfoApi()
                .then(resp => {
                    if (resp.code === 200) {
                        setSysteminfo(resp.data)
                    }
                })
        }, 5000)

        return () => {
            clearInterval(timerId); // 组件卸载时清除定时器
        };
    }, [])
    return (
        <>
                <RcResizeObserver key="resize-observer" onResize={(offset) => {
                    setResponsive(offset.width < 596);
                }}>
                    <StatisticCard.Group className={theme === 'dark' ? 'dark' : ''}
                                         direction={responsive ? 'column' : 'row'}>

                        <StatisticCard
                            statistic={{
                                title: t('panel.panel'),
                                value: `${formatData(systeminfo.panelMemUsage / 1024, 2)} M`,
                                description: (
                                    <>
                                        {systeminfo?.host?.os} /{systeminfo?.host?.kernelArch}-{systeminfo?.host?.platform}
                                    </>
                                ),
                            }}
                        />

                        <Divider type={responsive ? 'horizontal' : 'vertical'}/>
                        <StatisticCard statistic={{
                            title: t('panel.memoryUsage'),
                            value: `${formatData(memUsed / 1024 / 1024 / 1024, 2)} GB`,
                            description: <Statistic title={t('panel.totalMem')}
                                                    value={`${formatData(memAvailable / 1024 / 1024 / 1024, 2)} / ${formatData(memTotal / 1024 / 1024 / 1024, 2)} GB`}/>,
                        }} chart={
                            <>
                                <Progress type="circle" percent={memUsedPercent}
                                          strokeColor={memUsedPercent > 70 ? 'red' : '#5BD171'} status='normal'
                                          width={70}
                                          strokeLinecap="butt" strokeWidth={8}/>
                            </>
                        } chartPlacement="left"/>

                        <StatisticCard statistic={
                            {
                                title: t('panel.cpuUsage'),
                                value: `${cpuUsedPercent} %`,
                                description: <Statistic title={t('panel.cpuCores')} value={cpuCores}/>,
                            }} chart={
                            <>
                                <Tooltip placement="rightTop" style={{
                                    background: '#fff'
                                }} title={(
                                    <div>
                                        {cpuPercent !== undefined && cpuPercent.map((value, index) =>
                                            // eslint-disable-next-line react/jsx-key
                                            <div>
                                                {`核心${index}`}: {formatData(value, 2)}%<Progress
                                                percent={formatData(value, 2)} size="small" strokeColor={'#5BD171'}
                                                status="active"/>
                                            </div>)}
                                    </div>)}>
                                    <Progress type="circle" percent={cpuUsedPercent}
                                              strokeColor={cpuUsedPercent > 70 ? 'red' : ''} status='normal'
                                              width={70}
                                              strokeLinecap="butt" strokeWidth={8}/>
                                </Tooltip>
                            </>
                        } chartPlacement="left"/>

                        <StatisticCard statistic={{
                            title: t('panel.diskFree'),
                            value: `${formatData(diskFree, 2)} GB`,
                            description: <Statistic title={t('panel.totalDisk')}
                                                    value={`${formatData(diskTotal, 2)} GB`}/>,
                        }} chart={
                            <>
                                <Progress type="circle" percent={diskUsage}
                                          strokeColor={diskUsage > 90 ? 'red' : ''}
                                          status='normal' width={70} strokeLinecap="butt" strokeWidth={8}/>
                            </>
                        } chartPlacement="left"/>
                    </StatisticCard.Group>
                </RcResizeObserver>
        </>
    )
}