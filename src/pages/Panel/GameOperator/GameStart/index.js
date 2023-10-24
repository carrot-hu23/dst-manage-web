import {useEffect, useState} from "react";

import {useTranslation} from "react-i18next";
import {Space, Switch, Badge, Skeleton, message, Spin, Progress} from "antd";
import {Box, Card} from "@mui/material";

import './index.css';

import {getLevelStatusApi, startLevelApi} from "../../../../api/8level";

const MB = 1024 * 1024
const GB = 1024 * MB

function formatData(data, num) {
    return data.toFixed(num)
}


export default () => {

    const LevelStatus = ({levelName, title, levelStatus}) => {
        const {t} = useTranslation()
        const [serverStatus, setServerStatus] = useState(levelStatus.status)
        const [startLoading, setStartLoading] = useState(false)
        const [startText, setStartText] = useState("")

        const rss =formatData(levelStatus.ps.RSS / 1024 / 1024, 2)
        const vsz =formatData(levelStatus.ps.VSZ / 1024/ 1024, 2)

        const statusOnClick = (checked, event) => {
            setServerStatus(checked)
            let prefix
            if (checked) {
                prefix = "启动"
                setStartText(`正在启动${levelName}`)
            } else {
                prefix = "关闭"
                setStartText(`正在关闭${levelName}`)
            }
            setStartLoading(true)
            startLevelApi("",levelName, checked).then(resp => {
                if (resp.code !== 200) {
                    message.error(`${prefix}${levelName}失败${resp.msg}`)
                    message.warning("请检查饥荒服务器路径是否设置正确")
                } else {
                    message.success(`正在${prefix}${levelName}`)
                }
                setStartLoading(false)
                setStartText("")
            })
        }

        return (
            <>
                <Spin spinning={startLoading} tip={startText}>

                            <div style={{
                                paddingBottom: '8px'
                            }}>
                                <Space size={16}>


                                <div>
                                    <Badge status={serverStatus ? "success" : "default"} style={{
                                        width: '48px'
                                    }} className={'dot'}/>
                                    <span>{title}</span>
                                </div>

                                    <div>CPU</div>
                                <div>

                                    <Progress type="dashboard" percent={levelStatus.ps.cpuUage}   size={40} />
                                </div>
                                    <div>内存</div>
                                <div>
                                    <Progress type="circle"
                                              percent={levelStatus.ps.memUage}
                                              size={40}
                                              strokeColor={levelStatus.ps.memUage > 70 ? 'red' : '#5BD171'} status='normal'
                                              strokeLinecap="butt"
                                    />
                                </div>
                                <div style={{
                                    float: 'right'
                                }}>
                                    <Switch
                                        checkedChildren={t('start')} unCheckedChildren={t('stop')}
                                        onClick={(checked, event) => {
                                            statusOnClick(checked, event)
                                        }}
                                        checked={serverStatus}
                                        defaultChecked={serverStatus}
                                    />

                                </div>
                                </Space>
                            </div>

                </Spin>
            </>
        )
    }

    const [levelStatusList, setLevelStatus] = useState({})
    const [loading, setLoading] = useState(true)

    const firstRequest = () => {
        getLevelStatusApi("")
            .then(reps => {
                if (reps.code === 200) {
                    const data = {
                        master: {
                            status: reps.data.masterStatus,
                            ps: reps.data.masterPs
                        },
                        slave1: {
                            status: reps.data.slave1Status,
                            ps: reps.data.slave1ps
                        },
                        slave2: {
                            status: reps.data.slave2Status,
                            ps: reps.data.slave2ps
                        },
                        slave3: {
                            status: reps.data.slave3Status,
                            ps: reps.data.slave3ps
                        },
                        slave4: {
                            status: reps.data.slave4Status,
                            ps: reps.data.slave4ps
                        },
                        slave5: {
                            status: reps.data.slave5Status,
                            ps: reps.data.slave5ps
                        },
                        slave6: {
                            status: reps.data.slave6Status,
                            ps: reps.data.slave6ps
                        },
                        slave7: {
                            status: reps.data.slave7Status,
                            ps: reps.data.slave7ps
                        },
                    }
                    setLevelStatus(data)
                }
                setLoading(false)
            })
    }

    useEffect(() => {
        firstRequest()
        const timer = setInterval(() => {
            firstRequest()
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>

                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <Skeleton loading={loading} active>
                    <LevelStatus title={"主 世 界"} levelName={"Master"} levelStatus={levelStatusList.master}/>
                <LevelStatus title={"从世界1"} levelName={"Slave1"} levelStatus={levelStatusList.slave1}/>
                <LevelStatus title={"从世界2"} levelName={"Slave2"} levelStatus={levelStatusList.slave2}/>

                <LevelStatus title={"从世界3"} levelName={"Slave3"} levelStatus={levelStatusList.slave3}/>

                <LevelStatus title={"从世界4"} levelName={"Slave4"} levelStatus={levelStatusList.slave4}/>

                <LevelStatus title={"从世界5"} levelName={"Slave5"} levelStatus={levelStatusList.slave5}/>

                <LevelStatus title={"从世界6"} levelName={"Slave6"} levelStatus={levelStatusList.slave6}/>

                <LevelStatus title={"从世界7"} levelName={"Slave7"} levelStatus={levelStatusList.slave7}/>
                        </Skeleton>
                    </Box>
                </Card>

        </>
    )
}

