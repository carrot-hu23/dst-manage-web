import React from "react";

import {Container} from '@mui/material';
import {Tabs} from "antd";


import DstConfigSetting from "./DstConfigSetting";
import TimedTask from "./TimedTask";
import InstallSteamCmd from "./InstallSteamCmd";
import WebLinkSetting from "./WebLinkSetting";

import AutoGameUpdate from "./AutoGameUpdate";
import AutoGameDown from "./AutoGameDown";
import AutoModUpdate from "./AutoModUpdate";

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
        // {
        //     key: '3',
        //     label: "游戏更新",
        //     children: <AutoGameUpdate/>,
        // },
        // {
        //     key: '4',
        //     label: "宕机恢复",
        //     children: <AutoGameDown/>,
        // },
        // {
        //     key: '5',
        //     label: "更新模组",
        //     children: <AutoModUpdate />,
        // },
        // {
        //     key: '6',
        //     label: "环境依赖",
        //     children: <InstallSteamCmd/>,
        // },
        // {
        //     key: '7',
        //     label: "外部链接",
        //     children: <WebLinkSetting />,
        // },
    ];
    return (
        <Container maxWidth="xxl">
            <Tabs defaultActiveKey="1" items={items}/>
        </Container>
    )
}

export default System