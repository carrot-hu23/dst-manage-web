import React from "react";
import {Tabs} from "antd";
import {Card, Box, Container} from "@mui/material";

import BackupList from "./BackupList";
import SnapshotBackup from "./SnapshotBackup";


export default ()=>{
    const items = [
        {
            key: '1',
            label: "备份列表",
            children: <BackupList/>,
        },
        {
            key: '2',
            label: "快照备份",
            children: <SnapshotBackup/>,
        },
    ]

    return(
        <Container maxWidth="xxl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items}/>
                </Box>
            </Card>
        </Container>
    )
}