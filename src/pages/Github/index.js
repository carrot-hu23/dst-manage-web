import {Card, Box, Container} from '@mui/material';
import {useEffect, useState} from "react";
import {Image, Space} from "antd";
import aliPayImage from './alipay.jpg';
import wechatpayImage from './wechatpay.png';
import qqgroup from './qqgroup.png'

export default () => {

    const [config, setConfig] = useState({
        version: "0"
    })
    useEffect(() => {
        fetch('misc/config.json')
            .then(response => response.json())
            .then(data => {
                setConfig(data)
            })
            .catch(error => {
                console.error('无法加载config配置文件', error);
            });
    }, [])

    return (
        <Container maxWidth="xxl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <h1>帮助文档</h1>
                    <strong>禁止商用，商用请联系本人授权！！！</strong>
                    <br/>
                    {config.version}
                    <br/>
                    <div>
                        开源协议:
                        <a
                            target={'_blank'}
                            href={'https://github.com/hujinbo23/dst-admin-go/blob/main/LICENSE'}
                            rel="noreferrer"
                        >
                            GPL-3.0 license
                        </a>
                    </div>
                    <div>
                        github 地址:
                        <a
                            target={'_blank'}
                            href={config.github}
                            rel="noreferrer"
                        >
                            {config.github}
                        </a>
                    </div>
                    <br/>

                    <div>
                        <h3>请作者喝一杯咖啡：</h3>
                        <Space size={32} wrap>
                            <Image style={{borderRadius: '4px'}} width={160} src={aliPayImage}/>
                            <Image style={{borderRadius: '4px'}} width={160} src={wechatpayImage}/>
                        </Space>
                    </div>

                    <div>
                        <h3>QQ群反馈</h3>
                        <Image style={{borderRadius: '4px'}} width={160} src={qqgroup}/>
                    </div>
                </Box>
            </Card>
        </Container>
    )
}
