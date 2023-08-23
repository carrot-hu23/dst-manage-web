import {Button, Drawer, Form, message, InputNumber, Divider} from "antd";
import {useState} from "react";

export default ({syncSamePort,syncSameId}) => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (values) => {
        // server_port, authentication_port,master_server_port
        syncSamePort(values)
        message.success('同步端口成功')
    };

    const onFinish2 = (values) => {
        syncSameId(values.id)
        message.success('同步世界id成功')
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                端口设置
            </Button>
            <Drawer
                title="端口设置"
                placement="right"
                width={480}
                onClose={onClose}
                open={open}
                // extra={
                //     <Button onClick={onClose} type="primary">
                //         保存配置
                //     </Button>
                // }
            >
                <Divider orientation="left">tips: 这里只是所有世界端口将从你设置的起止端口依次递增</Divider>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}

                    initialValues={{
                        server_port: 10098,
                        authentication_port: 8767,
                        master_server_port: 27017
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="起止端口"
                        name="server_port"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your start server_port!',
                            },
                        ]}
                    >
                        <InputNumber min={1024} max={65527}/>
                    </Form.Item>
                    <Form.Item
                        label="起止认证端口"
                        name="authentication_port"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your start authentication_port!',
                            },
                        ]}
                    >
                        <InputNumber min={1024} max={65527}/>
                    </Form.Item>
                    <Form.Item
                        label="起止世界端口"
                        name="master_server_port"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your start master_server_port!',
                            },
                        ]}
                    >
                        <InputNumber min={1024} max={65527}/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 18,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            保存配置
                        </Button>
                    </Form.Item>
                </Form>

                <Divider orientation="left">tips: 这里只是所有世界id将从你设置的起止id依次递增</Divider>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        id: 1,
                    }}
                    onFinish={onFinish2}
                >
                    <Form.Item
                        label="起止端口"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your start id !',
                            },
                        ]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 18,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            保存配置
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </>
    )
}