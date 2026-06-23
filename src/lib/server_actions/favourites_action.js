'use server'
import { serverMutation } from "../core_function/server"




export const deleteFavouritRecpie = async (favouritId) => {
    return serverMutation(`/api/myFavorites/${favouritId}`, null, 'DELETE')
} 