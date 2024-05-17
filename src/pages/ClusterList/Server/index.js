/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    Row,
    message,
    Spin,
    Space,
    Skeleton, Popconfirm, InputNumber
} from 'antd';
import {EditOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import {Container} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {createCluster, deleteCluster, getClusterList, updateCluster} from "../../../api/clusterApi";
import {useTranslation} from "react-i18next";
import HomeDetail from "../../DstServerList/home";
import HiddenText from "../../Home2/HiddenText/HiddenText";

const ServerItem = ({server, serverList, updateServerList, reloadServerList}) => {

    const navigate = useNavigate();
    const {t} = useTranslation()

    function to(cluster, name) {
        console.log(`/${cluster}/${name}/dashboard/panel`)
        navigate(`/${cluster}/${name}/dashboard/panel`);
    }

    const [open, setOpen] = useState(false)
    const [spining, setSpinning] = useState(false)
    const [isOpenHomeDetail, setIsOpenHomeDetail] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const [homeInfo, setHomeInfo] = useState({});

    function deleteServer(server) {
        setSpinning(true)
        deleteCluster(server.id)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("删除成功")
                    reloadServerList()
                } else {
                    message.error("删除失败")
                }
                setSpinning(false)
            })
    }

    const UpdateServer = ({server, serverList, updateServerList}) => {
        const [form] = Form.useForm()
        useEffect(() => {
            form.setFieldsValue(server)
        }, [server])

        const stringList = serverList.map(server => server.clusterName)

        const [spining, setSpinning] = useState(false)

        const validateName = (_, value) => {
            // 判断是否重复字符串
            if (value && stringList.includes(value)) {
                return Promise.reject(new Error('名称重复'));
            }

            // 判断是否为子串
            for (let i = 0; i < stringList.length; i++) {
                if (value && stringList[i].includes(value)) {
                    return Promise.reject(new Error('名称为其他字符串的子串'));
                }
            }

            // 判断是否以英文开头且不含有特殊字符
            const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
            if (value && !regex.test(value)) {
                return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
            }

            return Promise.resolve();
        };
        const onFinish = () => {
            setSpinning(true)
            console.log('Success:', form.getFieldValue());
            updateCluster(form.getFieldValue())
                .then(resp => {
                    if (resp.code === 200) {
                        message.success("更新成功")
                        updateServerList(form.getFieldValue())
                    } else {
                        message.error("更新成功")
                    }
                    setOpen(false)
                    setSpinning(false)
                })
        };
        return (
            <>
                <Spin spinning={spining} tip={"正在更新配置"}>

                    <Form
                        labelCol={{
                            span: 6,
                        }}
                        form={form}
                    >
                        <Form.Item label="房间名称"
                                   name="name"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your name!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="ip"
                                   name="ip"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your ip!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="port"
                                   name="port"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your port!',
                                       },
                                   ]}
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="username"
                                   name="username"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="password"
                                   name="password"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!',
                                       },
                                   ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label={"操作"}
                        >
                            <Button type="primary" onClick={() => onFinish()}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </>
        )
    }


    return (
        <>
            <Modal
                getContainer={false}
                open={isOpenHomeDetail}
                footer={null}
                onOk={() => {
                    setIsOpenHomeDetail(false)
                }}
                onCancel={() => {
                    setIsOpenHomeDetail(false)
                }}
            >
                <Skeleton title loading={searchLoading} active>
                    <div style={{height: 500}}>
                        <HomeDetail home={homeInfo}/>
                    </div>
                </Skeleton>
            </Modal>

            <Spin spinning={spining}>
                <Card
                    bordered={false}
                    title={`${server.name}`}
                    hoverable
                    actions={[
                        <Popconfirm
                            title="是否删除房间"
                            description="请自行做好备份"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteServer(server)
                            }}
                        >
                           <Button icon={<DeleteOutlined key="delete"/>} type={'link'} danger size={'small'}>删除</Button>
                        </Popconfirm>,
                        <Button icon={<EditOutlined key="edit"/>} type={'link'} size={'small'} onClick={() => {
                            setOpen(true)
                        }}>配置</Button>,

                    ]}
                    extra={[
                        <Space size={8} wrap>
                            <div>
                                <Button type={'primary'} size={'small'} onClick={() => to(server.uuid, server.name)}>进入</Button>
                            </div>
                        </Space>
                    ]}
                >
                    <Form className={'dst'}>
                        <Form.Item label={t('ip')}>
                            <HiddenText text={server.ip + ":" + server.port}/>
                        </Form.Item>
                    </Form>

                </Card>
            </Spin>

            <Modal width={860} title="更新集群配置" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}
                   footer={null}>
                <UpdateServer server={server} serverList={serverList} updateServerList={updateServerList}/>
            </Modal>
        </>
    )
}

