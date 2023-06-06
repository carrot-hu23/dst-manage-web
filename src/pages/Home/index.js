import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { Button, message, Steps, Form, Skeleton } from 'antd';
import { Container, Card, Box } from '@mui/material';
import Cluster from './Cluster';
import Master from './Master';
import Caves from './Caves';
import Mod from './Mod';

import {
    getGameConfigApi,
    saveGameConfigApi
} from '../../api/gameApi';

const Home = () => {

    const [cluster] = Form.useForm();
    const [master] = Form.useForm();
    const [caves] = Form.useForm();
    const [mod] = Form.useForm()

    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const  params = useParams()

    useEffect(() => {
        const fetchHomeConfig = () => getGameConfigApi(params.cluster)
            .then(data => {
                console.log(data.data)
                if (data.data === null || data === undefined) {
                    message.error('获取房间配置失败')
                }
                cluster.setFieldsValue({...data.data.cluster,...{cluster_token:data.data.cluster_token}})
                master.setFieldsValue({...{leveldataoverride: data.data.master.leveldataoverride}, ...data.data.master.server_ini})
                caves.setFieldsValue({...{leveldataoverride: data.data.caves.leveldataoverride}, ...data.data.caves.server_ini})
                mod.setFieldsValue({modoverrides: data.data.master.modoverrides})
                setLoading(false)
            })
        fetchHomeConfig()
    }, [caves, cluster, master, mod])

    const steps = [
        {
            title: '房间设置',
            content: (<Cluster form={cluster} />),
        },
        {
            title: '地面世界设置',
            content: (<Master master={master} />),
        },
        {
            title: '洞穴世界设置',
            content: (<Caves caves={caves} />),
        },
        {
            title: 'MOD 设置',
            content: (<Mod mod={mod} />),
        },
    ];

    function saveConfig() {

        const body = {
            cluster: cluster.getFieldValue(),
            cluster_token: cluster.getFieldValue().cluster_token,
            master: {
                leveldataoverride: master.getFieldValue().leveldataoverride,
                modoverrides: mod.getFieldValue().modoverrides,
                server_ini: master.getFieldValue()
            },
            caves: {
                leveldataoverride: caves.getFieldValue().leveldataoverride,
                modoverrides: mod.getFieldValue().modoverrides,
                server_ini: caves.getFieldValue()
            }
        }
        console.log(body);
        saveGameConfigApi(params.cluster,body).then(data=>{
            message.success("保存成功")
            setCurrent(0)
        }).catch(error=>{
            console.log(error);
            message.error("保存失败")
        })
        
    }

    const next = () => {
        if (loading) {
            return
        }
        // console.log(cluster.getFieldValue())
        cluster.validateFields().then(() => {
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
                                    saveConfig(0)
                                }}>
                                    保存设置
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