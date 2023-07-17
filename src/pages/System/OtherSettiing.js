import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Box, Card} from '@mui/material';
import {Switch, Form, Spin, Skeleton, message} from "antd";

import {autoCheckStatusApi, enableAutoCheckRunApi, enableAutoCheckUpdateVersionApi} from "../../api/autoCheckApi";


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

    function changeRun(checked, event) {
        setSpin(true)
        enableAutoCheckRunApi(cluster, checked)
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

    function changeGameMod(checked, event) {
        console.log("run", checked)
        setStatus(current => {
            current.updateGameMod = checked
            return current
        })
    }

    return (

        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading}>
                        <Spin spinning={spin}>
                            <Form
                                // labelCol={{
                                //     span: 8,
                                // }}
                                // wrapperCol={{
                                //     span: 16,
                                // }}
                            >
                                <Form.Item
                                    label="自动宕机恢复"
                                    tooltip={"默认五分钟没有启动，将自动重启"}
                                >
                                    <Switch defaultChecked={status.gameRunning}
                                            onChange={(c, e) => changeRun(c, e)}
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
                                {/*
                                <Form.Item
                                    label="智能模组更新"
                                    name="update"
                                    tooltip={"当房间mod版本需要更新时，会自动更新房间，注意会重启房间"}
                                >
                                    <Switch defaultChecked={status.updateGameMod}
                                            onChange={(c, e) => changeGameMod(c, e)}
                                            checkedChildren="开启"
                                            unCheckedChildren="关闭"/>
                                </Form.Item>
                                */}
                            </Form>
                        </Spin>
                    </Skeleton>
                </Box>
            </Card>
        </>
    )
}