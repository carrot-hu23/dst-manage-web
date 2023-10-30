import {http} from "../utils/http";

async function readLevelServerLogApi(cluster, levelName, lines) {

    const url = `/api/game/level/server/log?levelName=${levelName}&lines=${lines}`
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
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