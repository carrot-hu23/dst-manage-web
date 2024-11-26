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
        createBackupApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success(t('panel.backup.success'))
                } else {
                    message.warning(t('panel.backup.error'))
                }
                setCreateBackupStatus(false)
            })
            .catch(error => {
                console.log(error)
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
                {t('panel.backup.create')}
            </Button>
        </>
    )
}