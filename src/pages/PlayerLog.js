import {useParams} from "react-router-dom";
import { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Image } from 'antd';
import { Container, Box } from '@mui/material';
import { getPlayerLog } from '../api/playerLogApi';
import { dstRoles } from '../utils/dst';


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
    // eslint-disable-next-line no-unused-vars
    render: (text, record, _, action) => (<div>
      <Image preview={false} width={36.8} src={dstRoles[record.role] || dstRoles.mod} />
    </div>)
  },
  {
    title: 'KuId',
    dataIndex: 'kuId',
    key: 'kuId',
    ellipsis: true,
    // eslint-disable-next-line no-unused-vars
    render: (text, record, _, action) => (
      <span>{`${record.kuId.slice(0, 3)}***${record.kuId.slice(record.kuId.length - 2)}`}</span>
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
        <Image preview={false} width={22} src={'https://dst.liuyh.com/static/img/dstui/icon/steam_btn.png'} />
      </a>
    </div>)

  },
  {
    title: 'Date',
    dataIndex: 'CreatedAt',
    key: 'CreatedAt',
    valueType: 'dateTime',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // ellipsis: true,
    // eslint-disable-next-line no-unused-vars
    render: (text, record, _, action) => (<div>
      {record.action === '[JoinAnnouncement]' && <span>加入房间</span>}
      {record.action === '[LeaveAnnouncement]' && <span>离开房间</span>}
      {record.action === '[DeathAnnouncement]' && <span>死亡</span>}
      {record.action === '[ResurrectAnnouncement]' && <span>复活</span>}
      {record.action === '[Say]' && <span>聊天</span>}
    </div>)
  },
  {
    title: 'ActionDesc',
    dataIndex: 'actionDesc',
    key: 'actionDesc',
    ellipsis: true,
  },
];

export default function PlayerLog() {
  const actionRef = useRef();
  const {cluster} = useParams()

  return (
    <>
      {/* <Helmet>
        <title> Player Log </title>
      </Helmet> */}
      <Container maxWidth="xl">
          <Box sx={{ p: 0, pb: 0 }} dir="ltr">
            <ProTable
              scroll={{
                x: 500,
              }}
              columns={columns}
              actionRef={actionRef}
              cardBordered
              request={async (params = {}, sort, filter) => {
                console.log(sort, filter);
                console.log('params', params)
                const msg = await getPlayerLog(cluster,params)
                return {
                  data: msg.data.data,
                  success: true,
                  total: msg.data.total
                };
              }}
              rowKey="ID"
              // pagination={{
              //   showSizeChanger: true,
              // }}
              pagination={{
                pageSize: 10,
                onChange: (page) => console.log(page),
              }}
            // headerTitle="饥荒服务器列表"
            />
          </Box>
      </Container>
    </>
  );
}
