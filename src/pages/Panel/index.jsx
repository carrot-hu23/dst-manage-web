import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Skeleton} from 'antd';
import {Container, Box} from '@mui/material';
import {useParams} from "react-router-dom";

import GameOperator from "./GameOperator";

import {getLevelStatusApi} from "../../api/8level";
import {useLevelsStore} from "@/store/useLevelsStore";


const Panel = () => {

    const {cluster} = useParams()

    const { t } = useTranslation()
    const setLevels = useLevelsStore((state) => state.setLevels)
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

    return (
        <>
            <Container maxWidth="xxl">
                <Box sx={{p: 0}} dir="ltr">
                    <Skeleton loading={loading} >
                        <GameOperator />
                    </Skeleton>
                </Box>
            </Container>
        </>
    )
};

export default Panel