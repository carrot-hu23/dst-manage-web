/* eslint-disable */
import {
    Button,
    Form,
    Input,
    InputNumber,
    Space,
    Switch,
    Tabs,
    Alert,
    Divider,
    Skeleton, message, Select,
} from 'antd';
import {Box, Card, Container} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {format, parse} from "lua-json";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

import {getLevelListApi, updateLevelsApi} from "../../../api/clusterLevelApi";


function parseWorldConfig(modoverrides, workshopId) {
    try {
        const object = parse(modoverrides)
        // workshop-1754389029
        if (object === null) {
            return []
        }
        const mod = object[workshopId]
        if (mod === null || mod === undefined || mod.configuration_options === undefined || mod.configuration_options.world_config === undefined) {
            return []
        }

        const world_config = mod.configuration_options.world_config
        console.log("lua to js", world_config)
        const keys = Object.keys(world_config)
        const items = []
        for (const key of keys) {
            items.push({
                id: key,
                name: world_config[key].name,
                category: world_config[key].category,
                galleryful: world_config[key].galleryful,
                invisible: world_config[key].invisible,
                extra: world_config[key].extra,
                is_cave: world_config[key].is_cave,
                note: world_config[key].note,
                desc: world_config[key].desc,
            })
        }
        return items
    } catch (error) {
        console.log(error)
        return []
    }
}


export default () => {

    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()
    const [workshopId, setWorkshopId] = useState("workshop-1754389029")

    const updateWorkshopId = (workshopId) => {
        setWorkshopId(workshopId)
        // 重新读取配置
        form.setFieldsValue({
            world_config: parseWorldConfig(levels[0].modoverrides, workshopId)
        })
    }

    const saveWorkshop = ()=>{

        const world_config =  form.getFieldValue().world_config
        if (world_config === null || world_config === undefined) {
            message.warning("不能为空")
            return
        }
        world_config.forEach(item => {
            if (item !== null || item !== undefined) {
                Object.keys(item).forEach(key => {
                    if (item[key] === undefined) {
                        delete item[key];
                    }
                });
            }

        })
        // 转成对象
        const object = {}
        if (world_config === null || world_config === undefined) {
            message.warning("不能为空")
            return
        }
        world_config.forEach(item => {
            const temp = {...item}
            delete temp['id']
            object[item.id] = temp
        })

        const levels2 = [...levels]
        for (let level2 of levels2) {
            let oldValue = level2.modoverrides
            const mobject = parse(oldValue)
            if (mobject[workshopId] === null || mobject[workshopId] === undefined || mobject[workshopId].configuration_options === undefined) {
                mobject[workshopId] = {
                    configuration_options: {
                        world_config: {},
                        default_galleryful: 0,
                        auto_balancing: true,
                        no_bat: true,
                        world_prompt: false,
                        say_dest: true,
                        migration_postern: false,
                        ignore_sinkholes: false,
                        open_button: true,
                        migrator_required: false,
                        force_population: false,
                        name_button: true,
                        always_show_ui: false,
                        gift_toasts_offset: 100,
                    },
                    enabled: true,
                }
            }

            mobject[workshopId].configuration_options.world_config = object

            const newValue = format(mobject, {singleQuote: false})
            level2.modoverrides = newValue
        }

        console.log(levels2)

        updateLevelsApi({levels: levels2})
            .then(resp => {
                if (resp.code === 200) {
                    message.success("保存成功")
                } else {
                    message.error("保存失败", resp.msg)
                }
            })

    }

    useEffect(() => {
        setLoading(true)
        getLevelListApi()
            .then(resp => {
                console.log(resp)
                if (resp.code === 200) {
                    const levels = resp.data
                    setLevels(levels)
                    let workshop1 = localStorage.getItem('workshop')
                    if (workshop1 === null || workshop1 === undefined || workshop1 === "") {
                        workshop1 = "workshop-1754389029"
                    }
                    setWorkshopId(workshop1)
                    form.setFieldsValue({
                        world_config: parseWorldConfig(levels[0].modoverrides, workshop1)
                    })
                }
                setLoading(false)
            })
    }, [])

    const items = [
        {
            label: '多层选择器',
            children: <div>
                <SelectorMod form={form} updateWorkshopId={updateWorkshopId} workshopId={workshopId} saveWorkshop={saveWorkshop} />
            </div>,
            key: '1',
        },
        {
            label: '世界配置同步',
            children: <>
                <SyncConfig levels={levels} />
            </>,
            key: '2',
            forceRender: true,
        },
    ]

    return (
        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading}>
                        <Tabs
                            items={items}
                        />
                    </Skeleton>
                </Box>
            </Card>
        </>
    )
}

