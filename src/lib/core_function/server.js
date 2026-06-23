import { headers } from "next/headers";
import { auth } from "../auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


// export const serverMutation = async(path, data, method='POST')=>{
//     const res =await fetch(`${BASE_URL}${path}`,{
//         method: method,

//          headers: {
//             'content-type': 'application/json',    
//         },
       
//         body: JSON.stringify(data),
//     });

//     return res.json()
// }





export const serverMutation = async (path, data, method = 'POST') => {
    const currentMethod = method.toUpperCase();

    const res = await fetch(`${BASE_URL}${path}`, {
        method: currentMethod,
        headers: {
            'content-type': 'application/json',    
        },
      
        ...(currentMethod !== 'DELETE' && data ? { body: JSON.stringify(data) } : {})
    });

    return res.json();
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
