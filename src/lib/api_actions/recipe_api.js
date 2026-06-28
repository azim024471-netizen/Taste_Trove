import { protectedFetch, serverFetch } from "../core_function/server"

 
 
 
export const getRecipe = async (params) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    
    return serverFetch(`/api/recipes?${queryString}`);
};


export const getAllRecipes = async () => {
    return serverFetch('/api/recipes/all');
};


  export const getRecipeById = async (recipeId)=>{
   return protectedFetch(`/api/recipes/${recipeId}`)
  }


  export const getRecipeByUserId = async(userID)=>{
    return protectedFetch(`/api/recipes/user/${userID}`)
  }


  export const purchasedRecipeById = async (userId)=>{
    return protectedFetch(`/api/purchased/${userId}`)
  }


  export const  exitingRecipes = async ()=>{
    return serverFetch('/api/recipes/home-data')
  }