import {useTranslation} from "react-i18next";
import {Tabs} from 'antd';
import {Container, Box} from '@mui/material';

import GameOperator from "./GameOperator";

import ServerLog from "./ServerLog";
import ControlPanel from "./ControlPanel";


const Panel = () => {

    const { t } = useTranslation()

    const items = [
        {
            key: '1',
            label: t('Panel'),
            children: <GameOperator/>
        },
        {
            key: '2',
            label: t('Remote'),
            children: <ControlPanel/>,
        },
        {
            key: '4',
            label: t('游戏日志'),
            children: <ServerLog/>,
        },
    ];

    return (
        <>
            <Container maxWidth="xxl">
                <Box sx={{p: 0, pb: 1}} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items}/>
                </Box>
            </Container>
        </>
    )
};

export default Panel