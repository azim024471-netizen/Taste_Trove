

import { requireRole } from "@/lib/core_function/userSession";


const UserLayout = async ({children}) =>{
      
         await requireRole('user')
        return children;

};

export default UserLayout;