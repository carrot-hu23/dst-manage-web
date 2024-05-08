import React, {useState} from "react";
import {Segmented} from "antd";
import {Box, Card, Container} from "@mui/material";
import Home2 from "../Home2";
import Levels from "../Levels";
import ModSetting from "../ModSetting";

export default () => {

    const [activeTab, setActiveTab] = useState('房间设置');
    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    return (
        <>
            <div style={{
                marginBottom: '16px'
            }}>
                <Container maxWidth="xxl">
                    <Card>
                        <Box sx={{p: 0.5}} dir="ltr">
                            <Segmented
                                block
                                value={activeTab}
                                onChange={handleTabChange}
                                options={['房间设置', '世界设置', '模组设置']}
                            />
                        </Box>
                    </Card>
                </Container>
            </div>


            <div style={{
                display: activeTab !== '房间设置' ? 'none' : 'block',
            }}>
                <Home2/>
            </div>
            <div style={{
                display: activeTab !== '世界设置' ? 'none' : 'block',
            }}>
                <Levels/>
            </div>
            <div style={{
                display: activeTab !== '模组设置' ? 'none' : 'block',
            }}>
                <ModSetting/>
            </div>



        </>
    )
}