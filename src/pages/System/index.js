import React from "react";

import {Container} from '@mui/material';
import {Tabs} from "antd";


import DstConfigSetting from "./DstConfigSetting";
import TimedTask from "./TimedTask";
import Automatic from "./Automatic";
import InstallSteamCmd from "./InstallSteamCmd";
import WebLinkSetting from "./WebLinkSetting";
import AutoCheck from "./Automatic/AutoCheck";
import AutoMod from "./AutoMod";

const System = () => {
    const items = [
        {
            key: '1',
            label: "系统设置",
            children: <DstConfigSetting/>,
        },
        {
            key: '2',
            label: "定时任务",
            children: <TimedTask/>,
        },
        {
            key: '3',
            label: "宕机恢复",
            children: <Automatic/>,
        },
        {
            key: '4',
            label: "更新游戏",
            children: <AutoCheck name={"updateGameVersion"} title={"自动更新游戏"} />,
        },
        {
            key: '5',
            label: "更新模组",
            children: <AutoMod />,
        },
        {
            key: '6',
            label: "环境依赖",
            children: <InstallSteamCmd/>,
        },
        {
            key: '7',
            label: "外部链接",
            children: <WebLinkSetting />,
        },
    ];
    return (
        <Container maxWidth="xl">
            <Tabs defaultActiveKey="1" items={items}/>
        </Container>
    )
}

export default System