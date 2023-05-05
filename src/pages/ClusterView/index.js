import { useEffect, useState } from 'react';

import luaparse from 'luaparse';

import { Container, Box, Card } from '@mui/material';
import { Tabs, Button, Form, message, Skeleton } from 'antd';
import Forest from './forest';
import Cave from './cave';
import HomeSetting from '../Home/Cluster';
import { getHomeConfigApi } from '../../api/gameApi';

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

    useEffect(() => {
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDstWorldSetting(data)
                // 在此处处理配置文件数据
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            });
    }, [])

    useEffect(() => {
        const fetchHomeConfig = () => getHomeConfigApi()
            .then(data => {
                console.log(data.data)
                if (data.data === null || data === undefined) {
                    message.error('获取房间配置失败')
                }

                formCluster.setFieldsValue(data.data)

                // setForestObject(translateLuaObject(data.data.masterMapData))
                // setCaveObject(translateLuaObject(data.data.cavesMapData))
                setLoading(false)

                setForestObject({ ...translateLuaObject(data.data.masterMapData), ...getForestDefaultValues() })
                setCaveObject({ ...translateLuaObject(data.data.cavesMapData), ...getCaveDefaultValues() })
            })
        fetchHomeConfig()
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
            children: <>1</>,
        },
    ];



    return (<Container maxWidth="xl">
        <Card style={{
            padding: 24,
            height: 650
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
                onClick={() => {
                    console.log(formForest.getFieldValue());
                }} >保存</Button>
            <Button
                style={{
                    margin: '0 8px',
                    background: '#13CE66',
                    color: '#fff'
                }}
                onClick={() => { formForest.resetFields(); setForestObject({ ...getForestDefaultValues() }) }} >重置</Button>
        </Card>
    </Container>)
}

export default ClusterView