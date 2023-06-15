import { Button, Form, Input, message, Space, Row, Col, Card, Divider, Tag, Typography } from 'antd';
import {useParams} from "react-router-dom";
import { cavesConsoleApi, masterConsoleApi, rollbackApi, sentBroadcastApi } from '../../../api/gameApi';

const { TextArea } = Input;
const { Paragraph, Link } = Typography;


const ControlPanel = () => {

    const [form] = Form.useForm();
    const {cluster} = useParams()

    function rollback(dayNums) {
        rollbackApi(cluster,dayNums)
            .then(() => {
                message.success(`回档${dayNums}天成功`)
            }).catch(() => { message.error(`回档${dayNums}天失败`) })
    }

    function sendMasterInstruct() {
        console.log(form.getFieldValue());
        const msg = form.getFieldValue().master
        masterConsoleApi(cluster,msg)
            .then(() => {
                message.success(`发送地面${msg}指令成功`)
            }).catch(() => { message.error(`发送地面${msg}指令失败`) })
    }
    function sendCavesInstruct() {
        const msg = form.getFieldValue().caves
        cavesConsoleApi(cluster,msg)
            .then(() => {
                message.success(`发送洞穴${msg}指令成功`)
            }).catch(() => { message.error(`发送洞穴${msg}指令失败`) })

    }
    function sendBroadcastInstruct() {
        const msg = form.getFieldValue().broadcast
        sentBroadcastApi(cluster,msg)
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
                        <Tag color="magenta">强制存档<Paragraph className='copy' copyable>c_save()</Paragraph></Tag>
                        <Tag color="red">重新加载世界（会重启服务器并还原到最近存储点）<Paragraph className='copy' copyable>c_reset()</Paragraph></Tag>
                        <Tag color="red">回档天数<Paragraph className='copy' copyable>c_rollback(count)</Paragraph></Tag>
                        {/* <Tag color="volcano">volcano</Tag>
                        <Tag color="orange">orange</Tag>
                        <Tag color="gold">gold</Tag>
                        <Tag color="lime">lime</Tag>
                        <Tag color="green">green</Tag>
                        <Tag color="cyan">cyan</Tag>
                        <Tag color="blue">blue</Tag>
                        <Tag color="geekblue">geekblue</Tag>
                        <Tag color="purple">purple</Tag> */}
                        <Link href="https://dontstarve.fandom.com/zh/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0/%E9%A5%A5%E8%8D%92%E8%81%94%E6%9C%BA%E7%89%88%E4%B8%AD%E7%9A%84%E5%91%BD%E4%BB%A4?variant=zh" target="_blank">
                            更多指令参考
                        </Link>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};
export default ControlPanel;