const SelectorMod = ({form, formValueChange, updateWorkshopId, workshopId, saveWorkshop}) => {

    const inputRef = useRef(null);

    const Connect = () => {
        return (
            <Form
                form={form}
                onValuesChange={formValueChange}
            >
                <Form.List name="world_config">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <div key={key}>
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                        }}
                                        align="baseline"
                                        size={[8, 16]}
                                        wrap
                                    >
                                        <Form.Item
                                            label={'世界id'}
                                            key={`${key}世界id`}
                                            {...restField}
                                            name={[name, 'id']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '缺失世界id',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="世界id"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'世界名称'}
                                            key={`${key}世界名称`}
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '世界名称',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="世界名称，不允许换行"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'分类'}
                                            key={`${key}分类`}
                                            {...restField}
                                            name={[name, 'category']}
                                        >
                                            <Input placeholder="世界类别，用于筛选，将显示于左侧菜单"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'提示信息'}
                                            key={`${key}提示信息`}
                                            {...restField}
                                            name={[name, 'note']}
                                        >
                                            <Input placeholder="鼠标悬停显示的提示信息"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'人数'}
                                            key={`${key}人数`}
                                            {...restField}
                                            name={[name, 'galleryful']}
                                        >
                                            <InputNumber placeholder="世界人数限制"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'不分流'}
                                            key={`${key}不分流`}
                                            {...restField}
                                            name={[name, 'extra']}
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'洞穴'}
                                            key={`${key}洞穴`}
                                            {...restField}
                                            name={[name, 'is_cave']}
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'不可见'}
                                            key={`${key}不可见`}
                                            {...restField}
                                            name={[name, 'invisible']}
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                    </Space>
                                    <Divider/>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        )
    }

    return (
        <>
            <Alert message="目前只兼容 [WIP] 又是一个世界选择器 workshop-1754389029 这种格式的配置"
                   type="info"
                   showIcon
                   action={
                       <a target={'_blank'}
                          href="https://steamcommunity.com/sharedfiles/filedetails/?id=1754389029">详细</a>
                   }
            />
            <br/>
            <Space size={16} wrap>
                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Input defaultValue={workshopId} ref={inputRef} placeholder="多层选择器模组id"/>
                    <Button type="primary" onClick={() => {
                        updateWorkshopId(inputRef.current.input.value)
                    }}>刷新</Button>
                </Space.Compact>
                <Button size={"middle"} type="primary"
                        onClick={() => localStorage.setItem("workshop", inputRef.current.input.value)}
                >设置默认多层选择器</Button>
            </Space>
            <br/><br/>
            <Connect/>
            <br/><br/>
            <Button type={'primary'}
                    onClick={()=>saveWorkshop()}
            >保存配置</Button>
        </>
    )
}


const SyncConfig = ({levels, saveSyncConfig})=>{

    return(
        <>
            <Space size={16} wrap>
                <Select
                    defaultValue={levels[0]?.uuid}
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={levels.map((level, index)=>{
                        return{
                            value: level.uuid,
                            label: level.levelName,
                        }
                    })}
                />
                <span>同步</span>
                <Select
                    mode="multiple"
                    defaultValue={levels[0]?.uuid}
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={levels.map((level, index)=>{
                        return{
                            value: level.uuid,
                            label: level.levelName,
                        }
                    })}
                />
            </Space>
        </>
    )
}

