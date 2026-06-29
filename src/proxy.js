import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth'
 
export async function proxy(request) {

 const session = await auth.api.getSession({
        headers: await headers()
    })  

     if(!session){

      return NextResponse.redirect(new URL('/Access/login', request.url))
}
return NextResponse.next()
}

 
export const config = {
// matcher: ['/recipes/:path+','/dashboard/admin','/dashboard/user'],

 matcher: ['/recipes/:path+', '/dashboard/admin/:path*', '/dashboard/user/:path*'],
}