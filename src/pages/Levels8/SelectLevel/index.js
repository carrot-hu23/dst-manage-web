import {Select} from "antd";
import React from "react";

export default ({defaultValue="Master",handleChange, mode=""})=>{
    return(
        <>
            <Select
                mode={mode}
                defaultValue={defaultValue}
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
        </>
    )
}

export const levelMap = {
    "Master": "主 世 界",
    "Slave1": "从世界1",
    "Slave2": "从世界2",
    "Slave3": "从世界3",
    "Slave4": "从世界4",
    "Slave5": "从世界5",
    "Slave6": "从世界6",
    "Slave7": "从世界7",
}