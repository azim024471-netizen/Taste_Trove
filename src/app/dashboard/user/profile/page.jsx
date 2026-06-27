import { getUserSession } from '@/lib/core_function/server';
import React from 'react';
import Image from 'next/image';
import { FaCrown, FaEnvelope, FaCalendarAlt, FaBan, FaCheckCircle, FaUtensils, FaArrowRight, FaGem } from 'react-icons/fa';
import { UpdateProfileModal } from './UpdateProfileModal';
import Link from 'next/link';

const ProfilePge = async () => {
  const userSession = await getUserSession();
  const user = userSession?.user;

  console.log(user, 'from my profile page');

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  const isElite = user?.user_type === 'elite';
  const isStandard = user?.user_type === 'standard';
  const isFree = user?.user_type === 'free_user' || !user?.user_type;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      
      <div className="flex flex-col mt-7 items-center text-center space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-2.5 bg-zinc-950 dark:bg-black/40 px-5 py-2 rounded-2xl shadow-md border border-zinc-800/80 transition-all hover:scale-105 duration-300 select-none">
          <FaUtensils className="text-rose-500 text-lg sm:text-xl animate-pulse" />
          <div className="text-xl font-black tracking-tight">
            <span className="text-white">Taste</span>
            <span className="text-rose-500">Trove</span>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-linear-to-r from-rose-600 to-zinc-900 bg-clip-text text-transparent drop-shadow-sm pb-1">
          Personal Account Overview
        </h1>
        
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
          View your subscription status, personal credentials, and manage your account security seamlessly.
        </p>
      </div>

      <div className={`bg-white dark:bg-zinc-900 rounded-3xl border transition-all duration-500 overflow-hidden ${
        isElite 
          ? "border-amber-500/40 shadow-2xl shadow-amber-500/10" 
          : isStandard 
          ? "border-violet-500/30 shadow-xl shadow-violet-500/5"
          : "border-zinc-200 dark:border-zinc-800 shadow-sm"
      }`}>
        
        <div className={`h-36 w-full transition-all duration-500 ${
          isElite 
            ? "bg-linear-to-r from-black via-zinc-950 via-amber-950 to-amber-500" 
            : isStandard 
            ? "bg-linear-to-r from-zinc-950 via-violet-950 to-violet-600" 
            : "bg-linear-to-r from-zinc-400 to-zinc-600 dark:from-zinc-800 dark:to-zinc-700"
        }`} />

        <div className="px-6 pb-6 relative flex flex-col sm:flex-row sm:items-end justify-between -mt-20 gap-4 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            
            <div className={`w-40 h-40 rounded-2xl border-4 overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800 relative shrink-0 transition-all duration-500 ${
              isElite 
                ? "border-amber-500 shadow-md shadow-amber-500/40" 
                : isStandard
                ? "border-violet-500 shadow-md shadow-violet-500/30"
                : "border-white dark:border-zinc-900"
            }`}>
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
                <div className={`w-full h-full flex items-center justify-center font-bold text-4xl ${
                  isElite ? "bg-amber-500/10 text-amber-500" : isStandard ? "bg-violet-500/10 text-violet-500" : "bg-zinc-500/10 text-zinc-400"
                }`}>
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div className="mb-2 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {user?.name || "Guest User"}
                </h2>
                
                {isElite ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-500 via-yellow-400 to-amber-600 text-black text-[11px] font-black uppercase tracking-widest rounded-full border border-amber-400 shadow-lg shadow-amber-500/20 animate-pulse">
                    <FaCrown className="text-xs text-black" />
                    Premium Elite
                  </span>
                ) : isStandard ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider rounded-full border border-violet-400 shadow-md shadow-violet-500/20">
                    <FaGem className="text-xs text-violet-200" />
                    Standard Member
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded-full border border-zinc-200 dark:border-zinc-700 w-max mx-auto sm:mx-0">
                    Free Member
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">{user?.email}</p>
            </div>
          </div>

          <UpdateProfileModal user={user} />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Email Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-lg shrink-0">
              <FaEnvelope />
            </div>
            <div className="overflow-hidden w-full">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">{user?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 justify-between group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-300 ${
                isElite 
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                  : isStandard 
                  ? "bg-violet-500/10 text-violet-500 border border-violet-500/20 dark:bg-violet-500/20"
                  : "bg-zinc-500/10 text-zinc-400"
              }`}>
                {isElite ? <FaCrown /> : isStandard ? <FaGem /> : <FaCrown />}
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Plan Type</p>
                <p className={`text-sm font-black mt-0.5 capitalize ${
                  isElite ? "text-amber-500" : isStandard ? "text-violet-500 dark:text-violet-400" : "text-zinc-800 dark:text-zinc-200"
                }`}>
                  {user?.user_type?.replace('_', ' ') || "Free User"}
                </p>
              </div>
            </div>
            {isFree && (
              <Link href="/get_premium" className="text-xs font-black text-rose-500 hover:text-rose-600 transition-colors bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/10 hover:border-rose-500/20 shrink-0">
                Upgrade
              </Link>
            )}
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

        {isFree && (
          <div className="mx-6 mb-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl shadow-zinc-950/20 relative overflow-hidden group transition-all duration-300">
            
            <div className="absolute -right-6 -top-10 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-500/5 blur-2xl rounded-full pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start gap-4 z-10">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-black flex items-center justify-center text-xl shrink-0 shadow-lg shadow-amber-500/10 mt-0.5">
                <FaGem className="animate-pulse" />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h5 className="text-base font-black text-amber-400 tracking-tight drop-shadow-sm">
                    Unlock TasteTrove Premium Pro
                  </h5>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Limited Offer
                  </span>
                </div>
                <p className="text-xs text-zinc-200 font-medium leading-relaxed max-w-xl">
                  Join our elite culinary studio! Upgrade now to upload unlimited recipes, obtain a verified creator badge, feature your dishes on the main feed, and enjoy an absolute ad-free premium workspace.
                </p>
              </div>
            </div>
            
            <Link href="/get_premium" className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black text-xs font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 z-10 group/btn">
              <span>Upgrade to Pro Now</span>
              <FaArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        <div className="mx-6 mb-6">
          {user?.banned ? (
            <div className="p-4 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-500/20 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <FaBan className="text-base text-red-500" />
                <span>This account has been restricted!</span>
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