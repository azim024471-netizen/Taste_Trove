import { getUsersList } from '@/lib/api_actions/users';
import React from 'react';
import UserContainer from '@/Components/AdminDashboard/UserContainer';
import { FaUtensils } from 'react-icons/fa'; 

const ManageUserPage = async() => {
    const data = await getUsersList();
    const users = data?.users || [];
    
    console.log(users, 'from user management page');

    return (
        <div className="min-h-screen py-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex flex-col items-center text-center space-y-4 bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-sm">
                    
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-rose-100">
                            <FaUtensils size={16} />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-zinc-900">
                            Taste<span className="text-rose-600">Trove</span>
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-zinc-900 via-rose-600 to-zinc-800 bg-clip-text text-transparent pb-1">
                            User Command Center
                        </h1>
                        
                        <div className="inline-flex items-center px-3 py-1 text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100 rounded-full shadow-sm">
                           Total {users.length}  Users Registered
                        </div>
                    </div>

                    <p className="text-sm md:text-base text-zinc-500 max-w-2xl leading-relaxed">
                        Overview all registered user accounts, track membership tiers, and manage system access roles from a single centralized dashboard. Seamlessly enforce platform guidelines by banning or unbanning users instantly.
                    </p>
                </div>

                <UserContainer initialUsers={users} />
                
            </div>
        </div>
    );
};

export default ManageUserPage;