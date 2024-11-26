import {Alert, Form, Space, Tooltip} from 'antd';

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
    const {i18n} = useTranslation()
    const lang = i18n.language

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
            if (lang === "en") {
                return "morning"
            }
            return '早';
        }
        if (daysLeftInSeason < thresholdEarly) {
            if (lang === "en") {
                return "evening"
            }
            return '晚';
        }
        return '';
    }

    return (
        <>
            <Form
                layout={'horizontal'}
                className={'dst'}>
                <Form.Item label={t('panel.clusterName')}>
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
                <Form.Item label={t('panel.gameMod')}>
                    <span>
                        {archive?.gameMod}
                    </span>
                </Form.Item>
                <Form.Item label={t('panel.season')}>
                    <span>
                        {lang === "en" && <span>
                            {archive?.meta?.Clock?.Cycles + 1}/{archive?.meta?.Clock?.Phase}{" "}{getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{" "}{archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </span>}
                        {lang === "zh" && <span>
                            {archive?.meta?.Clock?.Cycles + 1}天/{dstSegs[archive?.meta?.Clock?.Phase]} {getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </span>}

                    </span>
                </Form.Item>
                <Form.Item label={t('panel.mods')}>
                    <span>
                        {archive?.mods}
                    </span>
                </Form.Item>
                <Form.Item label={t('panel.players')}>
                    <span>{`${playerList?.length}/${archive?.maxPlayers}`}</span>
                </Form.Item>
                <Form.Item label={t('panel.ipConnect')}>
                    <Space size={8}>
                        <HiddenText text={archive?.ipConnect}/>
                        <Tooltip placement="topLeft" title={`请开放对应的 ${archive?.port} udp 端口，已开放请忽略`}>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item label={t('panel.password')}>
                    <HiddenText text={archive?.password}/>
                </Form.Item>
                <Form.Item label={t('panel.version')}>
                    <span>
                        {archive?.version} / {archive?.lastVersion}
                    </span>
                </Form.Item>
                {archive?.version !== archive?.lastVersion && archive?.version !== 0 &&
                    <Alert
                        action={[
                            <>
                                <a target={'_blank'}
                                   href={'https://forums.kleientertainment.com/game-updates/dst/'}
                                   key="list-loadmore-edit"
                                   rel="noreferrer">
                                    {t('panel.new.version.read')}
                                </a>
                            </>
                        ]}
                        message={t('panel.has.new.version')} type="warning" showIcon closable/>}
                {archive?.version === 0 &&
                    <Alert
                        action={[]}
                        message={t('panel.dst.install.fail')} type="warning" showIcon closable/>
                }
            </Form>

        </>
    )
}