/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Button, Input, message, notification, Space} from 'antd';

import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {masterConsoleApi} from "../../../api/gameApi";

import Editor from "../../Home/Editor";


const GameLog2 = (props) => {

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({type,success,params}) => {
        api[type]({
            message: success?'房间启动成功':'房间启动失败',
            description: (
                    <span>{params}</span>
            ),
        });
    };

    const { t } = useTranslation()
    const [log, setLog] = useState("")
    useEffect(() => {

        let socket
        try {
            if(!!window.WebSocket && window.WebSocket.prototype.send) {
                // message.success('您的浏览器支持Websocket通信协议')
            } else{
                message.error('对不起, 您的浏览器不支持Websocket通信协议')
            }
            // 这里的转发标识为/ws

            let  wsPath
            // eslint-disable-next-line no-restricted-globals
            if (location.protocol === 'https:') {
                // 当前页面使用 HTTPS 协议
                wsPath = `wss://${window.location.host}/ws`
            } else {
                // 当前页面使用 HTTP 协议
                wsPath = `ws://${window.location.host}/ws`
            }
            socket = new WebSocket(wsPath)
            socket.onopen= ()=> {
                console.log("webSocket连接成功")
                socket.send("nihao")
                const message = `tailf ${props.path}`
                console.log('path',props.path)
                socket.send(message)
            }
            socket.onerror= ()=> {
                console.log("连接错误");
            }
            socket.onmessage = (e)=> {
                checkLog(e.data)
                setLog(current=>`${current+e.data}\n`)
            }
            socket.onclose = (e)=> {
                console.log('webSocket 关闭了');
            }
        } catch (error) {
            console.log(error)
            message.error("webSocket error, 请检查nginx配置或者其他路由")
        }
        return ()=> {
            try {
                if (socket !== null) {
                    socket.close()
                }
            } catch (error) {
                console.log(error)
                message.error("webSocket close error")
            }
        }
    }, [props.path])

    const [inputValue, setInputValue] = useState('');
    const {cluster} = useParams()

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMasterInstruct(cluster, inputValue)
    };

    function sendMasterInstruct(cluster, value) {
        masterConsoleApi(cluster,value)
            .then(() => {
                setInputValue("")
            })
    }

    function checkLog(log) {
        try {
            if (log.includes("No auth token could be found.")) {
                openNotification({type: 'error', success: false, params: "请检查 token 是否填写或者正确"})
            }
            if (log.includes("Level data override is invalid!")) {
                openNotification({
                    type: 'error',
                    success: false,
                    params: "房间世界配置缺失，请从本地上传一个新的存档恢复"
                })
            }
            // if (log.includes("Sim paused")) {
            //     openNotification({type: 'success', success: true, params: "房间启动成功"})
            // }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="container-children" style={{ height: "100%" }}>
            {contextHolder}
           <Editor value={log}
                   setValue={e=>e}
                   readOnly
                   styleData={{
                       language: "javascript",
                       theme: "vs-dark",
                       height: '500px',
                       minimap: {
                           enabled: false
                       }
                   }}
           />
            <br/>
            <Space.Compact
                style={{
                    width: '100%',
                }}
                size={'middle'}
            >
                <Input value={inputValue} onChange={handleInputChange} />
                <Button type="primary" onClick={(event)=>handleSubmit(event)}>{t('send')}</Button>
            </Space.Compact>
        </div>
    )
}

export default GameLog2