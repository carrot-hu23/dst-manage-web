import { useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';
import { Tabs } from 'antd';
import ModSelect from './modSelect';
import ModSearch from './modSearch';

const items = [
    {
        key: '1',
        label: `配置模组`,
        children: <ModSelect />,
    },
    {
        key: '2',
        label: `订阅模组`,
        children: <ModSearch />,
    },
];

const Mod = () => {
    const test = () => { }
    return (<Container maxWidth="xl">
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Tabs defaultActiveKey="1" items={items} />
        </Box>
    </Container>)
}

export default Mod