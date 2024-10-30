import { http } from "../utils/http";

async function searchMod(lang, cluster,text, page, size) {

    const url = `/api/mod/search?text=${text}&page=${page}&size=${size}&lang=${lang}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getModInfo(lang,cluster,modId) {
    const url = `/api/mod/${modId}?lang=${lang}`
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
async function updateModinfosApi() {
    const url = '/api/mod/modinfo'
    const response = await http.put(url)
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

async function getUgcModAcfApi(cluster, levelName) {
    const url = `/api/mod/ugc/acf?levelName=${levelName}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteUgcModAcfFileApi(cluster, levelName, workshopId) {
    const url = `/api/mod/ugc?levelName=${levelName}&workshopId=${workshopId}`
    const response = await http.delete(url,{
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
    updateModinfosApi,

    getUgcModAcfApi,
    deleteUgcModAcfFileApi
}