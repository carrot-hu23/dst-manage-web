import {http} from "../utils/http";

async function getUserInfoApi(cluster) {
    const url = '/api/user'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function updateUserApi(cluster, data) {
    const url = `/api/user`
    const response = await http.post(url,data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getUserInfoApi,
    updateUserApi,
}