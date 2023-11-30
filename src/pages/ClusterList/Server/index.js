/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Tag,
    message,
    Spin,
    Space,
    Tooltip, Skeleton, Popconfirm
} from 'antd';
import {EditOutlined, PlusOutlined, QuestionCircleOutlined, SettingOutlined, DeleteOutlined} from '@ant-design/icons';
import {Container} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {createCluster, deleteCluster, getClusterList, updateCluster} from "../../../api/clusterApi";
import style from "../../DstServerList/index.module.css";
import HiddenText from "../../../components2/HiddenText/HiddenText";
import {useTranslation} from "react-i18next";
import {dstHomeDetailApi} from "../../../api/dstApi";
import HomeDetail from "../../DstServerList/home";

const ServerItem = ({server, serverList, updateServerList, removeServerList}) => {

    const navigate = useNavigate();
    const {t} = useTranslation()

    const archive = server.gameArchive

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
        deleteCluster(server.clusterName)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("删除成功")
                    removeServerList(server)
                } else {
                    message.error("删除失败")
                }
                setSpinning(false)
            })
    }

    const viewHomeDetail = (server) => {
        console.log(server.rowId)
        console.log(server.region)
        setSearchLoading(true)
        setIsOpenHomeDetail(true);

        dstHomeDetailApi({
            rowId: server.rowId,
            region: server.region
        }).then(response => {
            const responseData = JSON.parse(response)
            const {success} = responseData
            if (success) {
                setHomeInfo(responseData)
            } else {
                message.warning("请求Klei服务器超时")
            }
            setSearchLoading(false)
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

                    <Alert message="以下路径请使用绝对路径，不支持相对路径，同时不要使用特殊字符" type="warning" showIcon
                           closable/>
                    <br/>
                    <Form
                        form={form}
                        layout="vertical"
                        labelAlign={'left'}
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
                        <Alert
                            message="如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串。比如 aa aaa aa1 这种"
                            type="warning" showIcon closable/>
                        {/*
                        <Form.Item label="存档名称"
                                   tooltip={"如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串"}
                                   name="clusterName"
                                   rules={[
                                       {
                                           required: true,
                                           validator: validateName
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        */}
                        <Form.Item label="steamcmd 路径"
                                   name="steamcmd"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your steamcmd path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="饥荒路径"
                                   name="force_install_dir"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your force_install_dir path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            tooltip={"暂时未实现"}
                            label="persistent_storage_root(暂时未实现)"
                            name="persistent_storage_root"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your persistent_storage_root path!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            tooltip={"暂时未实现"}
                            label="conf_dir(暂时未实现)"
                            name="conf_dir"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your conf_dir path!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="ugc_directory"
                                   name="ugc_directory"
                                   rules={[
                                       {
                                           required: false,
                                           message: 'Please input your ugc_directory path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="备份路径"
                                   name="backup"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your backup path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="启动方式"
                            name="bin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server bin',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={32}>32</Radio>
                                <Radio value={64}>64</Radio>
                                <Radio value={100}>lua-jit</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
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
                    title={(<>
                        <Button type={"link"} onClick={() => to(server.clusterName, server.name)}>{server.name}</Button>
                    </>)}
                    hoverable
                    actions={[
                        <SettingOutlined
                            key="setting"
                            onClick={() => {
                                viewHomeDetail(server)
                            }}
                        />,
                        <Popconfirm
                            title="是否删除房间"
                            description="请自行做好备份"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteServer(server)
                            }}
                        >
                            <DeleteOutlined key="delete"/>
                        </Popconfirm>,
                        <EditOutlined key="edit" onClick={() => {
                            setOpen(true)
                        }}/>,

                    ]}
                    extra={[
                        <div>
                            {server.status && <Tag color="green">启动</Tag>}
                            {!server.status && <Tag>关闭</Tag>}
                        </div>
                    ]}
                >
                    <Form className={'dst'}>
                        <Form.Item label={t('ClusterName')}>
                    <span className={style.icon}>
                        {archive.clusterName}
                    </span>
                        </Form.Item>
                        <Form.Item label={t('GameMod')}>
                    <span>
                        {archive.gameMod}
                    </span>
                        </Form.Item>
                        <Form.Item label={t('Season')}>
                    <span>
                        {archive?.meta?.Clock?.Cycles + 1}/{archive?.Clock?.Phase} {archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                    </span>
                        </Form.Item>
                        <Form.Item label={t('Mods')}>
                    <span>
                        {archive.mods}
                    </span>
                        </Form.Item>
                        <Form.Item label={t('人数')}>
                            <span>{`${archive?.players?.length}/${archive.maxPlayers}`}</span>
                        </Form.Item>
                        <Form.Item label={t('IpConnect')}>
                            <Space size={8}>
                                <HiddenText text={archive.ipConnect}/>
                                <Tooltip placement="topLeft"
                                         title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </Space>
                        </Form.Item>
                        <Form.Item label={t('Password')}>
                            <HiddenText text={archive.password}/>
                        </Form.Item>
                        <Form.Item label={t('Version')}>
                    <span>
                        {archive.version} / {archive.lastVersion}
                    </span>
                        </Form.Item>

                    </Form>

                </Card>
            </Spin>

            <Modal title="更新房间配置" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}
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

    useEffect(() => {
        setLoading(true)
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    message.success("获取房间成功")
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
    const removeServerList = (server) => {
        const oldServerList = serverList
        const newServerList = []
        for (let i = 0; i < oldServerList.length; i++) {
            if (oldServerList[i].ID !== server.ID) {
                newServerList.push(oldServerList[i])
            }
        }
        setServerList(newServerList)
    }


    const reload = () => {
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    message.success("获取房间成功")
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
            const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
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
                <Spin spinning={spining} tip={"正在创建房间"}>

                    <Alert message="以下路径请使用绝对路径，不支持相对路径，同时不要使用特殊字符" type="warning" showIcon
                           closable/>
                    <br/>
                    <Form
                        layout="vertical"
                        labelAlign={'left'}
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
                        <Alert
                            message="如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串。比如 aa aaa aa1 这种"
                            type="warning" showIcon closable/>
                        <Form.Item label="存档名称"
                                   tooltip={"如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串"}
                                   name="clusterName"
                                   rules={[
                                       {
                                           required: true,
                                           validator: validateName
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="steamcmd 路径"
                                   name="steamcmd"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your steamcmd path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="饥荒路径"
                                   name="force_install_dir"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your force_install_dir path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                                   tooltip={"暂时未实现"}
                                   label="persistent_storage_root(暂时未实现)"
                                   name="persistent_storage_root"
                                   rules={[
                                       {
                                           required: false,
                                           message: 'Please input your persistent_storage_root path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            tooltip={"暂时未实现"}
                            label="conf_dir(暂时未实现)"
                            name="conf_dir"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your conf_dir path!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="ugc_directory"
                                   name="ugc_directory"
                                   rules={[
                                       {
                                           required: false,
                                           message: 'Please input your ugc_directory path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="备份路径"
                                   name="backup"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your backup path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="启动方式"
                            name="bin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server bin',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={32}>32</Radio>
                                <Radio value={64}>64</Radio>
                                <Radio value={100}>lua-jit</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
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
                    <Row gutter={[16, 16]}>
                        {serverList.map((server, index) => (
                            <Col xs={24} sm={8} md={6} lg={6} xl={6}>
                                <ServerItem key={index} server={server} serverList={serverList}
                                            removeServerList={removeServerList} updateServerList={updateServerList}/>
                            </Col>
                        ))}

                        <Col xs={24} sm={8} md={6} lg={6} xl={6}>
                            <div
                                onClick={() => setOpen(true)}
                                style={{
                                    height: "100px",
                                    backgroundColor: '#75757',
                                    border: '1px dashed #d9d9d9',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    verticalAlign: 'top',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <PlusOutlined/>
                            </div>
                        </Col>
                    </Row>

                    <Modal title="添加房间" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}
                           footer={null}>
                        <AddServer serverList={serverList} reload={reload}/>
                    </Modal>
                </Skeleton>

            </Container>
        </>
    )
}