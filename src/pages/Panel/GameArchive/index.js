import {Alert, Space, Tooltip} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {ProDescriptions} from "@ant-design/pro-components";

import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home2/HiddenText/HiddenText";
import {dstSeason, dstSegs, getDstMod, getTimeStatus} from "../../../utils/dst";
import {getAllOnlinePlayersApi} from "../../../api/8level";

import {usePlayerListStore} from "../../../store/usePlayerListStore";


export default () => {

    const playerList = usePlayerListStore((state) => state.playerList)

    const [archive, setArchive] = useState({
        players: [],
        maxPlayers: 0
    })
    const {cluster} = useParams()
    const {t} = useTranslation()

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])

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
                    {getDstMod("",archive.gameMod)}
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
                    {archive?.meta?.Clock?.Cycles + 1}天/{dstSegs[archive?.meta?.Clock?.Phase]} {getTimeStatus("zh", archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})

                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('Players')}
                >
                    <span>{`${playerList?.length}/${archive.maxPlayers}`}</span>
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
            </ProDescriptions>
        </>
    )
}