import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Alert, Button, Form, InputNumber, message, Skeleton, Switch} from "antd";
import {getBackupSnapshotsSettingApi, saveBackupSnapshotsSettingApi} from "../../../api/backupApi";


export default () => {

    const {cluster} = useParams()
    const {t} = useTranslation()

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
                    message.success(t('backup.save.ok'))
                } else {
                    message.error(t('backup.save.error'))
                }
            })
    }

    return (<>
        <Alert
            message={t('backup.tips2')}
            type="warning" showIcon closable/>
        <br/>
        <Alert
            message={t('backup.tips3')}
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
                    label={t('backup.snapshotBackup.enable')}
                    name='enable'
                    valuePropName="checked"
                >
                    <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
                </Form.Item>
                <Form.Item
                    label={t('backup.snapshotBackup.c_save()')}
                    name='isCSave'
                    tooltip={"开启后，每次创建备份时，都会先存档，但这可能会导致卡顿等情况"}
                    valuePropName="checked"
                >
                    <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
                </Form.Item>
                <Form.Item
                    label={t('backup.snapshotBackup.interval')}
                    name='interval'
                >
                    <InputNumber
                        addonAfter={t('backup.snapshotBackup.interval.minute')}
                        style={{width: 120,}}
                        min={1}
                        placeholder="检测间隔时间"/>
                </Form.Item>
                <Form.Item
                    label={t('backup.snapshotBackup.maxSnapshots')}
                    name='maxSnapshots'
                >
                    <InputNumber
                        style={{width: 120,}}
                        min={1}
                        placeholder="快照数量"/>
                </Form.Item>
                <Form.Item
                    label={t("backup.snapshotBackup.action")}
                >
                    <Button type={'primary'}
                            onClick={() => {
                                save()
                            }}
                    >{t("backup.save")}</Button>
                </Form.Item>
            </Form>
        </Skeleton>
    </>)
}