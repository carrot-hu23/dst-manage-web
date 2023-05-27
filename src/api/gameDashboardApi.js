import { http } from "../utils/http";

export async function getGameDashboardApi() {
    const url = '/api/game/specified/dashboard'

    const response = await http.get(url)
    return response.data
}