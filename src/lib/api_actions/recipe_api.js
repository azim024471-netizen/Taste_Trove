import { serverFetch } from "../core_function/server"

 
 
 
export const getRecipe = async (params) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    
    return serverFetch(`/api/recipes?${queryString}`);
};





  export const getRecipeById = async (recipeId)=>{
   return serverFetch(`/api/recipes/${recipeId}`)
  }


  export const getRecipeByUserId = async(userID)=>{
    return serverFetch(`/api/recipes/user/${userID}`)
  }