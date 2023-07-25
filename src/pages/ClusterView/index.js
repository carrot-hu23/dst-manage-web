import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

import { parse,format } from "lua-json";

import { Container, Box, Card } from '@mui/material';
import { Tabs, Button, Form, message, Skeleton } from 'antd';

import Forest from './forest';
import Cave from './cave';
import { getHomeConfigApi, saveHomeConfigApi } from '../../api/gameApi';
import BaseCluster from './cluster';

import {
    jsObjectToLuaTable,
    luaTableToJsObject2,
    toLeveldataoverride,
    translateJsonObject,
    translateLuaObject
} from "../../utils/dstUtils";
import Mod from "../Mod";
import {customization} from "../../utils/dst";

const ClusterView = () => {

    const [formCluster] = Form.useForm()
    const [formForest] = Form.useForm()
    const [formCave] = Form.useForm()

    const [forestObject, setForestObject] = useState({})
    const [caveObject, setCaveObject] = useState({})
    const [clusterData, setClusterData] = useState({})
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

    // TODO 除了
    function saveSetting(masterMapData, cavesMapData) {
        // const cluster = formCluster.getFieldValue();
        const forestOverrides = toLeveldataoverride('SURVIVAL_TOGETHER', formForest.getFieldValue())

        const masterMapDataJsObject = parse(masterMapData)
        const cavesMapDataJsObject = parse(cavesMapData)

        let cavesOverrides
        if (Object.keys(formCave.getFieldValue()).length === 0) {
            cavesOverrides = cavesMapData
        } else {
            cavesMapDataJsObject.overrides = formCave.getFieldValue()
            cavesOverrides = toLeveldataoverride('DST_CAVE', formCave.getFieldValue())
        }

        // formCluster.setFieldValue("masterMapData", forestOverrides)
        // formCluster.setFieldValue("cavesMapData", cavesOverrides)

        masterMapDataJsObject.overrides = formForest.getFieldValue()

        console.log("masterMapDataJsObject: ", masterMapDataJsObject)
        console.log("cavesMapDataJsObject: ", cavesMapDataJsObject)

        console.log("masterMapDataJsObject lua: ", jsObjectToLuaTable(masterMapDataJsObject))
        console.log("cavesMapDataJsObject lua: ", jsObjectToLuaTable(cavesMapDataJsObject))


        // TODO 这里如果 key 全是 [] 包裹着，暂时全部替换掉，只保留 overrides 配置，其他都换成默认的
        if (masterMapDataJsObject.id  === undefined) {
            console.log("<<<<<<<<<<<<<<",forestOverrides)
            formCluster.setFieldValue("masterMapData", forestOverrides)
        } else {
            formCluster.setFieldValue("masterMapData", format(masterMapDataJsObject, {singleQuote: false}))
        }
        if (cavesMapDataJsObject.id === undefined) {
            formCluster.setFieldValue("cavesMapData", cavesOverrides)
        } else {
            formCluster.setFieldValue("cavesMapData", format(cavesMapDataJsObject,{singleQuote: false}))
        }


        const data = formCluster.getFieldValue()
        data.type = 0
        if (data.gameMode === customization) {
            data.gameMode =  data.customization_mode
        }

        saveHomeConfigApi(cluster,data).then(() => {
            message.success('房间设置完成, 请重新启动房间 !')
        }).catch(error => {
            console.log(error)
            message.error("房间设置失败")
        })
    }

    function beforeHandle(cluster,worldData) {
        const fetchHomeConfig = () => getHomeConfigApi(cluster)
            .then(data => {
                if (data.data === null) {
                    message.error('获取房间配置失败')
                }
                if (data.data.gameMode !== "relaxed" &&
                    data.data.gameMode !== "endless" &&
                    data.data.gameMode !== "survival" &&
                    data.data.gameMode !== "wilderness" &&
                    data.data.gameMode !== "lightsout" &&
                    data.data.gameMode !== "lavaarena" &&
                    data.data.gameMode !== "quagmire" &&
                    data.data.gameMode !== "OceanFishing" &&
                    data.data.gameMode !== "starvingfloor") {
                    data.data.customization_mode = data.data.gameMode
                    data.data.gameMode = customization
                }
                formCluster.setFieldsValue(data.data)

                setLoading(false)
                setClusterData(data.data)
                setForestObject({ ...{ ...translateJsonObject(worldData.zh.forest.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.forest.WORLDSETTINGS_GROUP) } ,...parse(data.data.masterMapData).overrides})
                setCaveObject({...{ ...translateJsonObject(worldData.zh.cave.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.cave.WORLDSETTINGS_GROUP) },...parse(data.data.cavesMapData).overrides})
            })
        fetchHomeConfig()
    }

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
        // {
        //     key: '3',
        //     label: `模组`,
        //     children: <Mod modoverrides={formCluster.getFieldValue().modData} />,
        // },
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
                onClick={() => { saveSetting(clusterData.masterMapData, clusterData.cavesMapData) }} >保存</Button>
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