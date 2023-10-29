import React, {useRef, useState} from "react";

import {Button, Input, Select, Space, message, Spin} from 'antd';
import {sendCommandApi} from "../../../../api/8level";

const {TextArea} = Input;

export default ({levels}) => {

    const [command, setCommand] = useState('');
    const [spin, setSpin] = useState(false)

    const onchange = (e) => {
        setCommand(e.target.value);
    };

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0].key)

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
                        defaultValue={notHasLevels?"":levels[0].levelName}
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={levels.map(level=>{
                            return {
                                value: level.key,
                                label: level.levelName,
                            }
                        })}
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