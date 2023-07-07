import {Button, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Tag} from "antd";
import {Box, Card} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addJobTaskApi, deleteJobTaskApi, getJobTaskListApi} from "../../api/jobTaskApi";

const {Option} = Select;

const jobTaskEnum = {
    "backup": "备份",
    "update": "更新"
}

export default () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataSource = data.slice(startIndex, endIndex);

    const [isOpenAddJobTask, setIsOpenAddJobTask] = useState(false)

    function getJobTaskList() {
        getJobTaskListApi("")
            .then(resp => {
                setData(resp.data || [])
            })
    }
    useEffect(() => {
        getJobTaskList()
    }, [])

    const columns = [
        {
            title: 'jobId',
            dataIndex: 'jobId',
            key: 'jobId',
        },
        {
            title: 'corn 表达式',
            dataIndex: 'cron',
            key: 'cron',
        },
        {
            title: '上一次执行时间',
            dataIndex: 'prev',
            key: 'prev',
            render: (text, record) => (
                <span>{new Date(record.prev).toLocaleString()}</span>
            ),
        },
        {
            title: '下一次执行时间',
            dataIndex: 'next',
            key: 'next',
            render: (text, record) => (
                <span>{new Date(record.next).toLocaleString()}</span>
            ),
        },
        {
            title: '是否有效',
            dataIndex: 'valid',
            key: 'valid',
            render: (text, record, _, action) => (
                <>
                    {record.valid && <Tag color="green">生效中</Tag>}
                    {!record.valid && <Tag color="purple">已失效</Tag>}
                </>
            )
        },
        {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: '类型',
            dataIndex: 'category',
            key: 'category',
            render: (text, record, _, action)=> <Tag>{jobTaskEnum[record.category]}</Tag>
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Popconfirm
                        title="删除定时任务"
                        description="Are you sure to delete this job task?"
                        onConfirm={() => {
                            deleteJobTaskApi("", record.jobId)
                                .then(resp=>{
                                    if (resp.code !== 200) {
                                        message.error("删除定时任务失败")
                                    } else {
                                        message.success("删除定时任务成功")
                                        getJobTaskList()
                                    }
                                })
                        }}
                        onCancel={() => {

                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger >删除</Button>
                    </Popconfirm>

                    {/*
                    <Button type="link" onClick={() => {
                    }}>修改</Button>
                    <Button type="text" danger onClick={() => {
                    }}>删除</Button>
                    */}

                </Space>
            ),
        },
    ]

    const AddJobTaskModal = ({isModalOpen, setIsModalOpen}) => {

        const [form] = Form.useForm()
        const handleOk = () => {
            form.validateFields().then(() => {
                setIsModalOpen(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });
            const data = form.getFieldsValue()
            addJobTaskApi("", data).then((response => {
                if (response.code !== 200) {
                    message.error("创建定时任务失败")
                }
                getJobTaskList()
                message.success("创建定时任务成功")
            })).catch(err => console.log(err))
        };

        return (
            <Modal title={"创建任务"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{
                        span: 6,
                    }}
                >
                    <Form.Item
                        label={"cron 表达式"}
                        name='cron'
                        rules={[{required: true, message: '请输入cron表达式',},]}
                    >
                        <Input placeholder="请输入cron表达式"
                        />
                    </Form.Item>

                    <Form.Item
                        label={"类型"}
                        name='category'
                        rules={[{required: true, message: '请选择类型',},]}
                    >
                        <Select>
                            <Option value="backup">备份</Option>
                            <Option value="update">更新</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={"备注"}
                        name='comment'
                    >
                        <Input placeholder="备注"
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
                        <Button type="primary" onClick={() => {setIsOpenAddJobTask(true)}}>
                            创建定时任务
                        </Button>
                        <a
                            target={'_blank'}
                            href={`https://cron.qqe2.com`} rel="noreferrer" >
                            在线 corn 网站
                        </a>
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
            <AddJobTaskModal isModalOpen={isOpenAddJobTask} setIsModalOpen={setIsOpenAddJobTask}/>
        </Card>
    </>)
}