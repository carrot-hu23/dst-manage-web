import React, {useRef, useState} from "react";

import {Button, Input, Select, Space, message, Spin} from 'antd';
import {sendCommandApi} from "../../../../api/8level";

const {TextArea} = Input;

export default () => {

    const [levelName, setLevelName] = useState("Master")
    const [command, setCommand] = useState('');
    const [spin, setSpin] = useState(false)

    const onchange = (e) => {
        setCommand(e.target.value);
    };

    function sendInstruct() {
        if (command === "") {
            message.warning("请填写指令在发送")
            return
        }
        console.log(levelName, command)
        setSpin(true)
        sendCommandApi("", levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setSpin(false)
            })
    }

    const handleChange = (value) => {
        setLevelName(value)
    }

    return (
        <>
            <Spin spinning={spin} tip={"正在发送指令"}>
                <Space size={8}>
                    <Select
                        defaultValue="Master"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'Master',
                                label: '主 世 界',
                            },
                            {
                                value: 'Slave1',
                                label: '从世界1',
                            },
                            {
                                value: 'Slave2',
                                label: '从世界2',
                            },
                            {
                                value: 'Slave3',
                                label: '从世界3',
                            },
                            {
                                value: 'Slave4',
                                label: '从世界4',
                            },
                            {
                                value: 'Slave5',
                                label: '从世界5',
                            },
                            {
                                value: 'Slave6',
                                label: '从世界6',
                            },
                            {
                                value: 'Slave7',
                                label: '从世界7',
                            },
                        ]}
                    />
                    <span>控制台</span>
                </Space>
                <br/><br/>
                <TextArea onChange={onchange} rows={3}/>
                <br/><br/>
                <Button type="primary" onClick={() => sendInstruct()}>
                    发送指令
                </Button>
            </Spin>
        </>
    );
}