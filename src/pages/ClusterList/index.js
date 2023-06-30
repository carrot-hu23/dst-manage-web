import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import {Button, Modal, Tag, Form, Input, message, Spin, Popconfirm, Skeleton} from "antd";
import {ProTable} from "@ant-design/pro-components";
import {Container, Box} from '@mui/material';

import {createCluster, deleteCluster, queryClusterList, updateCluster} from "../../api/clusterApi";
import AccountPopover from "../../layouts/dashboard/header/AccountPopover";
import {dstHomeDetailApi} from "../../api/dstApi";
import HomeDetail from "../DstServerList/home";



export default () => {

    const { t } = useTranslation()

    const actionRef = useRef();
    const navigate = useNavigate();
    const [isOpenAddCluster, setIsOpenAddCluster] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false)

    function to(cluster) {
        navigate(`/${cluster}/dashboard/app`);
    }

    const [searchLoading, setSearchLoading] = useState(false)
    const [isOpenHomeDetail, setIsOpenHomeDetail] = useState(false);
    const [isOpenUpdateCluster, setIsOpenUpdateCluster] = useState(false);
    // 房间信息
    const [homeInfo, setHomeInfo] = useState({});
    const viewHomeDetail = (record) => {
        console.log(record.rowId)
        console.log(record.region)
        setSearchLoading(true)
        setIsOpenHomeDetail(true);

        dstHomeDetailApi({
            rowId: record.rowId,
            region: record.region
        }).then(response => {
            const responseData = JSON.parse(response)
            const {success} = responseData
            if (success) {
                setHomeInfo(responseData)
            }
            setSearchLoading(false)
        })
    }

    const [cluster, setCluster] = useState({})

    const columns = [
        {
            title: t('id'),
            dataIndex: 'ID',
            key: 'ID',
            search: false,
            align: 'center',
            sorter: (a, b) => a.ID - b.ID,
        },
        {
            title: t('clusterName'),
            dataIndex: 'clusterName',
            key: 'clusterName',
            align: 'center',
            sorter: (a, b) => a.clusterName - b.clusterName,
            render: (text, record, _, action) => (
                <Button type={"link"} onClick={() => to(record.clusterName)}>{record.clusterName}</Button>
            )
        },
        {
            title: t('description'),
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
            title: t('master'),
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
            title: t('caves'),
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
            title: t('players'),
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
            title: t('detail'),
            dataIndex: 'rowId',
            key: 'rowId',
            search: false,
            align: 'center',
            render: (text, record, _, action) => (
                <>
                    {record.master && record.rowId !== "" && <>
                        <Button type="link" onClick={() => {
                            viewHomeDetail(record)
                        }}>{t('viewDetail')}</Button>
                    </>}
                    {!record.master && <span>-</span>}
                </>
            )
        },
        {
            title: t('season'),
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
            title: t('mode'),
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
        {
            title: t('createDate'),
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            valueType: 'dateTime',
            search: false
        },
        {
            title: t('operation'),
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                // eslint-disable-next-line react/jsx-key
                (<div>
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
                    </Popconfirm>

                    <Button type="link" onClick={() => {
                        setIsOpenUpdateCluster(true)
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
                setSpinLoading(false)
                actionRef.current?.reload();
                // setCluster(null)
            })).catch(err => console.log(err))
        };

        return (
            <>
                <Modal title={t('updateCluster')} open={isModalOpen3} onOk={handleOk} onCancel={() => {
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
                        <Form.Item label={t('clusterName')}>
                            <span>{cluster.clusterName}</span>
                        </Form.Item>

                        <Form.Item
                            label={t('description')}
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
                <Modal title={t('createCluster')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        initialValues={cluster}
                        layout="horizontal"
                        labelCol={{
                            span: 8,
                        }}
                    >
                        <Form.Item
                            label={t('clusterName')}
                            name='clusterName'
                            rules={[{required: true, message: '请输入集群',},]}
                        >
                            <Input placeholder="请输入集群"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('description')}
                            name='description'
                        >
                            <Input placeholder="请输入描述"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('steamCmdPath')}
                            name='steamcmd'
                            rules={[{required: true, message: '请输入steamcmd路径',},]}
                        >
                            <Input placeholder="请输入steamcmd路径"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('dstPath')}
                            name='force_install_dir'
                            rules={[{required: true, message: '请输入饥荒安装位置',},]}
                        >
                            <Input placeholder="请输入饥荒安装位置"
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('backupPath')}
                            name='backup'
                            rules={[{required: true, message: '请输入备份位置',},]}
                        >
                            <Input placeholder="请输入备份位置"
                            />
                        </Form.Item>
                        <Form.Item
                            label={t('modDownloadPath')}
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
            <Spin spinning={spinLoading} tip="正在下载饥荒...请稍等，预计5~20分钟，请提前下载好steamcmd">
                <AddCluster isModalOpen={isOpenAddCluster} setIsModalOpen={setIsOpenAddCluster} isUpdate setLoading={setSpinLoading}/>
                <UpdateCluster isModalOpen3={isOpenUpdateCluster} setIsModalOpen3={setIsOpenUpdateCluster} cluster={cluster}/>
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
                            headerTitle={t('clusterTableTitle')}
                            toolBarRender={() => [
                                <Button
                                    key="button"
                                    onClick={() => {
                                        // 添加集群
                                        setIsOpenAddCluster(true)

                                        // actionRef.current?.reload();
                                    }}
                                    type="primary"
                                >
                                    {t('createCluster')}
                                </Button>,
                            ]}
                        />
                    </Box>
                </Container>

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

            </Spin>
        </>
    );
}
