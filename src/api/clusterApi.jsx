import {http} from "../utils/http";


async function queryClusterList(params) {
    let url
    if (params.clusterName === undefined || params.clusterName === null || params.clusterName === '') {
        url = `/api/cluster?page=${params.current}&size=${10}`
    } else {
        url = `/api/cluster?page=${params.current}&size=${10}&clusterName=${params.clusterName}`
    }

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

async function deleteCluster(ID) {
    const url  = `/api/cluster?id=${ID}`
    const response = await http.delete(url)
    return response.data
}

export  {
    queryClusterList,
    createCluster,
    deleteCluster,
    updateCluster
}