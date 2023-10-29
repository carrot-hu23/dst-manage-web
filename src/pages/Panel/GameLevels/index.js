import React from 'react';
import {Button, Space, Switch, Table} from 'antd';
import { ClearOutlined } from '@ant-design/icons';

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

                <Button icon={<ClearOutlined />} danger type={'primary'} size={'small'} >清理</Button>
                <Switch checkedChildren="启动" unCheckedChildren="关闭"/>
            </Space>
        ),
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
                </Button>
            </Space>

                <Table
                    columns={columns}
                    dataSource={levels}
                    headerTitle="世界列表"
                />
        </>
    )
}