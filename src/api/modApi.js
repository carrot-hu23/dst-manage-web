import { http } from "../utils/http";

async function searchMod(text, page, size) {
    const url = `/py/search/mod?text=${text}&page=${page}&size=${size}`
    const response = await http.get(url)
    return response.data
}

async function getModInfo(modId) {
    const url = `/py/mod/${modId}`
    const response = await http.get(url)
    return response.data
}

export {
    searchMod,getModInfo
}