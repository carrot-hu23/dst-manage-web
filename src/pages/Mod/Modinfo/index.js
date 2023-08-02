import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import {Box, Card, Container} from "@mui/material";
import {Button, Skeleton, Space, Spin} from "antd";

import Editor from "../../Home/Editor";
import {getModInfoFileApi} from "../../../api/modApi";

export default ()=>{
    const {cluster, modId} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [value, setValue] = useState("")
    useEffect(()=>{
        getModInfoFileApi(cluster, modId)
            .then(reps=>{
                if (reps.code === 200) {
                    setValue(reps.data.mod_config)
                }
            })
    }, [])

    return<>
        <Container maxWidth="xl">
            <Spin spinning={spinLoading} description={"正在保存 cluster.ini "}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Space size={32} wrap>
                            <Button type={"link"} icon={<ArrowLeftOutlined />} onClick={() => navigate(`/dashboard/mod`)}>返回</Button>
                            <Button type={"primary"} >
                                {loading?'正在加载配置':'保存配置'}
                            </Button>
                        </Space>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Skeleton loading={loading} active>
                            <Editor value={value}
                                    setValue={setValue}
                                    styleData={{language: "json", theme: "vs-dark"}}
                            />
                        </Skeleton>
                    </Box>
                </Card>
            </Spin>
        </Container>
    </>
}