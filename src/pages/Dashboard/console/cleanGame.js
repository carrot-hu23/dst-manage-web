import { Button, Popconfirm, message } from 'antd';

import { useState } from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import { cleanWorldApi } from '../../../api/gameApi';

const CleanArchive = () => {
    
    const { t } = useTranslation()
    
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const {cluster} = useParams()
    
    const showPopconfirm = () => {
        setOpen(true);
    };
    
    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            cleanWorldApi(cluster)
                .then(data => {
                    setOpen(false);
                    setConfirmLoading(false);
                    message.success("清理成功")
                }).catch(error => {
                    setOpen(false);
                    setConfirmLoading(false);
                    message.error("清理失败")
                })
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <Popconfirm
            title="是否清理"
            description={<>
                <div>和重置世界稍微有点区别</div>
                <div>这个操作会删除你Master/Caves 文件的</div>
                <div>save 和 backup server_log 等文件</div>
            </>}
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}
        >
            <Button type="primary" danger
                onClick={showPopconfirm}
            >{t('cleanGame')}</Button>
        </Popconfirm>
    )
}

export default CleanArchive