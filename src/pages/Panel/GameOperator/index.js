import React, {useState} from "react";

import {Box, Card, Grid} from "@mui/material";

import GameArchive from "../GameArchive";

import Op from "../Op";
import OnlinePlayers from "../OnlinePlayers";
import GameLevels from "../GameLevels";
import ServerLog from "../ServerLog";


export default ({levels}) => {

    return (
        <>
            <Grid container spacing={3}>

                <Grid item xs={12} md={6} lg={6}>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <GameArchive/>
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 1}} dir="ltr">
                            <GameLevels levels={levels}/>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <Op/>
                        </Box>
                    </Card>
                    <br/>
                    <ServerLog levels={levels}/>
                    <br/>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <OnlinePlayers levels={levels}/>
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}