import {http} from "../utils/http";

export async function usePreinstallApi(cluster, name) {
    const url = `/api/game/preinstall?name=${name}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}