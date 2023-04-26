import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    const {status} = error.response.status
    if (status === 401 || status === 504) {
        console.log(status);
        
        if (status === 504) {
            message.error("服务器异常")
        }

        // 处理 401 响应状态码
        localStorage.clear()
        const navigate = useNavigate();
        // window.location.href = '/login';
        navigate('/login', { replace: true });
      }
    return Promise.reject(error)
})

export { http }