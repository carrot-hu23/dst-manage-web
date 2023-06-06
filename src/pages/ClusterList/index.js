import {useNavigate} from "react-router-dom";
import {Button, Modal, Tag, Form, Input, message, Spin, Popconfirm} from "antd";
import React, {useRef, useState} from "react";
import {ProTable} from "@ant-design/pro-components";
import {Container, Box} from '@mui/material';
import {createCluster, deleteCluster, queryClusterList} from "../../api/clusterApi";



export default () => {
    const actionRef = useRef();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    function to(cluster) {
        navigate(`/${cluster}/dashboard/app`);
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'ID',
            key: 'ID',
            search: false
        },
        {
            title: '集群',
            dataIndex: 'clusterName',
            key: 'clusterName',
            render: (text, record, _, action) => (
                <Button type={"link"} onClick={() => to(record.clusterName)}>{record.clusterName}</Button>
            )
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            search: false
        },
        {
            title: 'uuid',
            dataIndex: 'uuid',
            key: 'uuid',
            ellipsis: true,
            copyable: true,
        },
        {
            title: '森林',
            dataIndex: 'master',
            key: 'master',
            ellipsis: true,
            search: false,
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
            render: (text, record, _, action) => (
                <>
                    {record.master && <Tag color="green">启动</Tag>}
                    {!record.master && <Tag color="purple">未启动</Tag>}
                </>
            )
        },
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
                    <Button type="link" onClick={() => {

                    }} key={record.id}>更新</Button>

                    <Popconfirm
                        title="Delete the cluster"
                        description="Are you sure to delete this cluster?"
                        onConfirm={()=>{
                            deleteCluster(record.ID)
                                .then(resp=>{
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

                </div>)
            ],
        },

    ];


    const AddCluster = ({isModalOpen, setIsModalOpen, isUpdate, cluster,setLoading}) => {

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
            <br/>
            <Spin spinning={loading} tip="正在下载饥荒...请稍等，预计5~20分钟，请提前下载好steamcmd">
            <AddCluster isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isUpdate setLoading={setLoading}/>
            <Container maxWidth="xl">
                <Box sx={{p: 0, pb: 0}} dir="ltr">
                    <h3>当前还在测试中，部分功能没有实现，当前只是demo阶段</h3>
                    <span>点击集群进入</span>
                    <br/>
                    <ProTable
                        scroll={{
                            x: 500,
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
            </Spin>
        </>
    );
}
