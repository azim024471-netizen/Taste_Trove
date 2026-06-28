import {  serverFetch } from "../core_function/server"



export const myFavouritesRecpies = async (userid)=>{
    return serverFetch(`/api/myFavorites/${userid}`)
}