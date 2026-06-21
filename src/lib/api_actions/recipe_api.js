import { serverFetch } from "../core_function/server"

 
 
 
 
 export const getRecipe= async ()=>{
    return serverFetch("/api/recipes")
  }


  export const getRecipeById = async (recipeId)=>{
   return serverFetch(`/api/recipes/${recipeId}`)
  }


  export const getRecipeByUserId = async(userID)=>{
    return serverFetch(`/api/recipes/user/${userID}`)
  }