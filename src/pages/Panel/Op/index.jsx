import {Button, message, Popconfirm, Space} from "antd";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {updateGameApi} from "../../../api/gameApi";
import {createBackupApi} from "../../../api/backupApi";
import {deleteStepupWorkshopApi} from "../../../api/modApi";

export default ()=>{
    
    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)
    const {cluster} = useParams()
    const [open, setOpen] = useState(false);
    const {t} = useTranslation()
    
    const updateGameOnclick = () => {
        message.success(t('panel.updating.game'))
        setUpdateStatus(true)
        updateGameApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success(t('panel.update.success'))
                } else {
                    message.warning(`${response.msg}`)
                    message.warning(t('panel.update.error'))
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                console.log(error)
                setUpdateStatus(false)
            })
    }

    const createBackupOnClick = () => {

        createBackupApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success(t('panel.backup.success'))
                } else {
                    message.warning(t('panel.backup.error'))
                }
            })
            .catch(error => {
                message.error(`创建游戏备份失败${error}`)
                setCreateBackupStatus(false)
            })
    }

    function deleteStepupWorkshop() {
        deleteStepupWorkshopApi()
            .then(data => {
                if (data.code === 200) {
                    message.success("更新模组成功，请重启房间")
                } else {
                    message.warning("更新模组失败")
                }
                setOpen(false)
            })
    }
    
    return<Space size={16} wrap>
        <div>
            <Popconfirm
                title="是否更新游戏"
                description={(
                    <span>更新游戏，将停止世界，请自行启动</span>
                )}
                placement="topLeft"
                onConfirm={()=>updateGameOnclick()}
            >
                <Button
                    color="primary" variant="filled"
                    loading={updateGameStatus}
                >
                    {t('panel.updateGame')}
                </Button>
            </Popconfirm>
        </div>
       <div>
           <Button
               color="default" variant="filled"
                   onClick={() => {
                       createBackupOnClick()
                   }}
                   loading={createBackupStatus}
           >
               {t('panel.backup.create')}
           </Button>
       </div>
        <div>
            <Popconfirm
                title="是否更新房间模组"
                description={(
                    <span>
                        当房间出现服务器模板版本过低时点击
                            <br />
                        点击后请重新启动房间
                        </span>
                )}
                open={open}
                onConfirm={()=>deleteStepupWorkshop()}
                onCancel={()=>setOpen(false)}
            >
                <Button  color="default" variant="filled" danger onClick={() => setOpen(true)}>删除模组</Button>
            </Popconfirm>
        </div>
    </Space>
}