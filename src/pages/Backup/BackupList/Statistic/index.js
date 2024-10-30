import {useState} from 'react';
import {StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useTranslation} from "react-i18next";

import './index.css';
import {useTheme} from "../../../../hooks/useTheme";

const {Divider} = StatisticCard;

// eslint-disable-next-line react/prop-types
const BackupStatistic = ({size, data}) => {
    const {t} = useTranslation()
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
                            title: t('backup.backup.number'),
                            value: size,
                        }}/>
                    <Divider type={responsive ? 'horizontal' : 'vertical'}/>
                    <StatisticCard statistic={{
                        title: t('backup.backup.size'),
                        value: data > 1 ? `${data} GB` : `${data * 1024} MB`,
                    }}
                    />
                </StatisticCard.Group>
            </RcResizeObserver>
        </>
    )
}

export default BackupStatistic