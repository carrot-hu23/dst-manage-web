import React, {useEffect, useState} from "react";
import {Skeleton, Tabs} from "antd";
import {useParams} from "react-router-dom";
import {Box, Card} from "@mui/material";

import {autoCheck2Api} from "../../../api/autoCheckApi";
import Recovery from "../AutoGameDown/Recovery";


export default ()=>{

    const {cluster} = useParams()
    const [autoChecks, setAutoChecks] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        autoCheck2Api(cluster, "UPDATE_GAME")
            .then(resp => {
                if (resp.code === 200) {
                    setAutoChecks(resp.data)
                }
                setLoading(false)
            })
    }, [])

    return(
        <>
            <Skeleton loading={loading} active>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Tabs
                            defaultActiveKey="1"

                            size={autoChecks.length}
                            items={autoChecks.map((autoCheck, index) => {
                                return {
                                    label: "游戏更新",
                                    key: index,
                                    children: <Recovery isGameUpdate isMod key={index} autoCheck={autoCheck}/>,
                                }
                            })}
                        />
                    </Box>
                </Card>
            </Skeleton>
        </>
    )
}