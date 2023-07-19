import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, message, Skeleton, Space, Spin} from "antd";
import {Container, Card, Box} from '@mui/material';
import {ArrowLeftOutlined} from '@ant-design/icons';

import Forest from "../../ClusterView/forest";
import Cave from "../../ClusterView/cave";

import {
    getLevelLeveldataoverrideApi,
    saveLevelLeveldataoverrideApi,
} from "../../../api/levelApi";

import {
    jsObjectToLuaTable,
    luaTableToJsObject2,
    toLeveldataoverride,
    translateJsonObject,
    translateLuaObject
} from "../../../utils/dstUtils";

export default () => {

    const {cluster, levelName, levelType} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [formLevel] = Form.useForm()
    const [leveldataoverrideObject, setLeveldataoverrideObject] = useState({})

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

    const [leveldataoverride, setLeveldataoverride] = useState("return {}")

    function parseOverride(worldData, leveldataoverride) {
        return {...{...translateJsonObject(worldData.zh.forest.WORLDGEN_GROUP), ...translateJsonObject(worldData.zh.forest.WORLDSETTINGS_GROUP)}, ...translateLuaObject(leveldataoverride)}
    }

    useEffect(() => {
        setLoading(true)
        // 获取当前 level 的配置 leveldataoverride.lua modoverrides.lua
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                setDstWorldSetting(data)
                getLevelLeveldataoverrideApi(cluster, levelName)
                    .then(reps => {
                        if (reps.code === 200) {
                            setLeveldataoverride(reps.data)
                            setLeveldataoverrideObject(parseOverride(data, reps.data))
                        }
                        setLoading(false)
                    })
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
                setLoading(false)
            })

    }, [])

    function saveLeveldataoverride() {

        setBtnLoading(true)

        const overrides = formLevel.getFieldValue()
        let leveldataoverrideStr1
        if (levelType === "MASTER") {
            leveldataoverrideStr1 = toLeveldataoverride('SURVIVAL_TOGETHER', formLevel.getFieldValue())
        } else if (levelType === "CAVES") {
            leveldataoverrideStr1 = toLeveldataoverride('DST_CAVE', formLevel.getFieldValue())
        }
        const leveldataoverrideJsObject = luaTableToJsObject2(leveldataoverride)

        leveldataoverrideJsObject.overrides = overrides
        const leveldataoverrideStr2 = jsObjectToLuaTable(leveldataoverrideJsObject);
        // console.log("leveldataoverrideJsObject: ", leveldataoverrideJsObject)
        // console.log("leveldataoverrideJsObject lua: ", leveldataoverrideStr2)
        let data
        if (leveldataoverrideJsObject.id === undefined) {
            data = leveldataoverrideStr1
        } else {
            data = `return ${leveldataoverrideStr2}`
        }
        console.log("leveldataoverride: ", data)
        saveLevelLeveldataoverrideApi(cluster, {
            levelName,
            leveldataoverride: data
        }).then(resp => {
            if (resp.code === 200) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
            setBtnLoading(false)
        })

    }

    return <>
        <Container maxWidth="xl">
            <Spin spinning={btnLoading} description={"正在保存 leveldataoverride "}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Space size={32} wrap>
                            <Button type={"link"} icon={<ArrowLeftOutlined/>}
                                    onClick={() => navigate(`/dashboard/level`)}>返回</Button>
                            <Button type={"primary"}
                                    loading={loading}
                                    onClick={() => saveLeveldataoverride()}>
                                {loading?'正在加载配置':'保存配置'}
                            </Button>
                        </Space>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>{levelName}</span>
                        <Skeleton loading={loading} active>
                            {levelType === "MASTER" && <Forest form={formLevel} object={leveldataoverrideObject}
                                                               forest={dstWorldSetting.zh.forest}/>}
                            {levelType === "CAVES" && <Cave form={formLevel} object={leveldataoverrideObject}
                                                            cave={dstWorldSetting.zh.cave}/>}
                        </Skeleton>
                    </Box>
                </Card>
            </Spin>
        </Container>

    </>
}