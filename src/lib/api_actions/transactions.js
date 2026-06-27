import { serverFetch } from "../core_function/server"


 
export const getAllTransactions = async()=>{
    return serverFetch('/api/payments')
}

