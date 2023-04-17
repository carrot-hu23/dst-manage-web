import { http } from "../myuitls/http"

async function countActivePlayes(unit, startDate, endDate) {
    console.log(unit, startDate, endDate, new Date(startDate).setHours(8), new Date(endDate).setHours(8));
    const url = `/api/statistics/active/user/?unit=${unit}&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    const response = await http.get(url)
    return response
}


async function countTopNDeath(N, startDate, endDate) {
    const url = `/api/statistics/top/death?N=${N}&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    const response = await http.get(url)
    return response.data
}

async function countTopNActive(N, startDate, endDate) {
    const url = `/api/statistics/top/active/?N=${N}&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    // const url = `/api/statistics/top/active?N=${N}&startDate=${startDate}&endDate=${endDate}`
    const response = await http.get(url)
    return response.data
}

async function countRoleRate(startDate, endDate) {
    const url = `/api/statistics/rate/role/?&startDate=${new Date(new Date(startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(endDate).setHours(7+24)).toISOString()}`
    // const url = `/api/statistics/top/active?N=${N}&startDate=${startDate}&endDate=${endDate}`
    const response = await http.get(url)
    return response.data
}

export {
    countActivePlayes,
    countTopNDeath,
    countTopNActive,
    countRoleRate
}