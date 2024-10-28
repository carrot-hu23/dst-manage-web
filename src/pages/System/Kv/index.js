import {Button, Card, Input, message, Skeleton, Typography} from 'antd';
import React, {useEffect, useState} from "react";
import {useThemeStore} from "../../../store/useThemeStore";
import {getKv, saveKv} from "../../../api/dstConfigApi";

const {TextArea} = Input;
const {Title, Paragraph} = Typography;

export default () => {

    const themeConfig = useThemeStore((state) => state.themeConfig)
    const saveThemeConfig = useThemeStore((state) => state.saveThemeConfig)
    const [config, setConfig] = useState(JSON.stringify(themeConfig));
    const [url, setUrl] = useState();
    const [loading, setLoading] = useState(false);

    const onchangeTheme = (e) => {
        setConfig(e.target.value);
    };
    const onchangeUrl = (e) => {
        setUrl(e.target.value);
    };

    useEffect(() => {
        setLoading(true)
        getKv("backgroundUrl")
            .then(resp => {
                if (resp.code === 200) {
                    setUrl(resp.data)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (<>
        <Card bordered={false}>
            <Typography>
                <Title level={5}>面板主题界面</Title>

                <Paragraph>
                    面板 UI 使用antd ui 组件，前往
                    <a target={'_blank'} rel="noreferrer" href="https://ant-design.antgroup.com/theme-editor-cn">antd
                        主题定制界面</a>，复制到下面输入，点击保存刷新页面
                </Paragraph>
            </Typography>

            <TextArea defaultValue={config} onChange={onchangeTheme} rows={5}/>
            <Button style={{
                marginTop: 8
            }} type={"primary"} onClick={() => {
                saveThemeConfig(config)
            }}>保存主题</Button>
            <br/>
            <br/>
            <Typography>
                <Title level={5}>背景url</Title>
                <Paragraph>
                    <a target={'_blank'} rel="noreferrer"
                       href="https://github.com/MauroMontan/dont-starve-together-assets/tree/main/vignettes">
                        饥荒游戏里面登录背景图
                    </a>，
                    点击保存后刷新页面
                </Paragraph>
            </Typography>
            <Skeleton loading={loading}>
                <TextArea defaultValue={url} onChange={onchangeUrl} rows={3}/>
                <Button style={{
                    marginTop: 8
                }} type={"primary"} onClick={() => {
                    saveKv({
                        key: "backgroundUrl",
                        value: url
                    }).then(resp => {
                        if (resp.code === 200) {
                            message.success("保存背景url成功")
                        } else {
                            message.warning("保存背景url失败")
                        }
                    })
                }}>保存背景</Button>
            </Skeleton>
        </Card>
    </>)
}