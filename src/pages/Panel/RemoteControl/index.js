import React, {useEffect, useState} from "react";
import {Box, Card, Grid} from "@mui/material";

import {Button, Input, Select, Space, message, Spin, Divider, Tag} from 'antd';
import {sendCommandApi} from "../../../api/gameApi";


const {TextArea} = Input;

export default () => {

    useEffect(()=>{
        const historyJson = localStorage.getItem('history');
        let history = JSON.parse(historyJson);
        if (history === null) {
            history = []
        }
        setHistoryCommand(history)
        console.log(history)
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

    const [result, setResult] = useState('');

    const onchange = (e) => {
        setCommand(e.target.value);
    };
    const onchange2= (e) => {
        setCommand2(e.target.value);
    };

    function sendInstructOrder() {
        if (command === "") {
            message.warning("请填写指令在发送")
            return
        }
        setSpin(true)
        addHistory(command)
        sendCommandApi(escapeString(command))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setResult(resp.data)
                setSpin(false)
            })
    }

    function SentBroad() {
        if (command2 === "") {
            message.warning("请填写指令在发送")
            return
        }
        setSpin(true)
        const cmd = `Broadcast ${command2}`
        addHistory(command2)
        sendCommandApi(escapeString(cmd))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setResult(resp.data)
                setSpin(false)
            })
    }

    function escapeString(str) {
        // return str.replace(/\\/g, '\\\\')
        //     .replace(/"/g, '\\"')
        //     .replace(/'/g, "\\'")
        //     .replace(/\n/g, '\\n')
        //     .replace(/\r/g, '\\r')
        //     .replace(/\t/g, '\\t');
        return str
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} lg={7}>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <Spin spinning={spin} tip={"正在发送指令"}>
                                <TextArea onChange={onchange} rows={3}/>
                                <br/><br/>
                                <Button type="primary" onClick={() => sendInstructOrder()}>
                                    发送指令
                                </Button>

                                <Divider />
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
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <h3>Result:</h3>
                            {result}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}