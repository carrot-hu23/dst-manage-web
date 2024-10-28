import { http } from "../utils/http";

async function readDstConfigSync () {
    const url = '/api/dst/config'
    const data = await http.get(url)
    return data.data
}

async function writeDstConfigSync(params) {
    const url = '/api/dst/config'
    const data = await http.post(url, params)
    return data.data
}

async function getKv (key) {
    const url = `/api/kv?key=${key}`
    const data = await http.get(url)
    return data.data
}

async function saveKv(params) {
    const url = '/api/kv'
    const data = await http.post(url, params)
    return data.data
}

export {
    readDstConfigSync,
    writeDstConfigSync,
    getKv,
    saveKv
}