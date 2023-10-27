import React from "react";

import {Box, Card, Grid} from "@mui/material";

import GameArchive from "../GameArchive";

import Op from "../Op";
import OnlinePlayers from "../OnlinePlayers";
import GameLevels from "../GameLevels";


export default () => {

    return (
        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Op />
                </Box>
            </Card>
            <br/>
            <Grid container spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                    <Card>
                        <Box dir="ltr">
                            <GameArchive />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>

                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <GameLevels />
                        </Box>
                    </Card>

                    <br/>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <OnlinePlayers />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}