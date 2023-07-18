import {Box, Card, Container} from "@mui/material";
import {Button, Skeleton, Space} from "antd";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default ()=>{

    const {cluster, levelName, levelType} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    return <>
        <Container maxWidth="xl">
            <Card>
                <Box sx={{ p: 2}} dir="ltr">
                    <Space size={32} wrap>
                        <Button type={"primary"} onClick={() => navigate(`/dashboard/level`)}>返回</Button>
                        <Button type={"primary"}>保存配置</Button>
                    </Space>
                </Box>
            </Card>
            <br/>
            <Card>
                <Box sx={{ p: 3}} dir="ltr">
                    <span style={{
                        fontSize: '16px',
                        fontWeight: '600'
                    }}>{levelName}</span>
                    <Skeleton loading={loading} active>
                        1
                    </Skeleton>
                </Box>
            </Card>
        </Container>
    </>
}