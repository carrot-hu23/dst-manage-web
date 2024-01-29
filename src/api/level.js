import {http} from "../utils/http";

async function readLevelServerLogApi(lines) {

    const url = `/api/game/log?lines=${lines}`
    const response = await http.get(url)
    return response.data
}

async function readPanelLogApi(lines) {

    const url = `/api/game/dst-admin-go/log?lines=${lines}`
    const response = await http.get(url, {
        headers: {
            'Cluster': "",
        }
    })
    return response.data
}


export {
    readLevelServerLogApi,
    readPanelLogApi,
}