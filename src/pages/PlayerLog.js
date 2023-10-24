import {useParams} from "react-router-dom";
import {useRef} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Button, Image, message, Popconfirm, Tag, Typography} from 'antd';
import {Container, Box} from '@mui/material';

import {getPlayerLog} from '../api/playerLogApi';
import {dstRoles, dstRolesMap} from '../utils/dst';
import {addBlackListPlayerListApi} from "../api/playerApi";


const { Text } = Typography;

const playerActionEnum = {
    "[LeaveAnnouncement]": '离开房间',
    "[JoinAnnouncement]": '加入房间',
    "[Say]": '聊天',
    "[DeathAnnouncement]": '死亡',
    "[ResurrectAnnouncement]": '复活',
}

export default function PlayerLog() {
    const actionRef = useRef();
    const {cluster} = useParams()

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            // ellipsis: true,
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
            // eslint-disable-next-line no-unused-vars
            //  <Text copyable>{`${record.kuId.slice(0, 3)}***${record.kuId.slice(record.kuId.length - 2)}`}</Text>
            render: (text, record, _, action) => (
                <Text>{`${record.kuId.slice(0, 3)}***${record.kuId.slice(record.kuId.length - 2)}`}</Text>
            )
        },
        {
            title: 'SteamId',
            dataIndex: 'steamId',
            key: 'steamId',
            // ellipsis: true,
            align: 'left',
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                <span>{`${record.steamId.slice(0, 5)}***${record.steamId.slice(record.steamId.length - 2)}  `}</span>
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/profiles/${record.steamId}`}
                    style={{
                        background: 'url(https://dst.liuyh.com/static/img/dstui/icon_button_normal.png)'
                    }} rel="noreferrer">
                    <Image preview={false} width={22}
                           src={'https://dst.liuyh.com/static/img/dstui/icon/steam_btn.png'}/>
                </a>
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
            search: false
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
            ellipsis: true,
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
                <Box sx={{p: 0, pb: 0}} dir="ltr">
                    <ProTable
                        scroll={{
                            x: 500,
                        }}
                        columns={columns}
                        actionRef={actionRef}
                        cardBordered
                        request={async (params = {}, sort, filter) => {
                            // console.log(sort, filter);
                            console.log('params', params)
                            const resp = await getPlayerLog(cluster, params)
                            return {
                                data: resp.data.data,
                                success: true,
                                total: resp.data.total
                            };
                        }}
                        rowKey="ID"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false,
                            onChange: (page) => console.log(page),
                        }}
                        headerTitle="玩家日志"
                    />
                </Box>
            </Container>
        </>
    );
}
