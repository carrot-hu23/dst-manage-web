import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, message, Popconfirm, Progress, Space, Spin, Switch, Table, Tag, Tooltip} from 'antd';
import {ClearOutlined} from '@ant-design/icons';
import {cleanAllLevelApi, cleanLevelApi, startAllLevelApi, startLevelApi} from "../../../api/8level";


function formatData(data, num) {
    return data.toFixed(num)
}


export default ({levels}) => {

    const [spin, setSpin] = useState(false)
    const [startText, setStartText] = useState("")
    const {cluster} = useParams()

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
        startLevelApi(cluster, uuid, checked).then(resp => {
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
                    <Tooltip placement="rightTop"
                             title={(<div>
                                 <div>
                                     <Space size={8}>
                                         <span>{`内存: ${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                                         <span>{`虚拟内存: ${formatData((record.Ps !== undefined ? record.Ps.VSZ : 0) / 1024, 2)}MB`}</span>
                                     </Space>
                                     <Progress  percent={record.Ps.memUage} size={'small'} />
                                 </div>
                                 <div>
                                     cpu: <Progress type="circle" percent={record.Ps.cpuUage} size={40} />
                                 </div>
                             </div>)}>
                        {record.status && <Tag color={'green'} >{text}</Tag>}
                        {!record.status && <Tag color={'default'} >{text}</Tag>}
                    </Tooltip>
                </div>
            ),
        },
        {
            title: '内存',
            dataIndex: 'mem',
            key: 'mem',
            render: (_, record) => (
                <>
                    <span>{`${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            align: 'right',
            hideInSearch: true,
            render: (_, record) => (
                <Space size="middle" wrap>
                    <Popconfirm
                        title={`清理 ${record.levelName} 世界`}
                        description={"点击后，将删除存储的 session save 等文件，存储存档文件将会删除"}
                        onConfirm={() => {
                            const levels = []
                            levels.push(record.uuid)
                            cleanLevelApi(cluster, levels)
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
                        <ClearOutlined/>
                        
                    </Popconfirm>

                    <Switch checked={record.status}
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
                paddingBottom: '16px',
            }} size={16}>
                <Popconfirm
                    title={`启动世界`}
                    onConfirm={() => {
                        setSpin(true)
                        setStartText("正在一键启动")
                        startAllLevelApi(cluster, true)
                            .then(resp=>{
                                if (resp.code === 200) {
                                    message.success("启动成功")
                                } else {
                                    message.error("启动成功")
                                }
                                setSpin(false)
                            })
                    }}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    >
                    <Button
                        color="primary" variant="filled"
                    >
                        启动存档
                    </Button>
                </Popconfirm>

                <Popconfirm
                    title={`关闭世界`}
                    onConfirm={() => {
                        setSpin(true)
                        setStartText("正在一键关闭")
                        startAllLevelApi(cluster, false)
                            .then(resp=>{
                                if (resp.code === 200) {
                                    message.success("关闭成功")
                                } else {
                                    message.error("关闭失败")
                                }
                                setSpin(false)
                            })
                    }}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        color="default" variant="filled"
                    >
                        关闭存档
                    </Button>
                </Popconfirm>

                <Popconfirm
                    title={`删除存档`}
                    description={"点击后，将删除存储的 session save 等文件，存储存档文件将会删除"}
                    onConfirm={() => {
                        setSpin(true)
                        setStartText("正在一键清理")
                        cleanAllLevelApi(cluster, false)
                            .then(resp=>{
                                if (resp.code === 200) {
                                    message.success("清理成功")
                                } else {
                                    message.error("清理失败")
                                }
                                setSpin(false)
                            })
                    }}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        color="default" variant="filled"
                        type={"primary"}
                    >
                        删除存档
                    </Button>
                </Popconfirm>
            </Space>
            <Spin spinning={spin} tip={startText}>
                <Table
                    className={'custom-table'}
                    scroll={{
                        x: 300,
                    }}
                    columns={columns}
                    dataSource={levels}
                    headerTitle="世界列表"
                    showHeader={false}
                    pagination={levels?.length >= 10}
                />
            </Spin>
        </>
    )
}