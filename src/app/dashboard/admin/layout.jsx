




import { requireRole } from "@/lib/core_function/userSession";


const AdminLayout = async ({children}) =>{
      
         await requireRole('admin')
        return children;

};

export default AdminLayout;