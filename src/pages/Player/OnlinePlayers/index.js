/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {Image, Skeleton, Col, Button, Divider, Space, message, Spin, Select} from 'antd';
import {Card, Container, Box} from '@mui/material';

import {dstRoles} from '../../../utils/dst';
import {getOnlinePlayersApi, sendCommandApi} from "../../../api/8level";

const Online = () => {

    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [spin, setSpin] = useState(false)
    const [playerList, setPlayerList] = useState([])
    const [levelName, setLevelName] = useState("Master")

    useEffect(() => {
        setLoading(true)
        getOnlinePlayersApi(cluster, levelName)
            .then(resp => {
                if (resp.code === 200) {
                    setPlayerList(resp.data)
                }
                setLoading(false)
            })
    }, [])


    function queryPlayers() {
        setSpin(true)
        getOnlinePlayersApi(cluster, levelName)
            .then(resp => {
                if (resp.code === 200) {
                    setPlayerList(resp.data)
                }
                setSpin(false)
            })
    }

    async function sendCommand(levelName, command) {
        return sendCommandApi(cluster, levelName, command)
    }

    const kickPlayer = (player) => {
        setLoading(true)
        const command = `TheNet:Kick("${player}")`
        const resp = sendCommand(levelName, command)
        if (resp.code === 200) {
            message.success(`提出 ${player.name} success`)
        } else {
            message.error(`提出 ${player.name} error`)
        }
        setLoading(false)
    }
    const killPlayer = (player) => {
        setLoading(true)
        const command = `UserToPlayer("${player}"):PushEvent('death')`
        const resp = sendCommand(levelName, command)
        if (resp.code === 200) {
            message.success(`kill ${player.name} success`)
        } else {
            message.error(`kill ${player.name} error`)
        }
        setLoading(false)
    }
    const respawnPlayer = (player) => {

        setLoading(true)
        const command = `UserToPlayer("${player}"):PushEvent('respawnfromghost')`
        const resp = sendCommand(levelName, command)
        if (resp.code === 200) {
            message.success(`kill ${player.name} success`)
        } else {
            message.error(`kill ${player.name} error`)
        }
        setLoading(false)

    }


    const handleChange = (value) => {
        setLevelName(value)
    }
    const list = playerList.map((item) => (
        <>
            <Col xs={18} sm={10} md={10} lg={10} xl={10}>
                <Space align="center" size={'middle'}>
                    <div>
                        <Image preview={false} width={48} src={dstRoles[item.role]}/>
                    </div>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        <span style={{color: '#1677ff'}}>{item.kuId}</span>
                    </div>
                </Space>
            </Col>
            <Col xs={4} sm={1} md={4} lg={4} xl={4}>
                <Space size={'middle'}>
                    <span>{item.day}天</span>
                </Space>

            </Col>
            <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                <Spin spinning={loading}>
                    <Space wrap>
                        <Button size={'small'} type="primary" onClick={() => {
                            killPlayer(item)
                        }}>K I L L</Button>
                        <Button size={'small'} type="primary" onClick={() => {
                            respawnPlayer(item)
                        }}>复活</Button>
                        <Button size={'small'} type="primary" onClick={() => {
                            kickPlayer(item)
                        }}>踢出</Button>
                    </Space>
                </Spin>
            </Col>
            <Divider style={{margin: '10px'}}/>

        </>
    ))

    return (
        <Container maxWidth="xl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Spin spinning={spin} tip={"正在查询玩家中"}>
                        <Skeleton loading={loading} active>
                            <Space size={8}>
                                <span>世界</span>
                                <Select
                                    defaultValue="Master"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: 'Master',
                                            label: '主 世 界',
                                        },
                                        {
                                            value: 'Slave1',
                                            label: '从世界1',
                                        },
                                        {
                                            value: 'Slave2',
                                            label: '从世界2',
                                        },
                                        {
                                            value: 'Slave3',
                                            label: '从世界3',
                                        },
                                        {
                                            value: 'Slave4',
                                            label: '从世界4',
                                        },
                                        {
                                            value: 'Slave5',
                                            label: '从世界5',
                                        },
                                        {
                                            value: 'Slave6',
                                            label: '从世界6',
                                        },
                                        {
                                            value: 'Slave7',
                                            label: '从世界7',
                                        },
                                    ]}
                                />
                                <Button type={'primary'} onClick={() => {
                                    queryPlayers()
                                }}>查询</Button>
                            </Space>
                            <br/>
                            {list}
                            <div>
                                <br/>
                                <br/>
                                {playerList.length === 0 && <span>当前暂无玩家</span>}
                            </div>
                        </Skeleton>
                    </Spin>
                </Box>
            </Card>
        </Container>
    )
}

export default Online