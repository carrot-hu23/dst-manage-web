import {Box, Card} from "@mui/material";
import {Button, Spin, Skeleton, Space, Input, Select} from "antd";
import React, {useEffect, useRef, useState} from "react";

import {useParams} from "react-router-dom";

import {readLevelServerLogApi} from "../../../api/level";
import Editor from "../../../components2/Editor";

export default () => {

    const {cluster} = useParams()
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [logs, setLogs] = useState(``)

    const [levelName, setLevelName] = useState("Master")

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
                } else {
                    setLogs("读取日志失败！！！")
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
                }else {
                    setLogs("读取日志失败！！！")
                }
                setSpinLoading(false)
            })
    }

    const handleChange = (value) => {
        setLevelName(value)
    }

    return <>
        <Spin spinning={spinLoading} description={"正在获取日志"}>
            <Card>
                <Box sx={{p: 3}} dir="ltr">

                    <Space.Compact style={{width: '100%'}}>
                        <Select
                            defaultValue="Master"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'Master',
                                    label: '主 世 界',
                                },
                                {
                                    value: 'Slave1',
                                    label: '从世界1',
                                },
                                {
                                    value: 'Slave2',
                                    label: '从世界2',
                                },
                                {
                                    value: 'Slave3',
                                    label: '从世界3',
                                },
                                {
                                    value: 'Slave4',
                                    label: '从世界4',
                                },
                                {
                                    value: 'Slave5',
                                    label: '从世界5',
                                },
                                {
                                    value: 'Slave6',
                                    label: '从世界6',
                                },
                                {
                                    value: 'Slave7',
                                    label: '从世界7',
                                },
                            ]}
                        />
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