import axios from "axios";
import {message} from 'antd'

const http = axios.create(
    {
        withCredentials: true,
        baseURL: '',
        timeout: 50000
    }
)

http.interceptors.request.use((config) => config, (error) => Promise.reject(error))


http.interceptors.response.use((response) => response, (error) => {    
    const {status} = error.response
    console.log(status);
    if (status === 401 || status === 504 || status === 502) {
        console.log(status);
        
        if (status === 504) {
            message.error("服务器异常，检测ip端口账号是否正确")
            return Promise.reject(error)
        }
        if (status === 502) {
            message.error("服务器错误")
            return Promise.reject(error)
        }
        if (status === 401) {
            message.warning("登录失效")
        }
        // 处理 401 响应状态码
        localStorage.clear()
        
        window.location.href = '/#/login';
        // const navigate = useNavigate();
        // navigate('/login', { replace: true });
      }
    return Promise.reject(error)
})

export { http }