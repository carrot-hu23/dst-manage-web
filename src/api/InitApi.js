import { http } from "../utils/http";

// async function checkIsFirst() {

// }

async function initApi(user) {
    const url = "/api/login"
    const response = await http.post(url, user)
    return response.data
}

export {
    initApi
}