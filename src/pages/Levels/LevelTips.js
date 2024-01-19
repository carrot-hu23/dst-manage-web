import React from "react";

import {
    Typography, theme as antTheme, Collapse
} from "antd";
import {useTranslation} from "react-i18next";

import {CaretRightOutlined} from "@ant-design/icons";
import {useTheme} from "../../hooks/useTheme";

const { Title, Paragraph, Text, Link } = Typography;

export default ()=>{
    const {theme} = useTheme();
    const { t } = useTranslation()

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
            label: t('Level quantity problem'),
            children:
                <Typography>
                    <Paragraph>
                        <Paragraph>
                            从 <Text keyboard>1.2.6</Text> 版本起，世界层数从<Text keyboard>两层</Text>变成<Text keyboard>动态层数</Text>，
                            你可以任意的添加世界层数，来开<Text keyboard>多层存档</Text>
                        </Paragraph>
                        <Paragraph>
                            {t('There is only one "Forest World" by default. Please click Add Button to add a level.')}
                        </Paragraph>
                        <Paragraph>
                            {t('You can also Backup the game/upload the archive/refresh and click on the corresponding archive to restore the archive. Save format compatible with local games by default')}
                        </Paragraph>
                    </Paragraph>
                </Typography>,
            style: panelStyle,
        },
        {
            key: '2',
            label: t('Cluster level.json explained'),
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        {t('Each archive cluster will generate a level.json file. This file mainly marks which file your archive level is.')}
                    </Paragraph>
                    <Paragraph>
                        {t('However, due to the special collection of this panel, your main level file must be Master (otherwise the panel\'s log collection and statistics will be invalid)')}
                    </Paragraph>
                    <ul>
                        <li>name: {t('The name displayed on the interface')}</li>
                        <li>file: {t('level file')}</li>
                    </ul>
                    <Paragraph>
                        {t('eg')}:
                        {t('For example, my previous archive world is Master Caves Master1 Caves1')}
                    </Paragraph>
                    <pre>{'{"levelList":[{"name":"森林","file":"Master"},{"name":"洞穴","file":"Caves"},{"name":"森林1","file":"Master1"},{"name":"洞穴1","file":"Caves1"}]}'}</pre>

                </Paragraph>
            </Typography>,
            style: panelStyle,
        },
        {
            key: '3',
            label: t('Leveldataovrride view failure problem'),
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        {t('If the configuration is return {}, please paste the configuration manually')}
                    </Paragraph>
                    <Paragraph>
                        {t('If the configuration is not return {}, please remove the newline character \\n in the configuration. There will be a \\ symbol in the interface display. Remove it and merge it into one line.')}
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