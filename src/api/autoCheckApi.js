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

async function autoCheckApi(cluster, name) {
    const url = `/api/auto/check?name=${name}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveAutoCheckApi(cluster, data) {
    if (data.enable) {
        data.enable = 1
    } else {
        data.enable = 0
    }
    const url = `/api/auto/check`
    const response = await http.post(url,data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function autoCheck2Api(cluster, checkType) {
    const url = `/api/auto/check2?checkType=${checkType}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveAutoCheck2Api(cluster, data) {
    if (data.enable) {
        data.enable = 1
    } else {
        data.enable = 0
    }
    const url = `/api/auto/check2`
    const response = await http.post(url,data,{
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

    autoCheckApi,
    saveAutoCheckApi,


    autoCheck2Api,
    saveAutoCheck2Api,
}