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
            label: '世界层数问题',
            children:
                <Typography>
                    <Paragraph>
                        <Paragraph>
                            从 <Text keyboard>1.2.6</Text> 版本起，世界层数从<Text keyboard>两层</Text>变成<Text keyboard>动态层数</Text>，
                            你可以任意的添加世界层数，来开<Text keyboard>多层存档</Text>
                        </Paragraph>
                        <Paragraph>
                            默认只有一个"森林世界"， 请点击 <Text code>添加世界</Text>，来添加世界
                        </Paragraph>
                        <Paragraph>
                            你也可以 游戏备份/上传存档/刷新  点击对应的存档 恢复存档。默认兼容本地游戏的存档格式
                        </Paragraph>
                    </Paragraph>
                </Typography>,
            style: panelStyle,
        },
        {
            key: '2',
            label: '存档level.json解释',
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        每个存档都会生成一个level.json文件，这个文件主要是标记你的存档世界是那个文件
                    </Paragraph>
                    <Paragraph>
                        但是由于此面板的采集特殊性问题，你的主世界的文件必须为 Master (否则面板的日志采集和统计都会失效)
                    </Paragraph>
                    <ul>
                        <li>name: 界面显示的名称</li>
                        <li>file: 世界文件名</li>
                    </ul>
                    <Paragraph>
                        例子:
                        比如我之前的存档 世界 为 Master Caves Master1 Caves1
                    </Paragraph>
                    <pre>{'{"levelList":[{"name":"森林","file":"Master"},{"name":"洞穴","file":"Caves"},{"name":"森林1","file":"Master1"},{"name":"洞穴1","file":"Caves1"}]}'}</pre>

                </Paragraph>
            </Typography>,
            style: panelStyle,
        },
        {
            key: '3',
            label: '可视化失败',
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        如果配置为 return {},请手动粘贴配置
                    </Paragraph>
                    <Paragraph>
                        如果配置不为 return {},请去掉配置里面的换行符，\n，界面展示会有个 \ 符号，如掉合并成一行
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