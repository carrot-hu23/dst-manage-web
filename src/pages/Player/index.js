import { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Skeleton,message } from 'antd';
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
    useEffect(() => {
        getPlayerListApi()
        .then(data=>{
            console.log(data);
            if(data.data === null || data.data === undefined) {
                setPlayerList([])
            } else{
                setPlayerList(data.data)
            }
        })
        getAdminPlayerListApi()
        .then(data=>{
            console.log(data);
            if(data.data === null || data.data === undefined) {
                setAdminPlayerList([])
            } else{
                setAdminPlayerList(data.data.filter(item=>item !== '' && item !== ' '))
            }
        })
        getBlackListPlayerListApi()
        .then(data=>{
            console.log(data);
            if(data.data === null || data.data === undefined) {
                setBlacklistPlayerList([])
            } else{
                setBlacklistPlayerList(data.data.filter(item=>item !== '' && item !== ' '))
            }
            setLoading(false)
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
                children: <Blacklist blacklistPlayerList={blacklistPlayerList}/>,
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
    return <Skeleton loading={loading} active >
        <Container maxWidth="xl">
            <Card>
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ProCard tabs={tabs} />
                </Box>
            </Card>
        </Container>
    </Skeleton>
}

export default Player
