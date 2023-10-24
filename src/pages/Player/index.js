import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ProCard} from '@ant-design/pro-components';
import {message, Skeleton} from 'antd';
import {Card, Container, Box} from '@mui/material';
import './index.css';

import Administrator from './Administrator';
import Blacklist from './Blacklist';
import Online from './Online';
import {
    addAdminPlayerListApi,
    addBlackListPlayerListApi, deleteAdminPlayerListApi, deleteBlackListPlayerListApi,
    getAdminPlayerListApi,
    getBlackListPlayerListApi,
    getPlayerListApi
} from '../../api/playerApi';


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

    function deleteAdminlist(kuId) {
        deleteAdminPlayerListApi(cluster, [kuId])
            .then(resp => {
                if (resp.code === 200) {

                    console.log(kuId)
                    const newAdminList = []
                    // eslint-disable-next-line no-restricted-syntax
                    for (const id of adminPlayerList) {
                        if (id !== kuId) {
                            newAdminList.push(id)
                        }
                    }
                    setAdminPlayerList([...newAdminList])
                    message.success("移除白名单成功")
                }
            })
    }

    function deleteBlacklist(kuId) {
        deleteBlackListPlayerListApi(cluster, [kuId])
            .then(resp => {
                if (resp.code === 200) {
                    const newAdminList = []
                    // eslint-disable-next-line no-restricted-syntax
                    for (const id of blacklistPlayerList) {
                        if (id !== kuId) {
                            newAdminList.push(id)
                        }
                    }
                    setBlacklistPlayerList([...newAdminList])
                    message.success("移除黑名单成功")
                }
            })
    }

    function addBlacklist(kuId) {

        addBlackListPlayerListApi(cluster, [kuId])
            .then(resp => {
                if (resp.code === 200) {
                    setBlacklistPlayerList(current => [...current, kuId])
                    message.success("添加黑名单成功")
                }
            })
    }

    function addAdminlist(kuId) {
        addAdminPlayerListApi(cluster, [kuId])
            .then(resp => {
                if (resp.code === 200) {
                    setAdminPlayerList(current => [...current, kuId])
                    message.success("添加管理员成功")
                }
            })
    }

    const tabs = {
        activeKey: tab,
        items: [
            {
                label: `在线玩家`,
                key: 'tab1',
                // eslint-disable-next-line react/jsx-no-bind
                children: <Online playerList={playerList} addBlacklist={addBlacklist} addAdminlist={addAdminlist}/>,
            },
            {
                label: `黑名单`,
                key: 'tab2',
                // eslint-disable-next-line react/jsx-no-bind
                children: <Blacklist blacklistPlayerList={blacklistPlayerList} addBlacklist={addBlacklist} deleteBlacklist={deleteBlacklist}/>,
            },
            {
                label: `管理员`,
                key: 'tab3',
                // eslint-disable-next-line react/jsx-no-bind
                children: <Administrator adminPlayerList={adminPlayerList} playerList={playerList} addAdminlist={addAdminlist} deleteAdminlist={deleteAdminlist}
                />,
            },
        ],
        onChange: (key) => {
            setTab(key);
        },
    }
    return (<>
        <Container maxWidth="xxl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading} active>
                        <ProCard tabs={tabs}/>
                    </Skeleton>
                </Box>
            </Card>
        </Container>
    </>)

}

export default Player
