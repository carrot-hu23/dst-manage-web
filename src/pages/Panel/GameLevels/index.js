import React, {useEffect, useState} from 'react';
import {Button, Skeleton, Space, Switch, Table} from 'antd';
import {parse} from "lua-json";
import {getLevelListApi} from "../../../api/clusterLevelApi";

const columns = [
    {
        title: '世界名',
        dataIndex: 'levelName',
        key: 'levelName',
        width: 200,
        hideInSearch: true,
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
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
        title: '操作',
        key: 'action',
        hideInSearch: true,
        render: (_, record) => (
            <Space size="middle">
                <Button danger size={'small'} >清理世界</Button>
                <Switch checkedChildren="启动" unCheckedChildren="关闭"/>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        levelName: '森林13131313131313131313131dfsjfksdjnfklsdmf,nsdk,f',
        location: 'forest',
        days: '200 days',
        tags: ['nice', 'developer'],
        players: 8
    },
    {
        key: '2',
        levelName: '洞穴1',
        location: 'caves',
        days: '10 days',
        tags: ['nice', 'developer'],
        players: 8
    },
    {
        key: '3',
        levelName: '海钓',
        location: 'fish',
        days: '10 days',
        tags: ['nice', 'developer'],
        players: 4
    },
];

export default ({levels})=>{

    return(
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
                </Button>,
            </Space>

                <Table
                    columns={columns}
                    dataSource={levels}
                    headerTitle="世界列表"
                />
        </>
    )
}