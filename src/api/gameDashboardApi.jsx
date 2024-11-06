import { http } from "../utils/http";

export async function getGameDashboardApi(cluster) {
    const url = '/api/game/dashboard'

    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}