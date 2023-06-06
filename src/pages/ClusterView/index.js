import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

import luaparse from 'luaparse';
import _ from 'lodash'
import { Container, Box, Card } from '@mui/material';
import { Tabs, Button, Form, message, Skeleton } from 'antd';

import Mod from '../Mod';

import Forest from './forest';
import Cave from './cave';
import { getHomeConfigApi, saveHomeConfigApi } from '../../api/gameApi';
import BaseCluster from './cluster';



const translateLuaObject = (lua) => {
    try {
        const ast = luaparse.parse(lua);
        const overrides = ast.body[0].arguments[0].fields.filter(item => item.key.name === 'overrides')
        const overridesObject = overrides[0].value.fields.reduce((acc, field) => {
            acc[field.key.name] = field.value.name === 'StringLiteral' ? field.value.value : field.value.raw.replace(/"/g, "");
            return acc;
        }, {});
        // console.log('overridesObject', overridesObject);
        return overridesObject
    } catch (error) {
        return {}
    }

}

function translateJsonObject(data) {
    try {
        const sortedKeys = Object.keys(data).sort((a, b) => data[a].order - data[b].order);
        const m = {}
        sortedKeys.forEach(key => {
            Object.entries(data[key].items).forEach(([key2, value]) => {
                m[key2] = value.value
            })
        })
        return m
    } catch (error) {
        return {}
    }
}

const ClusterView = () => {

    const [formCluster] = Form.useForm()
    const [formForest] = Form.useForm()
    const [formCave] = Form.useForm()

    const [forestObject, setForestObject] = useState({})
    const [caveObject, setCaveObject] = useState({})

    const [dstWorldSetting, setDstWorldSetting] = useState({
        zh: {
            forest: {
                WORLDGEN_GROUP: {},
                WORLDSETTINGS_GROUP: {}
            },
            cave: {
                WORLDGEN_GROUP: {},
                WORLDSETTINGS_GROUP: {}
            }
        }
    })

    const [loading, setLoading] = useState(true)

    const {cluster} = useParams()

    function getForestDefaultValues() {
        return { ...translateJsonObject(dstWorldSetting.zh.forest.WORLDGEN_GROUP), ...translateJsonObject(dstWorldSetting.zh.forest.WORLDSETTINGS_GROUP) }
    }

    function getCaveDefaultValues() {
        return { ...translateJsonObject(dstWorldSetting.zh.cave.WORLDGEN_GROUP), ...translateJsonObject(dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP) }
    }

    function resetting() {
        formForest.resetFields()
        setForestObject({ ...getForestDefaultValues() })

        formCave.resetFields()
        setCaveObject({ ...getCaveDefaultValues() })
        console.log('getCaveDefaultValues', getCaveDefaultValues());
    }

    function saveSetting() {
        // const cluster = formCluster.getFieldValue();
        const forestOverrides = toLeveldataoverride('SURVIVAL_TOGETHER', formForest.getFieldValue())
        const cavesOverrides = toLeveldataoverride('DST_CAVE', formCave.getFieldValue())

        formCluster.setFieldValue("masterMapData", forestOverrides)
        formCluster.setFieldValue("cavesMapData", cavesOverrides)

        const data = formCluster.getFieldValue()
        data.type = 0

        saveHomeConfigApi(cluster,data).then(() => {
            message.success('房间设置完成, 请重新启动房间 !')
        }).catch(error => {
            console.log(error)
            message.error("房间设置失败")
        })
    }

    // eslint-disable-next-line camelcase
    function toLeveldataoverride(worldPreset, object) {
        const keys = Object.keys(object)
        let overrides = ""
        keys.forEach(key => {
            overrides += `${key}="${object[key]}",\n\t\t\t\t`
        })

        if(worldPreset === "SURVIVAL_TOGETHER") {
            return `return {
        desc="标准《饥荒》体验。",
        hideminimap=false,
        id="SURVIVAL_TOGETHER",
        location="forest",
        max_playlist_position=999,
        min_playlist_position=0,
        name="生存",
        numrandom_set_pieces=4,
        override_level_string=false,
        overrides = {${`\n\t\t${overrides}\n\t`}},
        playstyle="survival",
        random_set_pieces={
            "Sculptures_2",
            "Sculptures_3",
            "Sculptures_4",
            "Sculptures_5",
            "Chessy_1",
            "Chessy_2",
            "Chessy_3",
            "Chessy_4",
            "Chessy_5",
            "Chessy_6",
            "Maxwell1",
            "Maxwell2",
            "Maxwell3",
            "Maxwell4",
            "Maxwell6",
            "Maxwell7",
            "Warzone_1",
            "Warzone_2",
            "Warzone_3" 
        },
        required_prefabs={ "multiplayer_portal" },
        required_setpieces={ "Sculptures_1", "Maxwell5" },
        settings_desc="标准《饥荒》体验。",
        settings_id="SURVIVAL_TOGETHER",
        settings_name="生存",
        substitutes={  },
        version=4,
        worldgen_desc="标准《饥荒》体验。",
        worldgen_id="SURVIVAL_TOGETHER",
        worldgen_name="生存" 
    \n}`
        }
        // eslint-disable-next-line camelcase
        return `return {
        background_node_range={ 0, 1 },
        desc="探查洞穴…… 一起！",
        hideminimap=false,
        id="DST_CAVE",
        location="cave",
        max_playlist_position=999,
        min_playlist_position=0,
        name="洞穴",
        numrandom_set_pieces=0,
        override_level_string=false,
        overrides = {${`\n\t\t${overrides}\n\t`}},
        required_prefabs={ "multiplayer_portal" },
        settings_desc="探查洞穴…… 一起！",
        settings_id="DST_CAVE",
        settings_name="洞穴",
        substitutes={  },
        version=4,
        worldgen_desc="探查洞穴…… 一起！",
        worldgen_id="DST_CAVE",
        worldgen_name="洞穴" 
    \n}`
    }

    function beforeHandle(cluster,worldData) {
        const fetchHomeConfig = () => getHomeConfigApi(cluster)
            .then(data => {
                if (data.data === null || data === undefined) {
                    message.error('获取房间配置失败')
                }

                formCluster.setFieldsValue(data.data)

                setLoading(false)

                setForestObject({ ...{ ...translateJsonObject(worldData.zh.forest.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.forest.WORLDSETTINGS_GROUP) } ,...translateLuaObject(data.data.masterMapData)})
                setCaveObject({...{ ...translateJsonObject(worldData.zh.cave.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.cave.WORLDSETTINGS_GROUP) },...translateLuaObject(data.data.cavesMapData)})
            })
        fetchHomeConfig()
    }

    useEffect(() => {
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDstWorldSetting(data)
                beforeHandle(cluster,data)
                // 在此处处理配置文件数据
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            });
    }, [])

    const items = [
        {
            key: '0',
            label: `设置`,
            children: <BaseCluster form={formCluster} />,
        },
        {
            key: '1',
            label: `森林`,
            children: <Forest form={formForest} object={forestObject} forest={dstWorldSetting.zh.forest} />,
        },
        {
            key: '2',
            label: `洞穴`,
            children: <Cave form={formCave} object={caveObject} cave={dstWorldSetting.zh.cave} />,
        },
        {
            key: '3',
            label: `模组`,
            children: <Mod modoverrides={formCluster.getFieldValue().modData} />,
        },
    ];



    return (<Container maxWidth="xl">
        <Card style={{
            padding: 24,
            // height: 650,
            // maxHeight: 1200
        }}>
            <Box sx={{ p: 0, pb: 1 }} dir="ltr">
                <Skeleton loading={loading} active avatar>
                    <Tabs defaultActiveKey="1" items={items} />
                </Skeleton>
            </Box>
        </Card>
        <br />
        <Card style={{
            padding: 24
        }}>
            <Button
                type="primary"
                onClick={() => { saveSetting() }} >保存</Button>
            <Button
                style={{
                    margin: '0 8px',
                    background: '#13CE66',
                    color: '#fff'
                }}
                onClick={() => { resetting() }} >重置</Button>
        </Card>
    </Container>)
}

export default ClusterView