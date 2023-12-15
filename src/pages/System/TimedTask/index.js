import React, {useEffect, useState} from "react";

import {
    Alert,
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Popconfirm,
    Segmented,
    Select,
    Space,
    Table,
    Tag,
    TimePicker
} from "antd";
import {Box, Card} from "@mui/material";

import {converter} from 'react-js-cron'

import {useParams} from "react-router-dom";
import {addJobTaskApi, deleteJobTaskApi, getJobTaskListApi} from "../../../api/jobTaskApi";
import {getLevelListApi} from "../../../api/clusterLevelApi";

const {Option} = Select;
const { TextArea } = Input;

const jobTaskEnum = {
    "backup": "备份存档",
    "update": "更新游戏",
    "start": "启动世界",
    "stop": "停止世界",
    "startGame": "启动所有世界",
    "stopGame": "停止所有世界",

    "restart": "重启世界",
    "regenerate": "重置世界"
}

export default () => {

    const {cluster} = useParams()

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
            title: '世界',
            dataIndex: 'levelName',
            key: 'levelName',
        },
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

        const [levels, setLevels] = useState([])
        useEffect(()=>{
            getLevelListApi()
                .then(resp => {
                    if (resp.code === 200) {
                        const levels = resp.data
                        setLevels(levels)
                    }
                })
        },[])

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

            if (activeTab === '默认') {
                data.cron = converter.getCronStringFromValues(
                    'day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
                    [], // months: number[] | undefined
                    [],  // monthDays: number[] | undefined
                    [], // weekDays: number[] | undefined
                    [data.date.$H], // hours: number[] | undefined
                    [data.date.$m], // minutes: number[] | undefined
                    false // humanizeValue?: boolean
                )
            }
            console.log(data)

            // eslint-disable-next-line no-restricted-syntax
            for (const level of levels) {
                if (level.uuid === data.levelName) {
                    data.uuid = level.uuid
                    data.levelName = level.levelName
                }
            }
            addJobTaskApi("", data).then((response => {
                if (response.code !== 200) {
                    message.error("创建定时任务失败")
                }
                getJobTaskList()
                message.success("创建定时任务成功")
            })).catch(err => console.log(err))
        };
        const [activeTab, setActiveTab] = useState('默认');

        const handleTabChange = (value) => {
            setActiveTab(value);
        };
        return (
            <Modal title={"创建任务"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Alert message={"[启动所有世界] [关闭所有世界] [备份存档] [重置世界] 这几个选择世界是没有用的，是针对所有世界的，[启动所有世界]: 先关闭，在启动（可以当作重启）"} type="warning" showIcon closable />
                <br/>
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
                    <Segmented
                        block
                        value={activeTab}
                        onChange={handleTabChange}
                        options={['默认', '自定义']}
                    />
                    <br/>
                    {activeTab === '默认' && <div>
                        <Form.Item
                            label={"时间"}
                            name='date'
                            rules={[{required: true, message: '请选择时间',},]}
                        >
                            <TimePicker onChange={onChange} format={'HH:mm'} />
                        </Form.Item>
                    </div>}
                    {activeTab === '自定义' && <div>
                        <Form.Item
                            label={"corn表达式"}
                            name='cron'
                            rules={[{required: true, message: '请输入corn表达式',},]}
                        >
                            <Input placeholder="请输入corn表达式（五位）"
                            />
                        </Form.Item>
                    </div>}
                    <Form.Item
                        label={"类型"}
                        name='category'
                        rules={[{required: true, message: '请选择类型',},]}
                    >
                        <Select>
                            <Option value="startGame">启动所有世界</Option>
                            <Option value="stopGame">关闭所有世界</Option>
                            <Option value="backup">备份存档</Option>
                            <Option value="update">更新游戏</Option>
                            <Option value="start">启动世界</Option>
                            <Option value="stop">停止世界</Option>
                            <Option value="regenerate">重置世界</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"世界"}
                        name='levelName'
                        rules={[{required: true, message: '请选择世界',},]}
                    >
                        <Select>
                            {levels.map((item,index)=>
                                <Option key={index} value={item.uuid}>{item.levelName}</Option>
                            )}
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