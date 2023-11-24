import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Button, Divider, Form, Input, InputNumber, message, Radio, Switch, Tooltip, Skeleton, Modal} from "antd";

import {dstGameMod} from "../../../utils/dst";
import {getClusterIniApi, saveClusterIniApi} from "../../../api/8level";

import style from '../../DstServerList/index.module.css'
import DstEmoji from "../../DstServerList/DstEmoji";


const {TextArea} = Input;

export default () => {
    const {cluster} = useParams()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [choose, setChoose] = useState("survival");
    const onRadioChange = (e) => {
        setChoose(e.target.value);
    }
    const onFinish = () => {

        form.validateFields().then(() => {
            const body = {
                cluster: form.getFieldValue(),
                token: form.getFieldValue().cluster_token
            }
            console.log('body:', body);
            saveClusterIniApi(cluster, body)
                .then(resp=>{
                    if (resp.code === 200) {
                        message.success("保存配置成功")
                    } else {
                        message.error("保存配置失败")
                    }
                })
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

    }

    useEffect(() => {
        setLoading(true)
        getClusterIniApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("获取配置成功")
                    form.setFieldsValue({...resp.data.cluster,...{cluster_token:resp.data.token}})
                } else {
                    message.error("获取配置失败")
                }
                setLoading(false)
            })
    }, [])

    const [open,setOpen] = useState(false)

    return (
        <>
            <div className={`${style.antInput} scrollbar`}
                 style={{
                     height: '64vh',
                     overflowY: 'auto',
                 }}
            >
                <Modal  title="饥荒Emoj" open={open}  onCancel={()=>setOpen(false)} footer={null} >
                    <DstEmoji />
                </Modal>


                <Skeleton loading={loading} active>
                    <Form
                        // eslint-disable-next-line react/prop-types
                        form={form}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        layout="horizontal"
                        initialValues={{
                            pvp: false,
                            vote_enabled: true,
                            players: 8,
                            steam_group_only: false,
                            tick_rate: 15,
                            max_snapshots: 6,
                            bind_ip: '127.0.0.1'
                        }}
                    >
                        <Divider><span className={style.icon} style={{fontSize: "14px", fontWeight: "600"}}>基本配置项󰀃</span></Divider>

                        <Form.Item
                            label="房间名称"
                            name='cluster_name'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入房间名',
                                },
                            ]}>
                            <Input rootClassName={style.icon} placeholder="请输入房间名称" allowClear
                            />
                        </Form.Item>

                        <Form.Item label="-">
                            <Button type={'link'} onClick={()=>setOpen(true)} >查看emoji</Button>
                        </Form.Item>

                        <Form.Item label="房间描述" name='cluster_description'>
                            <TextArea className={style.icon} rows={4} placeholder="请输入房间描述" maxLength={200}/>
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
                            onChange={onRadioChange}
                        >
                            <Radio.Group>
                                {dstGameMod.map(item =>
                                    <Tooltip key={item.name} title={item.description}>
                                        <Radio key={item.name} value={item.name}>
                                            {item.cn}
                                        </Radio>
                                    </Tooltip>)}
                            </Radio.Group>
                        </Form.Item>
                        {choose === 'customization' &&
                            <Form.Item label="自定义游戏模式" tooltip="当只有选择了“自定义模式” 这个值才会生效"
                                       name='customization_mode'>
                                <Input placeholder="自定义游戏模式" maxLength={20}/>
                            </Form.Item>
                        }
                        <Form.Item label="玩家人数" tooltip="最大玩家数量" name='max_players'>
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="房间密码" name='cluster_password'>
                            <Input.Password placeholder="最大长度20" />
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
                            <Input.Password placeholder="科雷token令牌" />
                        </Form.Item>
                        <Form.Item label="pvp" valuePropName="checked" tooltip="是否开启玩家对战" name='pvp'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>
                        <Form.Item label="投票" valuePropName="checked"
                                   tooltip="是否开启世界投票功能，关闭后世界不能投票"
                                   name='vote_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>
                        <Form.Item label="自动暂停" valuePropName="checked" tooltip="世界没人时将自动暂停"
                                   name='pause_when_nobody'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label="预留位"
                            name='whitelist_slots'>
                            <InputNumber placeholder="预留位" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label="通信频率"
                            name='tick_rate'>
                            <InputNumber placeholder="通信次数" maxLength={200}/>
                        </Form.Item>

                        <Form.Item label="控制台" valuePropName="checked" tooltip="关闭后世界不能使用控制台"
                                   name='console_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>


                        <Form.Item
                            label="快照数量"
                            name='max_snapshots'>
                            <InputNumber placeholder="max_snapshots" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label="游戏语言"
                            name='language'>
                            <Input placeholder="cn"/>
                        </Form.Item>

                        <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>多世界配置项</span></Divider>

                        <Form.Item label="多世界" valuePropName="checked" tooltip="shard_enabled"
                                   name='shard_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>


                        <Form.Item
                            label="绑定ip"
                            name='bind_ip'
                            tooltip="bind_ip"
                        >
                            <Input.Password placeholder="bind_ip" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label="主世界ip"
                            name='master_ip'
                            tooltip="master_ip"
                        >
                            <Input.Password placeholder="master_ip" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label="通信端口"
                            name='master_port'>
                            <InputNumber placeholder="master_port" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label="通信密码"
                            name='cluster_key'>
                            <Input placeholder="cluster_key" maxLength={200}/>
                        </Form.Item>

                        <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>Steam 配置项</span></Divider>

                        <Form.Item label="仅Steam群组进入" valuePropName="checked" name='steam_group_only'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label="Steam群组ID"
                            name='steam_group_id'>
                            <Input placeholder="steam_group_id" />
                        </Form.Item>

                        <Form.Item
                            label="群组管理员"
                            name='steam_group_admins'>
                            <Input placeholder="steam_group_admins"/>
                        </Form.Item>
                        <Form.Item
                            label="操作">
                            <Button type="primary" onClick={() => onFinish()}>
                                保存配置
                            </Button>
                        </Form.Item>
                    </Form>
                    <br/><br/>
                    <br/><br/>
                </Skeleton>
            </div>
        </>
    )
}