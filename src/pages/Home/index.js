import {Box, Card, Container} from "@mui/material";
import {Button, message, Skeleton} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {MonacoEditor} from "../NewEditor";
import {useTheme} from "../../hooks/useTheme";
import {getGameConfigApi, saveGameConfigApi} from "../../api/gameApi";

export default () => {
    const {theme} = useTheme();

    const ref = useRef("")
    const editorRef = useRef()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // setLoading(true)
        getGameConfigApi()
            .then(resp => {
                editorRef.current.current.setValue(resp.data)
                editorRef.current.current.onDidChangeModelContent((e) => {
                    ref.current = editorRef.current.current.getValue();
                });
                // setLoading(false)
            })

    }, [])

    function save() {
        const value = editorRef.current.current.getValue();
        console.log(value)
        saveGameConfigApi({config: value})
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存成功")
                } else {
                    message.error("保存失败")
                }
            })
    }

    return (
        <>
            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <h3>PalWorldSettings.ini 文件</h3>
                        <Skeleton loading={loading}>

                            <MonacoEditor
                                ref={editorRef}
                                style={{
                                    "height": "370px",
                                    "width": "100%"
                                }}
                                options={{
                                    theme: theme === 'dark' ? 'vs-dark' : ''
                                }}
                            />
                            <Button type={'primary'} onClick={()=>save()}>保存</Button>
                        </Skeleton>
                    </Box>
                </Card>
            </Container>
        </>
    )
}