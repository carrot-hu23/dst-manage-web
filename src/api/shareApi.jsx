import {http} from "../utils/http";

export async function getKeyCerApi() {
    const url = `/api/share/keyCer`
    const response = await http.get(url,{

    })
    return response.data
}

export async function enableKeyCerApi(enable) {
    let e = "0"
    if (enable === true) {
        e = "1"
    }
    const url = `/api/share/keyCer/enable?enable=${e}`
    const response = await http.get(url,{

    })
    return response.data
}

export async function reflushKeyCerApi() {
    const url = `/api/share/keyCer/reflush`
    const response = await http.get(url,{

    })
    return response.data
}

export async function importClusterApi(data) {
    const url = `/api/share/cluster/import`
    const response = await http.post(url,{
        url: data
    })
    return response.data
}