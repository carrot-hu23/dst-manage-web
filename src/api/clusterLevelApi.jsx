import {http} from "../utils/http";

async function getLevelListApi() {
    const url = `/api/cluster/level`

    const response = await http.get(url)
    return response.data
}

async function createLevelApi(level) {
    const url = `/api/cluster/level`

    const response = await http.post(url,level,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function  deleteLevelApi(levelName) {
    const url = `/api/cluster/level?levelName=${levelName}`

    const response = await http.delete(url,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function updateLevelsApi(levels) {
    const url = `/api/cluster/level`

    const response = await http.put(url,levels,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

export {
    getLevelListApi,
    createLevelApi,
    deleteLevelApi,
    updateLevelsApi
}