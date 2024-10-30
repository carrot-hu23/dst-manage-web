import {Alert, Button, Drawer, message, Popconfirm, Space} from "antd";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {updateGameApi} from "../../../api/gameApi";
import {deleteStepupWorkshopApi} from "../../../api/modApi";
import CreateBackUpBtn from "./CreateBackUpBtn";

export default ()=>{
    
    const [updateGameStatus, setUpdateStatus] = useState(false)
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
        <Space size={24} wrap>
            <Button type="primary"
                    onClick={() => {
                        updateGameOnclick()
                    }}
                    loading={updateGameStatus}
            >
                {t('panel.updateGame')}
            </Button>

           <CreateBackUpBtn />
            {/*
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
                <Button type="primary" danger onClick={() => setOpen(true)}>{t('UpdateGameMode')}</Button>
            </Popconfirm>
            */}
        </Space>
    </>
}

const ArchiveList = ()=>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const {t} = useTranslation()

    return(
        <>
            <Button type="primary" onClick={showDrawer}>{t('Archive')}</Button>

            <Drawer title="存档列表" onClose={onClose} open={open}>
                <Alert style={{marginBottom: '12px'}}
                       message="在这里可以上传自己的存档(只支持zip压缩格式)，也可以恢复存档，点击上传存档后，在点击恢复存档，刷新页面"
                       type="warning" showIcon/>
            </Drawer>
        </>
    )
}