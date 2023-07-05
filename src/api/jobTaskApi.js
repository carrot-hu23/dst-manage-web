import {http} from "../utils/http";

async function getJobTaskListApi(cluster) {
    const url = '/api/task'
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getJobTaskListApi
}