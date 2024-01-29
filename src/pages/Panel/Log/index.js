import {Box, Card} from "@mui/material";
import {Button, Spin, Space, Input, Select, Switch, message, Tabs, Popconfirm, notification} from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {readLevelServerLogApi} from "../../../api/level";
import {MonacoEditor} from "../../NewEditor";
import {sendCommandApi} from "../../../api/8level";
import {useTheme} from "../../../hooks/useTheme";
import style from "../../DstServerList/index.module.css";


const {TextArea} = Input;
const { TabPane } = Tabs;


export default () => {
    const { t } = useTranslation()
    const {theme} = useTheme();
    const {cluster} = useParams()
    const [spinLoading, setSpinLoading] = useState(false)

    const editorRef = useRef()
    const inputRef = useRef(null);

    const [command, setCommand] = useState('');
    const [timerId, setTimerId] = useState("")

    const onchange = (e) => {
        setCommand(e.target.value);
    };
    function escapeString(str) {
        return str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }
    function sendInstruct(command) {
        if (command === "") {
            message.warning("请填写指令在发送")
            return
        }
        setSpinLoading(true)
        sendCommandApi(escapeString(command))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setSpinLoading(false)
            })
    }

    useEffect(() => {

        readLevelServerLogApi(100)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
                    lines.reverse()
                    lines.forEach(line => {
                        logs += `${line}\n`
                    })
                    editorRef.current.current.setValue(logs)
                    editorRef.current.current.revealLine(editorRef.current.current.getModel().getLineCount());
                } else {
                    editorRef.current.current.setValue("")
                }
            })
    }, [])

    useEffect(()=>{
        startPolling()
    }, [])

    useEffect(()=>{
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [timerId])
    const notify = {
        token: false,
        leveldataoverride: false,
        socketport: false,
        sim: false,
        shutting: false
    }
    function parseLog(lines) {
        lines.forEach(line => {
            if (line.includes("Shutting down")) {
                notify.shutting = true
            }
        })
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = ({type, message}) => {
        console.log(type, message)
        api[type]({
            message: `房间启动${type==='success'?'成功':'失败'}`,
            description: <span>{message}</span>,
            duration: 0,
        });
    }

    function pullLog() {
        const lines = inputRef.current.input.value
        // setSpinLoading(true)
        readLevelServerLogApi(lines)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
                    parseLog(lines)
                    lines.reverse()
                    lines.forEach(line => {
                        logs += `${line}\n`
                    })
                    if (logs !== editorRef.current.current.getValue()) {
                        editorRef.current.current.setValue(logs)
                        editorRef.current.current.revealLine(editorRef.current.current.getModel().getLineCount())
                    }
                }else {
                    editorRef.current.current.setValue("")
                }
                // setSpinLoading(false)
            })
    }


    const startPolling = () => {
        // 使用定时器每隔1秒钟请求一次日志数据，并更新到logLines状态
        const timerId = setInterval(() => {
            pullLog(); // 每次请求最新的100行日志
        }, 2000);

        // 将定时器ID保存到状态中，以便后续取消轮询时清除定时器
        setTimerId(timerId);
    };

    const stopPolling = () => {
        // 取消轮询，清除定时器
        clearInterval(timerId);
    };

    return <>
        <Spin spinning={spinLoading} description={"正在获取日志"}>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    {contextHolder}
                    <Space.Compact style={{width: '100%'}}>
                        <Input defaultValue="100" ref={inputRef}/>
                        <Button type="primary" onClick={() => pullLog()}>{t('pull')}</Button>
                    </Space.Compact>
                    <br/><br/>
                    <MonacoEditor
                        className={style.icon}
                        ref={editorRef}
                        style={{
                            "height": "370px",
                            "width": "100%",
                        }}
                        options={{
                            readOnly: true,
                            language: 'java',
                            theme: theme === 'dark'?'vs-dark':''
                        }}
                    />
                    <br/>
                    <Space align={"baseline"} size={16} wrap>
                        <div>
                            <span style={{
                                marginRight: '8px'
                            }}>{t('auto')}</span>
                            <Switch
                                defaultChecked
                                onChange={(checked, event)=>{
                                    if (checked) {
                                        startPolling()
                                    } else {
                                        stopPolling()
                                    }
                                }}
                                checkedChildren={t('Y')} unCheckedChildren={t('N')}/>
                        </div>
                    </Space>

                    {/**
                     <br/><br/>
                     <TextArea onChange={onchange} rows={3}/>
                     <Button style={{
                        marginTop: '8px'
                    }} type="primary" onClick={() => sendInstruct(command)}>
                     {t('send')}
                     </Button>
                     */}

                </Box>
            </Card>
        </Spin>
    </>
}