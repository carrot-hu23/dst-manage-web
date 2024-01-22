import React from "react";
import {Container, Box} from '@mui/material';
import {Tabs} from "antd";

import Dashboard from "./Dashboard";
import RemoteControl from "./RemoteControl";


const Panel = () => {

    const items = [
        {
            key: '1',
            label: "Dashboard",
            children: <Dashboard />
        },
        {
            key: '2',
            label: "远程指令",
            children: <RemoteControl />
        },
    ]

    return (
        <>
            <Container maxWidth="xxl">
                <Box sx={{p: 0}} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items}/>
                </Box>
            </Container>
        </>
    )
};

export default Panel