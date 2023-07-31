import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Box, Card} from '@mui/material';
import {Switch, Form, Spin, Skeleton, message} from "antd";

import {
    autoCheckStatusApi, enableAutoCheckCavesModUpdateApi,
    enableAutoCheckCavesRunApi, enableAutoCheckMasterModUpdateApi,
    enableAutoCheckMasterRunApi,
    enableAutoCheckUpdateVersionApi
} from "../../api/autoCheckApi";


export default () => {

    const {cluster} = useParams()

    const [status, setStatus] = useState({})
    const [loading, setLoading] = useState(false)
    const [spin, setSpin] = useState(false)
    useEffect(() => {
        setLoading(true)
        autoCheckStatusApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    console.log(resp.data)
                    setStatus(resp.data)
                }
                setLoading(false)
            })
    }, [])

    function changeMasterRun(checked, event) {
        setSpin(true)
        enableAutoCheckMasterRunApi(cluster, checked)
            .then(resp => {
                setSpin(false)
                if (resp.code === 200) {
                    message.success("设置成功")
                } else {
                    message.error("设置失败")
                }
            })
    }

    function changeCavesRun(checked, event) {
        setSpin(true)
        enableAutoCheckCavesRunApi(cluster, checked)
            .then(resp => {
                setSpin(false)
                if (resp.code === 200) {
                    message.success("设置成功")
                } else {
                    message.error("设置失败")
                }
            })
    }

    function changeUpdateVersion(checked, event) {
        enableAutoCheckUpdateVersionApi(cluster, checked)
            .then(resp => {
                setSpin(false)
                if (resp.code === 200) {
                    message.success("设置成功")
                } else {
                    message.error("设置失败")
                }
            })
    }

    function changeMasterModUpdate(checked, event) {
        enableAutoCheckMasterModUpdateApi(cluster, checked)
            .then(resp => {
                setSpin(false)
                if (resp.code === 200) {
                    message.success("设置成功")
                } else {
                    message.error("设置失败")
                }
            })
    }

    function changeCavesModUpdate(checked, event) {
        enableAutoCheckCavesModUpdateApi(cluster, checked)
            .then(resp => {
                setSpin(false)
                if (resp.code === 200) {
                    message.success("设置成功")
                } else {
                    message.error("设置失败")
                }
            })
    }

    return (

        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading}>
                        <Spin spinning={spin}>
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                // wrapperCol={{
                                //     span: 16,
                                // }}
                            >
                                <Form.Item
                                    label="地面自动宕机恢复"
                                    tooltip={"默认五分钟没有启动，将自动重启"}
                                >
                                    <Switch defaultChecked={status.masterRunning}
                                            onChange={(c, e) => changeMasterRun(c, e)}
                                            checkedChildren="开启"
                                            unCheckedChildren="关闭"/>
                                </Form.Item>
                                <Form.Item
                                    label="洞穴自动宕机恢复"
                                    tooltip={"默认五分钟没有启动，将自动重启"}
                                >
                                    <Switch defaultChecked={status.cavesRunning}
                                            onChange={(c, e) => changeCavesRun(c, e)}
                                            checkedChildren="开启"
                                            unCheckedChildren="关闭"/>
                                </Form.Item>
                                <Form.Item
                                    label="智能游戏更新"
                                    name="update"
                                    tooltip={"每五分钟检查一次饥荒版本，当版本落后时会自动更新，注意会重启房间"}
                                >
                                    <Switch defaultChecked={status.updateGameVersion}
                                            onChange={(c, e) => changeUpdateVersion(c, e)}
                                            checkedChildren="开启"
                                            unCheckedChildren="关闭"/>
                                </Form.Item>
                                <Form.Item
                                    label="森林模组更新"
                                    name="masterModUpdate"
                                    tooltip={"默认每20分钟检查一次mod，注意会重启房间"}
                                >
                                    <Switch defaultChecked={status.updateMasterMod}
                                            onChange={(c, e) => changeMasterModUpdate(c, e)}
                                            checkedChildren="开启"
                                            unCheckedChildren="关闭"/>
                                </Form.Item>
                                <Form.Item
                                    label="洞穴模组更新"
                                    name="cavesModUpdate"
                                    tooltip={"默认每20分钟检查一次mod，注意会重启房间"}
                                >
                                    <Switch defaultChecked={status.updateCavesMod}
                                            onChange={(c, e) => changeCavesModUpdate(c, e)}
                                            checkedChildren="开启"
                                            unCheckedChildren="关闭"/>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Skeleton>
                </Box>
            </Card>
        </>
    )
}