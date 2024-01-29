import {Alert, Button, Divider, Form, message, Progress, Space, Spin, Switch, Tag} from "antd";
import {Box, Card, Grid} from "@mui/material";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {updateGameApi, getDashboardApi, startApi, getGameConfigApi, getIpv4Api} from "../../../api/gameApi";
import OnlinePlayers from "../OnlinePlayers";
import HiddenText from "../../../components2/HiddenText/HiddenText";

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

    const [optionSettings,setOptionSettings] = useState("")

    function turn(data) {
        const split = data.split("OptionSettings=")
        const options = {}
        if (split.length === 2) {
            const str = split[1].replace(/[\n\r]/g, '', "")
            const s1 = str.replace("(","").replace(")","")
            const lines = s1.split(",");
            // console.log(lines)

            lines.forEach(line=>{
                const p = line.split("=")
                if (p.length === 2) {
                    options[p[0]] = p[1].replace('"', "").replace('"',"")
                }
            })
            // console.log(options)
        }
        return options
    }
    useEffect(() => {
        getGameConfigApi()
            .then(resp => {
                const data = resp.data;
                setOptionSettings(turn(data))
                console.log(turn(data))
            })

    }, [])


    const [ipv4,setIpv4] = useState("")
    useEffect(()=>{
        getIpv4Api()
            .then(resp=>{
                if (resp.code === 200) {
                    setIpv4(resp.data)
                }
            })
    }, [])

    return (
        <>

            <Grid container spacing={2}>

                <Grid item xs={12} md={5} lg={5}>
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
                        <Box sx={{p: 2}} dir="ltr">
                            <OnlinePlayers />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={7} lg={7}>


                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <Form className={'dst'}>
                                <h3>基础信息</h3>
                                <Form.Item label={t('房间名称')}>
                                    {optionSettings?.ServerName}
                                </Form.Item>
                                <Form.Item label={t('房间描述')}>
                                    {optionSettings?.ServerDescription}
                                </Form.Item>
                                <Form.Item label={t('房间密码')}>
                                    <HiddenText text={optionSettings?.ServerPassword} />
                                </Form.Item>
                                <Form.Item label={t('最大人数')}>
                                    {optionSettings?.ServerPlayerMaxNum}
                                </Form.Item>
                                <Form.Item label={t('PvP')}>
                                    {optionSettings?.bIsPvP}
                                </Form.Item>

                                <Form.Item label={t('直连')}>
                                    <HiddenText text={`${ipv4}:${optionSettings?.PublicPort}`} />
                                </Form.Item>
                                <h3>RCON 信息</h3>
                                <Alert
                                    action={[]}
                                    message={optionSettings.RCONEnabled === 'True'?"RCON 配置已开启":"RCON 配置未开启，请开启。面板依赖RCON"} type={optionSettings.RCONEnabled==='True'?'success':"warning"} showIcon closable />
                                <Form.Item label={t('ip')}>
                                    <HiddenText text={`${ipv4}`} />
                                </Form.Item>
                                <Form.Item label={t('port')}>
                                    <HiddenText text={`${optionSettings?.PublicPort}`} />
                                </Form.Item>
                                <Form.Item label={t('password')}>
                                    <HiddenText text={`${optionSettings?.AdminPassword}`} />
                                </Form.Item>
                            </Form>
                        </Box>
                    </Card>
                </Grid>

            </Grid>


        </>
    )
}