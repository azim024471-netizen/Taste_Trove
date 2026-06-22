'use server'

import { serverMutation } from "../core_function/server"


export const postRecipe = async(recipeData)=>{
     return serverMutation('/api/recipes', recipeData)
}


export const deleteRecpie = async (recipeId) => {
    
    return serverMutation(`/api/recipes/${recipeId}`, null, 'DELETE');
};


export const updateRecpieFunction = async (recpieId,upDateData) =>{
    return serverMutation(`/api/recipes/${recpieId}`, upDateData, 'PATCH')
}


export const postToAddFav= async ( postData)=>{
    return serverMutation('/api/favorites', postData)
}
 