
import { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

import './index.css';
import {useTheme} from "../../../hooks/useTheme";

const {Divider } = StatisticCard;

// eslint-disable-next-line react/prop-types
const BackupStatistic = ({size, data}) => {
    const [responsive, setResponsive] = useState(false);
    const {theme} = useTheme();

    return (
        <>
            <RcResizeObserver key="resize-observer" onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}>
                <StatisticCard.Group
                    className={theme === 'dark' ? 'dark' : ''}
                    direction={responsive ? 'column' : 'row'}>
                    <StatisticCard
                        statistic={{
                            title: '当前备份个数',
                            value: size,
                        }} />
                    <Divider type={responsive ? 'horizontal' : 'vertical'} />
                    <StatisticCard statistic={{
                        title: '备份大小',
                        value: data > 1 ? `${data} GB`:`${data * 1024} MB`,
                    }}
                    />
                </StatisticCard.Group>
            </RcResizeObserver>
        </>
    )
}

export default BackupStatistic