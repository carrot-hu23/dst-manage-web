import { useEffect, useState } from 'react';
import _ from 'lodash'

import { Container, Box } from '@mui/material';
import { Tabs } from 'antd';
import Forest from './forest';
import Caves from './caves';

const ClusterView = () => {

    const [dstWorldSetting, setDstWorldSetting] = useState({})
    useEffect(() => {
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 在此处处理配置文件数据
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            });
    }, [])

    const items = [
        {
            key: '1',
            label: `森林`,
            children: <Forest />,
        },
        {
            key: '2',
            label: `洞穴`,
            children: <Caves />,
        },
    ];



    return (<Container maxWidth="xl">
        <Box sx={{ p: 0, pb: 1 }} dir="ltr">
            <Tabs defaultActiveKey="1" items={items} />
        </Box>
    </Container>)
}

export default ClusterView