import {Button, Input, Space} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import React, {useEffect, useRef} from "react";

import {MonacoEditor} from "../../NewEditor";
import {readPanelLogApi} from "../../../api/level";
import {useTheme} from "../../../hooks/useTheme";

export default ()=>{

    const editorRef = useRef()
    const inputRef = useRef(null);
    const {theme} = useTheme();

    useEffect(() => {
        readPanelLogApi(100)
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
                    editorRef.current.current.setValue("\"读取日志失败！！！\"")
                }
            })
    }, [])

    function pullLog() {
        const lines = inputRef.current.input.value
        // setSpinLoading(true)
        readPanelLogApi(lines)
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
                }else {
                    editorRef.current.current.setValue("\"读取日志失败！！！\"")
                }
                // setSpinLoading(false)
            })
    }

    return(
        <>
            <Space.Compact style={{width: '100%'}}>
                <Input defaultValue="100" ref={inputRef}/>
                <Button type="primary" onClick={() => pullLog()}>拉取</Button>
            </Space.Compact>
            <br/><br/>
            <MonacoEditor
                ref={editorRef}
                style={{
                    "height": "530px",
                    "width": "100%"
                }}
                options={{
                    readOnly: true,
                    language: 'go',
                    theme: theme === 'dark'?'vs-dark':''
                }}
            />
            <Button onClick={()=>{
                window.location.href = `/api/game/dst-admin-go/log/download`
            }} icon={<DownloadOutlined />} type={'link'}>
                下载日志
            </Button>
        </>
    )
}