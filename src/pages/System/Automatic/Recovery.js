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
                        resp.data.interval = 10
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
        <Card style={{
            width: "240px"
        }}>
            <Box sx={{p: 3}} dir="ltr">
                <Skeleton loading={loading}>
                    <Spin spinning={spin}>
                        <div>
                            {title}
                        </div>
                        <Form
                            form={form}
                            labelCol={{
                                span: 10,
                            }}
                            // wrapperCol={{
                            //     span: 16,
                            // }}
                            initialValues={{
                                interval: 20,
                                announcement: ""
                            }}
                        >
                            <Form.Item
                                label={"开启"}
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
                                    min={1}
                                    placeholder="检测间隔时间" />
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