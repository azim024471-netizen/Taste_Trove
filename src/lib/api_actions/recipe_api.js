import { serverFetch } from "../core_function/server"

 
 
 
 
 export const getRecipe= async ()=>{
    return serverFetch("/api/recipes")
  }
