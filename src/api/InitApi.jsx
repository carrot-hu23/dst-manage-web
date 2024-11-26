import { http } from "../utils/http";

// async function checkIsFirst() {

// }

async function initApi(user) {
    const url = "/api/login"
    const response = await http.post(url, user)
    return response.data
}

async function isFirstApi(user) {
    const url = "/api/init"
    const response = await http.get(url, user)
    return response.data
}

async function getNews() {
    const url = "/steam/dst/news"
    const response = await http.get(url)
    return response.data
}

export {
    initApi,isFirstApi,getNews
}