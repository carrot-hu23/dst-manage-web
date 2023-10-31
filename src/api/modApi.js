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
        timeout: 1000*60*10,
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


async function getModInfoFileApi(cluster,modId) {
    const url = `/api/mod/modinfo/${modId}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function updateModApi(cluster,modId) {
    const url = `/api/mod/${modId}`
    const response = await http.put(url,{},{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function addModInfoFileApi(cluster,data) {
    const url = `/api/mod/modinfo/file`
    const response = await http.post(url,data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    searchMod,getModInfo, getMyModInfoList,deleteModInfo,deleteStepupWorkshopApi,
    getModInfoFileApi,
    updateModApi,

    addModInfoFileApi,

}