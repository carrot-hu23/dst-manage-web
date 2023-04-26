import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

import { useNavigate } from "react-router-dom"
import { http } from '../../utils/http';

import './index.css';

const mainCss = {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '400px',
    height: '350px',
    position: 'absolute',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%,-50%)',
}


const Login = () => {

    const navigate = useNavigate()

    const onFinish = async (values) => {
        // 2.登录
        const loginResponse = await http.post("/api/login", values)
        const loginResponseData = loginResponse.data
        if (loginResponseData.code !== 200) {
            message.error("登录失败")
            return
        }  
        // 3.跳转
        navigate('/dashboard')
        console.log('Received values of form: ', values);
    }

    return (
        <div style={mainCss}>
            <h3>dst-admin-web 登录</h3>
            <br />
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};
export default Login;