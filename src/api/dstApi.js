import { map } from "lodash";
import { http } from "../utils/http";

const dstHomeServerListUrl = "/api/dst/home/server"
const dstHomeServerDetailUrl = "/api/dst/home/server/detail"
const dstVersionAUrl = "/api/dst/version"

async function getHomeListApi(params) {
    // const url = '/dst/index/serverlist/getserverlist.html'

    const response = await http.post(dstHomeServerListUrl, {
        page: params.current,
        paginate: 10,
        sort_type: 'name',
        sort_way: 1,
        search_type: 1,
        search_content: params.name,
        mod: params.mods
    }, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return response.data
}

export async function dstHomeListApi(params) {
    const response = await getHomeListApi(params)
    const responseData = JSON.parse(response)
    const fields = responseData.successinfo.fields
    const data = responseData.successinfo.data

    const homelist = data.map(value => {
        const info = {}
        fields.map((key, index) => {
            info[key] = value[index]
            return key
        })
        return info
    })
    const temp = {
        data: homelist,
        total_count: responseData.successinfo.total_count,
        total: responseData.successinfo.total,
        per_page: responseData.successinfo.per_page,
        current_page: responseData.successinfo.current_page,
        last_page: responseData.successinfo.last_page,
        fetch_time_delta: responseData.successinfo.fetch_time_delta
    }

    return temp
}

export async function dstHomeDetailApi(params) {
    // const url = '/dst/index/serverlist/getserverdetail.html'

    const response = await http.post(dstHomeServerDetailUrl, {
        rowId: params.rowId,
        region: params.region
    }, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return response.data
}

export function getPlayer(response) {
    const success = response.success
    if (!success) {
        return []
    }
    return response.successinfo.players
}

export async function dstHomePlayersApi(params) {
    // const url = '/dst/index/serverlist/getserverdetail.html'

    const response = await http.post(dstHomeDetailApi, {
        rowId: params.rowId,
        region: params.region
    }, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return response.data
}

async function dstVersionApi() {
    // const url = '/version/getLocalVersion'
    const response = await http.get(dstVersionAUrl)
    return response.data
}
export async function lobbyServerDetailApi(region, rowId) {
    const url = `/lobby/server/query/detail?rowId=${rowId}&region=${region}`
    const response = await http.get(url)
    return response.data
}

export {
    dstVersionApi
}