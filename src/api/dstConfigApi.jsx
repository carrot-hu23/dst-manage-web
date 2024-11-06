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


export {
    readDstConfigSync,
    writeDstConfigSync,
}