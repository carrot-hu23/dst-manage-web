import {Button, Form, Input, InputNumber, message, Modal, Spin, Switch} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {saveAutoCheck2Api} from "../../../api/autoCheckApi";
import DstEmoji from "../../DstServerList/DstEmoji";
import style from "../../DstServerList/index.module.css";


const {TextArea} = Input;

export default ({isGameUpdate, isMod, autoCheck}) => {
    const {cluster} = useParams()
    const [form] = Form.useForm()
    const [spin, setSpin] = useState(false)
    const [open,setOpen] = useState(false)

    useEffect(() => {
        form.setFieldsValue(autoCheck)
    }, [autoCheck])

    function saveAutoCheck() {
        setSpin(true)
        const data = form.getFieldValue()
        saveAutoCheck2Api(cluster, data)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存成功")
                    form.setFieldsValue(resp.data)
                } else {
                    message.error("保存失败")
                    message.warning(resp.msg)
                }
                setSpin(false)
            })
    }

    return (<>

        <Spin spinning={spin}>
            <Modal  title="饥荒Emoj" open={open}  onCancel={()=>setOpen(false)} footer={null} >
                <DstEmoji />
            </Modal>

            <Form
                form={form}
                labelCol={{
                    span: 2,
                }}
                // wrapperCol={{
                //     span: 16,
                // }}
                initialValues={{
                    interval: 20,
                    announcement: ""
                }}
            >
                {!isGameUpdate && <>
                    <Form.Item
                        label={"世界名"}
                    >
                        {autoCheck.levelName}
                    </Form.Item>
                    <Form.Item
                        tooltip={"uuid 是你存档的世界文件名称"}
                        label={"uuid"}
                    >
                        {autoCheck.uuid}
                    </Form.Item>
                </>}

                <Form.Item
                    label={"开启"}
                    name='enable'
                    valuePropName="checked"
                >
                    <Switch checkedChildren="开启"
                            unCheckedChildren="关闭"/>
                </Form.Item>
                {isMod && <>
                    <Form.Item
                        label={"公告"}
                        name='announcement'
                    >
                        <TextArea className={style.icon} rows={4} placeholder="请输入公告。tips: 发送公告后，默认 5s 后将执行操作"/>
                    </Form.Item>
                    <Form.Item label="-">
                        <Button type={'link'} onClick={()=>setOpen(true)} >查看emoji</Button>
                    </Form.Item>
                    <Form.Item
                        label={"延迟"}
                        name='sleep'
                    >
                        <InputNumber
                            addonAfter="秒"
                            style={{width: 120,}}
                            min={1}
                            placeholder="设置多少秒后执行"/>
                    </Form.Item>
                    <Form.Item
                        label={"公告次数"}
                        name='times'
                    >
                        <InputNumber
                            addonAfter="次"
                            style={{width: 120,}}
                            min={1}
                            placeholder="公告次数"/>
                    </Form.Item>
                </>}
                <Form.Item
                    label={"检测间隔"}
                    name='interval'
                >
                    <InputNumber
                        addonAfter="分钟"
                        style={{width: 120,}}
                        min={1}
                        placeholder="检测间隔时间"/>
                </Form.Item>
                <Form.Item
                    label={"操作"}
                >
                    <Button type={'primary'}
                            onClick={() => saveAutoCheck()}
                    >保存</Button>
                </Form.Item>
            </Form>
        </Spin>

    </>)
}