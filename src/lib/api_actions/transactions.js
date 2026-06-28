import { protectedFetch} from "../core_function/server"


 
export const getAllTransactions = async()=>{
    return protectedFetch('/api/payments')
}

