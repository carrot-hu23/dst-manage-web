import {Typography, Space, Form, Button} from 'antd';
import {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi';

import './index.css';
import style from "../../DstServerList/index.module.css";


const {Paragraph} = Typography;

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
                const ar = {
                    clusterName: data.data.clusterName,
                    gameMod: data.data.gameMod,
                    mods: data.data.mods,
                    maxPlayers: data.data.maxPlayers,
                    ipConnect: data.data.ipConnect,
                    meta: data.data.meta
                }
                const {players} = data.data
                if (players === null) {
                    ar.players = []
                } else {
                    ar.players = players
                }
                const metaInfo = data.data.meta
                ar.days = metaInfo.Clock.Cycles || '未知'
                ar.season = metaInfo.Seasons.Season || '未知'
                ar.phase = metaInfo.Clock.Phase || '未知'
                ar.elapseddaysinseason = metaInfo.Seasons.ElapsedDaysInSeason || '未知'
                ar.remainingdaysinseason = metaInfo.Seasons.RemainingDaysInSeason || '未知'
                setArchive(ar)
            }).catch(error => console.log(error))

    }, [])

    return (
        <>
            <Form>
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
                        {archive.days}/{archive.phase} {archive.season}({archive.elapseddaysinseason}/{archive.elapseddaysinseason + archive.remainingdaysinseason})
                    </span>
                </Form.Item>
                <Form.Item label={t('Mods')}>
                    <span>
                        {archive.mods}
                    </span>
                </Form.Item>
                <Form.Item label={t('IpConnect')}>
                    <Paragraph copyable>{archive.ipConnect}</Paragraph>
                </Form.Item>

                <Form.Item label={t('人数')}>
                    <span>{`${archive.players.length}/${archive.maxPlayers}`}</span>
                    <Button type={"link"} onClick={()=>{navigate(`/dashboard/player`)}}>详情</Button>
                </Form.Item>
            </Form>
        </>
    )
}