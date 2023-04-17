import { http } from "../myuitls/http"

async function logPage(name, page, size) {
    let url
    if (name === undefined || name === null || name === '') {
        url = `/api/player/log?page=${page}&size=${size}`
    } else {
        url = `/api/player/log?page=${page}&size=${size}&name=${name}`
    }
    
    // const url = `/api/statistics/top/active?N=${N}&startDate=${startDate}&endDate=${endDate}`
    const response = await http.get(url)
    return response.data
}

async function getPlayerLog(params) {
    let url
    if (params.name === undefined || params.name === null || params.name === '') {
        url = `/api/player/log?page=${params.current}&size=${10}`
    } else {
        url = `/api/player/log?page=${params.current}&size=${10}&name=${params.name}`
    }
    
    // const url = `/api/statistics/top/active?N=${N}&startDate=${startDate}&endDate=${endDate}`
    const response = await http.get(url)
    return response.data
}

export {
    logPage,
    getPlayerLog
}