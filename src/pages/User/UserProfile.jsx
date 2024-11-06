import {Button, Form, Input, message, Skeleton, Typography} from 'antd';
import {Card, Container, Box} from '@mui/material';
import {useEffect, useState} from "react";
import {getUserInfoApi, updateUserApi} from "../../api/userApi";

export default () => {

    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true)
        getUserInfoApi()
            .then(resp => {
                if (resp.code === 200) {
                    form.setFieldsValue(resp.data)
                }
                setLoading(false)
            })
    }, [])

    function updateUserInfo() {
        form.validateFields().then(() => {
            const data = form.getFieldsValue()
            updateUserApi("", data)
                .then(resp => {
                    if (resp.code === 200) {
                        message.success("保存成功")
                    } else {
                        message.error("保存失败", resp.msg)
                    }
                })
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

    }

    return <>
        <Container maxWidth="xl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Typography.Title level={4}>个人信息</Typography.Title>
                    <Skeleton loading={loading} active>
                        <Form
                            form={form}
                            initialValues={{}}
                            layout="vertical"
                        >
                            <Form.Item
                                label="头像url"
                                name="photoURL"
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{required: true, message: '请输入用户名',},]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="显示昵称"
                                name="displayName"
                                rules={[{required: true, message: '请输入显示昵称',},]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{required: true, message: '请输入密码',},]}
                            >
                                <Input/>
                            </Form.Item>

                        </Form>
                        <Button style={{margin: "0 auto", display: "block"}} type="primary" onClick={() => {
                            updateUserInfo()
                        }}>
                            保存
                        </Button>
                    </Skeleton>
                </Box>
            </Card>
        </Container>
    </>
}