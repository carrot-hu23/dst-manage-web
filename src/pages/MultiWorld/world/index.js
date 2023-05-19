import { useEffect, useState } from 'react';
import _ from 'lodash'

import { Container, Box } from '@mui/material';
import { Tabs } from 'antd';
import ServerIni from "../server_ini";
import Modoverrides from '../modoverrides';
import Leveldataoverride from '../leveldataoverride';

const World = ({worlds, currWorld,setCurrWorld,index, dstWorldSetting})=> {

    const items = [
        {
            key: '1',
            label: `世界选项`,
            children: <Leveldataoverride worlds={worlds} currWorld={currWorld} setCurrWorld={setCurrWorld} index={index} dstWorldSetting={dstWorldSetting} />
        },
        {
            key: '2',
            label: `世界生成`,
            children: <Leveldataoverride worlds={worlds} currWorld={currWorld} setCurrWorld={setCurrWorld} index={index} />
        },
        {
            key: '3',
            label: `其他设置`,
            children: <ServerIni worlds={worlds} currWorld={currWorld} setCurrWorld={setCurrWorld} index={index} />
        },
        {
            key: '4',
            label: `Mod设置`,
            children: <Modoverrides worlds={worlds} currWorld={currWorld} setCurrWorld={setCurrWorld} index={index} />
        },
    ];



    return (<Container maxWidth="xl">
        <Box sx={{ p: 0, pb: 1 }} dir="ltr">
            <Tabs defaultActiveKey="1" items={items} />
        </Box>
    </Container>)
}

export default World