import React from 'react';
import { Button } from '@heroui/react';
import { FaCrown, FaCheckCircle, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

const UpgradeToProCard = () => {
  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto bg-linear-to-b from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-rose-500/10 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6 shadow-lg shadow-amber-500/5">
        <FaCrown className="text-3xl animate-pulse" />
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight flex items-center justify-center gap-2">
        <FaExclamationTriangle className="text-amber-500 text-lg sm:text-xl shrink-0" />
        <span>Recipe Limit Reached!</span>
      </h3>
      
      <p className="text-sm text-zinc-400 mt-2 max-w-sm mx-auto font-medium leading-relaxed">
        You have reached the maximum limit of recipes for the free tier. Upgrade to continue sharing your culinary creations.
      </p>

      <div className="w-full my-6 bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-4 max-w-xs text-left space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <FaCheckCircle className="text-emerald-500 shrink-0" size={13} />
          <span>Upload Unlimited Recipes</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <FaCheckCircle className="text-emerald-500 shrink-0" size={13} />
          <span>Exclusive Premium Profile Badge</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <FaCheckCircle className="text-emerald-500 shrink-0" size={13} />
          <span>Get Higher Engagement & Likes</span>
        </div>
      </div>

      <Link
        href={'/get_premium'} 
        className="w-full max-w-xs h-11 flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-zinc-950 font-black text-sm rounded-xl transition-all shadow-xl shadow-rose-950/20 group active:scale-[0.98]"
      >
        <span>Become a Pro Now</span>
        <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
};

export default UpgradeToProCard;