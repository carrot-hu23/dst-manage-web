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

async function addJobTaskApi(cluster, jobTask) {
    const url = '/api/task'
    const response = await http.post(url,jobTask,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function deleteJobTaskApi(cluster, jobId) {
    const url = `/api/task?jobId=${jobId}`
    const response = await http.delete(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getJobTaskListApi,
    addJobTaskApi,
    deleteJobTaskApi
}