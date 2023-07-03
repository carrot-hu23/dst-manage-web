import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

import { Container, Box, Card } from '@mui/material';
import { Tabs, Button, Form, message, Skeleton } from 'antd';

import Forest from './forest';
import Cave from './cave';
import { getHomeConfigApi, saveHomeConfigApi } from '../../api/gameApi';
import BaseCluster from './cluster';

import {toLeveldataoverride, translateJsonObject, translateLuaObject} from "../../utils/dstUtils";
import Mod from "../Mod";
import {customization} from "../../utils/dst";

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