import {Tabs} from "antd";

import Leveldataoverride from "./Leveldataoverride";
import Modoverrides from "./Modoverrides";
import ServerIni from "../../Home/ServerIni";

export default ({levelForm, dstWorldSetting})=>{

    const items = [
        // {
        //     key: '1',
        //     label: `世界配置`,
        //     children: <Leveldataoverride levelForm={levelForm}  dstWorldSetting={dstWorldSetting}/>
        // },
        {
            key: '1',
            label: `世界配置`,
            children: <Leveldataoverride levelForm={levelForm}  dstWorldSetting={dstWorldSetting}/>
        },
        {
            key: '2',
            label: `模组配置`,
            children: <Modoverrides levelForm={levelForm} />
        },
        {
            key: '3',
            label: `端口配置`,
            children: <ServerIni form={levelForm} />
        },
        // {
        //     key: '4',
        //     label: `可视化`,
        //     children: <LeveldataoverrideView levelForm={levelForm} dstWorldSetting={dstWorldSetting} />
        // },
    ]

    return(
        <>
            {/*
            <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>leveldataoverride.lua 配置</span></Divider>
            <Leveldataoverride levelForm={levelForm} />
            <br/>
            <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>modoverrides.lua 配置</span></Divider>
            <Modoverrides levelForm={levelForm} />
            <br/>
            <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>serverini.ini 配置</span></Divider>
            <ServerIni form={levelForm} />
            */}

            <Tabs defaultActiveKey="1" items={items} />
        </>
    )
}