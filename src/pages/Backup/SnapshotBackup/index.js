import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Alert, Button, Form, InputNumber, message, Skeleton, Switch} from "antd";
import {getBackupSnapshotsSettingApi, saveBackupSnapshotsSettingApi} from "../../../api/backupApi";


export default () => {

    const {cluster} = useParams()
    const { t } = useTranslation()

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
            message={t('Snapshot backup, here is just a special scheduled task, which will save the archive according to the interval you set, but it will only retain the number of snapshots you set.')}
            type="warning" showIcon closable/>
        <br/>
        <Alert
            message={t('Files starting with (snapshot) are snapshot backup files, which are no different from ordinary archives, just to distinguish them.')}
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
                    label={t('enable')}
                    name='enable'
                    valuePropName="checked"
                >
                    <Switch checkedChildren="开启"
                            unCheckedChildren="关闭"/>
                </Form.Item>
                <Form.Item
                    label={t('is c_save()')}
                    name='isCSave'
                    tooltip={"开启后，每次创建备份时，都会先存档，但这可能会导致卡顿等情况"}
                    valuePropName="checked"
                >
                    <Switch checkedChildren="开启"
                            unCheckedChildren="关闭"/>
                </Form.Item>
                <Form.Item
                    label={t('interval')}
                    name='interval'
                >
                    <InputNumber
                        addonAfter={t('minute')}
                        style={{width: 120,}}
                        min={1}
                        placeholder="检测间隔时间"/>
                </Form.Item>
                <Form.Item
                    label={t('maxSnapshots')}
                    name='maxSnapshots'
                >
                    <InputNumber
                        style={{width: 120,}}
                        min={1}
                        placeholder="快照数量"/>
                </Form.Item>
                <Form.Item
                    label={t("action")}
                >
                    <Button type={'primary'}
                            onClick={() => {
                                save()
                            }}
                    >{t("Save")}</Button>
                </Form.Item>
            </Form>
        </Skeleton>
    </>)
}