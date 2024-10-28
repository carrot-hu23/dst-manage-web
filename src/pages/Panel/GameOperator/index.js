import React from "react";

import {Box, Card, Grid} from "@mui/material";

import GameArchive from "../GameArchive";

import Op from "../Op";
import OnlinePlayers from "../OnlinePlayers";
import GameLevels from "../GameLevels";
import ServerLog from "../ServerLog";
import OS from "../OS";
import {useLevelsStore} from "../../../store/useLevelsStore";

export default () => {
    const levels = useLevelsStore((state) => state.levels)
    return (
        <>
            <Card>
                <OS />
            </Card>
            <br/>

            <Grid container spacing={2}>

                <Grid item xs={12} md={5} lg={5}>
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <Op/>
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 3}} dir="ltr">
                            <GameArchive/>
                        </Box>
                    </Card>
                    <br/>
                    <Card>
                        <Box sx={{p: 1}} dir="ltr">
                            <GameLevels/>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={7} lg={7}>

                    <ServerLog />
                    <br/>
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <OnlinePlayers />
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}