/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Skeleton, Col, Button, Space, message, Spin, List, Tag} from 'antd';
import {sendCommandApi} from "../../../api/gameApi";


const Online = ({levels}) => {
    const { t } = useTranslation()

    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [spin, setSpin] = useState(false)
    const [playerList, setPlayerList] = useState([])

    useEffect(() => {
        setLoading(true)
        sendCommandApi("ShowPlayers")
            .then(resp => {
                if (resp.code === 200) {
                    console.log(resp.data)
                    const lines = resp.data.split('\n')
                    const players = []
                    lines.forEach(line=>{
                        const data = line.split(",")
                        players.push({
                            name: data[0],
                            playeruid: data[1],
                            steamid: data[2]
                        })
                    })
                    setPlayerList(players)
                }
                setLoading(false)
            })
    }, [])


    function queryPlayers() {
        setSpin(true)
        sendCommandApi("ShowPlayers")
            .then(resp => {
                if (resp.code === 200) {
                    console.log(resp.data)
                    const lines = resp.data.split('\n')
                    const players = []
                    lines.forEach(line=>{
                        const data = line.split(",")
                        players.push({
                            name: data[0],
                            playeruid: data[1],
                            steamid: data[2]
                        })
                    })
                    setPlayerList(players)
                }
                setSpin(false)
            })
    }

    const kickPlayer = (player) => {
    }

    const killPlayer = (player) => {

    }
    const respawnPlayer = (player) => {
    }

    return (
        <>
            <Spin spinning={spin}>
                <Skeleton loading={loading} active>
                    <Space size={8}>
                        <Button type={'primary'} onClick={() => {
                            queryPlayers()
                        }}>{t('查询玩家')}</Button>
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
                                            {item.name}
                                        </div>
                                    </Space>
                                </Col>
                                <Col xs={4} sm={1} md={4} lg={4} xl={4}>
                                    <div>
                                        {item.playeruid}
                                    </div>
                                </Col>
                                <Col xs={4} sm={1} md={4} lg={4} xl={4}>
                                    <div>
                                        {item.steamid}
                                    </div>
                                </Col>
                                {/**
                                 <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                 <Spin spinning={loading}>
                                 <Space wrap>
                                 <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                                 <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >{t('respawn')}</Button>
                                 <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >{t('kick')}</Button>
                                 </Space>
                                 </Spin>
                                 </Col>
                                 */}

                            </List.Item>
                        )}
                    />
                </Skeleton>
            </Spin>

        </>

    )
}

export default Online