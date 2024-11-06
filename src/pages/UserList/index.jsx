import {Button, Drawer, Form, Image, Input, message, Modal, Popconfirm, Select, Switch, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {DeleteOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";

import {Box, Container, Card} from "@mui/material";
import {ProTable} from "@ant-design/pro-components";
import {
    createUserAccountApi,
    queryUserAccountListApi,
    deleteUserAccountApi,
    updateUserAccountApi, queryUserClusterListApi, addUserClusterApi, deleteUserClusterApi, putUserClusterApi
} from "../../api/userApi";
import {getClusterList} from "../../api/clusterApi";


export default () => {

    const [serverList, setServerList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    // message.success("获取房间成功")
                    setServerList(resp.data||[])
                } else {
                    message.error("获取房间失败")
                }
                setLoading(false)
            })
    }, [])

    const actionRef = useRef()
    const columns = [
        {
            title: '登录名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '显示名称',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
            search: false,
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            search: false,
        },
        {
            title: 'photoURL',
            dataIndex: 'photoURL',
            key: 'photoURL',
            search: false,
            render: (_, record) => (
                <>
                    <Image src={record.photoURL} width={48}/>
                </>
            )
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                // eslint-disable-next-line react/jsx-key
                (<div>
                    <Button type="link" onClick={() => {
                        setOpen(true)
                        setUserId(record.ID)
                    }}>分配</Button>
                    <UpdateUserAccount user={record} actionRef={actionRef}/>
                    <Popconfirm
                        title="是否删除用户"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            deleteUserAccountApi(record.ID)
                                .then(resp => {
                                    if (resp.code === 200) {
                                        message.success("删除成功")
                                        actionRef.current?.reload()
                                    } else {
                                        message.error("删除失败")
                                    }
                                })
                        }}
                    >
                        <Button icon={<DeleteOutlined key="delete"/>} type={'link'} danger size={'small'}>删除</Button>
                    </Popconfirm>
                </div>)
            ],
        },
    ];

    const [userId, setUserId] = useState(0);

    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };

    const HomeList = ({userId}) => {

        const [userClusterList, setUserClusterList] = useState([])
        useEffect(() => {
            queryUserClusterListApi(userId)
                .then(resp => {
                    if (resp.code === 200) {
                        setUserClusterList(resp.data)
                    }
                })
        }, [])

        const reloadUserClusterList = ()=>{
            queryUserClusterListApi(userId)
                .then(resp => {
                    if (resp.code === 200) {
                        setUserClusterList(resp.data||[])
                    }
                })
        }

        const columns2 = [
            {
                title: '房间名称',
                dataIndex: 'name',
                key: 'name',
                search: false,
            },
            {
                title: '集群',
                dataIndex: 'clusterName',
                key: 'clusterName',
                search: false,
            },
            {
                title: '创建世界',
                valueType: 'option',
                key: 'option',
                render: (_, record) => [
                    // eslint-disable-next-line react/jsx-key
                    (<div>
                        <Switch checked={record.allowAddLevel} checkedChildren="开启" unCheckedChildren="关闭" onChange={(v)=>{
                            const data = {
                                ID: record.ID,
                                allowAddLevel: v,
                                allowEditingServerIni: record.allowEditingServerIni
                            }
                            putUserClusterApi(data)
                                .then(resp=>{
                                    if (resp.code  === 200) {
                                        message.success("修改成功")
                                        reloadUserClusterList()
                                    } else {
                                        message.warning("修改失败")
                                    }
                                })
                        }}/>
                    </div>)
                ],
            },
            {
                title: '编辑sever_ini',
                valueType: 'option',
                key: 'option',
                render: (_, record) => [
                    // eslint-disable-next-line react/jsx-key
                    (<div>
                        <Switch checked={record.allowEditingServerIni} checkedChildren="开启" unCheckedChildren="关闭"  onChange={(v)=>{
                            const data = {
                                ID: record.ID,
                                allowAddLevel: record.allowAddLevel,
                                allowEditingServerIni: v
                            }
                            putUserClusterApi(data)
                                .then(resp=>{
                                    if (resp.code  === 200) {
                                        message.success("修改成功")
                                        reloadUserClusterList()
                                    } else {
                                        message.warning("修改失败")
                                    }
                                })
                        }}/>
                    </div>)
                ],
            },
            {
                title: '操作',
                valueType: 'option',
                key: 'option',
                render: (_, record) => [
                    // eslint-disable-next-line react/jsx-key
                    (<div>
                        <Button type="link" danger onClick={() => {
                            deleteUserClusterApi(record.ID)
                                .then(resp=>{
                                    if (resp.code === 200) {
                                        message.success("删除成功")
                                        reloadUserClusterList()
                                    }
                                })
                        }}>移除</Button>
                    </div>)
                ],
            },
        ];
        const actionRef = useRef()

        const AddCluster2User = () => {
            const [clusterId, setClusterId] = useState(0)
            const handleChange = (value) => {
                setClusterId(value)
            }
            const [isModalOpen, setIsModalOpen] = useState(false);
            const handleOk = () => {
                if (userId === 0 || clusterId === 0 || clusterId === null || clusterId === '') {
                    message.warning("请选择房间")
                    return
                }
                addUserClusterApi({
                    userId,
                    clusterId,
                }).then(resp => {
                    if (resp.code === 200) {
                        message.success("添加成功")
                        reloadUserClusterList()
                    }
                    setIsModalOpen(false);
                })
            };
            const handleCancel = () => {
                setIsModalOpen(false);
            };

            const clusterOptions = ()=>{
                return serverList?.map(level => {
                    return {
                        value: level.ID,
                        label: level.name,
                        clusterName: level.clusterName
                    }
                }).filter(level=>!userClusterList?.map(uc=>uc.clusterName).includes(level.clusterName))
            }

            return (<>
                <Button type={'primary'} style={{marginBottom: 12}}
                        onClick={() => setIsModalOpen(true)}
                >
                    分配房间
                </Button>
                <Modal title="分配房间" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Select
                        loading={loading}
                        style={{
                            width: 240,
                        }}
                        onChange={handleChange}
                        options={clusterOptions()}
                    />
                    <div>
                        <br/>
                        {clusterOptions()?.length === 0 && (<h4>当前用户已经没有可添加的房间了</h4>)}
                    </div>
                </Modal>
            </>)
        }

        return (
            <>
                <AddCluster2User actionRef={actionRef}/>
                <Table
                    actionRef={actionRef}
                    columns={columns2}
                    scroll={{
                        x: 600,
                    }}
                    dataSource={userClusterList}
                />
            </>
        )
    }

    const AddUserAccount = ({actionRef}) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [form] = Form.useForm();

        const showModal = () => {
            setIsModalOpen(true);
        };

        const handleOk = () => {
            form.validateFields().then(value => {
                // 验证通过后进入
                createUserAccountApi(value)
                    .then(resp => {
                        if (resp.code === 200) {
                            message.success("创建成功")
                            setIsModalOpen(false);
                            actionRef.current?.reload()
                        } else {
                            message.error("创建失败", resp.msg)
                        }
                    })

            }).catch(err => {
                message.error(err.errorFields[0].errors[0])
            })

        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };


        return (
            <>
                <Button type="primary" onClick={showModal}>
                    添加用户
                </Button>
                <Modal title="添加用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        style={{
                            margin: '24px',
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="密码"
                                            maxLength={20}/>
                        </Form.Item>

                        <Form.Item
                            name="displayName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your displayName!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="显示名称"/>
                        </Form.Item>
                        <Form.Item
                            name="photoURL"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your photoURL!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="头像url"/>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <Input placeholder="备注"/>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }

    const UpdateUserAccount = ({actionRef, user}) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [form] = Form.useForm();
        useEffect(() => {
            form.setFieldsValue(user)
        }, [user])

        const showModal = () => {
            setIsModalOpen(true);
        };

        const handleOk = () => {
            form.validateFields().then(value => {
                // 验证通过后进入
                updateUserAccountApi({...value, ...{ID: user.ID}})
                    .then(resp => {
                        if (resp.code === 200) {
                            message.success("更新成功")
                            setIsModalOpen(false);
                            actionRef.current?.reload()
                        } else {
                            message.error("更新失败", resp.msg)
                        }
                    })
            }).catch(err => {
                message.error(err.errorFields[0].errors[0])
            })

        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };


        return (
            <>
                <Button type="link" onClick={showModal}>
                    编辑
                </Button>
                <Modal title="编辑用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        style={{
                            margin: '24px',
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="密码"
                                            maxLength={20}/>
                        </Form.Item>

                        <Form.Item
                            name="displayName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your displayName!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="显示名称"/>
                        </Form.Item>
                        <Form.Item
                            name="photoURL"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your photoURL!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="头像url"/>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <Input placeholder="备注"/>
                        </Form.Item>

                    </Form>
                </Modal>
            </>
        )
    }

    return (<>

            <Drawer size={'large'} title="管理房间列表" onClose={onClose} open={open}>
                <HomeList userId={userId}/>
            </Drawer>

            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 1}} dir="ltr">
                        <ProTable
                            actionRef={actionRef}
                            columns={columns}
                            request={async (params = {}, sort, filter) => {
                                console.log(sort, filter);
                                console.log('params', params)
                                const resp = await queryUserAccountListApi(params)
                                console.log('resp', resp)
                                return {
                                    data: resp.data.data,
                                    success: true,
                                    total: resp.data.total
                                };
                            }}
                            scroll={{
                                x: 600,
                            }}
                            rowKey="ID"
                            pagination={{
                                pageSize: 10,
                                onChange: (page) => console.log(page),
                            }}
                            headerTitle="用户列表"
                            // tableAlertRender={({selectedRowKeys, selectedRows, onCleanSelected}) => false}
                            toolBarRender={() => [
                                <AddUserAccount actionRef={actionRef}/>
                            ]}
                        />
                    </Box>
                </Card>
            </Container>
        </>
    )
}