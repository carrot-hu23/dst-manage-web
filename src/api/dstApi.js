import { http } from "../utils/http";

const dstHomeServerListUrl = "/api/dst/home/server"
const dstHomeServerDetailUrl = "/api/dst/home/server/detail"

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



export async function dstHomeListApi2(params) {

    const params2 = new URLSearchParams();

    // 遍历对象的属性并添加到URLSearchParams对象中
    // eslint-disable-next-line no-restricted-syntax
    for (const key in params) {
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
            params2.append(key, params[key]);
        }
    }

    
    const url = `/api/dst/home/server2?${params2.toString()}`
    const response = await http.get(url)

    return response.data
}

export async function dstHomeDetailApi2(rowId) {
    const url = `/api/dst/home/server/detail2?rowId=${rowId}`
    const response = await http.get(url)

    return response.data
}