export default () => {

    const [serverList, setServerList] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAddBtn, setShowAddBtn] = useState(true)

    useEffect(() => {

        const userJson = localStorage.getItem('user');
        let user = JSON.parse(userJson);
        if(user === null) {
            user = {
                displayName: '',
                email: '',
                photoURL: ''
            }
        }
        if (user.role !== 'admin') {
            setShowAddBtn(false)
        }
        setLoading(true)
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    // message.success("获取房间成功")
                    setServerList(resp.data)
                } else {
                    message.error("获取房间失败")
                }
                setLoading(false)
            })
    }, [])

    const updateServerList = (server) => {
        const oldServerList = serverList
        const newServerList = []
        for (let i = 0; i < oldServerList.length; i++) {
            if (oldServerList[i].ID === server.ID) {
                newServerList.push(server)
            } else {
                newServerList.push(oldServerList[i])
            }
        }
        setServerList(newServerList)
    }


    const reload = () => {
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    // message.success("获取房间成功")
                    setServerList(resp.data)
                } else {
                    message.error("获取房间失败")
                }

            })
    }

    const AddServer = ({serverList, reload}) => {

        const stringList = serverList.map(server => server.clusterName)

        const [spining, setSpinning] = useState(false)

        const validateName = (_, value) => {
            // 判断是否重复字符串
            if (value && stringList.includes(value)) {
                return Promise.reject(new Error('名称重复'));
            }

            // 判断是否为子串
            for (let i = 0; i < stringList.length; i++) {
                if (value && stringList[i].includes(value)) {
                    return Promise.reject(new Error('名称为其他字符串的子串'));
                }
            }

            // 判断是否以英文开头且不含有特殊字符
            const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
            if (value && !regex.test(value)) {
                return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
            }

            return Promise.resolve();
        };
        const onFinish = (values) => {
            setSpinning(true)
            console.log('Success:', values);
            createCluster(values)
                .then(resp => {
                    if (resp.code === 200) {
                        message.success("创建房间成功")
                        reload()
                    } else {
                        message.error("创建房间成功")
                    }
                    setOpen(false)
                    setSpinning(false)
                })
        };
        return (
            <>
                <Spin spinning={spining} tip={"正在添加房间"}>

                    <Form
                        // layout="vertical"
                        // labelAlign={'left'}
                        labelCol={{
                            span: 6,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item label="房间名称"
                                   name="name"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your name!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="ip"
                                   name="ip"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your ip!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="port"
                                   name="port"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your port!',
                                       },
                                   ]}
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="username"
                                   name="username"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="password"
                                   name="password"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={"操作"}
                        >
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </>
        )
    }

    return (
        <>
            <Container maxWidth="xxl">
                <Skeleton loading={loading} active>
                    {showAddBtn && <div style={{marginBottom: '16px'}}>
                        <Button onClick={() => setOpen(true)} icon={<PlusOutlined/>}  type={'primary'}>添加房间</Button>
                    </div>}
                    <Row gutter={[16, 16]}>
                        {serverList.map((server, index) => (
                            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
                                <ServerItem key={index} server={server} serverList={serverList}
                                            reloadServerList={reload} updateServerList={updateServerList}/>
                            </Col>
                        ))}
                    </Row>

                    <Modal style={{
                        top: '8vh'
                    }} width={800} title="添加房间" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}
                           footer={null}>
                        <AddServer serverList={serverList} reload={reload}/>
                    </Modal>
                </Skeleton>

            </Container>
        </>
    )
}