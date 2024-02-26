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
    
    return<>
        <div>
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
        </div>
       <div style={{
           marginTop: '12px',
           marginBottom: '12px'
       }}>
           <Button
                   onClick={() => {
                       createBackupOnClick()
                   }}
                   loading={createBackupStatus}
           >
               {t('createBackup')}
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
                <Button  type="primary" danger onClick={() => setOpen(true)}>更新模组</Button>
            </Popconfirm>
        </div>
    </>
}