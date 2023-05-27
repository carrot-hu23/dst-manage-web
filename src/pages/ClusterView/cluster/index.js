// import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Switch,
    Radio,
    Tooltip
} from 'antd';

import { dstGameMod } from '../../../utils/dst';


const { TextArea } = Input;


const BaseCluster = (props) => (
    <Form
        // eslint-disable-next-line react/prop-types
        form={props.form}
        labelCol={{
            span: 4,
        }}
        wrapperCol={{
            span: 11,
        }}
        layout="horizontal"
        initialValues={{
            pvp: false,
            vote: true,
            players: 6
        }}
    >
        <Form.Item
            label="房间名称"
            name='clusterName'
            rules={[
                {
                    required: true,
                    message: '请输入房间名',
                },
            ]}>
            <Input
                placeholder="请输入房间名称"
                allowClear
            />
        </Form.Item>
        <Form.Item label="房间描述" name='clusterDescription'>
            <TextArea rows={4} placeholder="请输入房间描述" maxLength={200} />
        </Form.Item>
        <Form.Item label="游戏模式" name='gameMode'>
            <Radio.Group>
                {dstGameMod.map(item => <Tooltip key={item.name} title={item.description}><Radio key={item.name} value={item.name}> {item.cn} </Radio></Tooltip>)}
            </Radio.Group>
        </Form.Item>
        <Form.Item label="玩家人数" tooltip="最大玩家数量" name='maxPlayers' >
            <InputNumber />
        </Form.Item>
        <Form.Item label="pvp" valuePropName="checked" tooltip="是否开启玩家对战" name='pvp'>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Form.Item>
        <Form.Item label="投票" valuePropName="checked" tooltip="是否开启世界投票功能，关闭后世界不能投票" name='vote'>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Form.Item>
        <Form.Item label="自动暂停" valuePropName="checked" tooltip="开启后没人世界也正常运行" name='pause_when_nobody'>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Form.Item>

        <Form.Item label="房间密码" name='clusterPassword'>
            <Input placeholder="最大长度20" maxLength={20}  />
        </Form.Item>
        <Form.Item
            label="令牌"
            name='token'
            rules={[
                {
                    required: true,
                    message: '请输入令牌',
                },
            ]}>
            <Input placeholder="科雷token令牌" maxLength={200} />
        </Form.Item>
    </Form>
);
export default BaseCluster;