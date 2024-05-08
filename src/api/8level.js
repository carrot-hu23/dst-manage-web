import {http} from "../utils/http";

async function getLevelConfigApi(cluster) {
    const url = '/api/game/8level/config'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveLevelConfigApi(cluster, data) {
    const url = '/api/game/8level/config'
    const response = await http.post(url, data, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getWhitelistApi(cluster) {
    const url = '/api/game/8level/whitelist'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveWhitelistApi(cluster, list) {
    const url = '/api/game/8level/whitelist'
    const response = await http.post(url, {
        whitelist: list
    }, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getAdminlistApi(cluster) {
    const url = '/api/game/8level/adminilist'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveAdminlistApi(cluster, list) {
    const url = '/api/game/8level/adminilist'
    const response = await http.post(url, {
        adminlist: list
    }, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getBlacklistApi(cluster) {
    const url = '/api/game/8level/blacklist'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveBlacklistApi(cluster, list) {
    const url = '/api/game/8level/blacklist'
    const response = await http.post(url, {
        blacklist: list
    }, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getClusterIniApi(cluster) {
    const url = '/api/game/8level/clusterIni'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveClusterIniApi(cluster, data) {
    const url = '/api/game/8level/clusterIni'
    const response = await http.post(url, data, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getLevelStatusApi(cluster) {
    const url = '/api/game/8level/status'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function startLevelApi(cluster,levelName,checked) {

    let url = ""
    // 启动
    if(checked) {
        url = `api/game/8level/start?levelName=${levelName}`
    } else {
        url = `api/game/8level/stop?levelName=${levelName}`
    }

    // const url = '/api/dashboard'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function sendCommandApi(cluster, levelName, command) {

    const url = `/api/game/8level/command`
    const response = await http.post(url, {
        levelName,
        command
    }, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getOnlinePlayersApi(cluster,levelName) {

    const url = `/api/game/8level/players?levelName=${levelName}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getAllOnlinePlayersApi(cluster) {

    const url = `/api/game/8level/players/all`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function cleanLevelApi(cluster,levels) {

    const queryString = levels.map(item => `level=${encodeURIComponent(item)}`).join('&');
    const url = `/api/game/clean/level?${queryString}`
    console.log(levels)
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function cleanAllLevelApi(cluster,levels) {

    const url = `/api/game/clean/level/all`
    console.log(levels)
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function startAllLevelApi(cluster,checked) {

    let url = ""
    // 启动
    if(checked) {
        url = `api/game/8level/start/all`
    } else {
        url = `api/game/8level/stop/all`
    }

    // const url = '/api/dashboard'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getFreeUDPPortApi(cluster) {
    const url = '/api/game/8level/udp/port'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getLevelConfigApi,
    saveLevelConfigApi,

    getWhitelistApi,
    saveWhitelistApi,

    getAdminlistApi,
    saveAdminlistApi,

    getBlacklistApi,
    saveBlacklistApi,

    getClusterIniApi,
    saveClusterIniApi,

    getLevelStatusApi,
    startLevelApi,

    sendCommandApi,
    getOnlinePlayersApi,
    getAllOnlinePlayersApi,

    cleanLevelApi,
    cleanAllLevelApi,

    startAllLevelApi,

    getFreeUDPPortApi,

}