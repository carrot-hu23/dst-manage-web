import { http } from "../utils/http";

async function updateGameApi() {
    const url = '/api/game/update'
    const response = await http.get(url)
    return response.data
}

async function startHomeApi(checked, type) {

    console.log('checked:', checked, "type:", type);
    let url = ""
    // 启动
    if(checked) {
        url = `/api/game/start?type=${type}`
    } else {
        url = `/api/game/stop?type=${type}`
    }

    // const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}


async function getHomeConfigApi() {
    const url = '/api/game/config'
    const response = await http.get(url)
    return response.data
}

async function saveHomeConfigApi(data) {
    const url = "/api/game/config"
    const response = await http.post(url, data)
    return response.data
}

export {
    updateGameApi,
    startHomeApi,
    getHomeConfigApi,
    saveHomeConfigApi
}