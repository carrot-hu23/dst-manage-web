import {http} from "../utils/http";

async function getLevelListApi(clusterName) {
    const url = `/api/cluster/level`

    const response = await http.get(url, {
        headers: {
            'Cluster': clusterName
        }
    })
    return response.data
}

async function createLevelApi(clusterName,level) {
    const url = `/api/cluster/level`

    const response = await http.post(url,level,{
        timeout: 1000 * 60 * 30,
        headers: {
            'Cluster': clusterName
        }
    })
    return response.data
}

async function  deleteLevelApi(clusterName, levelName) {
    const url = `/api/cluster/level?levelName=${levelName}`

    const response = await http.delete(url,{
        timeout: 1000 * 60 * 30,
        headers: {
            'Cluster': clusterName
        }
    })
    return response.data
}

async function updateLevelsApi(clusterName,levels) {
    const url = `/api/cluster/level`

    const response = await http.put(url,levels,{
        timeout: 1000 * 60 * 30,
        headers: {
            'Cluster': clusterName
        }
    })
    return response.data
}

export {
    getLevelListApi,
    createLevelApi,
    deleteLevelApi,
    updateLevelsApi
}