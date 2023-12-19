import React, {useEffect, useState} from 'react';
import {Alert, Button, Divider, message, Popconfirm} from 'antd';
import {Box, Card} from '@mui/material';


const Index = () => {

    const [loading,setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    useEffect(() => {}, []);

    const sse = () => {
        setLoading(true)
        const eventSource = new EventSource('/api/install/steamcmd'); // 替换为你的SSE端点
        eventSource.onmessage = (event) => {
            const newMessage = event.data;
            if (newMessage.includes("[successed]")) {
                message.success("环境安装成功!!!")
                setLoading(false)
                eventSource.close()
                setMessages(prevMessages => {
                    return [...prevMessages, newMessage].slice(-50);
                });
                return
            }
            setMessages(prevMessages => {
                return [...prevMessages, newMessage].slice(-50);
            });
        };
    }
    return (
        <Card>
            <Box sx={{p: 3, pb: 1}} dir="ltr">

                <Popconfirm
                    title="是否安装饥荒环境和steamcmd？"
                    description="Are you sure?"
                    onConfirm={()=>{sse()}}
                    onCancel={()=>{}}
                    okText="Yes"
                    cancelText="No"
                >
                    <div>
                        <Alert message={"1.2.7 版本以后，这种安装方式已经废弃掉了，请执行 install_steamcmd_centos.sh 或者 install_steamcmd_ubuntu.sh, 不要在点击下面的 安装环境了"} type="success" showIcon />
                        <br/>
                        <Alert message={"如果安装后启动不了房间，请手动执行 install_centos.sh 或者 install_ubuntu.sh"} type="warning" showIcon closable />
                        <br/>
                        <Alert message={"优先推荐使用群里面提供的一键安装脚本安装"} type="warning" showIcon closable />
                        <br/>
                        <Alert message={"docker版本请勿点击安装，docker版本环境默认已经安装好了"} type="info" showIcon closable />
                        <br/>
                        <Alert message={"windows版本请勿点击安装，windows版本环境请自行安装steamcmd和饥荒"} type="info" showIcon closable />
                        <br/>
                    </div>
                    <Button type="primary" loading={loading}>点击安装环境</Button>
                </Popconfirm>

                <br/>
                <br/>
                <Divider />
                <div style={{
                    maxHeight: 450,
                    overflowY: 'auto',
                }}>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
                <Divider />
            </Box>
        </Card>
    )
}

export default Index