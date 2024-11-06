import React from "react";

import {Box, Card, Grid} from "@mui/material";

import GameArchive from "../GameArchive";

import OnlinePlayers from "../OnlinePlayers";
import GameLevels from "../GameLevels";
import ServerLog from "../ServerLog";
import Op from "../Op";


export default ({levels}) => {
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
                                <GameLevels levels={levels}/>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7} lg={7}>
                        <ServerLog levels={levels}/>
                        <br/>
                        <Card>
                            <Box sx={{p: 3}} dir="ltr">

                                <OnlinePlayers levels={levels}/>
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
                                <GameLevels levels={levels}/>
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
                                <OnlinePlayers levels={levels}/>
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
                        <ServerLog levels={levels}/>
                    </Grid>
                </Grid>
            )}
        </>
    )
}