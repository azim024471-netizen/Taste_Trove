import { getAllTransactions } from '@/lib/api_actions/transactions';
import React from 'react';
import { FaReceipt } from 'react-icons/fa';
import TransactionsContainer from '@/Components/AdminDashboard/TransactionsContainer';

const TransactionsPage = async () => {
    const allTransactions = await getAllTransactions() || [];
    
    console.log(allTransactions, 'from transactions page');

    return (
        <div className="min-h-screen py-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex flex-col items-center text-center space-y-4 bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-sm">
                    
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-rose-100">
                            <FaReceipt size={16} />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-zinc-900">
                            Taste<span className="text-rose-600">Trove</span>
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-zinc-900 via-rose-600 to-zinc-800 bg-clip-text text-transparent pb-1">
                            Transaction Ledger
                        </h1>
                        
                        <div className="inline-flex items-center px-3 py-1 text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100 rounded-full shadow-sm">
                            Total {allTransactions.length} Transactions Processed
                        </div>
                    </div>

                    <p className="text-sm md:text-base text-zinc-500 max-w-2xl leading-relaxed">
                        Monitor all platform revenues, track subscription history, and audit user individual recipe purchases. View complete details including transaction IDs, exact timestamps, and automated Stripe checkout statuses in real-time.
                    </p>
                </div>

                <TransactionsContainer initialTransactions={allTransactions} />
                
            </div>
        </div>
    );
};

export default TransactionsPage;