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
                            tooltip={"游戏风格\n" +
                                "主要有社交、合作、竞争、疯狂四种。\n" +
                                "展示该房间的游戏倾向，是友好社交还是兵戎相见。但不会影响游戏内容。\n"}
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
                        <Form.Item
                            label={t('max_players')}
                            tooltip="人数越多，服务器压力越大。对云服而言，1c2g推荐4人，2c4g推荐6-8人。"
                            name='max_players'
                        >
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
                            ]}
                            tooltip={"服务器令牌\n" +
                                "维持服务器独立运行的凭证，符合要求的令牌才可以开启服务器。创建令牌的玩家将自动成为使用该令牌开启的服务器的管理员。"}
                        >
                            <Input.Password placeholder="科雷token令牌" />
                        </Form.Item>
                        <Form.Item label="pvp" valuePropName="checked" tooltip="是否开启玩家对战" name='pvp'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>
                        <Form.Item label={t('vote_enabled')} valuePropName="checked"
                                   tooltip="开启后可通过投票进行踢出玩家、回档、重置世界操作。"
                                   name='vote_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>
                        <Form.Item label={t('pause_when_nobody')} valuePropName="checked" tooltip="世界没人时将自动暂停"
                                   name='pause_when_nobody'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label={t('whitelist_slots')}
                            name='whitelist_slots'
                            tooltip={"为白名单内玩家保留的位置数量设置后，该数量的位置只允许白名单内玩家占据，其他玩家共享剩余的位置。\n" +
                                "关于保留栏位与白名单，实际保留栏位并不等于设置的保留栏位，而是设置保留栏位与白名单中ID数量两者中较小的那个值。"}
                        >
                            <InputNumber placeholder="预留位" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('tick_rate')}
                            name='tick_rate'
                            tooltip={"客户端与服务器之间每秒通信的次数\n" +
                                "性能满足的情况下，通信频率越高，游戏越流畅、体验越好，但会大幅提高服务器的运行压力。取值应为可被60整除的值，如15、20、30、60等。"}
                        >
                            <InputNumber placeholder="通信次数" maxLength={200}/>
                        </Form.Item>

                        <Form.Item label={t('console_enabled')} valuePropName="checked" tooltip="关闭后世界不能使用控制台"
                                   name='console_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>


                        <Form.Item
                            label={t('max_snapshots')}
                            name='max_snapshots'
                            tooltip={"服务器保留的快照数量上限\n" +
                                "默认情况下，服务器会在新的一天开始时对服务器存档，生成一份快照。保留的快照数量决定了可回档的天数上限。\n" +
                                "在世界内有玩家存在时，服务器不会清理该世界的快照。"}
                        >
                            <InputNumber placeholder="max_snapshots" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('cluster_language')}
                            name='cluster_language'
                            tooltip={"服务器内信息使用的语言，如人物台词等。"}
                        >
                            <Input placeholder="zh"/>
                        </Form.Item>

                        <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>{t('Shard Setting')}</span></Divider>

                        <Form.Item label={t('shard_enabled')} valuePropName="checked" tooltip="shard_enabled。是否为多世界模式。
对于饥荒而言，一个世界代表一个独立的服务器进程，所以地上加地下一共两个世界也是多服务器模式。
多世界时会根据玩家设置,将某个世界作为主世界，其他世界为从世界。
仅在确定只需要开启单世界时关闭。"
                                   name='shard_enabled'>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                        </Form.Item>


                        <Form.Item
                            label={t('bind_ip')}
                            name='bind_ip'
                            tooltip="bind_ip。从服务器IP
从服务器的IPv4地址，主服务器监听此IP并与其连接。
主从服务器都在同一计算机上时，填127.0.0.1(表示本机);否则填0.0.0.0(表示所有IP ) 。
只需要为主服务器设置此项。"
                        >
                            <Input.Password placeholder="bind_ip" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('master_ip')}
                            name='master_ip'
                            tooltip="master_ip。主服务器IP
主服务器的IPv4地址，从服务器请求此IP并与其连接。
主从服务器都在同一计算机上时，填127.0.0.1 ;否则填主服务器IP只需要为从服务器设置此项"
                        >
                            <Input.Password placeholder="master_ip" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('master_port')}
                            name='master_port'
                            tooltip={"世界通信端口\n" +
                                "主服务器将监听/从服务器请求与主服务器连接的UDP端口。\n" +
                                "主从服务器应设为相同值"}
                        >
                            <InputNumber placeholder="master_port" maxLength={200}/>
                        </Form.Item>

                        <Form.Item
                            label={t('cluster_key')}
                            name='cluster_key'
                            tooltip={"世界验证密码\n" +
                                "多服务器开服时，服务器间的验证密码"}
                        >
                            <Input placeholder="cluster_key" maxLength={200}/>
                        </Form.Item>

                        <Divider><span style={{fontSize: "14px", fontWeight: "600"}}>{t('Steam Setting')}</span></Divider>

                        <Form.Item
                            label={t('steam_group_id')}
                            name='steam_group_id'
                            tooltip={"steam群组编号\n" +
                                "每个steam群组都有唯一的一串数字与其对应，在这里填写群组编号用于绑定steam群组。\n" +
                                "绑定后服务器将在群组成员的大厅中优先显示，并附有红色、黄色或白色小旗子标志。"}
                        >
                            <Input placeholder="steam_group_id" />
                        </Form.Item>

                        <Form.Item label={t('steam_group_only')} valuePropName="checked" name='steam_group_only'
                                   tooltip={"是否仅允许steam群组成员加入\n" +
                                       "开启后只有群组成员才可加入，其他玩家不可加入。"}
                        >
                            <Switch checkedChildren={t('open')} unCheckedChildren={t('close')} />
                        </Form.Item>

                        <Form.Item
                            valuePropName="checked"
                            label={t('steam_group_admins')}
                            name='steam_group_admins'
                            tooltip={"是否将steam群组管理员设为游戏管理员\n" +
                                "                            开启后，steam群组的管理员将会自动拥有游戏内管理员身份。"}
                        >
                            <Switch checkedChildren={t('open')} unCheckedChildren={t('close')} />
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