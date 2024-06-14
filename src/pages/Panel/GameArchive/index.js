import {Alert, Button, Form, message, Popconfirm, Space, Tooltip} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {ProDescriptions} from "@ant-design/pro-components";

import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {archiveApi, updateGameApi} from '../../../api/gameApi';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home2/HiddenText/HiddenText";
import {createBackupApi} from "../../../api/backupApi";
import {dstSeason, dstSegs} from "../../../utils/dst";


export default () => {
    useNavigate();
    const [archive, setArchive] = useState({
        players: [],
        maxPlayers: 0
    })
    const {cluster} = useParams()
    const {t} = useTranslation()

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                // const ar = {
                //     clusterName: data.data.clusterName,
                //     gameMod: data.data.gameMod,
                //     mods: data.data.mods,
                //     ipConnect: data.data.ipConnect,
                //     meta: data.data.meta
                // }
                // const metaInfo = data.data.meta
                // ar.days = metaInfo.Clock.Cycles || '未知'
                // ar.season = metaInfo.Seasons.Season || '未知'
                // ar.phase = metaInfo.Clock.Phase || '未知'
                // ar.elapseddaysinseason = metaInfo.Seasons.ElapsedDaysInSeason || '未知'
                // ar.remainingdaysinseason = metaInfo.Seasons.RemainingDaysInSeason || '未知'
                // ar.version = data.data.version
                // ar.lastVersion = data.data.lastVersion
                // ar.password = data.data.clusterPassword
                // ar.port = data.data.port
                // const {players} = data.data
                // if (players === null) {
                //     ar.players = []
                // } else {
                //     ar.players = players
                // }
                // ar.maxPlayers = data.data.maxPlayers
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])

    const updateGameOnclick = () => {
        message.success('正在更新游戏')
        setUpdateStatus(true)
        updateGameApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success('饥荒更新完成')
                } else {
                    message.error(`${response.msg}`)
                    message.warning("请检查steamcmd路径是否设置正确")
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                message.error(`饥荒更新失败${error}`)
                setUpdateStatus(false)
            })
    }

    const createBackupOnClick = () => {

        message.success('正在创建游戏备份')
        createBackupApi(cluster)
            .then(response => {
                message.success('创建游戏备份成功')
                setCreateBackupStatus(false)
            })
            .catch(error => {
                message.error(`创建游戏备份失败${error}`)
                setCreateBackupStatus(false)
            })
    }
    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)

    function getTimeStatus(daysElapsedInSeason, daysLeftInSeason) {
        const totalDays = daysElapsedInSeason + daysLeftInSeason;
        const thresholdEarly = totalDays / 3;

        if (daysElapsedInSeason <= thresholdEarly) {
            return '早';
        }
        if (daysLeftInSeason < thresholdEarly) {
            return '晚';
        }
        return '';
    }

    function shareClusterInfo() {
        if (navigator.clipboard) {
            // 使用Clipboard API复制文本
            let text = ""
            text += `房间: ${  archive.clusterName}\n`
            const status = getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)
            text += `天数: ${  archive?.meta?.Clock?.Cycles+1}天/${dstSegs[archive.meta?.Clock?.Phase]} ${status}${dstSeason[archive?.meta?.Seasons?.Season]} (${archive?.meta?.Seasons?.ElapsedDaysInSeason}/${archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})\n`
            text += `模组: ${  archive.mods}\n`
            if (archive?.password) {
                text += `密码: ${  archive?.password}\n`
            } else {
                text += `密码: 无\n`
            }
            text += `直连: ${  archive.ipConnect}\n`
            navigator.clipboard.writeText(text)
                .then(()=> {
                    message.success("复制成功")
                })
        } else {
            console.error("浏览器不支持Clipboard API");
        }
    }

    return (
        <>
            {archive.version !== archive.lastVersion &&
                <Alert
                    action={[
                        <>
                            <a target={'_blank'}
                               href={'https://forums.kleientertainment.com/game-updates/dst/'} key="list-loadmore-edit"
                               rel="noreferrer">
                                查看
                            </a>
                        </>
                    ]}
                    message="饥荒有新的版本了，请点击更新" type="warning" showIcon closable />}
            <ProDescriptions
                column={2}
            >
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    contentStyle={{
                        maxWidth: '80%',
                    }}
                    ellipsis
                    label={t('ClusterName')}
                >
                    <span className={style.icon}>
                        {archive.clusterName}
                    </span>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('GameMod')}
                >
                    {archive.gameMod}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('Mods')}
                >
                    {archive.mods}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('Season')}
                >
                    {archive?.meta?.Clock?.Cycles + 1}/{archive?.Clock?.Phase} {archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('Players')}
                >
                    <span>{`${archive?.players?.length}/${archive.maxPlayers}`}</span>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('Version')}
                >
                    {archive.version} / {archive.lastVersion}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('IpConnect')}
                >
                    <Space size={8}>
                        <HiddenText text={archive.ipConnect}/>
                        <Tooltip placement="topLeft"
                                 title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </Space>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('Password')}
                >
                    <Space size={8}>
                        <HiddenText text={archive.password}/>
                    </Space>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('操作')}
                >
                <Space size={16}>
                    <Popconfirm
                        title="是否更新游戏"
                        description={(
                            <span>更新游戏，将停止世界，请自行启动</span>
                        )}
                        placement="topLeft"
                        onConfirm={()=>updateGameOnclick()}
                    >
                        <Button size={'small'} loading={updateGameStatus} type="primary">
                            {t('updateGame')}
                        </Button>
                    </Popconfirm>

                    <Button
                        size={'small'}
                        onClick={() => {
                            createBackupOnClick()
                        }}
                        loading={createBackupStatus}
                    >
                        {t('createBackup')}
                    </Button>
                </Space>
                </ProDescriptions.Item>
            </ProDescriptions>
        </>
    )
}