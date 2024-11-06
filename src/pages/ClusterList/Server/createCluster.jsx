import React, {useState} from "react";
import {Alert, Button, Form, Input, InputNumber, message, Radio, Segmented, Spin} from "antd";

import {generateUUID} from "../../../utils/dateUitls";
import {createCluster} from "../../../api/clusterApi";


export default ({serverList, reload, setOpenAdd}) => {

    const [clusterType, setClusterType] = useState('本地')

    const stringList = serverList.map(server => server.clusterName)

    const [spining, setSpinning] = useState(false)

    const validateName = (_, value) => {
        // 判断是否重复字符串
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error('名称重复'));
        }

        // 判断是否为子串
        for (let i = 0; i < stringList.length; i++) {
            if (value && stringList[i].includes(value)) {
                return Promise.reject(new Error('名称为其他字符串的子串'));
            }
        }

        // 判断是否以英文开头且不含有特殊字符
        const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        if (value && !regex.test(value)) {
            return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
        }

        return Promise.resolve();
    };
    const onFinish = (values) => {
        setSpinning(true)
        if (values.clusterType === '远程') {
            values.clusterName = generateUUID()
        }
        console.log('createCluster:', values);
        createCluster(values)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("创建房间成功")
                    reload()
                } else {
                    message.error("创建房间成功")
                }
                setOpenAdd(false)
                setSpinning(false)
            })
    };
    return (
        <>
            <Spin spinning={spining} tip={"正在创建房间"}>

                <Alert message="以下路径请使用绝对路径，不支持相对路径，同时不要使用特殊字符" type="warning" showIcon
                       closable/>
                <br/>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    onFinish={onFinish}
                    initialValues={{
                        clusterType: '本地',
                        levelType: 'forest'
                    }}
                >
                    <Form.Item label="类型" name={'clusterType'}>
                        <Segmented options={["本地", "远程"]} block onChange={(v) => {
                            setClusterType(v)
                        }}/>
                    </Form.Item>

                    <Form.Item label="房间名称"
                               name="name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your name!',
                                   },
                               ]}
                    >
                        <Input/>
                    </Form.Item>
                    {clusterType === '本地' && (<>
                        <Form.Item label="存档名称"
                                   tooltip={"如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串"}
                                   name="clusterName"
                                   rules={[
                                       {
                                           required: true,
                                           validator: validateName
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="steamcmd 路径"
                                   name="steamcmd"
                                   tooltip={"docker 环境 路径填写 /app/steamcmd"}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your steamcmd path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="饥荒路径"
                                   tooltip={"docker 环境 路径请填 /app/dst-dedicated-server"}
                                   name="force_install_dir"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your force_install_dir path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            tooltip={"暂时未实现"}
                            label="persistent_storage_root(暂时未实现)"
                            name="persistent_storage_root"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your persistent_storage_root path!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            tooltip={"暂时未实现"}
                            label="conf_dir(暂时未实现)"
                            name="conf_dir"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your conf_dir path!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="ugc_directory"
                                   name="ugc_directory"
                                   rules={[
                                       {
                                           required: false,
                                           message: 'Please input your ugc_directory path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="备份路径"
                                   name="backup"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your backup path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="启动方式"
                            name="bin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server bin',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={32}>32</Radio>
                                <Radio value={64}>64</Radio>
                                <Radio value={100}>lua-jit</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="世界类型"
                            name="levelType"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input levelType',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={'forest'}>森林洞穴</Radio>
                                <Radio value={'porkland'}>猪镇</Radio>
                            </Radio.Group>
                        </Form.Item>

                    </>)}

                    {clusterType === '远程' && (<>
                        <Form.Item label="Ip"
                                   name="ip"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your ip!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="端口"
                                   name="port"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your port!',
                                       },
                                   ]}
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="用户名"
                                   name="username"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="密码"
                                   name="password"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                    </>)}
                    <Form.Item
                        label={"操作"}
                    >
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    )
}