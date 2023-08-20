import React from "react";

import {Space} from "antd";

import AutoCheck from "../Automatic/AutoCheck";

export default ()=>{
    return(
        <>
        <Space size={[32,32]} wrap>
            <AutoCheck name={"updateMasterMod"} title={"自动更新主 世 界模组"} />
            <AutoCheck name={"updateSlave1Mod"} title={"自动更新从世界1模组"} />
            <AutoCheck name={"updateSlave2Mod"} title={"自动更新从世界2模组"} />
            <AutoCheck name={"updateSlave3Mod"} title={"自动更新从世界3模组"} />
            <AutoCheck name={"updateSlave4Mod"} title={"自动更新从世界4模组"} />
            <AutoCheck name={"updateSlave5Mod"} title={"自动更新从世界5模组"} />
            <AutoCheck name={"updateSlave6Mod"} title={"自动更新从世界6模组"} />
            <AutoCheck name={"updateSlave7Mod"} title={"自动更新从世界7模组"} />
        </Space>
        </>
    )
}