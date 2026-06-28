import { headers } from "next/headers";
import { auth } from "../auth";
import { getUserToken } from "./userSession";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL




 export const authHeader =  async()=>{
            
   const token = await getUserToken();

   const header = token? {
    authorization : `Bearer ${token}`
   } : {}

   return header;

 }






export const serverMutation = async (path, data, method = 'POST') => {
    const currentMethod = method.toUpperCase();

    const res = await fetch(`${BASE_URL}${path}`, {
        method: currentMethod,
        headers: {
            'content-type': 'application/json', 
            ... await authHeader()   
        },
      
        ...(currentMethod !== 'DELETE' && data ? { body: JSON.stringify(data) } : {})
    });

   return handleStatusCode(res);
};




export const getUserSession = async()=>{
    const session = await auth.api.getSession({
        headers : await headers()
    })
    
    return session || null; 
}





export const serverFetch = async (path) => {
    const res = await fetch(`${BASE_URL}${path}`);
    return res.json();
};





export const protectedFetch = async (path) => {
    const res = await fetch(`${BASE_URL}${path}`,
        {
            headers: await authHeader()
        }
    );

    return handleStatusCode(res);
}



const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json()
}