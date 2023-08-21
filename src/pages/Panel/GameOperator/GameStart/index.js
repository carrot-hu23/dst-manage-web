import {useEffect, useState} from "react";

import {useTranslation} from "react-i18next";
import {Space, Switch, Badge, Skeleton, message, Spin} from "antd";
import {Box, Card, Grid} from "@mui/material";

import './index.css';

import {getLevelStatusApi, startLevelApi} from "../../../../api/8level";


export default () => {

    const LevelStatus = ({levelName, title, levelStatus}) => {
        const {t} = useTranslation()
        const [serverStatus, setServerStatus] = useState(levelStatus)
        const [startLoading, setStartLoading] = useState(false)
        const [startText, setStartText] = useState("")

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
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <div>
                                <Badge status={serverStatus ? "success" : "default"} style={{
                                    width: '48px'
                                }} className={'dot'}/>
                                {title}
                            </div>
                            <br/>
                            <Space size={16}>
                                <span>操作</span>
                                <Switch
                                    checkedChildren={t('start')} unCheckedChildren={t('stop')}
                                    onClick={(checked, event) => {
                                        statusOnClick(checked, event)
                                    }}
                                    checked={serverStatus}
                                    defaultChecked={serverStatus}
                                />
                            </Space>
                        </Box>
                    </Card>
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
                        masterStatus: reps.data.masterStatus,
                        slave1Status: reps.data.slave1Status,
                        slave2Status: reps.data.slave2Status,
                        slave3Status: reps.data.slave3Status,
                        slave4Status: reps.data.slave4Status,
                        slave5Status: reps.data.slave5Status,
                        slave6Status: reps.data.slave6Status,
                        slave7Status: reps.data.slave7Status,
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
            <Skeleton loading={loading} active>
                <Space size={16} wrap>
                    <LevelStatus title={"主 世 界"} levelName={"Master"} levelStatus={levelStatusList.masterStatus}/>
                    <LevelStatus title={"从世界1"} levelName={"Slave1"} levelStatus={levelStatusList.slave1Status}/>
                    <LevelStatus title={"从世界2"} levelName={"Slave2"} levelStatus={levelStatusList.slave2Status}/>
                    <LevelStatus title={"从世界3"} levelName={"Slave3"} levelStatus={levelStatusList.slave3Status}/>
                    <LevelStatus title={"从世界4"} levelName={"Slave4"} levelStatus={levelStatusList.slave4Status}/>
                    <LevelStatus title={"从世界5"} levelName={"Slave5"} levelStatus={levelStatusList.slave5Status}/>
                    <LevelStatus title={"从世界6"} levelName={"Slave6"} levelStatus={levelStatusList.slave6Status}/>
                    <LevelStatus title={"从世界7"} levelName={"Slave7"} levelStatus={levelStatusList.slave7Status}/>
                </Space>
            </Skeleton>
        </>
    )
}

