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
    const url = '/api/game/player/adminlist'
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

async function addAdminPlayerListApi(cluster,playerList) {
    const url = '/api/game/player/adminlist'
    const response = await http.post(url, {
        adminList: playerList
    },{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}
async function addBlackListPlayerListApi(cluster,playerList) {
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

async function deleteAdminPlayerListApi(cluster,playerList) {
    const url = '/api/game/player/adminlist'
    const response = await http.delete(url, {
        headers: {
            'Cluster': cluster,
        },
        data:{adminlist: playerList}
    })
    return response.data
}
async function deleteBlackListPlayerListApi(cluster,playerList) {
    const url = '/api/game/player/blacklist'
    const response = await http.delete(url, {
        headers: {
            'Cluster': cluster,
        },
        data:{blacklist: playerList}
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


export {
    getPlayerListApi, getAdminPlayerListApi, getBlackListPlayerListApi,kickPlayerApi, killPlayerApi, respawnPlayerApi,
    addAdminPlayerListApi,
    addBlackListPlayerListApi,
    deleteBlackListPlayerListApi,
    deleteAdminPlayerListApi,

}