import {http} from "../utils/http";

async function getLevelListApi(cluster) {
    const url = '/api/game/level'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function createNewLevelApi(cluster, level) {
    const url = `/api/game/level`
    const response = await http.post(url, level, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteLevelApi(cluster, levelName) {
    const url = `/api/game/level?levelName=${levelName}`
    const response = await http.delete(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getLevelLeveldataoverrideApi(cluster, levelName) {
    const url = `/api/game/level/leveldataoverride?levelName=${levelName}`
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getLevelModoverridesApi(cluster, levelName) {
    const url = `/api/game/level/modoverrides?levelName=${levelName}`
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getLevelServerIniApi(cluster, levelName) {
    const url = `/api/game/level/serverIni?levelName=${levelName}`
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveLevelLeveldataoverrideApi(cluster, data) {
    const url = `/api/game/level/leveldataoverride`
    const response = await http.post(url, data, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveLevelModoverridesApi(cluster, data) {
    const url = `/api/game/level/modoverrides`
    const response = await http.post(url, data, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveLevelServerIniApi(cluster, data) {
    const url = `/api/game/level/serverIni`
    const response = await http.post(url, data, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getLevelListApi,
    createNewLevelApi,
    deleteLevelApi,

    getLevelLeveldataoverrideApi,
    getLevelModoverridesApi,
    getLevelServerIniApi,

    saveLevelLeveldataoverrideApi,
    saveLevelModoverridesApi,
    saveLevelServerIniApi,
}