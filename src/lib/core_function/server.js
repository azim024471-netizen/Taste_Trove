const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export const serverMutation = async(path, data, method='POST')=>{
    const res =await fetch(`${BASE_URL}${path}`,{
        method: method,

         headers: {
            'content-type': 'application/json',    
        },
       
        body: JSON.stringify(data),
    });

    return res.json()
}





export const serverFetch = async (path) => {
    const res = await fetch(`${BASE_URL}${path}`);
    return res.json()
}


