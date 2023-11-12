/* eslint-disable react/prop-types */
import {StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useState} from 'react';

import {Progress, Tooltip} from 'antd';
import {useTranslation} from "react-i18next";

import './index.css'
import {useTheme} from "../../../hooks/useTheme";

// import dstLogo from '../../../assets/Dont_Starve_Together_Logo.png'

function formatData(data, num) {
    return data.toFixed(num)
}

const {Statistic, Divider} = StatisticCard;

const GameStatistic = (props) => {

    const {theme} = useTheme();

    const {t} = useTranslation()

    const MB = 1024 * 1024
    const GB = 1024 * MB

    const [responsive, setResponsive] = useState(false);

    const cpuUsedPercent = formatData(props.data.cpu.cpuUsedPercent || 0, 2);
    const cpuPercent = props.data.cpu.cpuPercent || []
    const cpuCores = props.data.cpu.cores

    const memTotal = formatData(props.data.mem.total || 0, 2);
    const memUsedPercent = formatData(props.data.mem.usedPercent || 0, 2);
    const memUsed = formatData(props.data.mem.used || 0, 2);
    const memAvailable = formatData(props.data.mem.available || 0, 2);

    const diskTotal = (props.data.disk.devices || []).map((item) => Number(item.total))
        // eslint-disable-next-line no-restricted-globals
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskFree = (props.data.disk.devices || []).map((item) => Number(item.total - (item.total * item.usage * 0.01)))
        // eslint-disable-next-line no-restricted-globals
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskUsage = formatData((diskTotal - diskFree) / diskTotal * 100, 2);
    const adminMem = formatData(props.data.memStates / 1024, 2)

    return (
        <>
            <RcResizeObserver key="resize-observer" onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}>
                <StatisticCard.Group
                    className={theme === 'dark' ? 'dark' : ''}
                    direction={responsive ? 'column' : 'row'}>

                    <StatisticCard
                        className={theme === 'dark' ? 'dark' : ''}
                        statistic={{
                            title: t('MemoryUsage'),
                            value: `${formatData(memUsed / 1024 / 1024 / 1024, 2)} GB`,
                            description: <Statistic
                                className={theme === 'dark' ? 'dark' : ''}
                                title={t('TotalMem')}
                                value={`${formatData(memAvailable / 1024 / 1024 / 1024, 2)} / ${formatData(memTotal / 1024 / 1024 / 1024, 2)} GB`}/>,
                        }} chart={
                        <>
                            <Progress type="circle" percent={memUsedPercent}
                                      strokeColor={memUsedPercent > 70 ? 'red' : '#5BD171'} status='normal' width={70}
                                      strokeLinecap="butt" strokeWidth={8}/>
                        </>
                    } chartPlacement="left"/>

                    <StatisticCard
                        className={theme === 'dark' ? 'dark' : ''}
                        statistic={
                            {
                                title: t('CpuUsage'),
                                value: `${cpuUsedPercent} %`,
                                description: <Statistic
                                    className={theme === 'dark' ? 'dark' : ''}
                                    title={t('CpuCores')} value={cpuCores}/>,
                            }} chart={
                        <>
                            <Tooltip placement="rightTop" style={{
                                background: '#fff'
                            }} title={(
                                <div>
                                    {cpuPercent !== undefined && cpuPercent.map((value, index) =>
                                        <div>
                                            {`核心${index}`}: {formatData(value, 2)}%<Progress
                                            percent={formatData(value, 2)} size="small" strokeColor={'#5BD171'}
                                            status="active"/>
                                        </div>)}
                                </div>)}>
                                <Progress type="circle" percent={cpuUsedPercent}
                                          strokeColor={cpuUsedPercent > 70 ? 'red' : ''} status='normal' width={70}
                                          strokeLinecap="butt" strokeWidth={8}/>
                            </Tooltip>
                        </>
                    } chartPlacement="left"/>

                    <StatisticCard
                        className={theme === 'dark' ? 'dark' : ''}
                        statistic={{
                            title: t('DiskFree'),
                            value: `${formatData(diskFree, 2)} GB`,
                            description: <Statistic
                                className={theme === 'dark' ? 'dark' : ''}
                                title={t('TotalDisk')} value={`${formatData(diskTotal, 2)} GB`}/>,
                        }} chart={
                        <>
                            <Progress type="circle" percent={diskUsage} strokeColor={diskUsage > 90 ? 'red' : ''}
                                      status='normal' width={70} strokeLinecap="butt" strokeWidth={8}/>
                        </>
                    } chartPlacement="left"/>
                </StatisticCard.Group>
            </RcResizeObserver>
        </>
    )
}

export default GameStatistic