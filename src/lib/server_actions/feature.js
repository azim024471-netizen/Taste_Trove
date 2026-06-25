
'use server'

import { serverMutation } from "../core_function/server"



export const setFeature = async (recipeId, newStatus) => {
    return serverMutation(`/api/recipes/feature/${recipeId}`, { isFeatured: newStatus }, 'PATCH');
};