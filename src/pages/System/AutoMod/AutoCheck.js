import {Box, Card} from "@mui/material";
import {Button, Form, Input, InputNumber, message, Skeleton, Spin, Switch} from "antd";
import React, {useEffect, useState} from "react";
import {autoCheckApi, saveAutoCheckApi} from "../../../api/autoCheckApi";

const { TextArea } = Input;

export default ({name, title})=>{

    const [loading, setLoading] = useState(false)
    const [spin, setSpin] = useState(false)
    const [form] = Form.useForm()
    useEffect(()=>{
        setLoading(true)
        autoCheckApi("", name)
            .then(resp=>{
                if (resp.code === 200) {
                    if (resp.data.interval === 0) {
                        resp.data.interval = 20
                    }
                    if (resp.data.sleep === 0) {
                        resp.data.sleep = 5
                    }
                    if (resp.data.times === 0) {
                        resp.data.times = 1
                    }
                    form.setFieldsValue(resp.data)
                }
                setLoading(false)
            })
    },[])

    function saveAutoCheck () {
        const data = form.getFieldValue()
        console.log(form.getFieldValue())
        data.name = name
        setSpin(true)
        saveAutoCheckApi("", data)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存成功")
                }else {
                    message.error("保存失败")
                }
                setSpin(false)
            })
    }

    return(<>
        <Card>
            <Box sx={{p: 3}} dir="ltr">
                <Skeleton loading={loading}>
                    <Spin spinning={spin}>
                        <Form
                            form={form}
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            // labelAlign={'left'}
                            initialValues={{
                                interval: 20,
                                announcement: "131313\n3131\n"
                            }}
                        >
                            <Form.Item
                                label={'开启'}
                                name='enable'
                                valuePropName="checked"
                            >
                                <Switch checkedChildren="开启"
                                        unCheckedChildren="关闭"/>
                            </Form.Item>
                            <Form.Item
                                label={"检测间隔"}
                                name='interval'
                            >
                                <InputNumber
                                    addonAfter="分钟"
                                    style={{width: 120,}}
                                    min={5}
                                    placeholder="检测间隔时间" />
                            </Form.Item>
                            <Form.Item
                                label={"公告"}
                                name='announcement'
                            >
                                <TextArea rows={4} placeholder="请输入公告。tips: 发送公告后，默认 5s 后将执行操作" />
                            </Form.Item>
                            <Form.Item
                                label={"延迟"}
                                name='sleep'
                            >
                                <InputNumber
                                    addonAfter="秒"
                                    style={{width: 120,}}
                                    min={1}
                                    placeholder="设置多少秒后执行" />
                            </Form.Item>
                            <Form.Item
                                label={"公告次数"}
                                name='times'
                            >
                                <InputNumber
                                    addonAfter="次"
                                    style={{width: 120,}}
                                    min={1}
                                    placeholder="公告次数" />
                            </Form.Item>
                            <Form.Item
                                label={"操作"}
                            >
                                <Button type={'primary'}
                                        onClick={()=>saveAutoCheck()}
                                >保存</Button>
                            </Form.Item>
                        </Form>

                    </Spin>
                </Skeleton>
            </Box>
        </Card>
    </>)
}