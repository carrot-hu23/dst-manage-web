import { http } from "../utils/http";

async function loginApi(user) {
    const url = "/api/login"
    const response = await http.post(url, user)
    return response.data
}

export {
    loginApi
}