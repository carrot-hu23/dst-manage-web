import React from "react";

import {Box, Card, Container} from "@mui/material";
import {Skeleton, Tabs} from "antd";

import Assembly from "../Assembly";
import Preinstall from "../Preinstall";

export default ()=>{

    const items = [
        {
            label: '多层选择器',
            children: <div>
                <Assembly />
            </div>,
            key: '1',
        },
        {
            label: '预设模板',
            children: <Preinstall />,
            key: '2',
            forceRender: true,
        },
    ]

    return(
        <>
            <Container maxWidth="xxl">
                <Tabs
                    items={items}
                />
            </Container>
        </>
    )
}