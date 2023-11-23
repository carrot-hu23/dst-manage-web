import {Alert, Form, Space, Tooltip} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../../components2/HiddenText/HiddenText";


export default () => {
    const navigate = useNavigate();

    const [archive, setArchive] = useState({
        players: [],
        maxPlayers: 0
    })
    const {cluster} = useParams()
    const {t} = useTranslation()

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                console.log(data.data);
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])

    return (
        <>
            <Form className={'dst'}>
                <Form.Item label={t('ClusterName')}>
                    <span className={style.icon}>
                        {archive.clusterName}
                    </span>
                </Form.Item>
                <Form.Item label={t('GameMod')}>
                    <span>
                        {archive.gameMod}
                    </span>
                </Form.Item>
                <Form.Item label={t('Season')}>
                    <span>
                        {archive?.meta?.Clock?.Cycles+1}/{archive?.Clock?.Phase} {archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                    </span>
                </Form.Item>
                <Form.Item label={t('Mods')}>
                    <span>
                        {archive.mods}
                    </span>
                </Form.Item>
                <Form.Item label={t('人数')}>
                    <span>{`${archive?.players?.length}/${archive.maxPlayers}`}</span>
                </Form.Item>
                <Form.Item label={t('IpConnect')}>
                    <Space size={8}>
                        <HiddenText text={archive.ipConnect} />
                        <Tooltip placement="topLeft" title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item label={t('Password')}>
                    <HiddenText text={archive.password} />
                </Form.Item>
                <Form.Item label={t('Version')}>
                    <span>
                        {archive.version} / {archive.lastVersion}
                    </span>
                </Form.Item>
                <Alert style={{
                    marginBottom: '4px'
                }} message={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`} type="info" showIcon closable />
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

            </Form>
        </>
    )
}