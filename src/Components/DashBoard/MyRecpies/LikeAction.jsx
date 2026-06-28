import React from 'react';
import { FaRegHeart } from 'react-icons/fa';

const LikeAction = () => {
    return (
             <button className="flex flex-col items-center justify-center gap-1 bg-white hover:bg-rose-50/50 border border-orange-100/60 rounded-xl py-2.5 text-zinc-700 hover:text-rose-500 transition-colors">
                                                    <FaRegHeart className="text-base" />
                                                    <span className="text-[10px] font-bold">Like</span>
                                                </button>
    );
};

export default LikeAction;