/* eslint-disable */

import {Button, Form, Typography, Slider, ColorPicker, ConfigProvider, Space} from "antd";
import {presetPalettes} from '@ant-design/colors';
import {useEffect, useState} from "react";
import {Box, Card, Container} from "@mui/material";
import {useThemeStore} from "../../store/useThemeStore";

const colorOptions = ['#1890ff', '#ff4d4f', '#52c41a', '#faad14']; // 颜色选项

const ColorCircle = ({color, isSelected, onClick}) => (
    <div
        onClick={onClick}
        style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: color,
            border: isSelected ? '2px solid #000' : '2px solid transparent',
            cursor: 'pointer',
            display: 'inline-block',
            margin: '0 5px',
        }}
    />
);

const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map(([label, colors]) => ({
        label,
        colors,
    }));

export default () => {

    const themeConfig = useThemeStore((state) => state.themeConfig)
    const saveThemeConfig = useThemeStore((state) => state.saveThemeConfig)
    const fetchThemeConfig = useThemeStore((state) => state.fetchThemeConfig)

    const [config, setConfig] = useState(themeConfig)

    const [color, setColor] = useState();
    const [borderRadius, setBorderRadius] = useState()

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor);
        setConfig({
            token: {
                colorPrimary: selectedColor,
                colorInfo: selectedColor,
                borderRadius: borderRadius
            }
        })
    }

    const handleBorderRadiusChange = (value) => {
        setBorderRadius(value);
        setConfig({
            token: {
                colorPrimary: color,
                colorInfo: color,
                borderRadius: value
            }
        })
    }

    const presets = genPresets({
        PresetColors: ['#1677FF', '#5A54F9', '#9E339F', '#ED4192', '#E0282E', '#F4801A', '#F2BD27', '#00B96B'],
    })

    useEffect(()=>{
        fetchThemeConfig()
    }, [])
    useEffect(() => {
        setConfig(themeConfig)
        setColor(themeConfig?.token?.colorPrimary)
        setBorderRadius(themeConfig?.token?.borderRadius)
    }, [themeConfig.token.colorPrimary])

    return (<>
        <Container maxWidth="xxl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Typography.Title level={4}>主题定制</Typography.Title>
                    <Form layout="vertical">
                        {/* 主色选择 */}
                        <Form.Item label="主色">
                            <Space size={16} wrap>
                                <ColorPicker
                                    onChange={v => {
                                        handleColorChange(v.toHexString())
                                    }}
                                    defaultValue={themeConfig?.token?.colorPrimary}
                                    presets={presets}/>
                            </Space>
                            <div style={{marginTop: '10px'}}>
                                当前颜色：<span style={{color}}>{color}</span>
                            </div>
                        </Form.Item>

                        {/* 圆角设置 */}
                        <Form.Item label="圆角">
                            <Slider
                                min={1}
                                max={24}
                                onChange={handleBorderRadiusChange}
                                value={borderRadius}
                                // tooltipVisible
                                trackStyle={{backgroundColor: color}}
                                handleStyle={{borderColor: color}}
                            />
                            <div style={{marginTop: '10px'}}>
                                当前圆角：{borderRadius}px
                            </div>
                        </Form.Item>


                        {/* 动态显示按钮 */}
                        <Form.Item>
                            <ConfigProvider
                                theme={{...config, ...{}}}
                            >
                                <Space size={16}>
                                    <Button type="primary">
                                        效果1
                                    </Button>
                                    <Button color="primary" variant="filled">
                                        效果2
                                    </Button>
                                </Space>

                            </ConfigProvider>
                        </Form.Item>
                        <Form.Item>
                            <Button color="primary"
                                    onClick={() => {
                                        saveThemeConfig(config)
                                    }}
                            >保存</Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Card>
        </Container>
    </>)
}