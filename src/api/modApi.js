import { http } from "../utils/http";

async function searchMod(text, page, size) {
    const url = `/api/mod/search?text=${text}&page=${page}&size=${size}`
    const response = await http.get(url)
    return response.data
}

async function getModInfo(modId) {
    const url = `/api/mod/${modId}`
    const response = await http.get(url)
    return response.data
}

async function deleteModInfo(modId) {
    const url = `/api/mod/${modId}`
    const response = await http.delete(url)
    return response.data
}

async function getMyModInfoList() {
    const url = '/api/mod'
    const response = await http.get(url)
    return response.data
}


export {
    searchMod,getModInfo, getMyModInfoList,deleteModInfo
}