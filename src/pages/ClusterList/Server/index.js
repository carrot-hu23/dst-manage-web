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
    message,
    Spin,
    Space,
    Tooltip, Skeleton, Popconfirm, Badge, Segmented, InputNumber, Tag
} from 'antd';
import {EditOutlined, PlusOutlined, QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {ProDescriptions} from '@ant-design/pro-components';
import {Container} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {createCluster, deleteCluster, getClusterList, updateCluster} from "../../../api/clusterApi";
import style from "../../DstServerList/index.module.css";
import {useTranslation} from "react-i18next";
import {dstHomeDetailApi} from "../../../api/dstApi";
import HomeDetail from "../../DstServerList/home";
import HiddenText from "../../Home2/HiddenText/HiddenText";
import {generateUUID} from "../../../utils/dateUitls";

const ServerItem = ({isAdmin, server, serverList, updateServerList, removeServerList}) => {

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
            form.setFieldValue("password", server.clusterPassword)
            form.setFieldValue("clusterType", server.clusterType)
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
                    {(server?.clusterType === '本地' || server.clusterType === '') && (<>
                        <Alert message="以下路径请使用绝对路径，不支持相对路径，同时不要使用特殊字符" type="warning"
                               showIcon
                               closable/>
                        <br/>
                    </>)}

                    <Form
                        labelCol={{
                            span: 6,
                        }}
                        form={form}
                        // layout="vertical"
                        // labelAlign={'left'}
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
                        {(server?.clusterType === '本地' || server.clusterType === '') && (<>
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
                                       tooltip={"docker 环境 路径填写 /app/steamcmd"}
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
                                       tooltip={"docker 环境 路径请填 /app/dst-dedicated-server"}
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
                            {/*
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
                        */}
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
                        </>)}

                        {server?.clusterType === '远程' && (<>
                            <Form.Item label="Ip"
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
                            <Form.Item label="端口"
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
                            <Form.Item label="用户名"
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
                            <Form.Item label="密码"
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
                        </>)}
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

    const LabelStyle = ({label, children}) => {
        return (
            <div style={{paddingBottom: 8, display: 'flex'}}>
                <div>
                    <span style={{paddingRight: 8}}>{label}:</span>
                </div>
                <div>
                    {children}
                </div>
            </div>
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
                    actions={isAdmin ? [
                        <Popconfirm
                            title="是否删除房间"
                            description="请自行做好备份"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteServer(server)
                            }}
                        >
                            <Button icon={<DeleteOutlined key="delete"/>} type={'text'} danger
                                    size={'small'}>删除</Button>
                        </Popconfirm>,
                        <Button icon={<EditOutlined key="edit"/>} type={'text'} size={'small'} onClick={() => {
                            setOpen(true)
                        }}>配置</Button>,

                    ] : []}
                    extra={[
                        <Space size={8} wrap>
                            {server?.clusterType === '远程' && (
                                <>
                                    <Tag color={'cyan'}>远程</Tag>
                                </>
                            )}
                            {server?.clusterType !== '远程' && (
                                <>
                                    <Tag color={'blue'}>本地</Tag>
                                </>
                            )}
                            <div>
                                {server.status && <Badge status="success"/>}
                                {!server.status && <Badge status="default"/>}
                            </div>
                            <div>
                                <Button type={'primary'} size={'small'}
                                        onClick={() => to(server.clusterName, server.name)}>进入</Button>
                            </div>
                        </Space>
                    ]}
                >
                    <ProDescriptions
                        column={2}
                    >
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            contentStyle={{
                                maxWidth: '72%',
                            }}
                            ellipsis
                            label={t('ClusterName')}
                        >
                            <span className={style.icon}>
                                {archive.clusterName}
                            </span>
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            label={t('GameMod')}
                        >
                            {archive.gameMod}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            label={t('Mods')}
                        >
                            {archive.mods}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            label={t('Season')}
                        >
                            {archive?.meta?.Clock?.Cycles + 1}/{archive?.Clock?.Phase} {archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            label={t('Players')}
                        >
                            <span>{`${archive?.players?.length}/${archive.maxPlayers}`}</span>
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            label={t('Version')}
                        >
                            {archive.version} / {archive.lastVersion}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                            span={2}
                            valueType="text"
                            label={t('IpConnect')}
                            contentStyle={{
                                height: '44px',
                            }}
                        >
                            <Space size={8}>
                                <HiddenText text={archive.ipConnect}/>
                                <Tooltip placement="topLeft"
                                         title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </Space>
                        </ProDescriptions.Item>
                    </ProDescriptions>
                </Card>
            </Spin>

            <Modal width={860} title="更新房间配置" open={open} onOk={() => setOpen(false)}
                   onCancel={() => setOpen(false)}
                   footer={null}>
                <UpdateServer server={server} serverList={serverList} updateServerList={updateServerList}/>
            </Modal>
        </>
    )
}

export default () => {

    const [serverListBak, setServerListBak] = useState([])
    const [serverList, setServerList] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAddBtn, setShowAddBtn] = useState(true)

    useEffect(() => {

        const userJson = localStorage.getItem('user');
        let user = JSON.parse(userJson);
        if (user === null) {
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
                    setServerListBak(resp.data)
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
                    // message.success("获取房间成功")
                    setServerList(resp.data)
                } else {
                    message.error("获取房间失败")
                }

            })
    }

    const AddServer = ({serverList, reload}) => {

        const [clusterType, setClusterType] = useState('本地')

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
            if (values.clusterType === '远程') {
                values.clusterName = generateUUID()
            }
            console.log('createCluster:', values);
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
                        // layout="vertical"
                        // labelAlign={'left'}
                        labelCol={{
                            span: 6,
                        }}
                        onFinish={onFinish}
                        initialValues={{
                            // clusterName: crypto.randomUUID()
                            clusterType: '本地',
                            levelType: 'forest'
                        }}
                    >
                        <Form.Item label="类型" name={'clusterType'}>
                            <Segmented options={["本地", "远程"]} block onChange={(v) => {
                                setClusterType(v)
                            }}/>
                        </Form.Item>

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
                        {clusterType === '本地' && (<>
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
                                       tooltip={"docker 环境 路径填写 /app/steamcmd"}
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
                                       tooltip={"docker 环境 路径请填 /app/dst-dedicated-server"}
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
                            {/*
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
                        */}
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
                                label="世界类型"
                                name="levelType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input levelType',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={'forest'}>森林洞穴</Radio>
                                    <Radio value={'porkland'}>猪镇</Radio>
                                </Radio.Group>
                            </Form.Item>

                        </>)}

                        {clusterType === '远程' && (<>
                            <Form.Item label="Ip"
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
                            <Form.Item label="端口"
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
                            <Form.Item label="用户名"
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
                            <Form.Item label="密码"
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
                        </>)}
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
                    <div style={{marginBottom: '16px'}}>
                        <Space size={16} wrap>
                            {showAddBtn && <div>
                                <Button onClick={() => setOpen(true)} icon={<PlusOutlined/>} type={'primary'}>添加房间</Button>
                            </div>}
                            <Segmented
                                options={['全部','本地', '远程',]}
                                onChange={(value) => {
                                    console.log(value)
                                    if (value === '远程') {
                                        setServerList(serverListBak.filter(server=>server.clusterType === '远程'))
                                    } else if (value === '本地') {
                                        setServerList(serverListBak.filter(server=>server.clusterType === '本地' || server.clusterType === ''))
                                    } else {
                                        setServerList(serverListBak)
                                    }
                                }}
                            />
                        </Space>
                    </div>

                    <Row gutter={[16, 16]}>
                        {serverList.map((server, index) => (
                            <Col xs={24} sm={12} md={8} lg={8} xxl={6}>
                                <ServerItem isAdmin={showAddBtn} key={index} server={server} serverList={serverList}
                                            removeServerList={removeServerList} updateServerList={updateServerList}/>
                            </Col>
                        ))}
                    </Row>

                    <Modal style={{
                        top: '8vh'
                    }} width={800} title="添加房间" open={open} onOk={() => setOpen(false)}
                           onCancel={() => setOpen(false)}
                           footer={null}>
                        <AddServer serverList={serverList} reload={reload}/>
                    </Modal>
                </Skeleton>

            </Container>
        </>
    )
}