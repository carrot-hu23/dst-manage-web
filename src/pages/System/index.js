import {Container, Box, Card} from '@mui/material';
import {Tabs} from "antd";

import DstConfigSetting from "./DstConfigSettting";
import InstallSteamCmd from "./InstallSteamCmd";
import JobTask from "./JobTaskList";
import OtherSettiing from "./OtherSettiing";
import WebLinkSetting from "./WebLinkSetting";

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
            children: <JobTask/>,
        },
        {
            key: '3',
            label: "自动维护",
            children: <OtherSettiing/>,
        },
        {
            key: '4',
            label: "环境依赖",
            children: <InstallSteamCmd/>,
        },
        {
            key: '5',
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