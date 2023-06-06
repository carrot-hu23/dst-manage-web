import { http } from "../utils/http";

async function searchMod(cluster,text, page, size) {
    const url = `/api/mod/search?text=${text}&page=${page}&size=${size}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getModInfo(cluster,modId) {
    const url = `/api/mod/${modId}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteModInfo(cluster,modId) {
    const url = `/api/mod/${modId}`
    const response = await http.delete(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getMyModInfoList(cluster) {
    const url = '/api/mod'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteStepupWorkshopApi(cluster) {
    const url = '/api/mod/setup/workshop'
    const response = await http.delete(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}


export {
    searchMod,getModInfo, getMyModInfoList,deleteModInfo,deleteStepupWorkshopApi
}