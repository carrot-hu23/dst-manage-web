import {http} from "../utils/http";

async function autoCheck2Api(cluster, checkType) {
    const url = `/api/auto/check2?checkType=${checkType}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveAutoCheck2Api(cluster, data) {
    if (data.enable) {
        data.enable = 1
    } else {
        data.enable = 0
    }
    const url = `/api/auto/check2`
    const response = await http.post(url,data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    autoCheck2Api,
    saveAutoCheck2Api,
}