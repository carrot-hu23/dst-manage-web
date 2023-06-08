import { http } from "../utils/http";

async function updateGameApi(cluster) {
    const url = '/api/game/update'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function startHomeApi(cluster,checked, type) {

    console.log('checked:', checked, "type:", type);
    let url = ""
    // 启动
    if(checked) {
        url = `/api/game/start?type=${type}`
    } else {
        url = `/api/game/stop?type=${type}`
    }

    // const url = '/api/dashboard'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}


async function getHomeConfigApi(cluster) {
    const url = '/api/game/config'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveHomeConfigApi(cluster, data) {
    const url = "/api/game/config"
    const response = await http.post(url, data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getGameConfigApi(cluster) {
    const url = '/api/cluster/game/config'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveGameConfigApi(cluster,data) {
    const url = "/api/cluster/game/config"
    const response = await http.post(url, data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function regenerateworldApi(cluster) {
    const url = "/api/game/regenerateworld"
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function cleanWorldApi(cluster) {
    const url = "/api/game/clean"
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function archiveApi(cluster) {
    const url = "/api/game/archive"
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function rollbackApi(cluster,day) {
    const url = `/api/game/rollback?dayNums=${day}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function masterConsoleApi(cluster,instruct) {
    const url = "/api/game/master/console"
    const response = await http.post(url,{
        command: instruct
    },{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function cavesConsoleApi(cluster,instruct) {
    const url = "/api/game/caves/console"
    const response = await http.post(url,{
        command: instruct
    },{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function sentBroadcastApi(cluster,message) {
    const url = `/api/game/sent/broadcast?message=${message}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
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