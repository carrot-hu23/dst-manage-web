import {http} from "../utils/http";


async function getClusterList() {
    const url = "/api/cluster"

    const response = await http.get(url)
    return response.data
}

async function createCluster(data) {
    const url  = `/api/cluster`
    const response = await http.post(url, data,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function updateCluster(data) {
    const url  = `/api/cluster`
    const response = await http.put(url, data,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function deleteCluster(clusterName) {
    const url  = `/api/cluster?clusterName=${clusterName}`
    const response = await http.delete(url)
    return response.data
}

async function getKv (key) {
    const url = `/api/kv?key=${key}`
    const data = await http.get(url)
    return data.data
}

async function saveKv(params) {
    const url = '/api/kv'
    const data = await http.post(url, params)
    return data.data
}
async function fetchRemoteClusterList(params) {
    const url = '/api/cluster/remote'
    const data = await http.post(url, params)
    return data.data
}

export  {
    getClusterList,
    createCluster,
    deleteCluster,
    updateCluster,

    getKv,
    saveKv,

    fetchRemoteClusterList,
    
}