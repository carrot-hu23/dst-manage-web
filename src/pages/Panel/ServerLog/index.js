import {Box, Card} from "@mui/material";
import {Button, Spin, Skeleton, Space, Input, Select} from "antd";
import React, {useEffect, useRef, useState} from "react";

import {useParams} from "react-router-dom";

import {readLevelServerLogApi} from "../../../api/level";
import Editor from "../../../components2/Editor";

export default ({levels}) => {

    const {cluster} = useParams()
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [logs, setLogs] = useState(``)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0].key)

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
                        <Button type="primary" onClick={() => pullLog()}>拉取</Button>
                    </Space.Compact>
                    <br/><br/>
                    <Skeleton loading={loading} active>
                        <Editor value={logs}
                                setValue={v => v}
                                readOnly
                                styleData={{language: "javascript", theme: "vs"}}
                        />
                    </Skeleton>
                </Box>
            </Card>
        </Spin>
    </>
}