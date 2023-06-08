import {useNavigate} from "react-router-dom";
import {Button, Modal, Tag, Form, Input, message, Spin, Popconfirm, Skeleton} from "antd";
import React, {useRef, useState} from "react";
import {ProTable} from "@ant-design/pro-components";
import {Container, Box} from '@mui/material';
import {createCluster, deleteCluster, queryClusterList, updateCluster} from "../../api/clusterApi";
import AccountPopover from "../../layouts/dashboard/header/AccountPopover";
import {dstHomeDetailApi} from "../../api/dstApi";
import HomeDetail from "../DstServerList/home";


export default () => {
    const actionRef = useRef();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    function to(cluster) {
        navigate(`/${cluster}/dashboard/app`);
    }

    const [loading2, setLoading2] = useState(false)
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    // 房间信息
    const [homeInfo, setHomeInfo] = useState({});
    const viewHomeDetail = (record) => {
        console.log(record.rowId)
        console.log(record.region)
        setLoading2(true)
        setIsModalOpen2(true);

        dstHomeDetailApi({
            rowId: record.rowId,
            region: record.region
        }).then(response => {
            const responseData = JSON.parse(response)
            const {success} = responseData
            if (success) {
                setHomeInfo(responseData)
            }
            setLoading2(false)
        })
    }

    const [cluster, setCluster] = useState({})

    const columns = [
        {
            title: '序号',
            dataIndex: 'ID',
            key: 'ID',
            search: false,
            align: 'center',
            sorter: (a, b) => a.ID - b.ID,
        },
        {
            title: '集群',
            dataIndex: 'clusterName',
            key: 'clusterName',
            align: 'center',
            sorter: (a, b) => a.clusterName - b.clusterName,
            render: (text, record, _, action) => (
                <Button type={"link"} onClick={() => to(record.clusterName)}>{record.clusterName}</Button>
            )
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            search: false,
            align: 'left',
        },
        // {
        //     title: 'uuid',
        //     dataIndex: 'uuid',
        //     key: 'uuid',
        //     ellipsis: true,
        //     copyable: true,
        // },
        {
            title: '森林',
            dataIndex: 'master',
            key: 'master',
            ellipsis: true,
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.master && <Tag color="green">启动</Tag>}
                    {!record.master && <Tag color="purple">未启动</Tag>}
                </>
            )
        },
        {
            title: '洞穴',
            dataIndex: 'caves',
            key: 'caves',
            ellipsis: true,
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.caves && <Tag color="green">启动</Tag>}
                    {!record.caves && <Tag color="purple">未启动</Tag>}
                </>
            )
        },
        {
            title: '人数',
            dataIndex: 'connected',
            key: 'connected',
            ellipsis: true,
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.master && record.rowId !== "" && <span>{record.connected}/{record.maxConnections}</span>}
                    {!record.master && "-"}
                </>
            )
        },
        {
            title: '房间详细',
            dataIndex: 'rowId',
            key: 'rowId',
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.master && record.rowId !== "" && <>
                        <Button type="link" onClick={() => {
                            viewHomeDetail(record)
                        }}>查看详情</Button>
                    </>}
                    {!record.master && <span>-</span>}
                </>
            )
        },
        {
            title: '季节',
            dataIndex: 'season',
            key: 'season',
            ellipsis: true,
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.master && <span>{record.season}</span>}
                    {!record.master && "-"}
                </>
            )
        },
        {
            title: '游戏模式',
            dataIndex: 'mode',
            key: 'mode',
            ellipsis: true,
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.master && <span>{record.mode}</span>}
                    {!record.master && "-"}
                </>
            )
        },
        // {
        //     title: 'steamcmd',
        //     dataIndex: 'steamcmd',
        //     key: 'steamcmd',
        //     ellipsis: true,
        //     search: false
        // },
        // {
        //     title: '饥荒安装位置',
        //     dataIndex: 'force_install_dir',
        //     key: 'force_install_dir',
        //     ellipsis: true,
        //     search: false
        // },
        // {
        //     title: '存档备份路径',
        //     dataIndex: 'backup',
        //     key: 'backup',
        //     ellipsis: true,
        //     search: false
        // },
        // {
        //     title: '模组下载路径',
        //     dataIndex: 'mod_download_path',
        //     key: 'mod_download_path',
        //     ellipsis: true,
        //     search: false
        // },
        {
            title: '创建时间',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            valueType: 'dateTime',
            search: false
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                // eslint-disable-next-line react/jsx-key
                (<div>
                    {/* <Button type="link" onClick={() => {
                        key={record.id}>更新</Button>

                    <Popconfirm
                        title="Delete the cluster"
                        description="Are you sure to delete this cluster?"
                        onConfirm={() => {
                            deleteCluster(record.ID)
                                .then(resp => {
                                    if (resp.code === 200) {
                                        message.success("删除集群成功")
                                        actionRef.current?.reload()
                                    }
                                })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" key={record.id}>Delete</Button>
                    </Popconfirm> */}

                    <Button type="link" onClick={() => {
                        setIsModalOpen3(true)
                        setCluster(record)
                    }}>Update</Button>
                </div>)
            ],
        },

    ];

    const UpdateCluster = ({isModalOpen3, setIsModalOpen3, cluster}) => {

        const [form] = Form.useForm()

        const handleOk = () => {

            form.validateFields().then(() => {
                setIsModalOpen3(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });

            const data1 = {
                ID: cluster.ID,
                description: form.getFieldsValue().description
            }
            updateCluster(data1).then((response => {
                if (response.code !== 200) {
                    message.error("更新集群失败")
                }
                message.success("更新集群成功")
                setLoading(false)
                actionRef.current?.reload();
                // setCluster(null)
            })).catch(err => console.log(err))
        };

        return (
            <>
                <Modal title="更新集群" open={isModalOpen3} onOk={handleOk} onCancel={() => {
                    setIsModalOpen3(false)
                }}>
                    <Form
                        form={form}
                        initialValues={cluster}
                        layout="horizontal"
                        labelCol={{
                            span: 6,
                        }}
                    >
                        <Form.Item label="集群">
                            <span>{cluster.clusterName}</span>
                        </Form.Item>

                        <Form.Item
                            label="描述"
                            name='description'
                        >
                            <Input placeholder="请输入描述"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }

    const AddCluster = ({isModalOpen, setIsModalOpen, isUpdate, cluster, setLoading}) => {

        const [form] = Form.useForm()

        const handleOk = () => {
            setLoading(true)
            form.validateFields().then(() => {
                setIsModalOpen(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });

            const data = form.getFieldsValue()
            createCluster(data).then((response => {
                if (response.code !== 200) {
                    message.error("创建集群失败")
                }
                message.success("创建集群成功")
                setLoading(false)
                actionRef.current?.reload();
            })).catch(err => console.log(err))
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        return (
            <>
                <Modal title="创建集群" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        initialValues={cluster}
                        layout="horizontal"
                        labelCol={{
                            span: 6,
                        }}
                    >
                        <Form.Item
                            label="集群"
                            name='clusterName'
                            rules={[{required: true, message: '请输入集群',},]}
                        >
                            <Input placeholder="请输入集群"
                            />
                        </Form.Item>

                        <Form.Item
                            label="描述"
                            name='description'
                        >
                            <Input placeholder="请输入描述"
                            />
                        </Form.Item>

                        <Form.Item
                            label="steamcmd路径"
                            name='steamcmd'
                            rules={[{required: true, message: '请输入steamcmd路径',},]}
                        >
                            <Input placeholder="请输入steamcmd路径"
                            />
                        </Form.Item>

                        <Form.Item
                            label="饥荒安装位置"
                            name='force_install_dir'
                            rules={[{required: true, message: '请输入饥荒安装位置',},]}
                        >
                            <Input placeholder="请输入饥荒安装位置"
                            />
                        </Form.Item>

                        <Form.Item
                            label="备份路径"
                            name='backup'
                            rules={[{required: true, message: '请输入备份位置',},]}
                        >
                            <Input placeholder="请输入备份位置"
                            />
                        </Form.Item>
                        <Form.Item
                            label="模组下载路径"
                            name='mod_download_path'
                            rules={[{required: true, message: '请输入模组下载路径',},]}
                        >
                            <Input placeholder="请输入模组下载路径"
                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </>
        )
    }

    return (
        <>

            <br/>
            <Spin spinning={loading} tip="正在下载饥荒...请稍等，预计5~20分钟，请提前下载好steamcmd">
                <AddCluster isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isUpdate setLoading={setLoading}/>
                <UpdateCluster isModalOpen3={isModalOpen3} setIsModalOpen3={setIsModalOpen3} cluster={cluster}/>
                <Container maxWidth="xl">
                    <div style={{float: 'right'}}>
                        <AccountPopover/>

                    </div>
                    <Box sx={{p: 0, pb: 0}} dir="ltr">

                        <br/>
                        <br/>
                        <ProTable
                            scroll={{
                                x: 800,
                            }}
                            columns={columns}
                            actionRef={actionRef}
                            // cardBordered
                            request={async (params = {}, sort, filter) => {
                                console.log(sort, filter);
                                const msg = await queryClusterList(params)
                                return {
                                    data: msg.data.data,
                                    success: true,
                                    total: msg.data.total
                                };
                            }}
                            rowKey="ID"
                            pagination={{
                                pageSize: 10,
                                onChange: (page) => console.log(page),
                            }}
                            headerTitle="饥荒服务器列表"
                            toolBarRender={() => [
                                <Button
                                    key="button"
                                    onClick={() => {
                                        // 添加集群
                                        setIsModalOpen(true)

                                        // actionRef.current?.reload();
                                    }}
                                    type="primary"
                                >
                                    新建集群
                                </Button>,
                            ]}
                        />
                    </Box>
                </Container>

                <Modal
                    getContainer={false}
                    open={isModalOpen2}
                    footer={null}
                    onOk={() => {
                        setIsModalOpen2(false)
                    }}
                    onCancel={() => {
                        setIsModalOpen2(false)
                    }}
                >
                    <Skeleton title loading={loading2} active>
                        <div style={{height: 500}}>
                            <HomeDetail home={homeInfo}/>
                        </div>
                    </Skeleton>
                </Modal>

            </Spin>
        </>
    );
}
