import {Button, Input, message, Popconfirm, Space} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";


import {sendCommandApi} from "../../../api/8level";


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

    return(
        <>
            <Space size={68} wrap>
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
                {/*
                                <Button onClick={() => { sendInstruct("c_rollback(1)") }} >{t('rollback1')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(2)") }} >{t('rollback2')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(3)") }} >{t('rollback3')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(4)") }} >{t('rollback4')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(5)") }} >{t('rollback5')}</Button>
                <Button onClick={() => { sendInstruct("c_rollback(6)") }} >{t('rollback6')}</Button>
                */}
            </Space>
            <br/><br/>
            <div>
                <Space.Compact >
                    <Input defaultValue="1" />
                    <Button type="primary">回档</Button>
                </Space.Compact>
            </div>
        </>
    )
}