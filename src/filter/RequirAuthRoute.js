import { Navigate, useLocation } from "react-router-dom"


// eslint-disable-next-line react/prop-types
export default function RequirAuthRoute({children}) {

    // 获取到 信息
    const token = localStorage.getItem('token')
    const {pathName} = useLocation
    
    if(!token) {
        return <Navigate to="/login" state={{returnURL: pathName}} />
    }
    return children
}