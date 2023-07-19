import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, message, Skeleton, Space, Spin} from "antd";
import {Box, Card, Container} from '@mui/material';
import {ArrowLeftOutlined} from '@ant-design/icons';

import {getLevelLeveldataoverrideApi, saveLevelLeveldataoverrideApi,} from "../../../api/levelApi";
import Editor from "../../Home/Editor";

export default () => {

    const {cluster, levelName, levelType} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [leveldataoverride, setLeveldataoverride] = useState("return {}")

    useEffect(() => {
        setLoading(true)
        getLevelLeveldataoverrideApi(cluster, levelName)
            .then(reps => {
                if (reps.code === 200) {
                    setLeveldataoverride(reps.data)
                }
                setLoading(false)
            })

    }, [])

    function saveLeveldataoverride() {
        setSpinLoading(true)
        saveLevelLeveldataoverrideApi(cluster, {
            levelName,
            leveldataoverride
        }).then(resp => {
            if (resp.code === 200) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
            setSpinLoading(false)
        })

    }

    return <>
        <Container maxWidth="xl">
            <Spin spinning={spinLoading} description={"正在保存 leveldataoverride "}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Space size={32} wrap>
                            <Button type={"link"} icon={<ArrowLeftOutlined/>}
                                    onClick={() => navigate(`/dashboard/level`)}>
                                返回
                            </Button>
                            <Button type={"primary"}
                                    onClick={() => saveLeveldataoverride()}>
                                {loading ? '正在加载配置' : '保存配置'}
                            </Button>
                        </Space>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <div style={{
                            paddingBottom: '12px',
                        }}>
                            <span style={{
                                fontSize: '16px',
                                fontWeight: '600',
                            }}>
                            {`${levelName}世界 leveldataoverride.lua 配置`}
                        </span>
                        </div>
                        <Skeleton loading={loading} active>
                            <Editor value={leveldataoverride}
                                    setValue={setLeveldataoverride}
                                    styleData={{language: "lua", theme: "vs-dark"}}
                            />
                        </Skeleton>
                    </Box>
                </Card>
            </Spin>
        </Container>

    </>
}