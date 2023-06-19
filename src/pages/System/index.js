import {Container, Box, Card} from '@mui/material';
import {Tabs} from "antd";

import DstConfigSetting from "./DstConfigSettting";
import InstallSteamCmd from "./InstallSteamCmd";

const System = () => {
    const items = [
        {
            key: '1',
            label: "系统设置",
            children: <DstConfigSetting/>,
        },
        {
            key: '2',
            label: "环境依赖",
            children: <InstallSteamCmd/>,
        },
    ];
    return (
        <Container maxWidth="xl">
            <Tabs defaultActiveKey="1" items={items}/>
        </Container>
    )
}

export default System