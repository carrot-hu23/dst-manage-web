import {Form, Space, Typography} from 'antd';

const {Paragraph} = Typography;

// eslint-disable-next-line react/prop-types
const HomeOverView = ({home}) => (
    <>
        <div>
            <h3>{home.name}</h3>
            <span>{home.desc}</span>
            <br/>
            <br/>
            <Form
                layout="horizontal"
                labelAlign={'left'}
                style={{
                    maxHeight: '520px',
                    overflowY: 'auto',
                }}
            >
                <Space>
                    <div>
                        <Form.Item label="世界直连">
                            <Paragraph style={{
                                color: '#4096ff'
                            }} copyable>{`c_connect("${home.__addr}", ${home.port})`}</Paragraph>
                        </Form.Item>

                        <Form.Item label="版本">
                            <span>{home.v}</span>
                        </Form.Item>

                        <Form.Item label="天数">
                            <span>{home.data.day}</span>
                        </Form.Item>

                        <Form.Item label="季节">
                            <span>{home.season}{`(${home.data.dayselapsedinseason + 1}/${home.data.dayselapsedinseason + home.data.daysleftinseason})`}</span>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="服主">
                            <span>{home.host}</span>
                        </Form.Item>
                        <Form.Item label="模式">
                            <span>{home.intent}</span>
                        </Form.Item>
                        <Form.Item label="加入">
                            <span>{home.allownewplayers ? <span>允许加入</span> : <span>不允许加入</span>}</span>
                        </Form.Item>
                        <Form.Item label="公网">
                            <span>{home.lanonly ? <span>lan</span> : <span>位与公网</span>}</span>
                        </Form.Item>
                    </div>
                </Space>
            </Form>

        </div>
    </>
)
export default HomeOverView;