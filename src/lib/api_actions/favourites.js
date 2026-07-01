import {  serverFetch } from "../core_function/server"



// export const myFavouritesRecpies = async (userid)=>{
//     return serverFetch(`/api/myFavorites/${userid}`)
// }

 const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export const myFavouritesRecpies = async (userid) => {
    const res = await fetch(`${BASE_URL}/api/myFavorites/${userid}`, { 
        cache: 'no-store' 
    });
    return res.json();
}