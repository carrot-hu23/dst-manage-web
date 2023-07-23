import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Card, Form, InputNumber, Select, Radio, Button, message, Skeleton,Switch} from "antd";

import Editor from "../../Home/Editor";
import {getAnnounceSettingApi, saveAnnounceSettingApi} from "../../../api/announceApi";

const {Option} = Select;

export default () => {
    const {cluster} = useParams()
    const [form] = Form.useForm();
    const [unit, setUint] = useState("M")
    const [loading, setLoading] = useState(false)
    const selectAfter = (
        <Select
            defaultValue={unit}
            style={{
                width: 60,
            }}
            onChange={value => setUint(value)}
        >
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="H">H</Option>
        </Select>
    );
    function setValue(value) {
        form.setFieldsValue({
            content: value,
        });
    }

    useEffect(()=>{
        setLoading(true)
        getAnnounceSettingApi(cluster)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("获取配置成功")
                    form.setFieldsValue(resp.data)
                    setUint(resp.data.intervalUnit)
                } else {
                    message.error("获取配置失败")
                }
                setLoading(false)
            })
    },[])

    function saveAnnounceSetting() {
        const data = {...form.getFieldValue()}
        data.intervalUnit = unit
        saveAnnounceSettingApi(cluster, data)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存配置成功")
                } else {
                    message.error("保存配置失败")
                }
            })
    }

    return <>
        <Card>
            <Skeleton loading={loading} >
                <Form
                    form={form}
                    autoComplete="off"
                    initialValues={{
                        enable: false,
                        interval: 5,
                        method: 'order',
                        frequency: 10000
                    }}
                >
                    <Form.Item
                        label="启动"
                        name="enable"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                    <Form.Item
                        label="发送间隔"
                        name="interval"
                    >
                        <InputNumber addonAfter={selectAfter} defaultValue={5}/>
                    </Form.Item>
                    <Form.Item
                        label="发送规律"
                        name="method"
                    >
                        <Radio.Group>
                            <Radio value={'order'}>顺序发送</Radio>
                            <Radio value={'random'}>随机发送</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/*

                    <Form.Item
                        label="发送次数"
                        name="frequency"
                    >
                        <InputNumber defaultValue={100}/>
                    </Form.Item>
                    */}
                    <Form.Item
                        label="发送内容"
                        // name="content"
                    >
                        <Editor
                            value={form.getFieldValue().content}
                            // eslint-disable-next-line react/jsx-no-bind
                            setValue={setValue}
                            styleData={{
                                language: 'text',
                                theme: 'vs-dark',
                                height: 160,
                            }}/>
                    </Form.Item>
                </Form>
            </Skeleton>
            <Button type="primary" onClick={() => {
                saveAnnounceSetting()
            }}>
                保存
            </Button>
        </Card>
    </>
}