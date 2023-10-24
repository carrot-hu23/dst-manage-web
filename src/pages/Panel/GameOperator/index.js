import React, {useEffect} from "react";

import {Box, Card, Grid} from "@mui/material";
import {Space, Tag, Typography} from "antd";

import GameArchive from "../GameArchive";
import GameStart from "./GameStart";
import RemoteControl from "./RemoteControl";
import OnlinePlayers from "../../Player/OnlinePlayers";

import Op from "../Op";

const { Paragraph, Link } = Typography;

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
                        <Box sx={{p: 3, pb: 1}} dir="ltr">
                            <GameArchive />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                    <GameStart />
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