import React from "react";
import {Box, Card, Grid} from "@mui/material";
import {useLevelsStore} from "@/store/useLevelsStore";

import GameArchive from "../GameArchive";

import OnlinePlayers from "../OnlinePlayers";
import GameLevels from "../GameLevels";
import ServerLog from "../ServerLog";
import Op from "../Op";



export default () => {
    const levels = useLevelsStore((state) => state.levels)
    const levelSize = levels.length

    return (
        <>
            {levelSize >= 5 && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} lg={5}>
                        <Card>
                            <Box sx={{p: 2}} dir="ltr">
                                <Op />
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
                            <Box sx={{p: 3}} dir="ltr">
                                <GameLevels />
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7} lg={7}>
                        <ServerLog />
                        <br/>
                        <Card>
                            <Box sx={{p: 3}} dir="ltr">
                                <OnlinePlayers />
                            </Box>
                        </Card>
                    </Grid>

                </Grid>
            )}
            {levelSize < 5 && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} lg={5}>
                        <Card>
                            <Box sx={{p: 3}} dir="ltr">
                                <GameLevels />
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
                            <Box sx={{p: 3}} dir="ltr">
                                <OnlinePlayers />
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7} lg={7}>
                        <Card>
                            <Box sx={{p: 2}} dir="ltr">
                                <Op />
                            </Box>
                        </Card>
                        <br/>
                        <ServerLog />
                    </Grid>
                </Grid>
            )}
        </>
    )
}