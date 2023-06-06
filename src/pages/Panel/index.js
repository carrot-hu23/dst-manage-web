import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { Tabs } from 'antd';
import { Container, Box } from '@mui/material';

import ControlPanel from './ControlPanel';
import GameLog2 from './GameLog';
import GameStatistic from '../Dashboard/Statistics';
import Console from '../Dashboard/console';

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

const Panel = () => {

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

    const items = [
        {
            key: '1',
            label: `面板操作`,
            children: <>
                <GameStatistic data={gameData} />
                {/* <Row gutter={[16, 8]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Console data={gameData} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <ArchiveInfo />
                    </Col>
                </Row> */}
                <Console data={gameData} />
            </>,
        },
        {
            key: '2',
            label: `远程操作`,
            children: <ControlPanel />,
        },
        {
            key: '3',
            label: `地面日志`,
            children: <GameLog2 path={gameData.masterLog} id={"Master"} />,
        },
        {
            key: '4',
            label: `洞穴日志`,
            children: <GameLog2 path={gameData.cavesLog} id={"Caves"} />,
        },
    ];

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ p: 0, pb: 1 }} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items} />
                </Box>
            </Container>
        </>
    )
};

export default Panel