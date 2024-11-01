import {Box, Card} from "@mui/material";
import {Button, Spin, Space, Input, Select, Switch, message, Popconfirm} from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {readLevelServerLogApi} from "../../../api/level";
import {MonacoEditor} from "../../NewEditor";
import {sendCommandApi} from "../../../api/8level";
import {useTheme} from "../../../hooks/useTheme";
import style from "../../DstServerList/index.module.css";


export default ({levels}) => {
    const { t } = useTranslation()
    const {theme} = useTheme();
    const {cluster} = useParams()
    const [spinLoading, setSpinLoading] = useState(false)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0

    const editorRef = useRef()
    const inputRef = useRef(null);
    const levelNameRef = useRef(notHasLevels?"":levels[0].key);

    const [command, setCommand] = useState('');
    const [timerId, setTimerId] = useState("")

    const onchange = (e) => {
        setCommand(e.target.value);
    };

    const [command2, setCommand2] = useState('');
    const onchange2 = (e) => {
        setCommand2(e.target.value);
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
        console.log(levelNameRef.current, escapeString(command))
        setSpinLoading(true)
        sendCommandApi(cluster, levelNameRef.current, escapeString(command))
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

        readLevelServerLogApi(cluster, levelNameRef.current, 100)
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
        const timerId2 = setInterval(() => {
            pullLog(); // 每次请求最新的100行日志
        }, 5000);

        // 将定时器ID保存到状态中，以便后续取消轮询时清除定时器
        setTimerId(timerId2);
        return () => {
            clearInterval(timerId2)
            clearInterval(timerId)
        };
    }, [])

    useEffect(()=>{
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [timerId])

    function pullLog() {
        const lines = inputRef?.current?.input?.value
        readLevelServerLogApi(cluster, levelNameRef.current, lines)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
                    lines.reverse()
                    lines.forEach(line => {
                        logs += `${line}\n`
                    })
                    if (logs !== editorRef?.current?.current?.getValue()) {
                        editorRef?.current?.current?.setValue(logs)
                        editorRef?.current?.current?.revealLine(editorRef.current.current.getModel().getLineCount())
                    }
                }else {
                    editorRef.current.current.setValue("")
                }
                // setSpinLoading(false)
            })
    }

    const handleChange = (value) => {
        levelNameRef.current = value
    }

    const startPolling = () => {
        // 使用定时器每隔1秒钟请求一次日志数据，并更新到logLines状态
        const timerId = setInterval(() => {
            pullLog(); // 每次请求最新的100行日志
        }, 5000);

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
                    <Space.Compact style={{width: '100%'}}>
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            defaultValue={notHasLevels?"":levels[0].levelName}
                            options={levels.map(level=>{
                                return {
                                    value: level.key,
                                    label: level.levelName,
                                }
                            })}
                        />
                        <Input defaultValue="100" ref={inputRef}/>
                        <Button color="primary" variant="filled" onClick={() => pullLog()}>拉取</Button>
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
                            自动轮询
                            <Switch
                                style={{
                                    marginLeft: 4
                                }}
                                defaultChecked
                                onChange={(checked, event)=>{
                                    if (checked) {
                                        startPolling()
                                    } else {
                                        stopPolling()
                                    }
                                }}
                                checkedChildren="是" unCheckedChildren="否"/>
                        </div>
                        <Button
                            color="primary" variant="filled"
                            onClick={()=>{
                            window.location.href = `/api/game/level/server/download?fileName=server_log.txt&levelName=${levelNameRef.current}&clusterName=${cluster}`
                        }}
                                icon={<DownloadOutlined />} type={'link'}>
                            下载日志
                        </Button>
                    </Space>

                    <Space.Compact
                        style={{
                            width: '100%',
                            marginTop: 12
                        }}
                    >
                        <Input onChange={onchange} />
                        <Button color="primary" variant="filled" onClick={() => sendInstruct(command)}>发送指令</Button>
                    </Space.Compact>

                    <Space.Compact
                        style={{
                            width: '100%',
                            marginTop: 12,
                            marginBottom: 12,
                        }}
                    >
                        <Input onChange={onchange2} />
                        <Button color="primary" variant="filled" onClick={() => sendInstruct(`c_announce"${command2}"`)}>发送消息</Button>
                    </Space.Compact>

                    <Space size={8} wrap>
                        <Button size={'middle'} color="primary" variant="filled" onClick={() => {sendInstruct("c_save()")}} >{t('c_save')}</Button>
                        <Popconfirm
                            title={t('regenerate')}
                            description="请保存好数据"
                            onConfirm={()=>{sendInstruct("c_regenerateworld()")}}
                            onCancel={()=>{}}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size={'middle'} color="danger" variant="filled" danger>{t('regenerate')}</Button>
                        </Popconfirm>
                        <Button size={'middle'} color="default" variant="filled" onClick={() => { sendInstruct("c_rollback(1)") }} >{t('rollback1')}</Button>
                        <Button size={'middle'} color="default" variant="filled" onClick={() => { sendInstruct("c_rollback(2)") }} >{t('rollback2')}</Button>
                        <Button size={'middle'} color="default" variant="filled" onClick={() => { sendInstruct("c_rollback(3)") }} >{t('rollback3')}</Button>
                        <Button size={'middle'} color="default" variant="filled" onClick={() => { sendInstruct("c_rollback(4)") }} >{t('rollback4')}</Button>
                        <Button size={'middle'} color="default" variant="filled" onClick={() => { sendInstruct("c_rollback(5)") }} >{t('rollback5')}</Button>
                        <Button size={'middle'} color="default" variant="filled" onClick={() => { sendInstruct("c_rollback(6)") }} >{t('rollback6')}</Button>
                    </Space>
                </Box>
            </Card>
        </Spin>
    </>
}