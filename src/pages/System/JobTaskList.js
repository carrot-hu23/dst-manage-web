import {Button, Popconfirm, Space, Table, Tag} from "antd";
import {Box,Card} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getJobTaskListApi} from "../../api/jobTaskApi";

export default ()=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataSource = data.slice(startIndex, endIndex);

    useEffect(()=>{
        getJobTaskListApi("")
            .then(resp=>{
                setData(resp.data)
            })
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
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Popconfirm
                        title="Restore the archive"
                        description="Are you sure to back up this archive?"
                        onConfirm={()=>{}}
                        onCancel={()=>{}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">停止</Button>
                    </Popconfirm>
                    <Button type="link" onClick={() => {}}>修改</Button>
                    <Button type="text" danger onClick={() => {}}>删除</Button>
                </Space>
            ),
        },
    ]

    return(<>
        <Card>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <div>
                    <Button type="primary" >创建定时任务</Button>
                    <br/>
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
        </Card>
    </>)
}