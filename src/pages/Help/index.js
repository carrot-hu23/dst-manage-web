import {Container} from '@mui/material';
import {useEffect, useState} from "react";
import {Image, Space} from "antd";
import aliPayImage from './alipay.jpg';
import wechatpayImage from './wechatpay.png';

const Help = () => {

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
        <Container maxWidth="xl">
            <h1>帮助文档</h1>
            {config.version}
            <br/>
            <div>
                github 地址: {config.github}
            </div>
            <br/>
            <br/>
            <div>
                <h3>请作者喝一杯咖啡：</h3>
                <Space size={32} wrap>
                    <Image style={{borderRadius: '4px'}} preview={false} width={160} src={aliPayImage} />
                    <Image style={{borderRadius: '4px'}} preview={false} width={160} src={wechatpayImage} />
                </Space>
            </div>
        </Container>
    )
}

export default Help