import {useEffect, useState} from 'react';
import {Button, Form, Input, message, Skeleton} from 'antd';
import {Card, Box} from '@mui/material';

import {readDstConfigSync, writeDstConfigSync} from '../../api/dstConfigApi';

const onFinishFailed = (errorInfo) => {
    message.error("保存配置失败")
    console.log('Failed:', errorInfo);
};

const DstConfigSetting = () => {

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


    const onFinish = (values) => {

        writeDstConfigSync(values).then(resp => {
            message.success("保存配置成功")
        })
    };

    return (
        <Card>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
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
                            label="饥荒服务器安装路径"
                            name="force_install_dir"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                                },
                            ]}
                        >
                            <Input/>
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
                            <Input placeholder="游戏备份路径"/>
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
                            <Input placeholder="服务器文件夹名"/>
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
                            <Input placeholder="服务器文件夹名"/>
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
    )
}

export default DstConfigSetting