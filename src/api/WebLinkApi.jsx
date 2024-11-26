import {http} from "../utils/http";

async function getWebLinkListApi(cluster) {
    const url = '/api/web/link'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function addWebLinkApi(cluster, webLink) {
    const url = '/api/web/link'
    const response = await http.post(url,webLink,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteWebLinkApi(cluster, ID) {
    const url = `/api/web/link?ID=${ID}`
    const response = await http.delete(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getWebLinkListApi,
    addWebLinkApi,
    deleteWebLinkApi
}