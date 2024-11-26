import React from "react";

import {Container} from '@mui/material';
import {Tabs} from "antd";
import {useTranslation} from "react-i18next";

import DstConfigSetting from "./DstConfigSetting";
import TimedTask from "./TimedTask";
import WebLinkSetting from "./WebLinkSetting";

import AutoGameUpdate from "./AutoGameUpdate";
import AutoGameDown from "./AutoGameDown";
import AutoModUpdate from "./AutoModUpdate";
import Kv from "./Kv";

const System = () => {

    const {t} = useTranslation()

    const items = [
        {
            key: '1',
            label: t('setting.dstConfig'),
            children: <DstConfigSetting/>,
        },
        {
            key: '2',
            label: t('setting.timedTask'),
            children: <TimedTask/>,
        },
        {
            key: '3',
            label: t('setting.autoGameUpdate'),
            children: <AutoGameUpdate/>,
        },
        {
            key: '4',
            label: t('setting.autoGameDown'),
            children: <AutoGameDown/>,
        },
        {
            key: '5',
            label: t('setting.autoModUpdate'),
            children: <AutoModUpdate />,
        },
        {
            key: '6',
            label: t('setting.theme'),
            children: <Kv />,
        },
        {
            key: '7',
            label: t('setting.webLinkSetting'),
            children: <WebLinkSetting />,
        },
    ];
    return (
        <Container maxWidth="xxl">
            <Tabs defaultActiveKey="1" items={items}/>
        </Container>
    )
}

export default System