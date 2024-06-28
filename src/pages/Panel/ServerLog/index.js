import {Box, Card} from "@mui/material";
import {Button, Spin, Space, Input, Select, Switch, message, Tabs, Popconfirm, AutoComplete} from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {readLevelServerLogApi} from "../../../api/level";
import {MonacoEditor} from "../../NewEditor";
import {sendCommandApi} from "../../../api/8level";
import PanelLog from "./PanelLog";
import {useTheme} from "../../../hooks/useTheme";
import style from "../../DstServerList/index.module.css";


const { TabPane } = Tabs;

const CommandAutoComplete = () => {
    // 模拟已有的指令列表
    const commandList = ['c_save()', 'c_reset()', 'c_rollback', 'c_announce', 'command5'];

    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        const filteredOptions = commandList.filter((command) => command.includes(value));
        setOptions(filteredOptions.map((option) => ({ value: option })));
    };

    return (
        <AutoComplete
            style={{ width: 200 }}
            options={options}
            onSelect={(value) => console.log('Selected:', value)}
            onSearch={handleSearch}
        >
            <Input.Search placeholder="输入指令" enterButton />
        </AutoComplete>
    );
};


export default ({levels}) => {
    const { t } = useTranslation()
    const {theme} = useTheme();
    const {cluster} = useParams()
    const [spinLoading, setSpinLoading] = useState(false)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const levelNameRef = useRef(notHasLevels?"":levels[0].key)
    const editorRef = useRef()
    const inputRef = useRef(null);
    const timerIdRef = useRef("");

    const [command, setCommand] = useState('');

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
        startPolling()
    }, [])

    useEffect(()=>{
        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
            }
        };
    }, [timerIdRef.current])

    function pullLog() {
        if (!inputRef.current) return
        const lines = inputRef.current.input.value
        readLevelServerLogApi(cluster, levelNameRef.current, lines)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
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
            })
    }

    const handleChange = (value) => {
        levelNameRef.current = value
    }

    const startPolling = () => {
        // 使用定时器每隔1秒钟请求一次日志数据，并更新到logLines状态
        const timerId = setInterval(() => {
            pullLog(); // 每次请求最新的100行日志
        }, 3000);

        // 将定时器ID保存到状态中，以便后续取消轮询时清除定时器
        timerIdRef.current = timerId;
    };

    const stopPolling = () => {
        // 取消轮询，清除定时器
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
        }
    };

    return <>
        <Spin spinning={spinLoading} description={"正在获取日志"}>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={t('Level Log')} key="1">
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
                                        marginRight:'8px'
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
                                <Button onClick={()=>{
                                    window.location.href = `/api/game/level/server/download?fileName=server_log.txt&levelName=${levelNameRef.current}`
                                }}
                                        icon={<DownloadOutlined />} type={'link'}>
                                    {t('Download Log')}
                                </Button>
                            </Space>

                            <br/><br/>

                            <Space.Compact
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input defaultValue="" onChange={onchange} />
                                <Button type="primary" onClick={() => sendInstruct(command)}>{t('send')}</Button>
                            </Space.Compact>
                            <br/>
                            <br/>
                            <Space size={8} wrap>
                                <Button size={'small'} type={"primary"} onClick={() => {sendInstruct("c_save()")}} >{t('c_save')}</Button>
                                <Popconfirm
                                    title={t('regenerate')}
                                    description="请保存好数据"
                                    onConfirm={()=>{sendInstruct("c_regenerateworld()")}}
                                    onCancel={()=>{}}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                <Button size={'small'} type={"primary"} danger>{t('regenerate')}</Button>
                                </Popconfirm>
                                <Button size={'small'} onClick={() => { sendInstruct("c_rollback(1)") }} >{t('rollback1')}</Button>
                                <Button size={'small'} onClick={() => { sendInstruct("c_rollback(2)") }} >{t('rollback2')}</Button>
                                <Button size={'small'} onClick={() => { sendInstruct("c_rollback(3)") }} >{t('rollback3')}</Button>
                                <Button size={'small'} onClick={() => { sendInstruct("c_rollback(4)") }} >{t('rollback4')}</Button>
                                <Button size={'small'} onClick={() => { sendInstruct("c_rollback(5)") }} >{t('rollback5')}</Button>
                                <Button size={'small'} onClick={() => { sendInstruct("c_rollback(6)") }} >{t('rollback6')}</Button>
                            </Space>
                        </TabPane>

                        <TabPane tab={t('Panel Log')} key="2">
                            <PanelLog />
                        </TabPane>
                    </Tabs>

                </Box>
            </Card>
        </Spin>
    </>
}