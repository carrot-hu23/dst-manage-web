import { http } from "../utils/http";

async function getPlayerListApi() {
    const url = '/api/game/player'
    const response = await http.get(url)
    return response.data
}
async function getAdminPlayerListApi() {
    const url = '/api/game/player/admin'
    const response = await http.get(url)
    return response.data
}
async function getBlackListPlayerListApi() {
    const url = '/api/game/player/blacklist'
    const response = await http.get(url)
    return response.data
}

async function setAdminPlayerListApi(playerList) {
    const url = '/api/game/player/admin'
    const response = await http.post(url, {
        adminList: playerList
    })
    return response.data
}
async function setBlackListPlayerListApi(playerList) {
    const url = '/api/game/player/blacklist'
    const response = await http.post(url, {
        blacklist: playerList
    })
    return response.data
}

async function kickPlayerApi(player) {
    const url = '/api/game/kick/player'
    const response = await http.get(url, {
        params: {
            kuId: player.kuId
        }
    })
    return response.data
}

async function killPlayerApi(player) {
    const url = '/api/game/kill/player'
    const response = await http.get(url, {
        params: {
            kuId: player.kuId
        }
    })
    return response.data
}
async function respawnPlayerApi(player) {
    const url = '/api/game/respawn/player'
    const response = await http.get(url, {
        params: {
            kuId: player.kuId
        }
    })
    return response.data
}

async function pullPlayer2BlockListApi(player) {
    const url = '/api/game/update'
    const response = await http.get(url)
    return response.data
}
async function pullPlayer2AdminListApi(player) {
    const url = '/api/game/update'
    const response = await http.get(url)
    return response.data
}

export {
    getPlayerListApi, getAdminPlayerListApi, getBlackListPlayerListApi, setAdminPlayerListApi, setBlackListPlayerListApi,
    kickPlayerApi, killPlayerApi, respawnPlayerApi, pullPlayer2BlockListApi, pullPlayer2AdminListApi
}