import React, {useEffect, useState} from "react";
import {Box, Card} from "@mui/material";

import {Button, Input, Select, Space, message, Spin, Divider, Tag} from 'antd';
import {sendCommandApi} from "../../../../api/8level";
import {useLevelsStore} from "../../../../store/useLevelsStore";


const {TextArea} = Input;

export default () => {

    const levels = useLevelsStore((state) => state.levels)

    useEffect(()=>{
        const historyJson = localStorage.getItem('history');
        let history = JSON.parse(historyJson);
        if (history === null) {
            history = []
        }
        setHistoryCommand(history)
    }, [])

    function addHistory(command) {
        const h = [...historyCommand]
        h.push(command)
        setHistoryCommand(h)
        localStorage.setItem("history", JSON.stringify(h))
    }

    function removeHistory(command) {
        const h = [...historyCommand]
        const j= h.filter(o=>command !== o)
        setHistoryCommand(j)
        localStorage.setItem("history", JSON.stringify(j))
    }

    const [historyCommand, setHistoryCommand] = useState([])

    const [command, setCommand] = useState('');
    const [command2, setCommand2] = useState('');
    const [spin, setSpin] = useState(false)

    const onchange = (e) => {
        setCommand(e.target.value);
    };
    const onchange2= (e) => {
        setCommand2(e.target.value);
    };

    const notHasLevels = levels?.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0]?.key)

    function sendInstructOrder() {
        if (command === "") {
            message.warning("请填写指令在发送")
            return
        }
        console.log(levelName, command)
        setSpin(true)
        addHistory(command)
        sendCommandApi("", levelName, escapeString(command))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setSpin(false)
            })
    }

    function SentBroad() {
        if (command2 === "") {
            message.warning("请填写指令在发送")
            return
        }
        console.log(levelName, command2)
        setSpin(true)
        const cmd = `c_announce"${command2}"`
        addHistory(command2)
        sendCommandApi("", levelName, escapeString(cmd))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setSpin(false)
            })
    }

    function escapeString(str) {
        return str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }

    const handleChange = (value) => {
        setLevelName(value)
    }

    return (
        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Spin spinning={spin} tip={"正在发送指令"}>
                        <Space size={8}>
                            <Select
                                defaultValue={notHasLevels?"":levels[0].levelName}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={levels.map(level=>{
                                    return {
                                        value: level.key,
                                        label: level.levelName,
                                    }
                                })}
                            />
                            <span>世界</span>
                        </Space>
                        <br/><br/>
                        <TextArea onChange={onchange} rows={3}/>
                        <br/><br/>
                        <Button type="primary" onClick={() => sendInstructOrder()}>
                            发送指令
                        </Button>

                        <Divider />


                        <Space size={8}>
                            <Select
                                defaultValue={notHasLevels?"":levels[0].levelName}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={levels.map(level=>{
                                    return {
                                        value: level.key,
                                        label: level.levelName,
                                    }
                                })}
                            />
                            <span>世界</span>
                        </Space>
                        <br/><br/>
                        <TextArea onChange={onchange2} rows={3}/>
                        <br/><br/>
                        <Button type="primary" onClick={() => SentBroad()}>
                            发送广播
                        </Button>
                    </Spin>
                    <br/>
                    <div>
                        历史指令:
                        {historyCommand.map(c=>(
                            <Tag key={c} closeIcon onClose={() => removeHistory(c)}>{c}</Tag>
                        ))}
                    </div>
                </Box>
            </Card>

        </>
    );
}