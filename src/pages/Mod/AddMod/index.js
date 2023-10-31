import React, {useState, useEffect, useRef} from "react";

import {Button, Spin, Space, Input, message, Typography, Divider} from "antd";
import {Box, Card, Container, Grid} from "@mui/material";

import {useNavigate} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';

import {useTheme} from "../../../hooks/useTheme";

import {addModInfoFileApi} from "../../../api/modApi";
import {MonacoEditor} from "../../NewEditor";

const {Title} = Typography;

export default () => {
    const {theme} = useTheme()
    const navigate = useNavigate();
    const [spinLoading, setSpinLoading] = useState(false)

    const [workshopId, setWorkshopId] = useState("")

    const editorRef = useRef()

    function wrokShopOnChange(e) {
        setWorkshopId(e.target.value)
    }

    function saveModinfo() {
        const data = {
            workshopId,
            modinfo: editorRef.current.current.getValue()
        }
        setSpinLoading(true)
        addModInfoFileApi("", data)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("添加成功")
                } else {
                    message.error("添加失败")
                }
                setSpinLoading(false)
            })
    }


    useEffect(() => {

    }, [])


    return <>
        <Container maxWidth="xxl">
            <Spin spinning={spinLoading} description={"正在添加模组"}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Space size={8} wrap>
                            <Button type={"link"} icon={<ArrowLeftOutlined/>}
                                    onClick={() => navigate(`/dashboard/mod`)}>
                                返回
                            </Button>
                            <span>添加模组</span>
                            <Button type="primary" onClick={() => {
                                saveModinfo()
                            }}>
                                保存
                            </Button>
                        </Space>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={8}>
                                <div style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    maxWidth: '100%',
                                    height: '32px',
                                    color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                                    fontSize: '14px',
                                }}>模组id:
                                </div>
                                {/* eslint-disable-next-line react/jsx-no-bind */}
                                <Input onChange={wrokShopOnChange} placeholder={'模组id'}/>
                                <br/><br/>
                                <div style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    maxWidth: '100%',
                                    height: '32px',
                                    color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                                    fontSize: '14px',
                                }}>modinfo.lua 文件内容:
                                </div>

                                <MonacoEditor
                                    ref={editorRef}
                                    style={{
                                        "height": "370px",
                                        "width": "100%",
                                    }}
                                    options={{
                                        language: 'lua',
                                        theme: theme === 'dark'?'vs-dark':''
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Title level={4}>怎么找到本地电脑的模组?</Title>
                                <div>找到本地电脑 Steam 安装的路径，\steam\steamapps\workshop\content\322330 路径</div>
                                <br/>
                                <div>这个路径就是你本地饥荒联机版的mod位置</div>
                                <br/>
                                <div>在 模组id 哪里填写文件名 ，然后把 modinfo.lua 文件内容复制到第二个输入框</div>
                                <br/>
                                <div>点击保存即可</div>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Spin>
        </Container>
    </>
}