import React, {useState, useEffect} from "react";

import {Button, Spin, Space, Skeleton, Steps, Form, Input, Radio, message} from "antd";
import {Box, Card, Container} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';
import Editor from "../../../components2/Editor";

export default () => {

    const {cluster, id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)

    const [templateForm] = Form.useForm();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // if (id > 0) {
        //     getLevelTemplateApi(cluster, id)
        //         .then(resp => {
        //             if (resp.code === 200) {
        //                 templateForm.setFieldsValue(resp.data)
        //                 setLoading(false)
        //             }
        //         })
        // }
    },[])

    function saveLevelTemplate() {
        // setSpinLoading(true)
        // const data = templateForm.getFieldValue();
        // data.levelTypeLabel = "levelTypeLabel"
        // console.log("data: ", data)
        // createNewLevelTemplateApi("", data)
        //     .then(resp => {
        //         if (resp.code === 200) {
        //             message.success("保存成功")
        //         } else {
        //             message.error("保存失败")
        //         }
        //         setSpinLoading(false)
        //     })
    }

    const Leveldataoverride = ({form}) => {

        const value = form.getFieldValue().leveldataoverride
        function setValue(value) {
            console.log(value)
            form.setFieldsValue({
                leveldataoverride: value,
            })
        }

        return <>
            <Editor value={value}
                // eslint-disable-next-line react/jsx-no-bind
                    setValue={setValue}
                    styleData={{language: "lua", theme: "vs-dark"}}/>
        </>
    }

    const Modoverride = ({form}) => {

        const value = form.getFieldValue().modoverride

        function setValue2(value) {
            form.setFieldsValue({
                modoverride: value,
            });
        }

        return <>
            <Editor value={value}
                // eslint-disable-next-line react/jsx-no-bind
                    setValue={setValue2}
                    styleData={{language: "lua", theme: "vs-dark"}}/>
        </>
    }

    const ServerIni = ({form}) => {

        const value = form.getFieldValue().serverIni

        function setValue2(value) {
            form.setFieldsValue({
                serverIni: value,
            });
        }

        return <>
            <Editor value={value}
                // eslint-disable-next-line react/jsx-no-bind
                    setValue={setValue2}
                    styleData={{language: "ini", theme: "vs-dark"}}/>
        </>
    }

    const BaseInfo = ({form}) => {
        return <>
            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                initialValues={{}}
            >
                <Form.Item
                    label="模板name"
                    name='templateName'
                    tooltip=""
                    rules={[
                        {
                            required: true,
                            message: '请输入模板name',
                        },
                    ]}>
                    <Input placeholder="请输入模板name" allowClear/>
                </Form.Item>

                <Form.Item
                    label="模板类型"
                    name='levelType'
                    tooltip="目前只支持森林和洞穴支持可视化，其他模板请选择`其他`"
                    rules={[
                        {
                            required: true,
                            message: '请选择模板类型',
                        },
                    ]}>
                    <Radio.Group>
                        <Radio value={'MASTER'}>森林</Radio>
                        <Radio value={'CAVES'}>洞穴</Radio>
                        <Radio value={'OTHER'}>其他</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    }

    const steps = [
        {
            title: '基础信息',
            content: <BaseInfo form={templateForm}/>
        },
        {
            title: 'leveldataoverride 模板文件',
            content: <Leveldataoverride form={templateForm}/>
        },
        {
            title: 'modoverride 模板文件',
            content: <Modoverride form={templateForm}/>
        },
        {
            title: 'server.ini 模板文件',
            content: <ServerIni form={templateForm}/>
        },
    ];


    return <>
        <Container maxWidth="xl">
            <Spin spinning={spinLoading} description={"正在保存 modoverrides "}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Space size={8} wrap>
                            <Button type={"link"} icon={<ArrowLeftOutlined/>}
                                    onClick={() => navigate(`/dashboard/template/config`)}>
                                返回
                            </Button>
                            世界模板
                        </Space>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Steps current={current}
                               items={steps}
                            // direction="vertical"
                               size="small"/>
                        <div>
                            <br/>
                            <Skeleton loading={loading} active avatar>
                                <div className="steps-content">{steps[current].content}</div>
                            </Skeleton>
                            <br/>
                            <div className="steps-action">
                                {current > 0 && (
                                    <Button
                                        style={{
                                            margin: '0 8px',
                                        }}
                                        onClick={() => setCurrent(current - 1)}
                                    >
                                        上一步
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" onClick={() => {
                                        saveLevelTemplate()
                                    }}>
                                        保存设置
                                    </Button>
                                )}
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => setCurrent(current + 1)}>
                                        下一步
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Box>
                </Card>
            </Spin>
        </Container>
    </>
}