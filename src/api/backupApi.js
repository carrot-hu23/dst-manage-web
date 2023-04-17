import { http } from "../utils/http";

async function createBackupApi() {
    const url = '/api/game/backup'
    const response = await http.post(url)
    return response.data
}

async function getBackupApi() {
    const url = '/api/game/backup'
    const response = await http.get(url)
    return response.data
}

async function deleteBackupApi(names) {
    const url = '/api/game/backup'
    const response = await http.delete(url, {
        data: {
            fileNames: names,
        }
    })
    return response.data
}

async function renameBackupApi(data) {
    const url = '/api/game/backup'
    const response = await http.put(url, data)
    return response.data
}

async function downloadBackupApi(names) {
    const url = '/api/game/backup/download'
    const response = await http.get(url, {
        params: {
            fileName: names
        },
        responseType: 'blob',
    })
    return response.data
}

export {
    createBackupApi,
    getBackupApi,
    deleteBackupApi,
    downloadBackupApi,
    renameBackupApi
}