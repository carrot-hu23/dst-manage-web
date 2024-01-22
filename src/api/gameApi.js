import { http } from "../utils/http";

async function updateGameApi(cluster) {
    const url = '/api/game/update'
    const response = await http.get(url, {
        timeout: 1000*60*10,
        headers: {
            'Cluster': cluster,
        }
    })
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

async function getDashboardApi() {
    const url = '/api/game/dashboard'
    const response = await http.get(url)
    return response.data
}

async function sendCommandApi(command) {

    const url = `/api/game/command?command=${command}`
    const response = await http.get(url,)
    return response.data
}

async function startApi(checked) {
    let url = ""
    // 启动
    if(checked) {
        url = `api/game/start`
    } else {
        url = `api/game/stop`
    }

    // const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}

async function getSteamConfigApi () {
    const url = '/api/steam/config'
    const data = await http.get(url)
    return data.data
}

async function saveSteamConfigApi(params) {
    const url = '/api/steam/config'
    const data = await http.post(url, params)
    return data.data
}

async function getGameConfigApi () {
    const url = '/api/game/config'
    const data = await http.get(url)
    return data.data
}

async function saveGameConfigApi(params) {
    const url = '/api/game/config'
    const data = await http.post(url, params)
    return data.data
}

export {
    updateGameApi,
    getHomeConfigApi,
    saveHomeConfigApi,
    getDashboardApi,

    sendCommandApi,
    startApi,

    getSteamConfigApi,
    saveSteamConfigApi,

    getGameConfigApi,
    saveGameConfigApi,

}