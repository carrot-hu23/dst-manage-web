import React, { useState, useEffect } from 'react';
import { Button, message, Steps, Form, Skeleton } from 'antd';
import { Container, Card, Box } from '@mui/material';
import Cluster from './Cluster';
import Master from './Master';
import Caves from './Caves';
import Mod from './Mod';

import { getHomeConfigApi } from '../../api/gameApi';

const Home = () => {

    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeConfig = () => getHomeConfigApi()
            .then(data => {
                console.log(data.data)
                if (data.data === null || data === undefined) {
                    message.error('获取房间配置失败')
                }
                form.setFieldsValue(data.data)
                setLoading(false)
            })
        fetchHomeConfig()
    }, [form])

    const steps = [
        {
            title: '房间设置',
            content: (<Cluster form={form} />),
        },
        {
            title: '地面世界设置',
            content: (<Master form={form} />),
        },
        {
            title: '洞穴世界设置',
            content: (<Caves form={form} />),
        },
        {
            title: 'MOD 设置',
            content: (<Mod form={form} />),
        },
    ];


    const next = () => {
        if (loading) {
            return
        }
        console.log(form.getFieldValue())
        form.validateFields().then(() => {
            // 验证通过后进入
            // const { name, age } = value;
            // console.log(name, age); // dee 18
            setCurrent(current + 1);
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));



    return (
        <>
            <Container maxWidth="xl">
                <Card>
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                        <Steps current={current} items={items} size="small" />
                        <br /><br />
                        <Skeleton loading={loading} active avatar>
                            <div className="steps-content">{steps[current].content}</div>
                        </Skeleton>

                        <br />
                        <div className="steps-action">
                            {current > 0 && (
                                <Button
                                    style={{
                                        margin: '0 8px',
                                        background: '#13CE66',
                                        color: '#fff'
                                    }}
                                    onClick={() => prev()}
                                >
                                    上一步
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => {
                                    message.success('房间设置完成!')
                                    setCurrent(0)
                                }}>
                                    保存设置
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button
                                    style={{
                                        margin: '0 8px',
                                        background: '#F56C6C',
                                        color: '#fff'
                                    }}
                                    onClick={() => {
                                        message.success('正在生成新的游戏!')
                                        setCurrent(0)
                                    }}>
                                    新的游戏
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    下一步
                                </Button>
                            )}
                        </div>
                    </Box>
                </Card>
            </Container>
        </>
    );
};
export default Home;