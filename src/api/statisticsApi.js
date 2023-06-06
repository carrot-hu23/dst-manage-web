import { http } from "../utils/http";

async function countActivePlayers(cluster,unit, startDate, endDate) {
    // console.log(unit, startDate, endDate, new Date(startDate).setHours(8), new Date(endDate).setHours(8));

    console.log("统计活跃用户： cluster", cluster)
    const url = `/api/statistics/active/user/?unit=${unit}&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response
}


async function countTopNDeath(cluster,N, startDate, endDate) {
    const url = `/api/statistics/top/death?N=${N}&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function countTopNActive(cluster,N, startDate, endDate) {
    const url = `/api/statistics/top/active/?N=${N}&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    // const url = `/api/statistics/top/active?N=${N}&startDate=${startDate}&endDate=${endDate}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function countRoleRate(cluster,startDate, endDate) {
    const url = `/api/statistics/rate/role/?&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    countActivePlayers,
    countTopNDeath,
    countTopNActive,
    countRoleRate
}