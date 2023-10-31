/* eslint-disable no-unused-vars */

import React, {useState} from 'react';

import {ProTable} from '@ant-design/pro-components';
import {Container, Box} from '@mui/material';
import {Button, Modal, Image, Skeleton, Card, message} from 'antd';
import {dstHomeListApi, dstHomeDetailApi, dstHomeListApi2, dstHomeDetailApi2} from '../../api/dstApi';

import HomeDetail from './home';

import style from "./index.module.css"


const DstServerList = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    // 对话框的loading
    const [loading, setLoading] = useState(true);

    // 房间信息
    const [homeInfo, setHomeInfo] = useState({});

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setLoading(true)
    };

    const viewHomeDetail = (record) => {
        console.log(record.RowId)
        console.log(record.Region)

        setIsModalOpen(true);

        dstHomeDetailApi2(record.RowId).then(response => {
            setLoading(false)
            console.log("response", response)
            setHomeInfo(response)

        })
    }

    const columns = [
        {
            title: '房间名',
            dataIndex: 'Name',
            key: 'Name',
            copyable: true,
            width: 300,
            render: (text, record) => {
                return (<div className={style.icon}>{record.Name}</div>)
            }
        },
        {
            title: '当前人数',
            key: 'Maxconnections',
            render: (text, record, _, action) => (
                <div>{record.Connected}/{record.MaxConnections}
                    <Image
                        preview={false}
                        width={20}
                        src="https://dst.liuyh.com/static/img/dstui/icon/players.png"
                    />

                </div>
            ),
            sorter: (a, b) => b.connected - a.connected,
            align: 'right '
        },
        {
            title: '游戏模式',
            key: 'Mode',
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>{record.Mode}</div>),
        },
        {
            title: '季节',
            key: 'Season',
            dataIndex: 'Season',
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.Season === '春' && (
                    // <div>春季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/spring.png"
                    />
                )}
                {record.Season === '夏' && (
                    // <div>夏季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/summer.png"
                    />
                )}
                {record.Season === '秋' && (
                    // <div>秋季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/autumn.png"
                    />
                )}
                {record.Season === '冬' && (
                    // <div>冬季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/winter.png"
                    />
                )}

            </div>),
        },
        {
            disable: true,
            title: '密码',
            key: 'Password',
            dataIndex: 'Password',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                open: {
                    key: '1111',
                    text: '有密码',
                    status: true,
                },
                closed: {
                    key: '1112',
                    text: '无密码',
                    status: false,
                },
            },
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.Password === true && (
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/password.png"
                    />

                    // <LockOutlined />
                )}
            </div>),
        },
        {
            disable: true,
            title: '模组',
            key: 'Mods',
            dataIndex: 'Mods',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                false: {
                    key: '1113',
                    text: '无模组',
                    status: false,
                },
                true: {
                    key: '1114',
                    text: '有模组',
                    status: true,
                },

            },
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.Mods === true && (
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/mods.png"
                    />

                    // <LockOutlined />
                )}
            </div>),
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                // eslint-disable-next-line react/jsx-key
                (<div>
                    <Button type="link" onClick={() => {
                        viewHomeDetail(record)
                    }} key={record.RowId}>查看详情</Button>

                </div>)
            ],
        },
    ];


    return (
        <>
            <Modal
                getContainer={false}
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}

            >
                <Skeleton title loading={loading} active>
                    <div style={{
                        height: 500
                    }}>
                        <HomeDetail home={homeInfo}/>
                    </div>
                </Skeleton>
            </Modal>

            <Container maxWidth="xxl">
                <Box sx={{p: 0, pb: 0}} dir="ltr">
                    <ProTable
                        columns={columns}
                        cardBordered
                        request={async (params = {}, sort, filter) => {
                            console.log(sort, filter);
                            console.log('params', params)
                            const msg = await dstHomeListApi2(params)
                            return {
                                data: msg.List,
                                success: true,
                                total: msg.AllCount
                            };
                        }}
                        scroll={{
                            x: 600,
                        }}
                        rowKey="RowId"
                        pagination={{
                            pageSize: 10,
                            onChange: (page) => console.log(page),
                        }}
                        headerTitle="饥荒服务器列表"
                        tableAlertRender={({selectedRowKeys, selectedRows, onCleanSelected}) => false}
                    />
                </Box>
            </Container>
        </>
    );

};

export default DstServerList