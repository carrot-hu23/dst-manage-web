import React, {useState} from "react";

import {Button, Input, Select, Space} from 'antd';

const { TextArea } = Input;

export default () => {

    const [levelName, setLevelName] = useState("Master")

    function sendInstruct() {
        // levelName, instruct

        // console.log(form.getFieldValue());
        // const msg = form.getFieldValue().master
        // masterConsoleApi(cluster,msg)
        //     .then(() => {
        //         message.success(`发送地面${msg}指令成功`)
        //     }).catch(() => { message.error(`发送地面${msg}指令失败`) })
    }

    const handleChange = (value) => {
        setLevelName(value)
    }

    return (
        <>
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
                <span>世界控制台</span>
            </Space>
            <br/><br/>
            <TextArea rows={3} />
            <br/><br/>
            <Button type="primary" onClick={() => sendInstruct()}>
                发送指令
            </Button>
        </>
    );
}