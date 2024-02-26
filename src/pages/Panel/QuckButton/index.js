import {Button, Divider, Input, message, Popconfirm, Space} from "antd";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";


import {sendCommandApi} from "../../../api/8level";
import {updateGameApi} from "../../../api/gameApi";
import {createBackupApi} from "../../../api/backupApi";


export default ()=>{
    const { t } = useTranslation()
    const {cluster} = useParams()

    function sendInstruct(command) {
        if (command === "") {
            message.warning("请填写指令在发送")
            return
        }
        // setSpinLoading(true)
        sendCommandApi(cluster, "Master", command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                // setSpinLoading(false)
            })
    }

    const updateGameOnclick = () => {
        message.success('正在更新游戏')
        setUpdateStatus(true)
        updateGameApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success('饥荒更新完成')
                } else {
                    message.error(`${response.msg}`)
                    message.warning("请检查steamcmd路径是否设置正确")
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                message.error(`饥荒更新失败${error}`)
                setUpdateStatus(false)
            })
    }

    const createBackupOnClick = () => {

        message.success('正在创建游戏备份')
        createBackupApi(cluster)
            .then(response => {
                message.success('创建游戏备份成功')
                setCreateBackupStatus(false)
            })
            .catch(error => {
                message.error(`创建游戏备份失败${error}`)
                setCreateBackupStatus(false)
            })
    }
    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)

    return(
        <>
            <Space size={16}>
                <Popconfirm
                    title="是否更新游戏"
                    description={(
                        <span>更新游戏，将停止世界，请自行启动</span>
                    )}
                    placement="topLeft"
                    onConfirm={()=>updateGameOnclick()}
                >
                    <Button  loading={updateGameStatus} type="primary">
                        {t('updateGame')}
                    </Button>
                </Popconfirm>

                <Button
                    onClick={() => {
                        createBackupOnClick()
                    }}
                    loading={createBackupStatus}
                >
                    {t('createBackup')}
                </Button>
            </Space>
            <Divider />
            <Space size={16} wrap>
                <Button type={"primary"} onClick={() => {sendInstruct("c_save()")}} >{t('c_save')}</Button>
                <Popconfirm
                    title={t('regenerate')}
                    description="请保存好数据"
                    onConfirm={()=>{sendInstruct("c_regenerateworld()")}}
                    onCancel={()=>{}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type={"primary"} danger>{t('regenerate')}</Button>
                </Popconfirm>
                <Button onClick={() => { sendInstruct("c_rollback(1)") }} >{t('rollback1')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(2)") }} >{t('rollback2')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(3)") }} >{t('rollback3')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(4)") }} >{t('rollback4')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(5)") }} >{t('rollback5')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(6)") }} >{t('rollback6')}</Button>
            </Space>
            {/*
            <br/><br/>
            <div>
                <Space.Compact >
                    <Input defaultValue="1" />
                    <Button type="primary">回档</Button>
                </Space.Compact>
            </div>
            */}
        </>
    )
}