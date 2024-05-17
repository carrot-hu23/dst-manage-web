import {http} from "../utils/http";


async function getClusterList() {
    const url = "/proxy/clusters"

    const response = await http.get(url)
    return response.data
}

async function createCluster(data) {
    const url  = `/proxy/clusters`
    const response = await http.post(url, data,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function updateCluster(data) {
    const url  = `/proxy/clusters`
    const response = await http.put(url, data,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function deleteCluster(id) {
    const url  = `/proxy/clusters?id=${id}`
    const response = await http.delete(url)
    return response.data
}

export  {
    getClusterList,
    createCluster,
    deleteCluster,
    updateCluster
}