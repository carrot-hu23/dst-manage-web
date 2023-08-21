import {useTranslation} from "react-i18next";
import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Image, notification, Skeleton, Tabs} from 'antd';
import {Container, Box} from '@mui/material';

import GameOperator from "./GameOperator";
import ControlPanel from './ControlPanel';

import {getGameDashboardApi} from '../../api/gameDashboardApi';
import {dstVersionApi} from '../../api/dstApi';
import Announce from "./Announce";
import ServerLog from "./ServerLog";


const initData = {
    cpu: {
        "cores": 0,
        "cpuPercent": 0
    },
    mem: {
        "total": 0,
        "free": 0,
        "usedPercent": 0
    },
    disk: {
        "devices": [
            {
                "total": 0,
                "Usage": 0,
            }
        ]
    },
    memStates: 1513,
    masterPs: {
        cpuUage: "",
        memUage: "",
        VSZ: "",
        RSS: ""
    },
    cavesPs: {
        cpuUage: "",
        memUage: "",
        VSZ: "",
        RSS: ""
    }
}

const Panel = () => {
    const { t } = useTranslation()
    const [api, contextHolder] = notification.useNotification();

    const updateNoticficationIcon = 'https://www.klei.com/sites/default/files/games/dont-starve-together/assets/dont-starve-togetherlayer2_0.png'

    const openNotification = (params) => {
        api.open({
            message: '饥荒有新的版本更新了',
            description: (
                <>
                    请点击更新游戏按钮。
                    <a target={'_blank'}
                       href={'https://forums.kleientertainment.com/game-updates/dst/'} key="list-loadmore-edit"
                       rel="noreferrer">
                        查看更新内容
                    </a>
                    <br />
                    <div>Vserion: {params}</div>
                </>
            ),
            icon: (<Image preview={false} width={32} src={updateNoticficationIcon} />),
        });
    };

    const [gameData, setGameData] = useState(initData)

    const [loading, setLoading] = useState(false)
    const {cluster} = useParams()
    const [masterLog, setMasterLog] = useState("")
    const initDashboard = () => {
        getGameDashboardApi(cluster)
            .then(response => {
                setGameData(response.data)
            })
    }

    const firstRequest = () => {
        getGameDashboardApi(cluster)
            .then(response => {

                setGameData(response.data)
                setMasterLog(response.data.masterLog)
                setLoading(false)

                const localVersion = response.data.version.replace("\n", "")
                dstVersionApi()
                    .then(response => {
                        if (response > parseInt(localVersion, 10)) {
                            openNotification(response)
                        }
                    })
            })
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const items = [
        {
            key: '1',
            label: t('Panel'),
            children: <Skeleton loading={loading}>
                        <GameOperator gameData={gameData} logPath={masterLog}/>
                    </Skeleton>,
        },
        // {
        //     key: '2',
        //     label: t('Remote'),
        //     children: <ControlPanel/>,
        // },
        // {
        //     key: '3',
        //     label: t('Announce'),
        //     children: <Announce />,
        // },
        {
            key: '4',
            label: t('游戏日志'),
            children: <ServerLog/>,
        },
    ];

    return (
        <>
            {contextHolder}
            <Container maxWidth="xl">
                <Box sx={{p: 0, pb: 1}} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items}/>
                </Box>
            </Container>
        </>
    )
};

export default Panel