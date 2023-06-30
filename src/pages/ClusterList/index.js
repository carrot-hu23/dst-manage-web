import {Container,Box} from "@mui/material";
import {Tabs} from "antd";

import Clusters from "./Clusters";
import SystemSetting from "./SystemSetting";

export default ()=>{
    const items = [
        {
            key: '1',
            label: "集群列表",
            children: <Clusters/>,
        },
        {
            key: '2',
            label: "系统设置",
            children: <SystemSetting />,
        },
    ];
    return (
        <Container maxWidth="xl">
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <Tabs defaultActiveKey="1" items={items}/>
            </Box>
        </Container>
    )
}