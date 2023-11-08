import {Col, Row, Avatar, Alert, Button, Form, Space, Modal, message, Spin, Input, Switch} from "antd";
import {Box, Card, Container} from "@mui/material";
import {
    CheckCard,
    ProCard,
    ProFormTextArea,
    StepsForm,
} from '@ant-design/pro-components';
import {useState} from "react";
import {useParams} from "react-router-dom";

import {useTheme} from "../../hooks/useTheme";
import {usePreinstallApi} from "../../api/preinstallApi";
import HiddenText from "../../components2/HiddenText/HiddenText";

export default () => {
    const {cluster} = useParams()
    const [form] = Form.useForm();
    const [name, setName] = useState("default")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spin, setSpin] = useState(false);

    const {theme} = useTheme();

    return (
        <>
            <Container maxWidth="xxl">
                <Card>
                    <Spin spinning={spin}>
                        <Box sx={{p: 3}} dir="ltr">
                            <Form form={form} layout="vertical">
                                <Form.Item name="template" label="世界模板">
                                    <CheckCard.Group
                                        style={{width: '100%'}}
                                        onChange={(value) => {
                                            console.log('value', value);
                                            setName(value)
                                        }}
                                        defaultValue="default"
                                    >
                                        <Row>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={
                                                        <Avatar
                                                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                                                            size="large"
                                                        />
                                                    }
                                                    title="标准世界" description="森林和洞穴" value="default"/>
                                            </Col>

                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={<Avatar
                                                        src="https://steamuserimages-a.akamaihd.net/ugc/777372679602930721/459044D5E7B793F62C653A1FF862A76B12EEA05A/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                                                        size="large"
                                                    />}
                                                    title="挂机服" description="Super AFK 模组(1981709850)"
                                                    value="afk"/>
                                            </Col>

                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={
                                                        <Avatar
                                                            src="https://steamuserimages-a.akamaihd.net/ugc/779615289617320231/825644F280C93E74751E7D91F9E91B370319800C/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                                                            size="large"
                                                        />
                                                    }
                                                    title="暴食" description="暴食" value="quagmire"/>
                                            </Col>

                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={
                                                        <Avatar
                                                            src="https://steamuserimages-a.akamaihd.net/ugc/790876534004578608/58E9B87D2075CDADFE400801169AE16F7639171E/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                                                            size="large"
                                                        />
                                                    }
                                                    title="熔炉" description="熔炉" value="lavaarena"/>
                                            </Col>

                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={
                                                        <Avatar
                                                            src="https://steamuserimages-a.akamaihd.net/ugc/1782855511351837453/F5C16F4A0321818D29835655602F098FFA8B10C8/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                                                            size="large"
                                                        />
                                                    }
                                                    title="Hallowed Forge" description="万圣节熔炉"
                                                    value="hallowedlavaarena"/>
                                            </Col>

                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={
                                                        <Avatar
                                                            src="https://steamuserimages-a.akamaihd.net/ugc/1836905684467673290/D2C18D30813AF706A696DB7865F10430ADCE4581/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                                                            size="large"
                                                        />
                                                    }
                                                    title="海钓" description="海钓随机物品" value="oceanfishing"/>
                                            </Col>
                                        </Row>

                                    </CheckCard.Group>
                                </Form.Item>
                            </Form>


                            <Alert message="此操作可能会导致世界启动不起来，比如模组冲突，配置文件更新等问题，谨慎使用"
                                   type="warning" showIcon/>
                            <Alert style={{marginTop: '8px'}}
                                   message="请先停止所有世界，自行做好保存存档，此操作会删除之前的存档"
                                   type="warning" showIcon/>
                            <br/>
                            <Alert style={{marginTop: '8px'}}
                                   message={`如果想更改默认的模板，请在面板的static目录下 preinstall 目录修改对应的文件 \n default: 默认世界 afk: 挂机服`}
                                   type="info" showIcon/>
                            <br/><br/>
                            <Space size={8} wrap>
                                <Button type="primary" onClick={() => {
                                    setSpin(true)
                                    usePreinstallApi("", name)
                                        .then(resp => {
                                            if (resp.code === 200) {
                                                message.success("设置成功")
                                            } else {
                                                message.error(`设置失败 ${resp.msg}`)
                                            }
                                            setSpin(false)
                                        })
                                }}>保存</Button>
                            </Space>
                            {/*
                         <Modal title="世界模板" open={isModalOpen} footer={null} onOk={()=>{setIsModalOpen(false)}} onCancel={()=>{setIsModalOpen(false)}}>
                         <Template />
                         </Modal>
                         */}
                        </Box>
                    </Spin>
                </Card>
            </Container>
            <br/><br/>
            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input placeholder="请输入他人分享的链接"/>
                            <Button type="primary">导入存档</Button>
                        </Space.Compact>

                        <br/><br/>
                        <h4>我的分享链接</h4>
                        <Space size={8} wrap>
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                            <Button size={'small'} type={"primary"}>刷新链接</Button>
                        </Space>
                        <br/><br/>
                        <HiddenText text={"http://localhost:8083/share/game/config?key=xshdjkasjkdhsajdsajdnasjdhjasdkasjdklas"} />
                        <br/>
                        <Alert message="请勿随意暴露，可能存在安全问题" type="warning" showIcon closeIcon/>
                    </Box>
                </Card>
            </Container>
        </>
    )
}

const Template = ({template}) => {

    return (
        <>
            <ProCard>
                <StepsForm
                    formProps={{
                        validateMessages: {
                            required: '此项为必填项',
                        },
                    }}
                    submitter={{
                        render: (props) => {
                            if (props.step === 0) {
                                return (
                                    <Button type="primary" onClick={() => props.onSubmit?.()}>
                                        去第二步 {'>'}
                                    </Button>
                                );
                            }

                            if (props.step === 1) {
                                return [
                                    <Button key="pre" onClick={() => props.onPre?.()}>
                                        返回第一步
                                    </Button>,
                                    <Button
                                        type="primary"
                                        key="goToTree"
                                        onClick={() => props.onSubmit?.()}
                                    >
                                        去第三步 {'>'}
                                    </Button>,
                                ];
                            }

                            return [
                                <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                                    {'<'} 返回第二步
                                </Button>,
                                <Button
                                    type="primary"
                                    key="goToTree"
                                    onClick={() => props.onSubmit?.()}
                                >
                                    提交 √
                                </Button>,
                            ];
                        },
                    }}
                >
                    <StepsForm.StepForm
                        name="master"
                        title="森林配置文件"
                    >
                        <ProFormTextArea
                            name="leveldataoverride"
                            label="森林配置"
                            placeholder="请输入森林配置"
                        />
                    </StepsForm.StepForm>
                    <StepsForm.StepForm
                        name="cave"
                        title="洞穴配置文件"
                    >
                        <ProFormTextArea
                            name="leveldataoverride"
                            label="模组配置"
                            placeholder="请输入森林配置"
                        />
                    </StepsForm.StepForm>
                    <StepsForm.StepForm
                        name="mod"
                        title="模组配置文件"
                    >
                        <ProFormTextArea
                            name="modoverrides"
                            label="模组"
                            placeholder="请输入森林配置"
                        />
                    </StepsForm.StepForm>
                </StepsForm>

            </ProCard>
        </>
    )
}