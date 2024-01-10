/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Image, Skeleton, Col, Row, Button, Divider, Space, message, Spin, Select, List, Avatar, Tag} from 'antd';

import {dstRoles} from '../../../utils/dst';
import {getOnlinePlayersApi, sendCommandApi} from "../../../api/8level";
import style from "../../DstServerList/index.module.css";
import HiddenText from "../../../components2/HiddenText/HiddenText";


const Online = ({levels}) => {
    const { t } = useTranslation()

    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [spin, setSpin] = useState(false)
    const [playerList, setPlayerList] = useState([])

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0].key)

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


    const kickPlayer = (player) => {
        setSpin(true)
        const command = `TheNet:Kick(\\"${player.kuId}\\")`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`踢出 ${player.name} success`)
                } else {
                    message.error(`踢出 ${player.name} error`)
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
                    <span>{item.day}{t('day')}</span>
                </Space>

            </Col>
            <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                <Spin spinning={loading}>
                    <Space wrap>
                        <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                        <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >{t('respawn')}</Button>
                        <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >{t('kick')}</Button>
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
                            <span>{t('level')}</span>
                            <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                defaultValue={notHasLevels?"":levels[0].levelName}
                                options={levels.map(level=>({
                                        value: level.key,
                                        label: level.levelName,
                                    }))}
                            />
                            <Button type={'primary'} onClick={() => {
                                queryPlayers()
                            }}>{t('query')}</Button>

                            <div>
                                {t('Players')}: <Tag color={'green'}>{playerList.length}</Tag>
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
                                            <span>{item.day}{t('day')}</span>
                                        </Space>

                                    </Col>
                                    <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                        <Spin spinning={loading}>
                                            <Space wrap>
                                                <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                                                <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >{t('respawn')}</Button>
                                                <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >{t('kick')}</Button>
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