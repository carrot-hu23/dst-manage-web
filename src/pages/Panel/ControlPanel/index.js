import { Button, Form, Input, message, Space, Row, Col, Card, Divider, Tag, Typography } from 'antd';
import { cavesConsoleApi, masterConsoleApi, rollbackApi, sentBroadcastApi } from '../../../api/gameApi';

const { TextArea } = Input;
const { Paragraph } = Typography;


const ControlPanel = () => {

    const [form] = Form.useForm();

    function rollback(dayNums) {
        rollbackApi(dayNums)
            .then(() => {
                message.success(`回档${dayNums}天成功`)
            }).catch(() => { message.error(`回档${dayNums}天失败`) })
    }

    function sendMasterInstruct() {
        console.log(form.getFieldValue());
        const msg = form.getFieldValue().master
        masterConsoleApi(msg)
            .then(() => {
                message.success(`发送地面${msg}指令成功`)
            }).catch(() => { message.error(`发送地面${msg}指令失败`) })
    }
    function sendCavesInstruct() {
        const msg = form.getFieldValue().caves
        cavesConsoleApi(msg)
            .then(() => {
                message.success(`发送洞穴${msg}指令成功`)
            }).catch(() => { message.error(`发送洞穴${msg}指令失败`) })

    }
    function sendBroadcastInstruct() {
        const msg = form.getFieldValue().broadcast
        sentBroadcastApi(msg)
            .then(() => {
                message.success(`发送广播${msg}指令成功`)
            }).catch(() => { message.error(`发送广播${msg}指令失败`) })


    }

    return (
        <Card>
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        labelCol={{
                            span: 4,
                        }}
                    // wrapperCol={{
                    //     span: 12,
                    // }}
                    >
                        <div>

                            <Form.Item
                                label="地面控制台"
                                name="master"
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                            <Button type="primary" onClick={() => { sendMasterInstruct() }}>
                                发送
                            </Button>

                        </div>

                        <div>
                            <br />
                            <Form.Item
                                label="洞穴控制台"
                                name="caves"
                            >
                                <TextArea rows={3} />
                            </Form.Item>

                            <Button type="primary" onClick={() => { sendCavesInstruct() }}>
                                发送
                            </Button>

                        </div>


                        <div>
                            <br />
                            <Form.Item
                                label="广播"
                                name="broadcast"
                            >
                                <TextArea rows={3} />
                            </Form.Item>

                            <Button type="primary" onClick={() => { sendBroadcastInstruct() }}>
                                发送
                            </Button>

                        </div>
                        <Divider orientation="left">快捷操作</Divider>
                        <Form.Item
                            label="回档"
                            name="rollback"
                        >
                            <div>
                                <Space size={[10, 18]} wrap>
                                    <Button onClick={() => { rollback(1) }} >回档一天</Button>
                                    <Button onClick={() => { rollback(2) }} >回档两天</Button>
                                    <Button onClick={() => { rollback(3) }} >回档三天</Button>
                                    <Button onClick={() => { rollback(4) }} >回档四天</Button>
                                    <Button onClick={() => { rollback(5) }} >回档五天</Button>
                                    <Button onClick={() => { rollback(6) }} >回档六天</Button>
                                </Space>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>

                    <Divider orientation="left">常用指令：</Divider>
                    <Space size={[4, 16]} wrap style={{
                        marginLeft: '32px'
                    }}>
                        <Tag color="magenta"><Paragraph className='copy' copyable>c_save()</Paragraph></Tag>
                        <Tag color="red">red</Tag>
                        <Tag color="volcano">volcano</Tag>
                        <Tag color="orange">orange</Tag>
                        <Tag color="gold">gold</Tag>
                        <Tag color="lime">lime</Tag>
                        <Tag color="green">green</Tag>
                        <Tag color="cyan">cyan</Tag>
                        <Tag color="blue">blue</Tag>
                        <Tag color="geekblue">geekblue</Tag>
                        <Tag color="purple">purple</Tag>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};
export default ControlPanel;