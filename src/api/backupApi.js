import { http } from "../utils/http";

async function createBackupApi(cluster) {
    const url = '/api/game/backup'
    const response = await http.post(url,null,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getBackupApi(cluster) {
    const url = '/api/game/backup'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteBackupApi(cluster,names) {
    const url = '/api/game/backup'
    const response = await http.delete(url, {
        data: {
            fileNames: names,
        },
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function renameBackupApi(cluster,data) {
    const url = '/api/game/backup'
    const response = await http.put(url, data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    createBackupApi,
    getBackupApi,
    deleteBackupApi,
    renameBackupApi
}