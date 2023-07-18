import {Box, Card, Container} from "@mui/material";
import {Button, Form, message, Skeleton, Space, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ServerIni from "../../Home/ServerIni";
import {getLevelServerIniApi, saveLevelServerIniApi} from "../../../api/levelApi";

export default () => {

    const {cluster, levelName, levelType} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [serverIniForm] = Form.useForm();

    useEffect(() => {
        setLoading(true)
        getLevelServerIniApi(cluster, levelName)
            .then(reps => {
                if (reps.code === 200) {
                    serverIniForm.setFieldsValue(reps.data)
                }
                setLoading(false)
            })
        setLoading(false)
    }, [])

    function saveServerIni() {
        const serverIni = serverIniForm.getFieldValue()
        console.log(serverIni)
        setBtnLoading(true)
        saveLevelServerIniApi(cluster, {
            levelName,
            serverIni
        }).then(resp => {
            if (resp.code === 200) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
            setBtnLoading(false)
        })
    }

    return <>
        <Container maxWidth="xl">
            <Spin spinning={btnLoading} description={"正在保存 server.ini "}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Space size={32} wrap>
                            <Button type={"primary"} onClick={() => navigate(`/dashboard/level`)}>返回</Button>
                            <Button type={"primary"} loading={btnLoading}
                                    onClick={() => saveServerIni()}>保存配置</Button>
                        </Space>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>{levelName}</span>
                        <Skeleton loading={loading} active>
                            <ServerIni form={serverIniForm} isMaster/>
                        </Skeleton>
                    </Box>
                </Card>
            </Spin>
        </Container>
    </>
}