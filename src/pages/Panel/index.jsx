import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Skeleton, Tabs} from 'antd';
import {Container, Box} from '@mui/material';

import GameOperator from "./GameOperator";

import {getLevelStatusApi} from "../../api/8level";
import RemoteControl from "./GameOperator/RemoteControl";
import {useLevelsStore} from "../../store/useLevelsStore";


const Panel = () => {

    const { t } = useTranslation()
    const setLevels = useLevelsStore((state) => state.setLevels)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        getLevelStatusApi()
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
                            status: level.status,
                            modoverrides: level.modoverrides
                        }
                        items.push(item)
                    })
                    setLevels(items)
                }
                setLoading(false)
            })
    }, [])

    const items = [
        {
            key: '1',
            label: t('panel.panel'),
            children: <GameOperator/>
        },
        {
            key: '2',
            label: t('panel.remote'),
            children: <RemoteControl/>,
        },
    ];

    return (
        <>
            <Container maxWidth="xxl">
                <Box sx={{p: 0}} dir="ltr">
                    <Skeleton loading={loading} >
                        <Tabs defaultActiveKey="1" items={items}/>
                    </Skeleton>
                </Box>
            </Container>
        </>
    )
};

export default Panel