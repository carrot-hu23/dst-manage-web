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
            key: '1',
            label: '获取令牌',
            children:
                <Typography>
                    <Paragraph>
                        <Title level={5}>方式1: </Title>
                        访问
                        <Link
                            href=" https://accounts.klei.com/account/game/servers?game=DontStarveTogether">klei网站</Link>
                        登录 。然后选择导航 "游戏", <Text code>点击 《饥荒：联机版》的游戏服务器 </Text>，获取令牌
                        <Title level={5}>方式2: </Title>
                        <Paragraph>
                            在自己的电脑上启动 饥荒联机版
                        </Paragraph>
                        <Paragraph>
                            主界面按 ~键，调出控制台，然后输入以下指令，并敲下Enter键，以生成令牌
                            <Text code>TheNet:GenerateClusterToken()</Text>
                            ~键，波浪号键一般位于键盘左上角，在ESC键的下方，tab键的上方，数字键1的左边
                        </Paragraph>
                        <Paragraph>
                            令牌保存在“cluster_token.txt”的文本文件中，可以在个人文档下找到，例如：
                            %userprofile%\Documents\Klei\DoNotStarveTogether\
                            我的路径是下面这个，其中 132274880 可能是用户id什么的，每个人可能不相同：
                            C:\Users\xxx\Documents\Klei\DoNotStarveTogether\132274880\cluster_token.txt
                        </Paragraph>
                    </Paragraph>
                </Typography>,
            style: panelStyle,
        },
        {
            key: '2',
            label: '服务器串联',
            children: <p>暂无</p>,
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