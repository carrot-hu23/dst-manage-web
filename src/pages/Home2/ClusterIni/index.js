import React, {useEffect, useState} from "react";

import {
    Button,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Radio,
    Switch,
    Tooltip,
    Skeleton,
    Modal,
    Typography
} from "antd";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {dstGameMod} from "../../../utils/dst";
import {getClusterIniApi, saveClusterIniApi} from "../../../api/8level";

import style from '../../DstServerList/index.module.css'
import DstEmoji from "../../DstServerList/DstEmoji";



const {TextArea} = Input;
const { Title, Paragraph, Text, Link } = Typography;

export default () => {
    const { t } = useTranslation()

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
            body.cluster.cluster_description = body.cluster.cluster_description.replace(/\n/g, "")
            console.log('body:', body);
            saveClusterIniApi("", body)
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
        getClusterIniApi("")
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
                <Modal  title="Emoj" open={open}  onCancel={()=>setOpen(false)} footer={null} >
                    <DstEmoji />
                </Modal>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={8}>
                <Skeleton loading={loading} active>
                    <Form
                        // eslint-disable-next-line react/prop-types
                        form={form}
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 19,
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
                        <Divider><span className={style.icon} style={{fontSize: "14px", fontWeight: "600"}}>{t('Base Setting')}󰀃</span></Divider>

                        <Form.Item
                            label={t('cluster_name')}
                            name='cluster_name'
                            tooltip={"已经支持了 + | [] \\ 等特殊字符了"}
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
                            <Button type={'link'} onClick={()=>setOpen(true)} >emoji</Button>
                        </Form.Item>

                        <Form.Item label={t('cluster_description')} name='cluster_description'>
                            <TextArea className={style.icon} rows={3} placeholder="请输入房间描述"/>
                        </Form.Item>
                        <Form.Item
                            label={t('game_mode')}
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
                                            {t(item.name)}
                                        </Radio>
                                    </Tooltip>)}
                            </Radio.Group>
                        </Form.Item>
                        {choose === 'customization' &&
                            <Form.Item label={t('customization_mode')} tooltip="当只有选择了“自定义模式” 这个值才会生效"
                                       name='customization_mode'>
                                <Input placeholder="自定义游戏模式" maxLength={20}/>
                            </Form.Item>
                        }
                        <Form.Item label={t('max_players')} tooltip="最大玩家数量" name='max_players'>
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label={t('cluster_password')} name='cluster_password'>
                            <Input.Password placeholder="最大长度20" />
                        </Form.Item>
                        <Form.Item
                            label={t('cluster_token')}
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
                        <Form.Item label={t('vote_enabled')} valuePropName="checked"
                                   tooltip="是否开启世界投票功能，关闭后世界不能投票"
                                   name='vote_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>
                        <Form.Item label={t('pause_when_nobody')} valuePropName="checked" tooltip="世界没人时将自动暂停"
                                   name='pause_when_nobody'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label={t('whitelist_slots')}
                            name='whitelist_slots'>
                            <InputNumber placeholder="预留位" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('tick_rate')}
                            name='tick_rate'>
                            <InputNumber placeholder="通信次数" maxLength={200}/>
                        </Form.Item>

                        <Form.Item label={t('console_enabled')} valuePropName="checked" tooltip="关闭后世界不能使用控制台"
                                   name='console_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>


                        <Form.Item
                            label={t('max_snapshots')}
                            name='max_snapshots'>
                            <InputNumber placeholder="max_snapshots" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('language')}
                            name='language'>
                            <Input placeholder="cn"/>
                        </Form.Item>

                        <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>{t('Shard Setting')}</span></Divider>

                        <Form.Item label={t('shard_enabled')} valuePropName="checked" tooltip="shard_enabled"
                                   name='shard_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>


                        <Form.Item
                            label={t('bind_ip')}
                            name='bind_ip'
                            tooltip="bind_ip"
                        >
                            <Input.Password placeholder="bind_ip" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('master_ip')}
                            name='master_ip'
                            tooltip="master_ip"
                        >
                            <Input.Password placeholder="master_ip" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('master_port')}
                            name='master_port'>
                            <InputNumber placeholder="master_port" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('cluster_key')}
                            name='cluster_key'>
                            <Input placeholder="cluster_key" maxLength={200}/>
                        </Form.Item>

                        <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>{t('Steam Setting')}</span></Divider>

                        <Form.Item label={t('steam_group_only')} valuePropName="checked" name='steam_group_only'>
                            <Switch checkedChildren={t('open')} unCheckedChildren={t('close')} defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label={t('steam_group_id')}
                            name='steam_group_id'>
                            <Input placeholder="steam_group_id" />
                        </Form.Item>

                        <Form.Item
                            label={t('steam_group_admins')}
                            name='steam_group_admins'>
                            <Input placeholder="steam_group_admins"/>
                        </Form.Item>
                        <Form.Item
                            label={t('Action')}>
                            <Button type="primary" onClick={() => onFinish()}>
                                {t('save')}
                            </Button>
                        </Form.Item>
                    </Form>
                    <br/><br/>
                    <br/><br/>
                </Skeleton>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography>

                            <Title level={4}>获取令牌</Title>
                            <Paragraph>
                                <Title level={5}>方式1: </Title>
                                访问
                                <Link
                                    href=" https://accounts.klei.com/account/game/servers?game=DontStarveTogether">klei网站</Link>
                                登录 。然后选择导航 "游戏", <Text code>点击 《饥荒：联机版》的游戏服务器 </Text>，获取令牌
                                <Title level={5}>方式2: </Title>
                                <Paragraph>
                                    在自己的电脑上启动 饥荒联机版
                                </Paragraph>
                                <Paragraph>
                                    主界面按 ~键，调出控制台，然后输入以下指令，并敲下Enter键，以生成令牌
                                    <Text code>TheNet:GenerateClusterToken()</Text>
                                    ~键，波浪号键一般位于键盘左上角，在ESC键的下方，tab键的上方，数字键1的左边
                                </Paragraph>
                                <Paragraph>
                                    令牌保存在“cluster_token.txt”的文本文件中，可以在个人文档下找到，例如：
                                    %userprofile%\Documents\Klei\DoNotStarveTogether\
                                    我的路径是下面这个，其中 132274880 可能是用户id什么的，每个人可能不相同：
                                    C:\Users\xxx\Documents\Klei\DoNotStarveTogether\132274880\cluster_token.txt
                                </Paragraph>
                            </Paragraph>

                            <Title level={4}>多台服务器串连</Title>
                            <Paragraph>
                                1
                            </Paragraph>
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        </>
    )
}