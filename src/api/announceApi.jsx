import {http} from "../utils/http";

async function getAnnounceSettingApi(cluster) {
    const url = '/api/game/announce/setting'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveAnnounceSettingApi(cluster, data) {
    const url = `/api/game/announce/setting`
    const response = await http.post(url,data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getAnnounceSettingApi,
    saveAnnounceSettingApi,
}