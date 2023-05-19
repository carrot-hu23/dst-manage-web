import { Form, Input, InputNumber, Switch, Radio, Tooltip } from 'antd';
import { useEffect } from 'react';

const ServerIni = ({ worlds, currWorld, setCurrWorld, index }) => {

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(currWorld.server_ini)
    }, [currWorld])
    return (
        <>
            {/* <div>index: {index}</div>
            <div>server_port: {currWorld.server_ini.server_port}</div>
            <div>is_master: {currWorld.server_ini.is_master}</div>
            <div>name: {currWorld.server_ini.name}</div>
            <div>id: {currWorld.server_ini.id}</div>
            <div>encode_user_path: {currWorld.server_ini.encode_user_path}</div>
            <div>authentication_port: {currWorld.server_ini.authentication_port}</div>
            <div>master_server_port: {currWorld.server_ini.master_server_port}</div> */}

            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 11,
                }}
                layout="horizontal"
            >
                <Form.Item
                    label="端口"
                    name="server_port"
                >
                    <Input
                        placeholder="server_port"
                        
                    />
                </Form.Item>

                <Form.Item
                    label="主世界"
                    name="is_master"
                >
                    <Input
                        placeholder="is_master"
                        
                    />
                </Form.Item>

                <Form.Item
                    label="名称"
                    name="name"
                >
                    <Input
                        placeholder="name"
                        
                    />
                </Form.Item>

                <Form.Item
                    label="id"
                    name="id"
                >
                    <Input
                        placeholder="id"
                        
                    />
                </Form.Item>

                <Form.Item
                    label="encode_user_path"
                    name="encode_user_path"
                >
                    <Input
                        placeholder="encode_user_path"
                        
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default ServerIni;
