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

async function restoreBackupApi(cluster,fileName) {
    const url = `/api/game/backup/restore?backupName=${fileName}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getBackupSnapshotsSettingApi(cluster) {
    const url = '/api/game/backup/snapshot/setting'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function saveBackupSnapshotsSettingApi(cluster, data) {
    if (data.enable) {
        data.enable = 1
    } else {
        data.enable = 0
    }
    if (data.isCSave) {
        data.isCSave = 1
    } else {
        data.isCSave = 0
    }
    const url = '/api/game/backup/snapshot/setting'
    const response = await http.post(url, data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getBackupSnapshotsList(cluster) {
    const url = '/api/game/backup/snapshot/list'
    const response = await http.get(url,{
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
    renameBackupApi,
    restoreBackupApi,

    getBackupSnapshotsSettingApi,
    saveBackupSnapshotsSettingApi,
    getBackupSnapshotsList,

}