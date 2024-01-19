import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Alert, Button, Form, InputNumber, message, Skeleton, Switch} from "antd";
import {getBackupSnapshotsSettingApi, saveBackupSnapshotsSettingApi} from "../../../api/backupApi";


export default () => {

    const {cluster} = useParams()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getBackupSnapshotsSettingApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    if (resp.data.interval === 0) {
                        resp.data.interval = 36
                    }
                    if (resp.data.maxSnapshots === 0) {
                        resp.data.maxSnapshots = 6
                    }
                    form.setFieldsValue(resp.data)
                } else {
                    message.error("获取失败")
                }
                setLoading(false)
            })
    }, [])

    function save() {
        saveBackupSnapshotsSettingApi(cluster, form.getFieldsValue())
            .then(resp => {
                if (resp.code === 200) {
                    message.success("保存成功")
                } else {
                    message.error("保存失败")
                }
            })
    }

    return (<>
        <Alert
            message={"快照备份，这里只是一个特殊的定时任务，会根据你设置的间隔保存存档，但是他只会保留你设置快照数量"}
            type="warning" showIcon closable/>
        <br/>
        <Alert
            message={"文件以 (snapshot) 开头的都是快照备份文件， 和普通存档没有任何区别，只是做区分"}
            type="info" showIcon closable/>
        <br/>
        <Skeleton loading={loading}>
            <Form
                form={form}
                labelCol={{
                    span: 3,
                }}
                initialValues={{
                    interval: 36,
                    maxSnapshots: 8,
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
                    label={"是否c_save存档"}
                    name='isCSave'
                    tooltip={"开启后，每次创建备份时，都会先存档，但这可能会导致卡顿等情况"}
                    valuePropName="checked"
                >
                    <Switch checkedChildren="开启"
                            unCheckedChildren="关闭"/>
                </Form.Item>
                <Form.Item
                    label={"备份间隔"}
                    name='interval'
                >
                    <InputNumber
                        addonAfter="分钟"
                        style={{width: 120,}}
                        min={1}
                        placeholder="检测间隔时间"/>
                </Form.Item>
                <Form.Item
                    label={"最大快照备份数量"}
                    name='maxSnapshots'
                >
                    <InputNumber
                        style={{width: 120,}}
                        min={1}
                        placeholder="快照数量"/>
                </Form.Item>
                <Form.Item
                    label={"操作"}
                >
                    <Button type={'primary'}
                            onClick={() => {
                                save()
                            }}
                    >保存</Button>
                </Form.Item>
            </Form>
        </Skeleton>
    </>)
}