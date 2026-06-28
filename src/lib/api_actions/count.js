import { protectedFetch} from "../core_function/server"


export const countInfoForAdmin = async()=>{
    return protectedFetch('/api/admin/count-info')
}


export const countInfoForUser = async(userId)=>{
    return protectedFetch(`/api/user/dashboard-stats/${userId}`)
}