import { Form, Typography, Card } from 'antd';
import { useEffect, useState } from 'react';
import luaparse from 'luaparse';

import { archiveApi } from '../../../api/gameApi';
import {useParams} from "react-router-dom";

const { Paragraph } = Typography;


function parseMata(metaData) {

    try {
        const deMataData = window.atob(metaData).slice(0, -1);
        const metaAst = luaparse.parse(deMataData);
        const metaFields = metaAst.body[0].arguments[0].fields;
        let cycles = "";
        let phase = "";
        let season = "";
    
        // 获取时钟
        const clock = metaFields[0];
        const seasons = metaFields[1];
        console.log('clock',clock);
        
        if (clock === undefined || clock.value === undefined) {
            cycles = "1"
        } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const field of clock.value.fields) {
                if (field.key.name === "cycles") {
                    cycles = field.value.value + 1;
                }
                if (field.key.name === "phase") {
                    phase = field.value.raw;
                }
            }
        }
        if (seasons === undefined ||seasons.value === undefined) {
            season = "spring"
        } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const field of seasons.value.fields) {
                if (field.key.name === "season") {
                    season = field.value.raw;
                }
            }
        }
    
        return { "cycles": cycles, "phase": phase, "season": season }
    } catch(error) {
        return { "cycles": "", "phase": "", "season": "" }
    }
}

const ArchiveInfo = () => {

    const [archive, setArchive] = useState({
        players: []
    })
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
                    ipConnect: data.data.ipConnect
                }
                const { players } = data.data
                if (players === null) {
                    ar.players = []
                } else {
                    ar.players = players
                }
                const meta = data.data.meta
                const metaInfo = parseMata(meta)
                ar.days = metaInfo.cycles
                ar.season = metaInfo.season
                ar.phase = metaInfo.phase
                setArchive(ar)
            }).catch(error => console.log(error))

    }, [])

    return (
            <Form
                labelCol={{
                    span: 3,
                }}
                // wrapperCol={{
                //     span: 14,
                // }}
                layout="horizontal"
                initialValues={{
                    pvp: false,
                    vote: true,
                    players: 8,
                    steam_group_only: false,
                }}
            >
                <Form.Item
                    label="房间名称"
                >
                    <span>{archive.clusterName}</span>
                </Form.Item>
                <Form.Item
                    label="游戏模式"
                >
                    <span>{archive.gameMod}</span>
                </Form.Item>
                <Form.Item
                    label="玩家数量"
                >
                    <span>{archive.players.length}</span>
                </Form.Item>
                <Form.Item
                    label="天数"
                >
                    <span>{archive.days}/{archive.phase}</span>
                </Form.Item>
                <Form.Item
                    label="季节"
                >
                    <span>{archive.season}</span>
                </Form.Item>
                <Form.Item
                    label="模组数量"
                >
                    <span>{archive.mods}</span>
                </Form.Item>
                <Form.Item
                    label="世界直连"
                >
                    <span>{archive.ipConnect}</span>
                    <Paragraph copyable>{archive.ipConnect}</Paragraph>
                </Form.Item>
            </Form>
    )
}

export default ArchiveInfo;