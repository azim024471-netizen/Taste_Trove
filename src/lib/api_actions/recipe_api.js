import { serverFetch } from "../core_function/server"

 
 
 
 
 export const getRecipe= async ()=>{
    return serverFetch("/api/recipes")
  }


  export const getRecipeById = async (recipeId)=>{
   return serverFetch(`/api/recipes/${recipeId}`)
  }