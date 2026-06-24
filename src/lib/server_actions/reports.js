"use server"
import { serverMutation } from "../core_function/server"



export const postReportFuntion= async (reportsData)=>{
    return serverMutation('/api/reports', reportsData)
}