import {http} from "../utils/http";

async function getUserInfoApi(cluster) {
    const url = '/api/user'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function updateUserApi(cluster, data) {
    const url = `/api/user`
    const response = await http.post(url,data,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function queryUserAccountListApi(params) {
    const params2 = new URLSearchParams();

    // 遍历对象的属性并添加到URLSearchParams对象中
    // eslint-disable-next-line no-restricted-syntax
    for (const key in params) {
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
            params2.append(key, params[key]);
        }
    }
    const url = `/api/user/account?${params2.toString()}`
    const response = await http.get(url)

    return response.data
}

async function createUserAccountApi(data) {
    const url = `/api/user/account`
    const response = await http.post(url,data)
    return response.data
}

async function updateUserAccountApi(data) {
    const url = `/api/user/account`
    const response = await http.put(url,data)
    return response.data
}

async function deleteUserAccountApi(id) {
    const url = `/api/user/account?id=${id}`
    const response = await http.delete(url)
    return response.data
}


async function queryUserClusterListApi(userId) {

    const url = `/api/user/account/cluster?userId=${userId}`
    const response = await http.get(url)

    return response.data
}

async function queryUserClusterPermissionApi(cluster) {

    const url = `/api/user/account/cluster/permission?clusterName=${cluster}`
    const response = await http.get(url)

    return response.data
}

async function addUserClusterApi(data) {
    const url = `/api/user/account/cluster`
    const response = await http.post(url,data)
    return response.data
}

async function deleteUserClusterApi(id) {
    const url = `/api/user/account/cluster?id=${id}`
    const response = await http.delete(url)
    return response.data
}

async function putUserClusterApi(data) {
    const url = `/api/user/account/cluster`
    const response = await http.put(url, data, {})
    return response.data
}

export {
    getUserInfoApi,
    updateUserApi,

    queryUserAccountListApi,
    createUserAccountApi,
    updateUserAccountApi,
    deleteUserAccountApi,
    queryUserClusterListApi,
    addUserClusterApi,
    deleteUserClusterApi,
    putUserClusterApi,
    queryUserClusterPermissionApi,
}