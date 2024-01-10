/* eslint-disable */
import {Card, Box} from "@mui/material";
import {Button, Divider, Form, Input, Typography, Space, Switch, Tabs, Alert} from "antd";

import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import {useTranslation} from "react-i18next";

const {TabPane} = Tabs;
const {Title, Paragraph, Text, Link} = Typography;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 2,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 22,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 22,
            offset: 2,
        },
    },
};


export default () => {
    const {t} = useTranslation()
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    }

    return (
        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    操作：<Switch  checkedChildren="启动" unCheckedChildren="关闭"
                                 onChange={(checked)=>{}}
                />
                </Box>
            </Card>
            <br/>
            <Card>
                <Box sx={{p: 3, pb: 1}} dir="ltr">
                    <Alert message="只是简单提供配置项，会覆盖之前的配置，如果需要配置其他请手动更改"
                           type="info"
                           showIcon
                           action={
                               <a target={'_blank'}
                                  href="https://gofrp.org/zh-cn/docs/reference/client-configures/">frpc详细</a>
                           }
                    />
                    <br/>
                    <Form
                        form={form}
                        {...formItemLayoutWithOutLabel}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            {...formItemLayout}
                            label={"serverAddr"}
                            name={"serverAddr"}
                            rules={[
                                {
                                    required: true,
                                    message: 'serverAddr',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={"serverPort"}
                            name={"serverPort"}
                            rules={[
                                {
                                    required: true,
                                    message: 'serverPort',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={"token"}
                            name={"token"}
                            rules={[
                                {
                                    required: true,
                                    message: 'token',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.List name="proxies">
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map(({key, name, ...restField}, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'proxies' : ''}
                                            required={false}
                                            key={key}
                                        >
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                }}
                                                align="baseline"
                                                size={[8, 16]}
                                                wrap
                                            >
                                                <Form.Item
                                                    label={'name'}
                                                    key={`${key}name`}
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'name',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="name"/>
                                                </Form.Item>
                                                <Form.Item
                                                    label={'type'}
                                                    key={`${key}type`}
                                                    {...restField}
                                                    name={[name, 'type']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'type',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="type"/>
                                                </Form.Item>
                                                <Form.Item
                                                    label={'localIP'}
                                                    key={`${key}localIP`}
                                                    {...restField}
                                                    name={[name, 'localIP']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'localIP',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="localIP"/>
                                                </Form.Item>
                                                <Form.Item
                                                    label={'localPort'}
                                                    key={`${key}localPort`}
                                                    {...restField}
                                                    name={[name, 'localPort']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'localPort',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="localPort"/>
                                                </Form.Item>
                                                <Form.Item
                                                    label={'remotePort'}
                                                    key={`${key}remotePort`}
                                                    {...restField}
                                                    name={[name, 'remotePort']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'remotePort',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="remotePort"/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)}/>
                                            </Space>
                                            <Divider/>
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block
                                                icon={<PlusOutlined/>}>
                                            Add Proxy
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Card>
        </>
    )
}