import React from "react";

import {Space} from "antd";

import AutoCheck from "./AutoCheck";

export default ()=>{
    return(
        <>
        <Space size={[32,32]} wrap>
            <AutoCheck name={"MasterMod"} title={"自动更新主 世 界模组"} />
            <AutoCheck name={"Slave1Mod"} title={"自动更新从世界1模组"} />
            <AutoCheck name={"Slave2Mod"} title={"自动更新从世界2模组"} />
            <AutoCheck name={"Slave3Mod"} title={"自动更新从世界3模组"} />
            <AutoCheck name={"Slave4Mod"} title={"自动更新从世界4模组"} />
            <AutoCheck name={"Slave5Mod"} title={"自动更新从世界5模组"} />
            <AutoCheck name={"Slave6Mod"} title={"自动更新从世界6模组"} />
            <AutoCheck name={"Slave7Mod"} title={"自动更新从世界7模组"} />
        </Space>
        </>
    )
}