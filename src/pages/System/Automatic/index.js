import React from "react";
import {Space} from "antd";

import Recovery from "./Recovery";


export default () => {
    return (
        <>
            <Space size={[64, 16]} wrap>
                    <Recovery name={"MasterRun"} title={"主 世 界宕机恢复"}/>
                    <Recovery name={"Slave1Run"} title={"从世界1宕机恢复"}/>
                    <Recovery name={"Slave2Run"} title={"从世界2宕机恢复"}/>
                    <Recovery name={"Slave3Run"} title={"从世界3宕机恢复"}/>
                    <Recovery name={"Slave4Run"} title={"从世界4宕机恢复"}/>
                    <Recovery name={"Slave5Run"} title={"从世界5宕机恢复"}/>
                    <Recovery name={"Slave6Run"} title={"从世界6宕机恢复"}/>
                    <Recovery name={"Slave7Run"} title={"从世界7宕机恢复"}/>
            </Space>
        </>
    )
}