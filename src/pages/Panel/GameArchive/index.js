import {Typography, Space, Form, Button} from 'antd';
import {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi';

import './index.css';


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
    const Span = ({text}) => {
        return <span style={{paddingRight: '8px'}}>{text}</span>
    }
    return (
        <>
            <table>
                <tr>
                    <td>{`${t('ClusterName')} :`}</td>
                    <td> {archive.clusterName}</td>
                </tr>
                <tr>
                    <td>{`${t('GameMod')} : `}</td>
                    <td> {archive.gameMod}</td>
                </tr>
                <tr>
                    <td>{`${t('Season')} : `}</td>
                    <td> {archive.days}/{archive.phase} {archive.season}({archive.elapseddaysinseason}/{archive.elapseddaysinseason + archive.remainingdaysinseason})</td>
                </tr>
                <tr>
                    <td>{`${t('Mods')} : `}</td>
                    <td> {archive.mods}</td>
                </tr>
                <tr>
                    <td>{`${t('IpConnect')} : `}</td>
                    <td> <Paragraph copyable>{archive.ipConnect}</Paragraph></td>
                </tr>
                <tr>
                    <td>{`人数 : `}</td>
                    <td>
                        <span>{`${archive.players.length}/${archive.maxPlayers}`}</span>
                        <Button type={"link"} onClick={()=>{navigate(`/dashboard/player`)}}>详情</Button>
                    </td>
                </tr>
            </table>
        </>
    )
}