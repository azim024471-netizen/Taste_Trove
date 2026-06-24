
import { serverFetch } from "../core_function/server"



export const getReports = async ()=>{
    return serverFetch(`/api/reports`)
}