import { serverFetch } from "../core_function/server"


export const countInfoForAdmin = async()=>{
    return serverFetch('/api/admin/count-info')
}