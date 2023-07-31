import {http} from "../utils/http";

async function autoCheckStatusApi(cluster) {
    const url = '/api/auto/check/status'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function enableAutoCheckMasterRunApi(cluster, enable) {
    let e = 0
    if (enable) {
        e = 1
    }
    const url = `/api/auto/check/master?enable=${e}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function enableAutoCheckCavesRunApi(cluster, enable) {
    let e = 0
    if (enable) {
        e = 1
    }
    const url = `/api/auto/check/caves?enable=${e}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function enableAutoCheckUpdateVersionApi(cluster, enable) {
    let e = 0
    if (enable) {
        e = 1
    }
    const url = `/api/auto/check/version?enable=${e}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function enableAutoCheckMasterModUpdateApi(cluster, enable) {
    let e = 0
    if (enable) {
        e = 1
    }
    const url = `/api/auto/check/master/mod?enable=${e}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function enableAutoCheckCavesModUpdateApi(cluster, enable) {
    let e = 0
    if (enable) {
        e = 1
    }
    const url = `/api/auto/check/caves/mod?enable=${e}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    autoCheckStatusApi,
    enableAutoCheckMasterRunApi,
    enableAutoCheckCavesRunApi,
    enableAutoCheckUpdateVersionApi,
    enableAutoCheckMasterModUpdateApi,
    enableAutoCheckCavesModUpdateApi,
}