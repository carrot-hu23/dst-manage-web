import {Button, message} from "antd";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createBackupApi} from "../../../api/backupApi";


export default ()=>{

    const {t} = useTranslation()
    const [createBackupStatus, setCreateBackupStatus] = useState(false)
    const {cluster} = useParams()
    const createBackupOnClick = () => {
        setCreateBackupStatus(true)
        message.success('正在创建游戏备份')
        createBackupApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success('创建游戏备份成功')
                } else {
                    message.warning('创建游戏备份失败')
                }
                setCreateBackupStatus(false)
            })
            .catch(error => {
                message.error(`创建游戏备份失败${error}`)
                setCreateBackupStatus(false)
            })
    }

    return(
        <>
            <Button
                type={'primary'}
                    onClick={() => {
                        createBackupOnClick()
                    }}
                    loading={createBackupStatus}
            >
                {t('createBackup')}
            </Button>
        </>
    )
}