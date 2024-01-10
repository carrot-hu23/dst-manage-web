import { http } from "../utils/http";

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

async function getPlayerLog(cluster,paramsData) {

    const params = {
        page: paramsData.current,
        size: paramsData.pageSize,
        name: paramsData.name,
        role: paramsData.role,
        kuId: paramsData.kuId,
        steamId: paramsData.steamId,
        action: paramsData.action,
    };

    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    const queryString = Object.keys(filteredParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key])}`)
        .join('&');

    const url = `/api/player/log?${queryString}`;
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteLogs(cluster, data) {
    const url  = `/api/player/log/delete`
    const response = await http.post(url, data,{
        timeout: 1000 * 60 * 30,
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    logPage,
    getPlayerLog,
    deleteLogs
}