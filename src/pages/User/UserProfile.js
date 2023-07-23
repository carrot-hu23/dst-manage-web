import {Button, Form, Input, InputNumber, message, Radio, Skeleton, Switch} from 'antd';
import {Card, Container, Box, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {getUserInfoApi} from "../../api/userApi";

export default ()=>{

    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    useEffect(()=>{
        setLoading(true)
        getUserInfoApi()
            .then(resp=>{
                if (resp.code === 200) {
                    form.setFieldsValue(resp.data)
                }
                setLoading(false)
            })
    },[])

    return<>
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{mb: 5}}>
                User Profile
            </Typography>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading} active>
                        <Form
                            form={form}
                            initialValues={{}}
                            labelCol={{
                                span: 4,
                            }}
                        >
                            <Form.Item
                                label="头像"
                                name="photoURL"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="用户名"
                                name="username"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="显示昵称"
                                name="displayName"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="password"
                            >
                                <Input />
                            </Form.Item>

                        </Form>
                        <Button style={{margin: "0 auto", display: "block"}} type="primary" onClick={() => {}}>
                            保存
                        </Button>
                    </Skeleton>
                </Box>
            </Card>
        </Container>
    </>
}