import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from "antd";
import {Box, Card} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addWebLinkApi, deleteWebLinkApi, getWebLinkListApi} from "../../../api/WebLinkApi";


export default () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataSource = data.slice(startIndex, endIndex);

    const [isOpenAddJobTask, setIsOpenAddJobTask] = useState(false)

    function getJobTaskList() {
        getWebLinkListApi("")
            .then(resp => {
                setData(resp.data || [])
            })
    }

    useEffect(() => {
        getJobTaskList()
    }, [])

    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'width',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: 'height',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Popconfirm
                        title="删除链接"
                        description="Are you sure to delete this job task?"
                        onConfirm={() => {
                            deleteWebLinkApi("", record.ID)
                                .then(resp => {
                                    if (resp.code !== 200) {
                                        message.error("删除链接失败")
                                    } else {
                                        message.success("删除链接成功")
                                        getJobTaskList()
                                    }
                                })
                        }}
                        onCancel={() => {

                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const AddWebLinkModal = ({isModalOpen, setIsModalOpen}) => {

        const [form] = Form.useForm()
        const handleOk = () => {
            form.validateFields().then(() => {
                setIsModalOpen(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });
            const data = form.getFieldsValue()
            addWebLinkApi("", data).then((response => {
                if (response.code !== 200) {
                    message.error("创建web链接失败")
                }
                getJobTaskList()
                message.success("创建web链接成功")
            })).catch(err => console.log(err))
        };

        return (
            <Modal title={"创建链接"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{
                        span: 6,
                    }}
                >
                    <Form.Item
                        label={"标题"}
                        name='title'
                        rules={[{required: true, message: '请输入标题',},]}
                    >
                        <Input placeholder="请输入标题"
                        />
                    </Form.Item>

                    <Form.Item
                        label={"url"}
                        name='url'
                        rules={[{required: true, message: '请输入url',},]}
                    >
                        <Input placeholder="请输入url"
                        />
                    </Form.Item>
                    <Form.Item
                        label={"width"}
                        name='width'
                        rules={[{required: true, message: '请输入width',},]}
                    >
                        <Input placeholder="请输入width"
                        />
                    </Form.Item>
                    <Form.Item
                        label={"height"}
                        name='height'
                        rules={[{required: true, message: '请输入height',},]}
                    >
                        <Input placeholder="请输入height"
                        />
                    </Form.Item>

                </Form>
            </Modal>
        )
    }

    return (<>
        <Card>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <div>
                    <Space size={16} wrap>
                        <Button type="primary" onClick={() => {
                            setIsOpenAddJobTask(true)
                        }}>
                            添加外部链接网站
                        </Button>
                    </Space>
                </div>
                <br/>
                <Table
                    scroll={{
                        x: 600,
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize,
                        total: data.length,
                        onChange: setCurrentPage,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => setPageSize(size),
                    }}
                />
            </Box>
            <AddWebLinkModal isModalOpen={isOpenAddJobTask} setIsModalOpen={setIsOpenAddJobTask}/>
        </Card>
    </>)
}