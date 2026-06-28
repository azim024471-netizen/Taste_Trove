import { serverFetch } from "../core_function/server"


export const countInfoForAdmin = async()=>{
    return serverFetch('/api/admin/count-info')
}


export const countInfoForUser = async(userId)=>{
    return serverFetch(`/api/user/dashboard-stats/${userId}`)
}