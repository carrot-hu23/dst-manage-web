import {Alert, Form, Space, Tooltip} from 'antd';
import {ProDescriptions} from "@ant-design/pro-components";

import {QuestionCircleOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home2/HiddenText/HiddenText";
import {dstSeason, dstSegs} from "../../../utils/dst";
import {usePlayerListStore} from "../../../store/usePlayerListStore";


export default () => {

    const {t} = useTranslation()
    const {cluster} = useParams()
    const [archive, setArchive] = useState({})

    const playerList = usePlayerListStore((state) => state.playerList)

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                console.log(data.data);
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])

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

    return (
        <>
            <Form
                layout={'horizontal'}
                className={'dst'}>
                <Form.Item label={t('ClusterName')}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span className={style.icon}>
                            {archive?.clusterName}
                        </span>
                    </div>

                </Form.Item>
                <Form.Item label={t('GameMod')}>
                    <span>
                        {archive?.gameMod}
                    </span>
                </Form.Item>
                <Form.Item label={t('Season')}>
                    <span>
                        {archive?.meta?.Clock?.Cycles + 1}天/{dstSegs[archive?.meta?.Clock?.Phase]} {getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                    </span>
                </Form.Item>
                <Form.Item label={t('Mods')}>
                    <span>
                        {archive?.mods}
                    </span>
                </Form.Item>
                <Form.Item label={t('Players')}>
                    <span>{`${playerList?.length}/${archive?.maxPlayers}`}</span>
                </Form.Item>
                <Form.Item label={t('IpConnect')}>
                    <Space size={8}>
                        <HiddenText text={archive?.ipConnect}/>
                        <Tooltip placement="topLeft" title={`请开放对应的 ${archive?.port} udp 端口，已开放请忽略`}>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item label={t('Password')}>
                    <HiddenText text={archive?.password}/>
                </Form.Item>
                <Form.Item label={t('Version')}>
                    <span>
                        {archive?.version} / {archive?.lastVersion}
                    </span>
                </Form.Item>
                {/*
                <Alert style={{
                    marginBottom: '4px'
                }} message={`请开放对应的 ${archive?.port} udp 端口，已开放请忽略`} type="info" showIcon closable/>
                */}
                {archive?.version !== archive?.lastVersion && archive?.version !== 0 &&
                    <Alert
                        action={[
                            <>
                                <a target={'_blank'}
                                   href={'https://forums.kleientertainment.com/game-updates/dst/'}
                                   key="list-loadmore-edit"
                                   rel="noreferrer">
                                    查看
                                </a>
                            </>
                        ]}
                        message="饥荒有新的版本了，请点击更新" type="warning" showIcon closable/>}
                {archive?.version === 0 &&
                    <Alert
                        action={[]}
                        message="读取饥荒服务 version.txt 路径失败" type="warning" showIcon closable/>
                }
            </Form>

        </>
    )
}