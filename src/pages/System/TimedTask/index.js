import React, {useEffect, useState} from "react";

import {Button, Form, Input, message, Modal, Popconfirm, Select, Space, Table, Tag,InputNumber,TimePicker} from "antd";
import {Box, Card} from "@mui/material";

import { converter } from 'react-js-cron'

import {addJobTaskApi, deleteJobTaskApi, getJobTaskListApi} from "../../../api/jobTaskApi";

const {Option} = Select;
const { TextArea } = Input;

const jobTaskEnum = {
    "backup": "备份存档",
    "update": "更新游戏",
    "start": "启动游戏",
    "stop": "停止游戏",
    "startMaster": "启动森林",
    "stopMaster": "停止森林",
    "startCaves": "启动洞穴",
    "stopCaves": "停止洞穴",
    "restart": "重启游戏",
    "restartMaster": "重启森林",
    "restartCaves": "重启洞穴",
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
                const {data} = resp
                setData(data || [])
            })
    }
    useEffect(() => {
        getJobTaskList()
    }, [])

    const ShowAnnouncement = ({announcement}) =>{
        if (announcement === null || announcement === undefined) {
            announcement = ""
        }
        const list = announcement.split("\n")

        return(<>
            {list.map(item=>(
                <div>
                    {item}
                </div>
            ))}
        </>)
    }

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
            title: '公告',
            dataIndex: 'announcement',
            key: 'announcement',
            render: (text, record, _, action)=> <ShowAnnouncement announcement={record.announcement} />
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

        const onChange = (time, timeString) => {
            console.log(time, timeString);
            const converted = converter.getCronStringFromValues(
                'day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
                [], // months: number[] | undefined
                [],  // monthDays: number[] | undefined
                [], // weekDays: number[] | undefined
                [time.$H], // hours: number[] | undefined
                [time.$m], // minutes: number[] | undefined
                false // humanizeValue?: boolean
            )

            console.log('cron string:', converted)

        };

        const [form] = Form.useForm()
        const handleOk = () => {
            form.validateFields().then(() => {
                setIsModalOpen(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });
            const data = form.getFieldsValue()
            console.log(data)
            const converted = converter.getCronStringFromValues(
                'day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
                [], // months: number[] | undefined
                [],  // monthDays: number[] | undefined
                [], // weekDays: number[] | undefined
                [data.date.$H], // hours: number[] | undefined
                [data.date.$m], // minutes: number[] | undefined
                false // humanizeValue?: boolean
            )
            data.cron = converted
            console.log('cron string:', converted)
            console.log(data)
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
                    initialValues={{
                        times: 1,
                        sleep: 5
                    }}
                >


                    <Form.Item
                        label={"时间"}
                        name='date'
                        rules={[{required: true, message: '请选择时间',},]}
                    >
                        <TimePicker onChange={onChange} format={'HH:mm'} />
                    </Form.Item>


                    <Form.Item
                        label={"类型"}
                        name='category'
                        rules={[{required: true, message: '请选择类型',},]}
                    >
                        <Select>
                            <Option value="backup">备份存档</Option>
                            <Option value="restart">重启世界</Option>
                            <Option value="update">更新游戏</Option>
                            <Option value="start">启动游戏</Option>
                            <Option value="stop">停止游戏</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={"备注"}
                        name='comment'
                    >
                        <Input placeholder="备注"
                        />
                    </Form.Item>
                    <Form.Item
                        label={"公告"}
                        name='announcement'
                    >
                        <TextArea rows={6} placeholder="请输入公告。tips: 发送公告后，默认 5s 后将执行操作" />
                    </Form.Item>
                    <Form.Item
                        label={"延迟"}
                        name='sleep'
                    >
                        <InputNumber
                            addonAfter="秒"
                            style={{width: 120,}}
                            placeholder="设置多少秒后执行" />
                    </Form.Item>
                    <Form.Item
                        label={"公告次数"}
                        name='times'
                    >
                        <InputNumber
                            addonAfter="次"
                            style={{width: 120,}}
                            placeholder="公告次数" />
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