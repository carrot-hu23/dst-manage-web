import { useEffect, useState } from 'react';

import luaparse from 'luaparse';
import _ from 'lodash'
import { Container, Box, Card } from '@mui/material';
import { Tabs, Button, Form, message, Skeleton } from 'antd';

import Mod from '../Mod';

import Forest from './forest';
import Cave from './cave';
import HomeSetting from '../Home/Cluster';
import { getHomeConfigApi, saveHomeConfigApi } from '../../api/gameApi';


const translateLuaObject = (lua) => {
    const ast = luaparse.parse(lua);
    const overrides = ast.body[0].arguments[0].fields.filter(item => item.key.name === 'overrides')
    const overridesObject = overrides[0].value.fields.reduce((acc, field) => {
        acc[field.key.name] = field.value.name === 'StringLiteral' ? field.value.value : field.value.raw.replace(/"/g, "");
        return acc;
    }, {});
    // console.log('overridesObject', overridesObject);
    return overridesObject
}

function translateJsonObject(data) {
    const sortedKeys = Object.keys(data).sort((a, b) => data[a].order - data[b].order);
    const m = {}
    sortedKeys.forEach(key => {
        Object.entries(data[key].items).forEach(([key2, value]) => {
            m[key2] = value.value
        })
    })
    return m
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
        const forestOverrides = combineWorldSetting('SURVIVAL_TOGETHER', toLuaString(formForest.getFieldValue()))
        const cavesOverrides = combineWorldSetting('DST_CAVE', toLuaString(formCave.getFieldValue()))

        formCluster.setFieldValue("masterMapData", forestOverrides)
        formCluster.setFieldValue("cavesMapData", cavesOverrides)

        const data = formCluster.getFieldValue()
        data.type = 0
        saveHomeConfigApi(data).then(() => {
            message.success('房间设置完成, 请重新启动房间 !')
        }).catch(error => {
            console.log(error)
            message.error("房间设置失败")
        })
    }


    function toLuaString(object) {
        const keys = Object.keys(object)
        let config = ""
        keys.forEach(key => {
            config += `${key}="${object[key]}",\n`
        })
        return config
    }

    // eslint-disable-next-line camelcase
    function combineWorldSetting(world_preset, world_item_str) {
        // eslint-disable-next-line camelcase
        return `return {\n\toverride_enabled = true,\n\tsettings_preset = "${world_preset}",\n\tworldgen_preset = "${world_preset}",\n\toverrides = {${`\n\t\t${world_item_str}\n\t`}},\n}`;
    }

    function beforeHandle(worldData) {
        const fetchHomeConfig = () => getHomeConfigApi()
            .then(data => {
                // console.log(data.data)
                if (data.data === null || data === undefined) {
                    message.error('获取房间配置失败')
                }

                formCluster.setFieldsValue(data.data)

                // setForestObject(translateLuaObject(data.data.masterMapData))
                // setCaveObject(translateLuaObject(data.data.cavesMapData))
                
                setLoading(false)
                setForestObject({ ...{ ...translateJsonObject(worldData.zh.forest.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.forest.WORLDSETTINGS_GROUP) }, ...translateLuaObject(data.data.masterMapData) })
                setCaveObject({ ...{ ...translateJsonObject(worldData.zh.cave.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.cave.WORLDSETTINGS_GROUP) }, ...translateLuaObject(data.data.cavesMapData) })
            })
        fetchHomeConfig()
    }

    useEffect(() => {
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDstWorldSetting(data)
                beforeHandle(data)
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
            children: <HomeSetting form={formCluster} />,
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
            children: <Mod />,
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