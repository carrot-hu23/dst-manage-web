import React from 'react';
import {Space, Switch, Table, Tag} from 'antd';

const columns = [
    {
        title: '世界名',
        dataIndex: 'levelName',
        key: 'levelName',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: '世界类型',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: '天数',
        dataIndex: 'days',
        key: 'days',
    },
    {
        title: '人数',
        dataIndex: 'players',
        key: 'players',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <Switch checkedChildren="启动" unCheckedChildren="关闭"/>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        levelName: '森林1',
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

export default ()=>{
    return(
        <>
            <Table
                columns={columns}
                dataSource={data}
            />
        </>
    )
}