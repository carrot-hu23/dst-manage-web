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

export {
    readLevelServerLogApi
}