import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Skeleton} from 'antd';
import {Container, Box} from '@mui/material';
import {parse} from "lua-json";
import {useParams} from "react-router-dom";

import GameOperator from "./GameOperator";

import ControlPanel from "./ControlPanel";
import {getLevelStatusApi} from "../../api/8level";


const Panel = () => {

    const {cluster} = useParams()

    const { t } = useTranslation()
    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        getLevelStatusApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    const levels = resp.data
                    const items = []
                    levels.forEach(level=>{
                        const item = {
                            key: level.uuid,
                            uuid: level.uuid,
                            levelName: level.levelName,
                            location: '未知',
                            ps: level.ps,
                            Ps: level.Ps,
                            status: level.status
                        }
                        try {
                            const data = parse(level.leveldataoverride)
                            item.location = data.location
                        } catch (error) {
                            console.log(error)
                        }
                        items.push(item)
                    })
                    setLevels(items)
                }
                setLoading(false)
            })
    }, [])

    useEffect(()=>{
        const timerId = setInterval(()=>{
            getLevelStatusApi(cluster)
                .then(resp => {
                    if (resp.code === 200) {
                        const levels = resp.data
                        const items = []
                        levels.forEach(level=>{
                            const item = {
                                key: level.uuid,
                                uuid: level.uuid,
                                levelName: level.levelName,
                                location: '未知',
                                ps: level.ps,
                                Ps: level.Ps,
                                status: level.status
                            }
                            try {
                                const data = parse(level.leveldataoverride)
                                item.location = data.location
                            } catch (error) {
                                console.log(error)
                            }
                            items.push(item)
                        })
                        setLevels(items)
                    }
                })
        }, 5000)

        return () => {
            clearInterval(timerId); // 组件卸载时清除定时器
        };
    }, [])

    const items = [
        {
            key: '1',
            label: t('Panel'),
            children: <GameOperator levels={levels}/>
        },
        {
            key: '2',
            label: t('Remote'),
            children: <ControlPanel levels={levels}/>,
        },
    ];
    const [segmented ,setSegmented] = useState("操作台")

    return (
        <>
            <Container maxWidth="xxl">
                <Box sx={{p: 0}} dir="ltr">
                    <Skeleton loading={loading} >
                        <GameOperator levels={levels}/>
                    </Skeleton>
                </Box>
            </Container>
        </>
    )
};

export default Panel