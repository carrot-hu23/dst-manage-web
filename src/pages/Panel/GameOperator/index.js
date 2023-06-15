import {useEffect} from "react";

import {Box, Card, CardHeader, Container, Grid, Typography} from "@mui/material";
import {Button, message, Space} from "antd";

import GameStatistic from "../../Dashboard/Statistics";
import Console from "../../Dashboard/console";
import GameLog2 from "../GameLog";
import RollbackGroup from "../RollbackGroup";


export default ({gameData, logPath}) => {
    useEffect(()=>{},[logPath])
    return (
        <>
            <Card> <GameStatistic data={gameData}/></Card>
            <br/>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <Box sx={{p: 3, pb: 1}} dir="ltr">
                            <Console data={gameData}/>
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 3, pb: 1}} dir="ltr">
                            <RollbackGroup />
                        </Box>
                    </Card>

                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <Card style={{
                        padding: '12px',
                        height: '560px'
                    }}>
                        <GameLog2 path={logPath} id={"Master"} />
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}