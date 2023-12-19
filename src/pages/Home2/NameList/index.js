import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Grid, Typography} from "@mui/material";
import {Button, Input, Form, Skeleton, message} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import './index.css';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};

export default ({title, tips, getApi, saveApi}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false);
    const [spin, setSpin] = useState(false);
    const [form] = Form.useForm()
    const lines = tips.split("\n")
    useEffect(()=>{
        fetchData()
    }, [])
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await getApi();
            const data = await response.data;
            form.setFieldsValue({
                list: data
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    const saveData = async (payload)=>{
        setSpin(true)
        try {
            const response = await saveApi("",payload);
            const code = await response.code;
            if (code === 200) {
                message.success("保存成功")
            } else {
                message.error("保存失败")
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setSpin(false)
        }
    }


    const onFinish = (values) => {
        console.log('Received values of form:', values);
        saveData(values.list)
    }

    return (
        <>
            <div style={{
                height: '64vh',
                overflowY: 'auto',
                overflowX: 'auto'
            }}>
                <Typography variant="h6" sx={{mb: 4}}>
                    {title}
                </Typography>
                <Skeleton loading={loading} active avatar>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Form
                                form={form}
                                name="dynamic_form_item"
                                {...formItemLayoutWithOutLabel}
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.List
                                    name="list"
                                    rules={[
                                        {
                                            // eslint-disable-next-line consistent-return
                                            validator: async (_, names) => {
                                                // if (!names || names.length < 1) {
                                                //     return Promise.reject(new Error('At least 1 passengers'));
                                                // }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, {add, remove}, {errors}) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? '名单' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "Please input passenger's name or delete this field.",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="请输入 Ku_xxx"
                                                            style={{
                                                                width: '80%',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {<MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                        />}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined/>}
                                                >
                                                    {t('add')}
                                                </Button>
                                                <Form.ErrorList errors={errors}/>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                                <br/><br/>
                            </Form>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                <span>
                    {lines.map(line=>(
                        <span>
                            {line}
                            <br/>
                        </span>
                    ))}
                </span>
                        </Grid>
                    </Grid>
                </Skeleton>
            </div>
        </>
    )
};