'use server'

import { serverMutation } from "../core_function/server"


export const postRecipe = async(recipeData)=>{
     return serverMutation('/api/recipes', recipeData)
}