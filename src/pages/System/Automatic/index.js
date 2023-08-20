import React from "react";
import {Space} from "antd";

import Recovery from "./Recovery";


export default () => {
    return (
        <>
            <Space size={[64, 16]} wrap>
                    <Recovery name={"masterRunning"} title={"主 世 界宕机恢复"}/>
                    <Recovery name={"slave1Running"} title={"从世界1宕机恢复"}/>
                    <Recovery name={"slave2Running"} title={"从世界2宕机恢复"}/>
                    <Recovery name={"slave3Running"} title={"从世界3宕机恢复"}/>
                    <Recovery name={"slave4Running"} title={"从世界4宕机恢复"}/>
                    <Recovery name={"slave5Running"} title={"从世界5宕机恢复"}/>
                    <Recovery name={"slave6Running"} title={"从世界6宕机恢复"}/>
                    <Recovery name={"slave7Running"} title={"从世界7宕机恢复"}/>
            </Space>
        </>
    )
}