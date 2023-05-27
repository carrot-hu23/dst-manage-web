import {
    Form,
    Input,
    InputNumber,
    Switch
} from 'antd';

// eslint-disable-next-line react/prop-types
const ServerIni = ({ form, isMaster }) => (
    <Form
        form={form}
        labelCol={{
            span: 4,
        }}
        wrapperCol={{
            span: 11,
        }}
        layout="horizontal"
        initialValues={{
            is_master: isMaster,
        }}
    >
        <Form.Item
            label="端口"
            name="server_port"
            tooltip={`
            服务器监听的 UDP 端口，每个服务器需要设置不同的端口\n\n
            范围：10998-11018 (其它端口也可，但游戏在检索局域网房间时只会扫描这些端口)\n\n
            页面自动分配的端口不会与已填写的端口重复，但页面不会擅自修改自行填写的端口，所以确保不要填写重复的端口。
            `}
        >
            <InputNumber placeholder="范围: 10998-11018" />
        </Form.Item>

        <Form.Item
            label="主世界"
            valuePropName="checked"
            name='is_master'
            tooltip={`
        将该世界设为主世界，即第一次进入房间时将会进入的世界。
        主服务器运行的是一个房间的核心世界，其它世界都是该世界的附属，比如季节、天数等都是以该世界为准的。
        `}>
            <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        <Form.Item
            label="世界名"
            name="name"
            tooltip={`
            `}
        >
            <Input placeholder="世界名" />
        </Form.Item>

        <Form.Item
            label="世界 ID"
            name="id"
            tooltip={`
            随机数字，用于区分不同的从服务器。
            
            游戏过程中修改该项会导致该世界的玩家信息丢失。
            
            主服务器强制为 1。其它世界设为 1 也会被视为主服务器去新注册一个房间。
            `}
        >
            <InputNumber placeholder="id" />
        </Form.Item>

        <Form.Item
            label="路径兼容"
            valuePropName="checked"
            name='encode_user_path'
            tooltip={`
            使路径编码与不区分大小写的操作系统兼容`}
        >
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>

        <Form.Item
            label="认证端口"
            name='authentication_port'>
            <Input placeholder="authentication_port" maxLength={200} />
        </Form.Item>

        <Form.Item
            label="世界端口"
            name='master_server_port'>
            <Input placeholder="master_server_port" maxLength={200} />
        </Form.Item>
    </Form>
);
export default ServerIni;