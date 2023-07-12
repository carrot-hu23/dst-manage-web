import {Typography, Space} from 'antd';
import { useEffect, useState } from 'react';

import {useParams} from "react-router-dom";
import { archiveApi } from '../../../api/gameApi';

import './index.css';

const { Paragraph } = Typography;

export default () => {

    const [archive, setArchive] = useState({players: []})
    const {cluster} = useParams()

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
                const { players } = data.data
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
    const Span = ({text})=> {
       return <span style={{paddingRight: '8px'}}>{text}</span>
    }
    return (
        <>
            <ul>
                <li><Span text={"房间:"} /> {archive.clusterName}</li>
                <li><Span text={"模式:"} /> {archive.gameMod}</li>
                <li><Span text={"季节:"} /> {archive.days}/{archive.phase} {archive.season}({archive.elapseddaysinseason}/{archive.elapseddaysinseason+archive.remainingdaysinseason})</li>
                <li><Span text={"模组:"} /> {archive.mods}</li>
                <li><Space><Span text={"直连:"} /><Paragraph copyable>{archive.ipConnect}</Paragraph></Space></li>
            </ul>

        </>
    )
}