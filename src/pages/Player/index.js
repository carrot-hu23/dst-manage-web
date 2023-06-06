import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { ProCard } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import { Card, Container, Box } from '@mui/material';
import './index.css';

import Administrator from './Administrator';
import Blacklist from './Blacklist';
import Online from './Online';
import { getAdminPlayerListApi, getBlackListPlayerListApi, getPlayerListApi } from '../../api/playerApi';


const Player = () => {


    const [tab, setTab] = useState('tab1')
    const [loading, setLoading] = useState(true)
    const [playerList, setPlayerList] = useState([])
    const [adminPlayerList, setAdminPlayerList] = useState([])
    const [blacklistPlayerList, setBlacklistPlayerList] = useState([])

    const {cluster} = useParams()

    useEffect(() => {
        getPlayerListApi(cluster)
            .then(data => {
                console.log(data);
                if (data.data === null || data.data === undefined) {
                    setPlayerList([])
                } else {
                    setPlayerList(data.data)
                }
                setLoading(false)
            })
        getAdminPlayerListApi(cluster)
            .then(data => {
                console.log(data);
                if (data.data === null || data.data === undefined) {
                    setAdminPlayerList([])
                } else {
                    setAdminPlayerList(data.data.filter(item => item !== '' && item !== ' '))
                }
            })
        getBlackListPlayerListApi(cluster)
            .then(data => {
                console.log(data);
                if (data.data === null || data.data === undefined) {
                    setBlacklistPlayerList([])
                } else {
                    setBlacklistPlayerList(data.data.filter(item => item !== '' && item !== ' '))
                }

            })

    }, [])
    const tabs = {
        activeKey: tab,
        items: [
            {
                label: `在线玩家`,
                key: 'tab1',
                children: <Online playerList={playerList} />,
            },
            {
                label: `黑名单`,
                key: 'tab2',
                children: <Blacklist blacklistPlayerList={blacklistPlayerList} />,
            },
            {
                label: `管理员`,
                key: 'tab3',
                children: <Administrator adminPlayerList={adminPlayerList} playerList={playerList} />,
            },
        ],
        onChange: (key) => {
            setTab(key);
        },
    }
    return (<>
        <Container maxWidth="xl">
            <Card>
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <Skeleton loading={loading} active >
                        <ProCard tabs={tabs} />
                    </Skeleton>
                </Box>
            </Card>
        </Container>
    </>)

}

export default Player
