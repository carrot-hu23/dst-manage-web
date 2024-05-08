import React from "react";
import {Tabs} from "antd";
import {Card, Box, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import BackupList from "./BackupList";
import SnapshotBackup from "./SnapshotBackup";


export default ()=>{
    const { t } = useTranslation()

    const items = [
        {
            key: '1',
            label: t("Backup List"),
            children: <BackupList/>,
        },
        {
            key: '2',
            label: t("Snapshot Backup"),
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