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
}