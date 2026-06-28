
import { protectedFetch } from "../core_function/server"



export const getReports = async ()=>{
    return protectedFetch(`/api/reports`)
}