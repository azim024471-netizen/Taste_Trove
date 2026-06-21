'use server'

import { serverMutation } from "../core_function/server"


export const postRecipe = async(recipeData)=>{
     return serverMutation('/api/recipes', recipeData)
}


export const deleteRecpie = async (repieId) => {
    
    return serverMutation(`/api/recipes/${repieId}`, null, 'DELETE');
};