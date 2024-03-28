/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {Image, Skeleton, Col, Button, Divider, Space, message, Spin, Select, List, Tag} from 'antd';

import {dstRoles} from '../../../utils/dst';
import {getAllOnlinePlayersApi, getOnlinePlayersApi, sendCommandApi} from "../../../api/8level";
import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home2/HiddenText/HiddenText";

const Online = ({levels}) => {

    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [spin, setSpin] = useState(false)
    const [playerList, setPlayerList] = useState([])

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0].key)

    useEffect(() => {
        setLoading(true)
        getAllOnlinePlayersApi(cluster)
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

    function queryAllPlayers() {
        setSpin(true)
        getAllOnlinePlayersApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    setPlayerList(resp.data)
                }
                setSpin(false)
            })
    }

    const kickPlayer = (player) => {
        setSpin(true)
        const command = `TheNet:Kick(\\"${player.kuId}"\\)`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`提出 ${player.name} success`)
                } else {
                    message.error(`提出 ${player.name} error`)
                }
                setSpin(false)
            })
    }
    const killPlayer = (player) => {
        setSpin(true)
        const command = `UserToPlayer(\\"${player.kuId}\\"):PushEvent('death')`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`kill ${player.name} success`)
                } else {
                    message.error(`kill ${player.name} error`)
                }
                setSpin(false)
            })
    }
    const respawnPlayer = (player) => {

        setSpin(true)
        const command = `UserToPlayer(\\"${player.kuId}\\"):PushEvent('respawnfromghost')`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`复活 ${player.name} success`)
                } else {
                    message.error(`复活 ${player.name} error`)
                }
                setSpin(false)
            })
    }


    const handleChange = (value) => {
        setLevelName(value)
    }
    const list = playerList.map((item) => (
        <>
            <Col xs={18} sm={10} md={10} lg={10} xl={10}>
                <Space align="center" size={'middle'}>
                    <div>
                        <Image preview={false} width={48} src={dstRoles[item.role] || dstRoles.mod} />
                    </div>
                    <div className={style.icon}>
                        {item.name}
                    </div>
                    <div>
                        <span style={{ color: '#1677ff' }}>
                            <HiddenText text={item.kuId} />
                        </span>
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
                        <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                        <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >复活</Button>
                        <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >踢出</Button>
                    </Space>
                </Spin>
            </Col>
            <Divider style={{ margin: '10px' }} />

        </>
    ))

    return (
        <>
            {notHasLevels && (
                <span>当前暂无世界</span>
            ) }

            {!notHasLevels && (
                <Spin spinning={spin}>
                    <Skeleton loading={loading} active>
                        <Space size={8}>
                            <span>世界</span>
                            <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                defaultValue={notHasLevels?"":levels[0].levelName}
                                options={levels.map(level=>{
                                    return {
                                        value: level.key,
                                        label: level.levelName,
                                    }
                                })}
                            />
                            <Button type={'primary'} size={'small'} onClick={() => {
                                queryPlayers()
                            }}>查询</Button>
                            <Button type={'primary'} size={'small'} onClick={() => {
                                queryAllPlayers()
                            }}>查询所有</Button>
                            <div>
                                人数: <Tag color={'green'}>{playerList.length}</Tag>
                            </div>
                        </Space>

                        <List
                            pagination={{
                                position: "bottom",
                                align: "end",
                                showSizeChanger: true,
                                total: playerList.length,
                                pageSizeOptions: [5, 10, 20, 50, 100]
                            }}
                            dataSource={playerList}
                            renderItem={(item) => (
                                <List.Item>
                                    <Col xs={18} sm={10} md={10} lg={10} xl={10}>
                                        <Space align="center" size={'middle'}>
                                            <div>
                                                <Image preview={false} width={48} src={dstRoles[item.role] || dstRoles.mod} />
                                            </div>
                                            <div className={style.icon}>
                                                {item.name}
                                            </div>
                                            <div>
                        <span style={{ color: '#1677ff' }}>
                            <HiddenText text={item.kuId} />
                        </span>
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
                                                <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                                                <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >复活</Button>
                                                <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >踢出</Button>
                                            </Space>
                                        </Spin>
                                    </Col>

                                </List.Item>
                            )}
                        />
                    </Skeleton>
                </Spin>
            )}

        </>

    )
}

export default Online