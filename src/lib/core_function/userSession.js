import { redirect } from "next/navigation";
import { getUserSession } from "./server";
import { auth } from "../auth";
import { headers } from "next/headers";




export const requireRole =async(role)=>{
    const session = await getUserSession();
    const user = session?.user || null;


    if(!user){
        redirect('/Access/login')
    }
    if(user.role !== role){
        redirect('/unauthorized')
    }
    return user;

}




export const getUserToken = async()=>{
    const session = await auth.api.getSession({
        headers:await headers()
    })
    
    return session?.session?.token;
}
