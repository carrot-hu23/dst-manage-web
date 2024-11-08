/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {Image, Skeleton, Col, Button, Space, message, Spin, Select, List, Tag} from 'antd';
import {useTranslation} from "react-i18next";

import {dstRoles} from '../../../utils/dst';
import {getAllOnlinePlayersApi, getOnlinePlayersApi, sendCommandApi} from "../../../api/8level";
import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home2/HiddenText/HiddenText";

import {usePlayerListStore} from "@/store/usePlayerListStore";
import {useLevelsStore} from "@/store/useLevelsStore";


const Online = () => {

    const { t } = useTranslation()



    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [spin, setSpin] = useState(false)

    const levels = useLevelsStore((state) => state.levels)
    const playerList = usePlayerListStore((state) => state.playerList)
    const setPlayerList = usePlayerListStore((state) => state.setPlayerList)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels ? "" : levels[0].key)

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
            .then(resp => {
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
            .then(resp => {
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
            .then(resp => {
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

    return (
        <>
            {notHasLevels && (
                <span>当前暂无世界</span>
            )}

            {!notHasLevels && (
                <Spin spinning={spin}>
                    <Skeleton loading={loading} active>
                        <Space size={8}>
                            <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                defaultValue={notHasLevels ? "" : levels[0].levelName}
                                options={levels.map(level => ({
                                    value: level.key,
                                    label: level.levelName,
                                }))}
                            />
                            <Button color="primary" variant="filled" size={'small'} onClick={() => {
                                queryPlayers()
                            }}>{t('panel.query')}</Button>
                            <Button color="primary" variant="filled" size={'small'} onClick={() => {
                                queryAllPlayers()
                            }}>{t('panel.query_all')}</Button>
                            <div>
                                <Tag color={'green'}>{playerList.length}</Tag>
                            </div>
                        </Space>

                        <List
                            pagination={playerList?.length >= 10}
                            dataSource={playerList}
                            renderItem={(item) => (
                                <List.Item>
                                    <Col xs={18} sm={10} md={10} lg={10} xl={10}>
                                        <Space align="center" size={'middle'}>
                                            <div>
                                                <Image preview={false} width={48}
                                                       src={dstRoles[item.role] || dstRoles.mod}/>
                                            </div>
                                            <div className={style.icon}>
                                                {item.name}
                                            </div>
                                            <div>
                        <span style={{color: '#1677ff'}}>
                            <HiddenText text={item.kuId}/>
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
                                                <Button size={'small'} color="primary" variant="filled" onClick={() => {
                                                    killPlayer(item)
                                                }}>K I L L</Button>
                                                <Button size={'small'} color="primary" variant="filled" onClick={() => {
                                                    respawnPlayer(item)
                                                }}>{t('panel.respawn')}</Button>
                                                <Button size={'small'} color="primary" variant="filled" onClick={() => {
                                                    kickPlayer(item)
                                                }}>{t('panel.kick')}</Button>
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