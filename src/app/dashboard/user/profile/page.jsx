import { getUserSession } from '@/lib/core_function/server';
import React from 'react';
import Image from 'next/image';
import {  FaCrown, FaEnvelope, FaCalendarAlt, FaBan, FaCheckCircle, FaUtensils } from 'react-icons/fa';
import { UpdateProfileModal } from './UpdateProfileModal';

const ProfilePge = async () => {
  const userSession = await getUserSession();
  const user = userSession?.user;

  console.log(user, 'from my profile page');

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  const isPremium = user?.user_type  === 'premium';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      






<div className="flex flex-col mt-7 items-center text-center space-y-4 border-b border-zinc-200
 dark:border-zinc-800 pb-6 max-w-2xl mx-auto">
  
  <div className="flex items-center gap-2.5 bg-zinc-950 dark:bg-black/40 px-5 py-2 rounded-2xl shadow-md border border-zinc-800/80 transition-all hover:scale-105 duration-300 select-none">
    <FaUtensils className="text-rose-500 text-lg sm:text-xl animate-pulse" />
    
    <div className="text-xl font-black tracking-tight">
      <span className="text-white">Taste</span>
      <span className="text-rose-500">Trove</span>
    </div>
    
    
  </div>
  
  <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-linear-to-r from-rose-600  to-zinc-900 bg-clip-text 
  text-transparent drop-shadow-sm pb-1">
    Personal Account Overview
  </h1>
  
  <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
    View your subscription status, personal credentials, and manage your account security seamlessly.
  </p>
  
</div>


      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        
        <div className="h-36 w-full bg-linear-to-r from-rose-950 to-rose-600 opacity-90" />

        <div className="px-6 pb-6 relative flex flex-col sm:flex-row sm:items-end justify-between -mt-20 gap-4 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            
          
            <div className="w-40 h-40 rounded-2xl border-4 border-white dark:border-zinc-900 overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800 relative shrink-0">
              {user?.image ? (
                <Image 
                  src={user.image} 
                  alt={user?.name || "User Avatar"} 
                  width={160} 
                  height={160} 
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center  font-bold text-4xl bg-rose-500/10
                 text-rose-500">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

          
            <div className="mb-2 space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{user?.name || "Guest User"}</h2>
                
               
                {isPremium ? (
                  <span className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-500/20 shadow-sm animate-pulse">
                    <FaCrown className="text-xs" />
                    Premium
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-700">
                    Free Member
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{user?.email}</p>
            </div>
          </div>


       
       <UpdateProfileModal user = {user}> </UpdateProfileModal>





          
        </div>

      
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
         
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-lg shrink-0">
              <FaEnvelope />
            </div>
            <div className="overflow-hidden w-full">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">{user?.email || "N/A"}</p>
            </div>
          </div>

         
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-lg shrink-0">
              <FaCrown />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Plan Type</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 capitalize">
                {user?.user_type?.replace('_', ' ') || "Free User"}
              </p>
            </div>
          </div>

       
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-lg shrink-0">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Member Since</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{memberSince}</p>
            </div>
          </div>

        </div>

      
        <div className="mx-6 mb-6">
          {user?.banned ? (
            <div className="p-4 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-500/20 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <FaBan className="text-base text-red-500 animate-bounce" />
                <span>This account has been restricted !</span>
              </div>
              {user?.banReason && (
                <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400 mt-1 pl-6">
                  Reason: <span className="italic">{user.banReason}</span>
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold border border-emerald-500/20 flex items-center gap-2">
              <FaCheckCircle className="text-base text-emerald-500" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                <span>Your account is fully safe and active.</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePge;