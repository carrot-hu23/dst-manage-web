import {useParams} from "react-router-dom";
import React, {useRef, useState} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Button, Image, message, Popconfirm, Space, Tag, Typography} from 'antd';
import {Container, Box, Card} from '@mui/material';

import {deleteLogs, getPlayerLog} from '../api/playerLogApi';
import {dstRoles, dstRolesMap} from '../utils/dst';
import {addBlackListPlayerListApi} from "../api/playerApi";
import style from "./DstServerList2/index.module.css";
import HiddenText from "./Home2/HiddenText/HiddenText";


const { Text } = Typography;

const playerActionEnum = {
    "[LeaveAnnouncement]": '离开房间',
    "[JoinAnnouncement]": '加入房间',
    "[Say]": '聊天',
    "[DeathAnnouncement]": '死亡',
    "[ResurrectAnnouncement]": '复活',
}

export default function PlayerLog() {
    const {cluster} = useParams()

    const actionRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            setSelectedRowKeys(selectedRowKeys)
        },
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            render: (text, record) => {
                return (<div className={style.icon}>{record.name}</div>)
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            ellipsis: true,
            valueEnum: dstRolesMap,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                <Image preview={false} width={36.8} src={dstRoles[record.role] || dstRoles.mod}/>
            </div>)
        },
        {
            title: 'KuId',
            dataIndex: 'kuId',
            key: 'kuId',
            ellipsis: true,
            // <Text>{`${record.kuId.slice(0, 3)}***${record.kuId.slice(record.kuId.length - 2)}`}</Text>
            render: (text, record, _, action) => <HiddenText text={record.kuId} />
        },
        {
            title: 'SteamId',
            dataIndex: 'steamId',
            key: 'steamId',
            // ellipsis: true,
            align: 'left',
            // <span>{`${record.steamId.slice(0, 5)}***${record.steamId.slice(record.steamId.length - 2)}  `}</span>
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                <Space size={4}>
                    <HiddenText text={record.steamId} />
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/profiles/${record.steamId}`}
                        style={{
                            background: 'url(./assets/dst/icon_button_normal.png)'
                        }} rel="noreferrer">
                        <Image preview={false} width={22}
                               src={'./assets/dst/steam_btn.png'}/>
                    </a>
                </Space>
            </div>)

        },
        {
            title: 'Date',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            valueType: 'dateTime',
            search: false
        },
        {
            title: 'Ip',
            dataIndex: 'ip',
            key: 'ip',
            valueType: 'string',
            search: false,
            render: (text, record, _, action) => <HiddenText text={record.ip} />
        },
        {
            title: '地区',
            dataIndex: 'region',
            key: 'region',
            valueType: 'string',
            search: false,
            // render: (text, record, _, action) => <HiddenText text={record.ip} />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            valueEnum: playerActionEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.action === '[JoinAnnouncement]' && <Tag color="magenta">加入</Tag>}
                {record.action === '[LeaveAnnouncement]' &&  <Tag>离开</Tag>}
                {record.action === '[DeathAnnouncement]' && <Tag color="red">死亡</Tag>}
                {record.action === '[ResurrectAnnouncement]' && <Tag color="green">复活</Tag>}
                {record.action === '[Say]' && <Tag color="gold">聊天</Tag>}
            </div>)
        },
        {
            title: 'ActionDesc',
            search: false,
            dataIndex: 'actionDesc',
            key: 'actionDesc',
            render: (text, record) => (
                <div className={style.icon} style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    {text}
                </div>
            ),
        },
        {
            title: '操作',
            key: 'index',
            search: false,
            render: (text, record, _, action) => (
                <div>
                    <Popconfirm
                        title="是否拉黑"
                        onConfirm={() => {
                            addBlackListPlayerListApi(cluster, [record.kuId])
                                .then(resp => {
                                    if (resp.code === 200) {
                                        message.success("拉黑成功")
                                    }
                                })
                        }}
                        onCancel={() => {
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size={'small'} type={'primary'} danger>拉黑</Button>
                    </Popconfirm>
                </div>)
        },
    ];


    return (
        <>
            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 1}} dir="ltr">

                        <ProTable
                            scroll={{
                                x: 500,
                            }}
                            // cardBordered
                            columns={columns}
                            actionRef={actionRef}
                            rowSelection={rowSelection}
                            request={async (params = {}, sort, filter) => {
                                // console.log(sort, filter);
                                console.log('params', params)
                                const resp = await getPlayerLog(cluster, params)
                                setData(resp.data)
                                return {
                                    data: resp.data.data,
                                    success: true,
                                    total: resp.data.total
                                };
                            }}
                            rowKey="ID"
                            pagination={{
                                current: currentPage,
                                pageSize,
                                total: data.total,
                                onChange: setCurrentPage,
                                showSizeChanger: true,
                                onShowSizeChange: (current, size) => setPageSize(size),
                            }}
                            headerTitle="玩家日志"
                            toolBarRender={() => [
                                <Button type="primary" danger onClick={()=>{
                                    deleteLogs("", {
                                        ids: selectedRowKeys
                                    }).then(resp=>{
                                        if (resp.code === 200) {
                                            message.success("删除成功")
                                            actionRef.current?.reload();
                                        }
                                    })
                                }}>
                                    删除
                                </Button>
                            ]}
                        />
                    </Box>
                </Card>
            </Container>
        </>
    )
}