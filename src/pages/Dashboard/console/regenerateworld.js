import { Button, Popconfirm, message } from 'antd';

import { useState } from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import { regenerateworldApi } from '../../../api/gameApi';

const Regenerateworld = () => {

    const { t } = useTranslation()

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const {cluster} = useParams()
    const handleOk = () => {
        setConfirmLoading(true);
        
        setTimeout(() => {
            regenerateworldApi(cluster)
            .then(data=>{
                setOpen(false);
                setConfirmLoading(false);
                message.success("重置成功")
            }).catch(error=>{
                setOpen(false);
                setConfirmLoading(false);
                message.error("重置失败")
            })
            
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Popconfirm
            title="是否重置世界"
            description="清理后将丢失数据，请做好备份"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}
        >
            <Button 
            style={{
                margin: '0 8px',
            }}
            
            type="primary" danger 
                onClick={showPopconfirm}
            >{t('regenerate')}</Button>
        </Popconfirm>
    )
}

export default Regenerateworld