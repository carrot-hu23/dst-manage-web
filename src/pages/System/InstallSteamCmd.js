import {useEffect, useState} from 'react';
import {Button, Divider, message, Popconfirm} from 'antd';
import {Box, Card} from '@mui/material';


const InstallSteamCmd = () => {

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

export default InstallSteamCmd