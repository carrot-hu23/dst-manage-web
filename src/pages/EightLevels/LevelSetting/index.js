import {Divider, Tabs} from "antd";

import Leveldataoverride from "./Leveldataoverride";
import Modoverrides from "./Modoverrides";
import ServerIni from "../../Home/ServerIni";

export default ({levelForm})=>{

    const items = [
        {
            key: '1',
            label: `世界配置`,
            children: <Leveldataoverride levelForm={levelForm} />
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