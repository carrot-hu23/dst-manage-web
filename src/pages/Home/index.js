/* eslint-disable */
import {Box, Card, Container} from "@mui/material";
import {Button, Form, Input, InputNumber, message, Radio, Skeleton, Space, Switch, Tabs, Tooltip} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {MonacoEditor} from "../NewEditor";
import {useTheme} from "../../hooks/useTheme";
import {getGameConfigApi, saveGameConfigApi} from "../../api/gameApi";


const {TextArea} = Input;

const FormOptions = ({data, changeValue})=>{
    console.log(data.options)
    data.options.RCONEnabled = data.options?.RCONEnabled === "True";
    const [form] = Form.useForm()
    form.setFieldsValue({...data.options})

    function onValuesChange(changedValues, allValues) {
        changeValue(allValues)
    }
    useEffect(()=>{
        console.log("131313")
    }, [])
    return(
        <>
        <Form
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            form={form}
            // initialValues={options}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                label="ServerName(服务器名称)"
                name="ServerName"
                tooltip={``}
            >
                <Input placeholder="服务器名称"/>
            </Form.Item>
            <Form.Item
                label="ServerDescription(服务器描述)"
                name="ServerDescription"
                tooltip={``}
            >
                <TextArea placeholder="服务器描述"/>
            </Form.Item>
            <Form.Item
                label="ServerPlayerMaxNum(服务器最大玩家数)"
                name="ServerPlayerMaxNum"
                tooltip={``}
            >
                <InputNumber placeholder="服务器最大玩家数"/>
            </Form.Item>
            <Form.Item
                label="GuildPlayerMaxNum(公会最大玩家数)"
                name="GuildPlayerMaxNum"
                tooltip={``}
            >
                <InputNumber placeholder="公会最大玩家数"/>
            </Form.Item>
            <Form.Item
                label="AdminPassword(管理员密码)"
                name="AdminPassword"
                tooltip={``}
            >
                <Input placeholder="管理员密码"/>
            </Form.Item>
            <Form.Item
                label="ServerPassword(服务器密码)"
                name="ServerPassword"
                tooltip={``}
            >
                <Input placeholder="服务器密码"/>
            </Form.Item>
            <Form.Item
                label="PublicPort(公共端口号)"
                name="PublicPort"
                tooltip={``}
            >
                <Input placeholder="公共端口号"/>
            </Form.Item>
            <Form.Item
                label="PublicIP(公共IP)"
                name="PublicIP"
                tooltip={``}
            >
                <Input placeholder="公共IP"/>
            </Form.Item>
            <Form.Item
                label="RCONEnabled(启用RCON)"
                name="RCONEnabled"
                tooltip={``}
                valuePropName="checked"
            >
                <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
            </Form.Item>
            <Form.Item
                label="RCONPort(RCON端口号)"
                name="RCONPort"
                tooltip={``}
            >
                <InputNumber placeholder="RCON端口号"/>
            </Form.Item>

            <Form.Item
                label='DeathPenalty(死亡惩罚)'
                name='DeathPenalty'
                rules={[
                    {
                        required: true,
                        message: '请选择死亡惩罚',
                    },
                ]}
            >
                <Radio.Group>
                    <Tooltip title={'无丢失,物品'}>
                        <Radio key={'None'} value={'None'}>
                            None(无)
                        </Radio>
                    </Tooltip>
                    <Tooltip title={'不带装备的丢失物品'}>
                        <Radio key={'Item'} value={'Item'}>
                            Item(物品)
                        </Radio>
                    </Tooltip>
                    <Tooltip title={'丢失物品和装备'}>
                        <Radio key={'ItemAndEquipment'} value={'ItemAndEquipment'}>
                            ItemAndEquipment(物品和装备)
                        </Radio>
                    </Tooltip>
                    <Tooltip title={'丢失所有物品、装备、伙伴(库存中)'}>
                        <Radio key={'All'} value={'All'}>
                            All(全部)
                        </Radio>
                    </Tooltip>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="PalEggDefaultHatchingTime(Pal蛋孵化时间(小时))"
                name="PalEggDefaultHatchingTime"
                tooltip={``}
            >
                <InputNumber placeholder="Pal蛋孵化时间(小时)"/>
            </Form.Item>

            <Form.Item
                label="Difficulty(难度)"
                name="Difficulty"
                tooltip={``}
            >
                <Input placeholder="难度"/>
            </Form.Item>
            <Form.Item
                label="DayTimeSpeedRate(白天时间速率)"
                name="DayTimeSpeedRate"
                tooltip={``}
            >
                <InputNumber placeholder="白天时间速率"/>
            </Form.Item>
            <Form.Item
                label="NightTimeSpeedRate(夜间时间速率)"
                name="NightTimeSpeedRate"
                tooltip={``}
            >
                <InputNumber placeholder="夜间时间速率"/>
            </Form.Item>
            <Form.Item
                label="ExpRate(经验值率)"
                name="ExpRate"
                tooltip={``}
            >
                <InputNumber placeholder="经验值率"/>
            </Form.Item>
            <Form.Item
                label="PalCaptureRate(Pal捕获率)"
                name="PalCaptureRate"
                tooltip={``}
            >
                <InputNumber placeholder="Pal捕获率"/>
            </Form.Item>
            <Form.Item
                label="PalSpawnNumRate(Pal出现率)"
                name="PalSpawnNumRate"
                tooltip={``}
            >
                <InputNumber placeholder="Pal出现率"/>
            </Form.Item>
            <Form.Item
                label="PalDamageRateAttack(Pal攻击伤害倍率)"
                name="PalDamageRateAttack"
                tooltip={``}
            >
                <InputNumber placeholder="Pal攻击伤害倍率"/>
            </Form.Item>
            <Form.Item
                label="PalDamageRateDefense(对Pal的防御伤害倍率)"
                name="PalDamageRateDefense"
                tooltip={``}
            >
                <InputNumber placeholder="对Pal的防御伤害倍率"/>
            </Form.Item>
            <Form.Item
                label="PlayerDamageRateAttack(玩家攻击伤害倍率)"
                name="PlayerDamageRateAttack"
                tooltip={``}
            >
                <InputNumber placeholder="玩家攻击伤害倍率"/>
            </Form.Item>
            <Form.Item
                label="PlayerDamageRateDefense(对玩家的防御伤害倍率)"
                name="PlayerDamageRateDefense"
                tooltip={``}
            >
                <InputNumber placeholder="对玩家的防御伤害倍率"/>
            </Form.Item>
            <Form.Item
                label="PlayerStomachDecreaceRate(玩家饥饿消耗率)"
                name="PlayerStomachDecreaceRate"
                tooltip={``}
            >
                <InputNumber placeholder="玩家饥饿消耗率"/>
            </Form.Item>
            <Form.Item
                label="PlayerStaminaDecreaceRate(玩家耐力消耗率)"
                name="PlayerStaminaDecreaceRate"
                tooltip={``}
            >
                <InputNumber placeholder="玩家耐力消耗率"/>
            </Form.Item>
            <Form.Item
                label="PlayerAutoHPRegeneRate(玩家自动HP恢复率)"
                name="PlayerAutoHPRegeneRate"
                tooltip={``}
            >
                <InputNumber placeholder="玩家自动HP恢复率"/>
            </Form.Item>
            <Form.Item
                label="PlayerAutoHpRegeneRateInSleep(玩家睡眠HP恢复率)"
                name="PlayerAutoHpRegeneRateInSleep"
                tooltip={``}
            >
                <InputNumber placeholder="玩家睡眠HP恢复率"/>
            </Form.Item>
            <Form.Item
                label="PalStomachDecreaceRate(Pal饥饿消耗率)"
                name="PalStomachDecreaceRate"
                tooltip={``}
            >
                <InputNumber placeholder="Pal饥饿消耗率"/>
            </Form.Item>
            <Form.Item
                label="PalStaminaDecreaceRate(Pal耐力消耗率)"
                name="PalStaminaDecreaceRate"
                tooltip={``}
            >
                <InputNumber placeholder="Pal耐力消耗率"/>
            </Form.Item>
            <Form.Item
                label="PalAutoHPRegeneRate(Pal自动HP恢复率)"
                name="PalAutoHPRegeneRate"
                tooltip={``}
            >
                <InputNumber placeholder="Pal自动HP恢复率"/>
            </Form.Item>
            <Form.Item
                label="PalAutoHpRegeneRateInSleep(Pal睡眠HP恢复率(Palbox中))"
                name="PalAutoHpRegeneRateInSleep"
                tooltip={``}
            >
                <InputNumber placeholder="Pal睡眠HP恢复率(Palbox中)"/>
            </Form.Item>
            <Form.Item
                label="BuildObjectDamageRate(建筑物伤害倍率)"
                name="BuildObjectDamageRate"
                tooltip={``}
            >
                <InputNumber placeholder="建筑物伤害倍率"/>
            </Form.Item>
            <Form.Item
                label="BuildObjectDeteriorationDamageRate(建筑物损耗率)"
                name="BuildObjectDeteriorationDamageRate"
                tooltip={``}
            >
                <InputNumber placeholder="建筑物损耗率"/>
            </Form.Item>
            <Form.Item
                label="CollectionDropRate(采集物品掉落倍率)"
                name="CollectionDropRate"
                tooltip={``}
            >
                <InputNumber placeholder="采集物品掉落倍率"/>
            </Form.Item>
            <Form.Item
                label="CollectionObjectHpRate(可采集对象HP倍率)"
                name="CollectionObjectHpRate"
                tooltip={``}
            >
                <InputNumber placeholder="可采集对象HP倍率"/>
            </Form.Item>
            <Form.Item
                label="CollectionObjectRespawnSpeedRate(可采集对象重生间隔)"
                name="CollectionObjectRespawnSpeedRate"
                tooltip={``}
            >
                <InputNumber placeholder="可采集对象重生间隔"/>
            </Form.Item>
            <Form.Item
                label="EnemyDropItemRate(敌人掉落物品倍率)"
                name="EnemyDropItemRate"
                tooltip={``}
            >
                <InputNumber placeholder="敌人掉落物品倍率"/>
            </Form.Item>
        </Form>
        </>
    )
}


