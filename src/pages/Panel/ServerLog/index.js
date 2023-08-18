import {Box, Card} from "@mui/material";
import {Button, Spin, Skeleton, Space, Input} from "antd";
import React, {useEffect, useRef, useState} from "react";

import {useParams} from "react-router-dom";

import Editor from "../../Home/Editor";
import {readLevelServerLogApi} from "../../../api/level";


export default ({levelName}) => {

    const {cluster} = useParams()
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [logs, setLogs] = useState(``)

    useEffect(() => {
        setLoading(true)
        readLevelServerLogApi(cluster, levelName, 100)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
                    lines.reverse()
                    lines.forEach(line => {
                        logs += `${line}\n`
                    })
                    setLogs(logs)
                }
                setLoading(false)
            })
    }, [])

    const inputRef = useRef(null);

    function pullLog() {
        const lines = inputRef.current.input.value
        setSpinLoading(true)
        readLevelServerLogApi(cluster, levelName, lines)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
                    lines.reverse()
                    lines.forEach(line => {
                        logs += `${line}\n`
                    })
                    setLogs(logs)
                }
                setSpinLoading(false)
            })
    }

    return <>
        <Spin spinning={spinLoading} description={"正在获取日志"}>
            <Card>
                <Box sx={{p: 3}} dir="ltr">

                    <Space.Compact style={{width: '100%'}}>
                        <Input defaultValue="100" ref={inputRef}/>
                        <Button type="primary" onClick={() => pullLog()}>拉取</Button>
                    </Space.Compact>
                    <br/><br/>
                    <Skeleton loading={loading} active>
                        <Editor value={logs}
                                setValue={v => v}
                                readOnly
                                styleData={{language: "javascript", theme: "vs-dark"}}
                        />
                    </Skeleton>
                </Box>
            </Card>
        </Spin>
    </>
}