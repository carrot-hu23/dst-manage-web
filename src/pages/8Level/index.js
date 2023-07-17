import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Form, Input, InputNumber, Collapse, Steps, Switch, Tabs} from 'antd';
import {Container, Card, Box} from '@mui/material';
import Cluster from "../Home/Cluster";
import Panel from "../Panel";

const {Step} = Steps;
const {TextArea} = Input;

const DynamicSteppedForm = () => {

    const [cluster] = Form.useForm();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState([{}]);

    const formDataObject = useRef([])
    // []
    // [{},{key:1},{}]
    useEffect(() => {

    }, [currentStep])

    const handleAddStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
        setFormData(prevData => [...prevData, {}]);
    };

    const handleRemoveStep = (index) => {
        setCurrentStep(prevStep => prevStep - 1);
        setFormData(prevData => prevData.filter((_, i) => i !== index));
    };

    const handleFormChange = (stepIndex, changedValues) => {
        // setFormData(prevData => {
        //     const newData = [...prevData];
        //     newData[stepIndex] = {...newData[stepIndex], ...changedValues};
        //     return newData;
        // });
        console.log("111", stepIndex, changedValues)
        formDataObject.current[stepIndex] = {...changedValues}
    };

    const handleFormSubmit = () => {
        // 在这里将formData提交到后端保存或进行进一步处理
        console.log(formDataObject);
    };

    const LevelList = () => {
        return <div>
            <Steps current={currentStep}>
                {formData.map((_, index) => (
                    <Step key={index} title={`Level ${index + 1}`}/>
                ))}
            </Steps>
            <br/>
            {formData.map((stepData, stepIndex) => (

                <div key={stepIndex} style={{display: stepIndex === currentStep ? 'block' : 'none'}}>

                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            marginBottom: '4px',
                            maxHeight: '500px',
                            overflowY: 'auto',
                        }}
                        // onFieldsChange={(changedValues) => handleFormChange(stepIndex, changedValues)}
                        onValuesChange={(changedValues) => handleFormChange(stepIndex, changedValues)}
                        initialValues={formData[stepIndex]} // 设置初始值，允许返回之前步骤时显示之前填写的数据
                    >
                        <Divider>
                            <span style={{fontSize: "14px", fontWeight: "600"}}>leveldataoverride.lua 配置</span>
                        </Divider>
                        <Form.Item label="世界配置" name="leveldataoverride">
                            <TextArea key={1} rows={8}/>
                        </Form.Item>

                        <Divider>
                            <span style={{fontSize: "14px", fontWeight: "600"}}>modoverrides.lua 配置</span>
                        </Divider>
                        <Form.Item label="mod配置" name="modoverrides">
                            <TextArea rows={8}/>
                        </Form.Item>


                        {/*
                         <Collapse>
                            <Collapse.Panel>
                            </Collapse.Panel>
                        </Collapse>
                        */}

                        <Divider><span
                            style={{fontSize: "14px", fontWeight: "600"}}>server.ini 配置项</span>
                        </Divider>


                        <Form.Item
                            label="端口"
                            name="server_port"
                            tooltip={`
            服务器监听的 UDP 端口，每个服务器需要设置不同的端口\n\n
            范围：10998-11018 (其它端口也可，但游戏在检索局域网房间时只会扫描这些端口)\n\n
            页面自动分配的端口不会与已填写的端口重复，但页面不会擅自修改自行填写的端口，所以确保不要填写重复的端口。
            `}
                        >
                            <InputNumber placeholder="范围: 10998-11018"/>
                        </Form.Item>

                        <Form.Item
                            label="主世界"
                            valuePropName="checked"
                            name='is_master'
                            tooltip={`
        将该世界设为主世界，即第一次进入房间时将会进入的世界。
        主服务器运行的是一个房间的核心世界，其它世界都是该世界的附属，比如季节、天数等都是以该世界为准的。
        `}>
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>

                        <Form.Item
                            label="世界名"
                            name="name"
                            tooltip={`
            `}
                        >
                            <Input placeholder="世界名"/>
                        </Form.Item>

                        <Form.Item
                            label="世界 ID"
                            name="id"
                            tooltip={`
            随机数字，用于区分不同的从服务器。
            
            游戏过程中修改该项会导致该世界的玩家信息丢失。
            
            主服务器强制为 1。其它世界设为 1 也会被视为主服务器去新注册一个房间。
            `}
                        >
                            <InputNumber placeholder="id"/>
                        </Form.Item>

                        <Form.Item
                            label="路径兼容"
                            valuePropName="checked"
                            name='encode_user_path'
                            tooltip={`
            使路径编码与不区分大小写的操作系统兼容`}
                        >
                            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked/>
                        </Form.Item>

                        <Form.Item
                            label="认证端口"
                            name='authentication_port'>
                            <Input placeholder="authentication_port" maxLength={200}/>
                        </Form.Item>
                        <Form.Item
                            label="世界端口"
                            name='master_server_port'>
                            <Input placeholder="master_server_port" maxLength={200}/>
                        </Form.Item>

                        {stepIndex > 0 && (
                            <Button onClick={() => handleRemoveStep(stepIndex)} danger>
                                删除森林
                            </Button>
                        )}
                    </Form>
                </div>
            ))}

            {currentStep > 0 && (
                <Button style={{marginRight: 8}} onClick={() => setCurrentStep(prevStep => prevStep - 1)}>
                    上一步
                </Button>
            )}

            {currentStep < formData.length - 1 ? (
                <Button type="primary" onClick={() => setCurrentStep(prevStep => prevStep + 1)}>
                    下一步
                </Button>
            ) : (
                <Button type="primary" onClick={handleFormSubmit}>
                    提交
                </Button>
            )}

            {currentStep <= formData.length - 1 && (
                <Button onClick={handleAddStep} type="dashed" style={{marginLeft: 8}}>
                    添加世界
                </Button>
            )}
            <br/>
            <br/>
        </div>
    }

    const items = [
        {
            key: '1',
            label: "房间设置",
            children: <Cluster form={cluster}/>,
        },
        {
            key: '2',
            label: "世界配置",
            children: <LevelList/>,
        },
    ]


    return (
        <Container maxWidth="xl">
            <Card>
                <Box sx={{p: 3, pb: 1}} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items}/>
                </Box>
            </Card>
        </Container>
    );
};

export default DynamicSteppedForm;
