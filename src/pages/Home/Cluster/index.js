import {
  Form,
  Input,
  InputNumber,
  Switch,
  Radio,
  Tooltip,
} from 'antd';

import { dstGameMod } from '../../../utils/dst';

const { TextArea } = Input;

const HomeSetting = (props) => (
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
        players: 8,
        steam_group_only: false,
        tick_rate: 15,
        max_snapshots: 6,
        
      }}
      style={{
        maxHeight: '600px',
        overflowY: 'auto',
        padding: 16
      }}
    >
      {/* <Row>
        <Col span={8} push={4}>
        <h3>基本配置项</h3>
        </Col>
      </Row> */}
      <h3>基本配置项</h3>
      <Form.Item
        label="房间名称"
        name='cluster_name'
        rules={[
          {
            required: true,
            message: '请输入房间名',
          },
        ]}>
        <Input placeholder="请输入房间名称" allowClear
        />
      </Form.Item>
      <Form.Item label="房间描述" name='cluster_description'>
        <TextArea rows={4} placeholder="请输入房间描述" maxLength={200} />
      </Form.Item>
      <Form.Item 
        label="游戏模式"
        name='game_mode'
        rules={[
          {
            required: true,
            message: '请选择游戏模式',
          },
        ]}
        >
          <Radio.Group>
          {dstGameMod.map(item =>  <Tooltip key={item.name} title={item.description}><Radio key={item.name} value={item.name}> {item.cn} </Radio></Tooltip>)}
          </Radio.Group>
        </Form.Item>

      <Form.Item label="玩家人数" tooltip="最大玩家数量" name='max_players' >
        <InputNumber />
      </Form.Item>
      <Form.Item label="pvp" valuePropName="checked" tooltip="是否开启玩家对战" name='pvp'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>
      <Form.Item label="投票" valuePropName="checked" tooltip="是否开启世界投票功能，关闭后世界不能投票" name='vote'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>
      <Form.Item label="自动暂停" valuePropName="checked" tooltip="开启后世界没人将自动暂停" name='pause_when_nobody'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>

      <Form.Item label="房间密码" name='cluster_password'>
        <Input placeholder="最大长度20" maxLength={20} />
      </Form.Item>
      <Form.Item
        label="令牌"
        name='cluster_token'
        rules={[
          {
            required: true,
            message: '请输入令牌',
          },
        ]}>
        <Input placeholder="科雷token令牌" maxLength={200} />
      </Form.Item>

      <Form.Item
        label="预留位"
        name='whitelist_slots'>
        <InputNumber placeholder="预留位" maxLength={200} />
      </Form.Item>

      <Form.Item
        label="通信频率"
        name='tick_rate'>
        <InputNumber placeholder="通信次数" maxLength={200} />
      </Form.Item>

      <Form.Item label="控制台" valuePropName="checked" tooltip="关闭后世界不能使用控制台" name='console_enabled'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>

      
      <Form.Item
        label="快照数量"
        name='max_snapshots'>
        <InputNumber placeholder="max_snapshots" maxLength={200} />
      </Form.Item>

      <h3>多世界配置项</h3>
      <Form.Item label="多世界" valuePropName="checked" tooltip="shard_enabled" name='shard_enabled'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>

      
      <Form.Item
        label="从世界ip"
        name='bind_ip'
        tooltip="bind_ip"
        >
        <Input placeholder="bind_ip" maxLength={200} />
      </Form.Item>

      <Form.Item
        label="主世界ip"
        name='master_ip'
        tooltip="master_ip"
        >
        <Input placeholder="master_ip" maxLength={200} />
      </Form.Item>

      <Form.Item
        label="通信端口"
        name='master_port'>
        <InputNumber placeholder="master_port" maxLength={200} />
      </Form.Item>

      <Form.Item
        label="通信密码"
        name='cluster_key'>
        <Input placeholder="cluster_key" maxLength={200} />
      </Form.Item>
      
      <h3>Steam 配置项</h3>
      <Form.Item label="仅Steam群组进入" valuePropName="checked" name='steam_group_only'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>

      <Form.Item
        label="Steam群组ID"
        name='steam_group_id'>
        <InputNumber placeholder="steam_group_id" maxLength={200} />
      </Form.Item>

      <Form.Item
        label="群组管理员"
        name='steam_group_admins'>
        <Input placeholder="steam_group_admins" maxLength={200} />
      </Form.Item>

    </Form>
  );
export default HomeSetting;