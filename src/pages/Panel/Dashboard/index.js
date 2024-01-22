import {Button, Form, message, Progress, Space, Spin, Switch, Tag} from "antd";
import {Box, Card} from "@mui/material";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {updateGameApi, getDashboardApi, startApi} from "../../../api/gameApi";
import OnlinePlayers from "../OnlinePlayers";

export default () => {

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const {cluster} = useParams()
    const {t} = useTranslation()
    const [dashboard, setDashboard] = useState({})
    const [spin, setSpin] = useState(false)
    const [startText, setStartText] = useState("")

    const updateGameOnclick = () => {
        message.success('正在更新游戏')
        setUpdateStatus(true)
        updateGameApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success('饥荒更新完成')
                } else {
                    message.error(`${response.msg}`)
                    message.warning("请检查steamcmd路径是否设置正确")
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                message.error(`饥荒更新失败${error}`)
                setUpdateStatus(false)
            })
    }

    const statusOnClick = (checked, event) => {
        let prefix
        if (checked) {
            prefix = "启动服务"
        } else {
            prefix = "关闭服务"
        }
        setSpin(true)
        startApi(checked).then(resp => {
            if (resp.code !== 200) {
                message.error(`${prefix}失败${resp.msg}`)
                message.warning("请检查饥荒服务器路径是否设置正确")
            } else {
                message.success(`正在${prefix}`)
            }
            setSpin(false)
            setStartText("")
        })
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            getDashboardApi()
                .then(resp => {
                    // console.log(resp)
                    if (resp.code === 200) {
                        setDashboard(resp.data)
                    }
                })
        }, 2000)

        return () => {
            clearInterval(timerId); // 组件卸载时清除定时器
        }
    }, [])

    function formatData(data, num) {
        return data.toFixed(num)
    }

    return (
        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Spin spinning={spin} tip={startText}>
                        <Form>
                            <Form.Item label={t('操作')}>
                                <Button type="primary"
                                        onClick={() => {
                                            updateGameOnclick()
                                        }}
                                        loading={updateGameStatus}
                                >
                                    {t('updateGame')}
                                </Button>
                            </Form.Item>
                            <Form.Item label={t('启动')}>
                                <Switch checked={dashboard?.status}
                                        checkedChildren={t('start')}
                                        unCheckedChildren={t('stop')}
                                        onClick={(checked, event) => {
                                            statusOnClick(checked, event)
                                        }}
                                />
                            </Form.Item>
                            <Form.Item label={t('性能')}>
                                cpu: <Progress percent={dashboard?.cpuUage} size="small"/>
                                内存: <Progress percent={dashboard?.memUage} size="small" status="active"/>
                            </Form.Item>
                            <Form.Item label={t('内存')}>
                                <Space size={8} wrap>
                        <span>
                            <Tag color={'blue'}>物理内存</Tag>: {formatData(dashboard?.RSS / 1024 / 1024, 2)} GB
                    </span>
                                    <span>
                            <Tag color={'green'}>虚拟内存</Tag>: {formatData(dashboard?.VSZ / 1024 / 1024, 2)} GB
                    </span>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Box>
            </Card>

            <br/>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <OnlinePlayers />
                </Box>
            </Card>
        </>
    )
}