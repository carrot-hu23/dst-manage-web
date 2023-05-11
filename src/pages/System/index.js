import { useEffect, useState } from 'react';
import { Button, Form, Input, message, Skeleton } from 'antd';

import { Card, Container, Box, Grid } from '@mui/material';

import { readDstConfigSync, writeDstConfigSync } from '../../api/dstConfigApi';

const onFinishFailed = (errorInfo) => {
    message.error("保存配置失败")
    console.log('Failed:', errorInfo);
};

const System = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // 获取配置文件
        readDstConfigSync()
            .then(data => {
                console.log('dst_config', data);
                form.setFieldsValue(data.data)
                setLoading(false)
            })
    }, [form])

    const saveConfig = (values) => {

        // let config = ''
        // config += 'mode=' + values.mode + '\n'
        // if (values.steamcmd !== undefined || values.steamcmd != null) {
        //     config += 'steamcmd=' + values.steamcmd + '\n'
        // }
        // config += 'force_install_dir=' + values.force_install_dir + '\n'
        // config += 'doNotStarveTogether=' + values.doNotStarveTogether + '\n'
        // config += 'cluster=' + values.cluster + '\n'

        console.log('save dst config', values);

        writeDstConfigSync(values)
    }

    const onFinish = (values) => {

        saveConfig(values)

        message.success("保存配置成功")
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>

                <Grid item xs={12} md={6} lg={6}>

                    <Card>
                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                            <Form
                                // name="basic"
                                // labelCol={{
                                //     span: 8,
                                // }}
                                // wrapperCol={{
                                //     span: 12,
                                // }}
                                // style={{
                                //     maxWidth: 600,
                                // }}
                                initialValues={{
                                    // type: 1,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                // autoComplete="off"
                                layout="vertical"
                                labelAlign={'left'}
                                form={form}
                            >
                                <Skeleton loading={loading} active >
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
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="饥荒服务器安装路径"
                                        name="force_install_dir"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="游戏备份路径"
                                        name="backup"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input dontstarve_dedicated_server name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="游戏备份路径" />
                                        {/* <TextArea rows={2} placeholder="服务器房间文件位置" /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="mod下载路径"
                                        name="mod_download_path"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input mod_download_path',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="服务器文件夹名" />
                                        {/* <TextArea rows={2} placeholder="服务器房间文件位置" /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="服务器文件夹名"
                                        name="cluster"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input dontstarve_dedicated_server name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="服务器文件夹名" />
                                        {/* <TextArea rows={2} placeholder="服务器房间文件位置" /> */}
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Skeleton>
                            </Form>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default System