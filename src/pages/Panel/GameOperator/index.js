import {useEffect, useState} from "react";

import {Box, Card, Grid} from "@mui/material";
import {Skeleton, Space, Tag, Typography} from "antd";

import Console from "../../Dashboard/console";

import RollbackGroup from "../RollbackGroup";
import GameArchive from "../GameArchive";
import GameStart from "./GameStart";
import RemoteControl from "./RemoteControl";

const { Paragraph, Link } = Typography;

export default ({gameData, logPath}) => {
    useEffect(()=>{},[logPath])
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={24} md={24} lg={24}>
                    <GameStart />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>

                    <Card>
                        <Box sx={{p: 3, pb: 1}} dir="ltr">
                            <GameArchive />
                        </Box>
                    </Card>
                    <br/>

                    <br/>

                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <Console data={gameData}/>
                        </Box>
                    </Card>
                    <br/>
                    {/*
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <RollbackGroup />
                        </Box>
                    </Card>
                    */}
                </Grid>

                {/*
                <Grid item xs={12} md={6} lg={8}>
                    <Card style={{
                        padding: '12px',
                        height: '600px'
                    }}>
                        <GameLog2 path={logPath} id={"Master"} />
                    </Card>
                </Grid>
                */}
                <Grid item xs={12} md={6} lg={8}>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <RemoteControl />
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <Space size={[4, 16]} wrap >
                                <Tag color="magenta">强制存档<Paragraph className='copy' copyable>c_save()</Paragraph></Tag>
                                <Tag color="red">重新加载世界<Paragraph className='copy' copyable>c_reset()</Paragraph></Tag>
                                <Tag color="red">回档天数<Paragraph className='copy' copyable>c_rollback(count)</Paragraph></Tag>
                                <Link href="https://dontstarve.fandom.com/zh/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0/%E9%A5%A5%E8%8D%92%E8%81%94%E6%9C%BA%E7%89%88%E4%B8%AD%E7%9A%84%E5%91%BD%E4%BB%A4?variant=zh" target="_blank">
                                    更多指令参考
                                </Link>
                            </Space>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}