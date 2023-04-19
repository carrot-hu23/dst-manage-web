import { http } from "../utils/http";

async function searchMod(text) {
    const url = `/inner/search/mod?text=${text}`
    const response = await http.get(url)
    return response.data
}

async function getModInfo(modId) {
    const url = `/inner/mod/${modId}`
    const response = await http.get(url)
    return response.data
}

export {
    searchMod,getModInfo
}