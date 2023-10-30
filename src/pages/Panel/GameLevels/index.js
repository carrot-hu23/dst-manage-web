import React, {useState} from 'react';
import {Button, message, Popconfirm, Space, Spin, Switch, Table} from 'antd';
import {ClearOutlined} from '@ant-design/icons';
import {cleanLevelApi, startLevelApi} from "../../../api/8level";

function formatData(data, num) {
    return data.toFixed(num)
}


export default ({levels}) => {

    const [spin, setSpin] = useState(false)
    const [startText, setStartText] = useState("")

    const statusOnClick = (checked, event, levelName, uuid) => {
        let prefix
        if (checked) {
            prefix = "启动"
            setStartText(`正在启动${levelName}`)
        } else {
            prefix = "关闭"
            setStartText(`正在关闭${levelName}`)
        }
        setSpin(true)
        startLevelApi("", uuid, checked).then(resp => {
            if (resp.code !== 200) {
                message.error(`${prefix}${levelName}失败${resp.msg}`)
                message.warning("请检查饥荒服务器路径是否设置正确")
            } else {
                message.success(`正在${prefix}${levelName}`)
            }
            setSpin(false)
            setStartText("")
        })
    }

    const columns = [
        {
            title: '世界名',
            dataIndex: 'levelName',
            key: 'levelName',
            hideInSearch: true,
            render: (text, record) => (
                <div style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    {text}
                </div>
            ),
        },
        {
            title: '世界类型',
            dataIndex: 'location',
            key: 'location',
            hideInSearch: true,
        },
        {
            title: '内存',
            dataIndex: 'mem',
            key: 'mem',
            render: (_, record) => (
                <Space wrap>
                    <span>{`${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                    <span>{`${formatData((record.Ps !== undefined ? record.Ps.VSZ : 0) / 1024, 2)}MB`}</span>
                </Space>
            ),
        },
        {
            title: '操作',
            key: 'action',
            hideInSearch: true,
            render: (_, record) => (
                <Space size="middle" wrap>
                    <Popconfirm
                        title={`清理 ${record.levelName} 世界`}
                        description="将会删除 save session 文件等内容，请自行做好备份"
                        onConfirm={() => {
                            const levels = []
                            levels.push(record.uuid)
                            cleanLevelApi("", levels)
                                .then(resp=>{
                                    if (resp.code === 200) {
                                        message.success("清理成功")
                                    } else {
                                        message.error("清理失败")
                                    }
                                })
                                .catch(error=>{
                                    console.log(error)
                                    message.error("清理失败")
                                })
                        }}
                        onCancel={() => {

                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<ClearOutlined/>} danger type={'primary'} size={'small'}>清理</Button>
                    </Popconfirm>

                    <Switch defaultChecked={record.status}
                            checkedChildren="启动"
                            unCheckedChildren="关闭"
                            onClick={(checked, event) => {
                                statusOnClick(checked, event, record.levelName, record.uuid)
                            }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Space style={{
                paddingTop: '16px',
                padding: '8px'
            }} size={16}>
                <Button
                    size={'middle'}
                    type="primary"
                >
                    一键启动
                </Button>
                <Button
                    size={'middle'}
                >
                    一键关闭
                </Button>
            </Space>
            <Spin spinning={spin} description={startText}>
                <Table
                    columns={columns}
                    dataSource={levels}
                    headerTitle="世界列表"
                />
            </Spin>
        </>
    )
}