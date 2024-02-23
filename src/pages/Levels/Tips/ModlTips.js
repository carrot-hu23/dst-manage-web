import React from "react";

import {
    Typography, theme as antTheme, Collapse
} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {useTheme} from "../../../hooks/useTheme";

const { Title, Paragraph, Text, Link } = Typography;

export default ()=>{
    const {theme} = useTheme();
    const { token } = antTheme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
        marginRight: '8px'
    };

    const getTips = (panelStyle) => [
        {
            key: '3',
            label: '可视化失败问题',
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        如果配置为 return {},请手动粘贴配置
                    </Paragraph>
                    <Paragraph>
                        如果配置不为 return {},请去掉配置里面的换行符 \n，界面展示会有个 \ 符号，去掉合并成一行
                    </Paragraph>
                    
                </Paragraph>
            </Typography>,
            style: panelStyle,
        },
    ]

    return(
        <>
            <Collapse
                bordered={false}
                // defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    background: theme === 'dark'?'#1E1E1E':'#FFFFFF',
                }}
                items={getTips(panelStyle)}
            />
        </>
    )
}