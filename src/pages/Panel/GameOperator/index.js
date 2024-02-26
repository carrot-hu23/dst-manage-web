import React from "react";

import {Box, Card, CardHeader, Grid} from "@mui/material";

import GameArchive from "../GameArchive";

import Op from "../Op";
import OnlinePlayers from "../OnlinePlayers";
import GameLevels from "../GameLevels";
import QuckButton from "../QuckButton";
import CardTitle from "../CardTitle";


export default ({levels}) => {

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12} md={5} lg={5}>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <CardTitle title={'房间信息'} />
                            <GameArchive/>
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <CardTitle title={'世界列表'} />
                            <GameLevels levels={levels}/>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={7} lg={7}>

                    {/*
                    <ServerLog levels={levels}/>
                    <br/>
                    */}
                    <Card>
                        <Box  sx={{p: 2 }} dir="ltr">
                            <CardTitle title={'操作按钮'} />
                            <QuckButton />
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <CardTitle title={'在线玩家'} />
                            <OnlinePlayers levels={levels}/>
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}