const View=({data, changeValue, editorRef})=>{
    const ref = useRef(data)
    const {theme} = useTheme();

    useEffect(() => {
        editorRef.current.current.setValue(data)
        editorRef.current.current.onDidChangeModelContent((e) => {
            const value = editorRef.current.current.getValue();
            ref.current = value;
            changeValue(value)
        });
    }, [])
    return(
        <>
            <MonacoEditor
                ref={editorRef}
                style={{
                    "height": "370px",
                    "width": "100%"
                }}
                options={{
                    theme: theme === 'dark' ? 'vs-dark' : ''
                }}
            />
        </>
    )
}

export default () => {

    const editorRef2 = useRef()
    const [loading, setLoading] = useState(false)
    const [options,setOptions] = useState({})
    const [data,setData] = useState("")
    const [optionSettings,setOptionSettings] = useState("")

    function turn(data) {
        const split = data.split("OptionSettings=")
        const options = {}
        if (split.length === 2) {
            const str = split[1].replace(/[\n\r]/g, '', "")
            const s1 = str.replace("(","").replace(")","")
            const lines = s1.split(",");
            // console.log(lines)


            lines.forEach(line=>{
                const p = line.split("=")
                if (p.length === 2) {
                    options[p[0]] = p[1].replace('"', "").replace('"',"")
                }
            })
            // console.log(options)
        }
        return options
    }

    useEffect(() => {
        setLoading(true)
        getGameConfigApi()
            .then(resp => {
                const data = resp.data;
                setData(data)
                setOptionSettings(data)
                setOptions(turn(data))
                setLoading(false)
            })

    }, [])

    function save() {
        // const value = editorRef2.current.current.getValue();
        // console.log(value)
        // saveGameConfigApi({config: optionSettings})
        //     .then(resp=>{
        //         if (resp.code === 200) {
        //             message.success("保存成功")
        //         } else {
        //             message.error("保存失败")
        //         }
        //     })
        console.log(optionSettings)
        saveGameConfigApi({config: optionSettings})
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存成功")
                } else {
                    message.error("保存失败")
                }
            })
    }

    function changeValue1(v) {
        console.log(v)
        setOptionSettings(v)
        setOptions(turn(v))
    }
    function changeValue2(form) {
        // console.log(form)
        // editorRef2.current.current.setValue(v)
        // setOptions(turn(v))
        let str = "[/Script/Pal.PalGameWorldSettings]\nOptionSettings=("
        const  merge = {...options, ...form}
        Object.keys(merge).forEach(key=>{
            if (key === "ServerName" || key === "ServerDescription" || key === "AdminPassword" || key === "ServerPassword" || key === "PublicIP" || key === "Region" || key === "BanListURL") {
                str += `${key}="${merge[key]}",`
            } else if (key === "RCONEnabled"){
                if (merge[key])  {
                    str += `${key}=True,`
                } else {
                    str += `${key}=False,`
                }

            } else {
                str += `${key}=${merge[key]},`
            }

        })
        str = str.slice(0, -1)
        str = str + ") \n\n"
        console.log(str)
        editorRef2.current.current.setValue(str)
        setOptionSettings(str)
    }

    const items = [
        {
            key: '1',
            label: "表单编辑",
            children: <FormOptions data={{options: options}} changeValue={changeValue2} />,
            forceRender: true,
        },
        {
            key: '2',
            label: "文本编辑",
            children:  <View data={data} editorRef={editorRef2} changeValue={changeValue1} />,
            forceRender: true,
        },
    ]

    return (
        <>
            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <div>
                            <span>PalWorldSettings.ini 文件</span>
                            <Button style={{
                                float:'right'
                            }} type={'primary'} onClick={()=>save()}>保存</Button>
                        </div>
                        <br/>
                        <Skeleton loading={loading}>
                            <Tabs type="card"  items={items}/>
                        </Skeleton>

                    </Box>
                </Card>
            </Container>
        </>
    )
}