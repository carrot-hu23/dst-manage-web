import { http } from "../utils/http";

async function getPlayerListApi(cluster) {
    const url = '/api/game/player'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}
async function getAdminPlayerListApi(cluster) {
    const url = '/api/game/player/admin'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}
async function getBlackListPlayerListApi(cluster) {
    const url = '/api/game/player/blacklist'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function setAdminPlayerListApi(cluster,playerList) {
    const url = '/api/game/player/admin'
    const response = await http.post(url, {
        adminList: playerList
    },{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}
async function setBlackListPlayerListApi(cluster,playerList) {
    const url = '/api/game/player/blacklist'
    const response = await http.post(url, {
        blacklist: playerList
    },{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function kickPlayerApi(cluster,player) {
    const url = '/api/game/kick/player'
    const response = await http.get(url, {
        params: {
            kuId: player.kuId
        },headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function killPlayerApi(cluster,player) {
    const url = '/api/game/kill/player'
    const response = await http.get(url, {
        params: {
            kuId: player.kuId
        },headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}
async function respawnPlayerApi(cluster,player) {
    const url = '/api/game/respawn/player'
    const response = await http.get(url, {
        params: {
            kuId: player.kuId
        },headers: {
            'Cluster': cluster,
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