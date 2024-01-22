import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, message, Skeleton} from 'antd';
import {Card, Box} from '@mui/material';
import {getSteamConfigApi, saveSteamConfigApi} from "../../../api/gameApi";

const onFinishFailed = (errorInfo) => {
    message.error("保存配置失败")
    console.log('Failed:', errorInfo);
};

export default () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 获取配置文件
        getSteamConfigApi()
            .then(data => {
                console.log('dst_config', data);
                form.setFieldsValue(data.data)
                setLoading(false)
            })
    }, [form])


    const onFinish = (values) => {
        console.log("values", values)
        saveSteamConfigApi(values).then(resp => {
            message.success("保存配置成功")
        })
    };

    return (
        <Card>

            <Box sx={{p: 3}} dir="ltr">
                <Alert style={{
                    marginBottom: '4px'
                }} message={`请在 PalWorldSettings.ini 文件里面开启 RCONEnabled=True,RCONPort=25575，并开放tcp端口。password是,AdminPassword=`} type="info" showIcon closable />

                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    labelAlign={'left'}
                    form={form}
                >
                    <Skeleton loading={loading} active>
                        <Form.Item
                            label="steamcmd安装路径"
                            name="steamcmd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input steam cmd install path',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="幻兽帕鲁服务器安装路径"
                            name="force_install_dir"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input path',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="RCON ip"
                            name="ip"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input RCON ip',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="RCON port"
                            name="port"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input RCON port',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="RCON password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input RCON password',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button style={{margin: "0 auto", display: "block"}} type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Skeleton>
                </Form>
            </Box>
        </Card>
    )
}