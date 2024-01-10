import React, {useEffect, useState} from "react";
import {Skeleton, Tabs} from "antd";
import {Box, Card} from "@mui/material";

import {useParams} from "react-router-dom";
import Recovery from "./Recovery";
import {autoCheck2Api} from "../../../api/autoCheckApi";


export default () => {

    const {cluster} = useParams()
    const [autoChecks, setAutoChecks] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        autoCheck2Api(cluster, "LEVEL_DOWN")
            .then(resp => {
                if (resp.code === 200) {
                    setAutoChecks(resp.data)
                }
                setLoading(false)
            })
    }, [])
    return (
        <>
            <Skeleton loading={loading} active>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Tabs
                            defaultActiveKey="1"

                            size={autoChecks.length}
                            items={autoChecks.map((autoCheck, index) => {
                                return {
                                    label: autoCheck.levelName,
                                    key: index,
                                    children: <Recovery key={index} autoCheck={autoCheck}/>,
                                }
                            })}
                        />
                    </Box>
                </Card>
            </Skeleton>
        </>
    )
}