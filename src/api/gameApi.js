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
        url = `/api/game/specified/start?type=${type}`
    } else {
        url = `/api/game/specified/stop?type=${type}`
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

async function getGameConfigApi() {
    const url = '/api/cluster/game/config'
    const response = await http.get(url)
    return response.data
}

async function saveGameConfigApi(data) {
    const url = "/api/cluster/game/config"
    const response = await http.post(url, data)
    return response.data
}

async function regenerateworldApi() {
    const url = "/api/game/regenerateworld"
    const response = await http.get(url)
    return response.data
}

async function cleanWorldApi() {
    const url = "/api/game/clean"
    const response = await http.get(url)
    return response.data
}

async function archiveApi() {
    const url = "/api/game/archive"
    const response = await http.get(url)
    return response.data
}

async function rollbackApi(day) {
    const url = `/api/game/rollback?dayNums=${day}`
    const response = await http.get(url)
    return response.data
}

async function masterConsoleApi(instruct) {
    const url = "/api/game/master/console"
    const response = await http.post(url,{
        command: instruct
    })
    return response.data
}

async function cavesConsoleApi(instruct) {
    const url = "/api/game/caves/console"
    const response = await http.post(url,{
        command: instruct
    })
    return response.data
}

async function sentBroadcastApi(message) {
    const url = `/api/game/sent/broadcast?message=${message}`
    const response = await http.get(url)
    return response.data
}

export {
    updateGameApi,
    startHomeApi,
    getHomeConfigApi,
    saveHomeConfigApi,
    getGameConfigApi,
    saveGameConfigApi,
    regenerateworldApi,
    cleanWorldApi,
    archiveApi,
    rollbackApi,
    masterConsoleApi,
    cavesConsoleApi,
    sentBroadcastApi,
}