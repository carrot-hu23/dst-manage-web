import React from "react";

import {Container} from "@mui/material";
import {Tabs} from "antd";

import Assembly from "./Assembly";
import Preinstall from "./Preinstall";
import ShareConfig from "./ShareConfig";

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
        // {
        //     label: '配置分享',
        //     children: <ShareConfig />,
        //     key: '3',
        // },
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