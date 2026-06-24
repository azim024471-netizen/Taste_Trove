"use server"
import { serverMutation } from "../core_function/server"



export const postReportFuntion= async (reportsData)=>{
    return serverMutation('/api/reports', reportsData)
}




export const deleteReportAndRecipe = async(reportId, recipeId)=>{
    return serverMutation(`/api/reports/remove-recipe/${reportId}/${recipeId}`, null, 'DELETE')
}




export const dismissReport = async (reportId) => {
    return serverMutation(`/api/reports/${reportId}`, null, 'DELETE')
}