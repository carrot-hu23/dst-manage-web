import { http } from "../utils/http";

async function getSystemSetting () {
    const url = '/api/system/setting'
    const data = await http.get(url)
    return data.data
}

async function saveSystemSetting(params) {
    const url = '/api/system/setting'
    const data = await http.post(url, params)
    return data.data
}


export {
    getSystemSetting,
    saveSystemSetting,
}