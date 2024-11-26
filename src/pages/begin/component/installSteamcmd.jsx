import { Button, Popconfirm, message } from 'antd';
import { useState } from 'react';

export default () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            message.success("安装steamcmd成功")
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <Popconfirm
            title="安装steamcmd"
            // description="安装steamcmd"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}
        >
            <Button type="link"
                onClick={showPopconfirm}
            >点击安装 steamcmd</Button>
        </Popconfirm>
    )
}