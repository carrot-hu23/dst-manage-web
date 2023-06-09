import { Col, Row, notification, Image, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import GameStatistic from './Statistics';
import Console from './console';
import GameLog from './Log';

import { getGameDashboardApi } from '../../api/gameDashboardApi';
import { dstVersionApi } from '../../api/dstApi';


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


const Dashboard = () => {

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

    const [loading, setLoading] = useState(true)

    const {cluster} = useParams()

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
                setLoading(false)

                const localVersion = response.data.version
                dstVersionApi()
                    .then(response => {
                        console.log(response);
                        // if (response !== localVersion) {
                        //     openNotification(response)
                        // }
                    })
            })
    }

    useEffect(() => {

        firstRequest()

        const timer = setInterval(() => {
            initDashboard()
        }, 10000)
        return () => clearInterval(timer)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {contextHolder}
            <GameStatistic data={gameData} />
            <br />
            <div>
                <Row gutter={[16, 8]}>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Skeleton active loading={loading}>
                            <Console data={gameData} />
                        </Skeleton>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Skeleton active loading={loading}>
                            <GameLog data={gameData.masterLog} />
                        </Skeleton>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Dashboard