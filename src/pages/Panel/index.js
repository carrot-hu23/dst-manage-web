import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Skeleton, Tabs} from 'antd';
import {Container, Box} from '@mui/material';
import {parse} from "lua-json";

import GameOperator from "./GameOperator";

import ServerLog from "./ServerLog";
import ControlPanel from "./ControlPanel";
import {getLevelListApi} from "../../api/clusterLevelApi";



const Panel = () => {

    const { t } = useTranslation()
    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        getLevelListApi()
            .then(resp => {
                console.log(resp)
                if (resp.code === 200) {
                    const levels = resp.data
                    const items = []
                    levels.forEach(level=>{
                        const item = {
                            key: level.uuid,
                            levelName: level.levelName,
                            location: '未知',
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
                    console.log("items", items)
                }
                setLoading(false)
            })
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
        // {
        //     key: '4',
        //     label: t('游戏日志'),
        //     children: <ServerLog levels={levels}/>,
        // },
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