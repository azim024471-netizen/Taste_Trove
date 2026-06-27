"use client";

import React from 'react';
import {
    FaRegClock,
    FaCheckCircle,
    FaCrown,
    FaGem,
    FaUtensils,
    FaUser,
    FaCreditCard
} from 'react-icons/fa';

export default function TransactionsContainer({ initialTransactions }) {
    const transactions = initialTransactions;

    return (
        <>
            <div className="hidden md:block overflow-hidden bg-white text-zinc-900 rounded-2xl shadow-sm border border-zinc-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase font-bold border-b border-zinc-200">
                                <th className="p-4">User</th>
                                <th className="p-4">Type / Plan</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {transactions.map((tx) => {
                                const formattedDate = new Date(tx.paidAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                const isPremium = tx.type === 'premium';
                                const isElite = tx.planType?.toLowerCase() === 'elite';

                                return (
                                    <tr key={tx._id} className="hover:bg-zinc-50/70 transition-colors">
                                        
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-zinc-100 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 shadow-sm shrink-0">
                                                    <FaUser size={14} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-zinc-800 text-sm">{tx.userName}</span>
                                                    <span className="text-zinc-400 text-xs">{tx.userEmail}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            {isPremium ? (
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border ${
                                                    isElite 
                                                        ? 'bg-amber-50 text-amber-800 border-amber-200 font-bold' 
                                                        : 'bg-purple-50 text-purple-800 border-purple-200 font-bold'
                                                }`}>
                                                    {isElite ? <FaCrown className="text-amber-500" size={12} /> : <FaGem className="text-purple-500" size={11} />}
                                                    <span className="capitalize">Premium ({tx.planType})</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                                                    <FaUtensils className="text-emerald-500" size={11} />
                                                    <span>Recipe</span>
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <span className="font-extrabold text-zinc-900 text-sm">
                                                ${tx.amount?.toFixed(2)}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-600 bg-zinc-50 px-2 py-1 rounded-lg border border-zinc-100 w-fit">
                                                <FaCreditCard size={11} className="text-zinc-400" />
                                                <span>{tx.transactionId}</span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-zinc-600 text-sm">
                                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                                <FaRegClock size={12} />
                                                {formattedDate}
                                            </div>
                                        </td>

                                        <td className="p-4 text-center">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                                <FaCheckCircle size={10} />
                                                <span className="capitalize">{tx.paymentStatus}</span>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {transactions.map((tx) => {
                    const formattedDate = new Date(tx.paidAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    const isPremium = tx.type === 'premium';
                    const isElite = tx.planType?.toLowerCase() === 'elite';

                    return (
                        <div key={tx._id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 bg-zinc-100 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 shadow-sm shrink-0">
                                    <FaUser size={14} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-zinc-800 text-base truncate">{tx.userName}</span>
                                    <span className="text-zinc-400 text-xs truncate">{tx.userEmail}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400 uppercase font-bold text-[10px]">Type</span>
                                    {isPremium ? (
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border ${isElite ? 'bg-amber-100 text-amber-800 border-amber-200 font-black' : 'bg-purple-100 text-purple-800 border-purple-200 font-bold'}`}>
                                            {isElite ? <FaCrown size={10} /> : <FaGem size={10} />}
                                            <span className="capitalize">Premium ({tx.planType})</span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                                            <FaUtensils size={10} />
                                            <span>Recipe</span>
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex justify-between items-center border-t border-zinc-200/60 pt-2">
                                    <span className="text-zinc-400 uppercase font-bold text-[10px]">Amount</span>
                                    <span className="font-extrabold text-zinc-900">${tx.amount?.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center border-t border-zinc-200/60 pt-2">
                                    <span className="text-zinc-400 uppercase font-bold text-[10px]">TXID</span>
                                    <span className="font-mono text-zinc-600 truncate max-w-25">{tx.transactionId}</span>
                                </div>

                                <div className="flex justify-between items-center border-t border-zinc-200/60 pt-2">
                                    <span className="text-zinc-400 uppercase font-bold text-[10px]">Status</span>
                                    <span className="text-green-600 font-bold capitalize">{tx.paymentStatus}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                                <FaRegClock size={11} />
                                <span>Paid on {formattedDate}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>  
    );
}