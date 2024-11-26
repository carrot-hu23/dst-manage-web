import {http} from "../utils/http";

async function getSystemInfoApi() {
    const url = `/api/game/system/info`
    const response = await http.get(url,)
    return response.data
}


export {
    getSystemInfoApi,
}