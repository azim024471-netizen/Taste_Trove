import { purchasedRecipeById } from '@/lib/api_actions/recipe_api'; // getRecipeById রিমুভ করা হয়েছে
import { getUserSession } from '@/lib/core_function/server';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaClock, FaUtensils, FaHeart, FaCalendarAlt, FaHashtag } from 'react-icons/fa';

const PurchasedRecipes = async () => {
  const session = await getUserSession();
  const user = session?.user;
  
  const purchasedRecipesData = await purchasedRecipeById(user?.id);

  const enrichedPurchasedRecipes = purchasedRecipesData?.data || [];
  const count = purchasedRecipesData?.count || 0;
   
  console.log(enrichedPurchasedRecipes, count, '🔥 ডাটাবেজ থেকে সরাসরি চলে এসেছে!');

  return (
    <div className="w-full min-h-screen bg-[#fcf8f4] text-slate-700 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <FaUtensils className="text-orange-600 text-lg" />
              My Purchased Recipes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage and view all premium recipes you have unlocked.
            </p>
          </div>
          <div className="bg-white border border-orange-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-xs self-start sm:self-center">
            Total Unlocked: <span className="text-orange-600 font-black">{count}</span>
          </div>
        </div>

        {enrichedPurchasedRecipes.length === 0 ? (
          <div className="max-w-2xl mx-auto my-8">
            <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-linear-to-br from-white via-orange-50/40 to-rose-50/30 p-10 sm:p-14 text-center shadow-lg">
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-orange-200/20 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-rose-200/20 blur-3xl"></div>

              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-zinc-900 to-rose-500 shadow-xl shadow-orange-500/20">
                <FaUtensils className="text-4xl text-white" />
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                  <FaHeart className="text-rose-600 animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl font-black text-zinc-800 tracking-tight">
                No Purchased Recipes Yet
              </h3>
              <p className="mt-3 text-zinc-500 max-w-md mx-auto leading-relaxed">
                Your premium collection is waiting to be filled. Explore our exclusive masterclasses, unlock premium recipes, and elevate your culinary skills.
              </p>

              <Link
                href="/recipes"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-zinc-900 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <FaUtensils />
                Explore Recipes
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
              {enrichedPurchasedRecipes.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-100 flex items-center justify-center">
                    {item.recipeImage ? (
                      <Image
                        src={item.recipeImage}
                        alt={item.recipeName}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                        <FaUtensils size={32} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`capitalize font-semibold shadow-sm text-white text-xs px-2.5 py-1 rounded-full ${
                          item.category?.toLowerCase() === 'dinner' ? 'bg-indigo-600' :
                          item.category?.toLowerCase() === 'breakfast' ? 'bg-emerald-600' :
                          'bg-amber-500'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-zinc-800 text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {item.recipeName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                        <FaClock className="text-orange-500/80" />
                        <span>{item.preparationTime} mins cook time</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium">
                        <FaCalendarAlt className="text-zinc-300" />
                        <span>Purchased: {item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString('en-GB') : 'N/A'}</span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-md inline-block">
                        TXN: #{item.transactionId ? item.transactionId.slice(-8) : item._id.slice(-8)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-zinc-50 pt-3">
                      <Link
                        href={`/recipes/${item.recipeId}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl py-2.5 transition-colors"
                      >
                        <FaEye />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  <thead className="bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Recipe Info</th>
                      <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Category</th>
                      <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Prep Time</th>
                      <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Transaction ID</th>
                      <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase">Purchased Date</th>
                      <th className="px-6 py-4.5 text-zinc-500 font-bold text-xs tracking-wider uppercase text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-rose-100">
                    {enrichedPurchasedRecipes.map((item) => (
                      <tr
                        key={item._id}
                        className="bg-zinc-50/60 hover:bg-white transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 min-w-14 rounded-xl overflow-hidden ring-2 ring-zinc-200 group-hover:ring-rose-400 transition-all shadow-sm flex items-center justify-center bg-zinc-100">
                              {item.recipeImage ? (
                                <Image
                                  src={item.recipeImage}
                                  alt={item.recipeName}
                                  width={56}
                                  height={56}
                                  priority={false}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaUtensils className="text-zinc-400" size={16} />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-zinc-800 text-base group-hover:text-orange-600 transition-colors">
                                {item.recipeName}
                              </span>
                              <span className="text-xs text-zinc-400 mt-0.5">
                                ID: #{item.recipeId ? item.recipeId.slice(-6) : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`capitalize font-semibold rounded-lg px-2.5 py-1 text-xs ${
                              item.category?.toLowerCase() === 'dinner' ? 'bg-indigo-50 text-indigo-600' :
                              item.category?.toLowerCase() === 'breakfast' ? 'bg-emerald-50 text-emerald-600' :
                              'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {item.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-zinc-700 font-medium text-sm">
                            <FaClock className="text-zinc-400" />
                            <span>{item.preparationTime} mins</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs bg-zinc-100/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/40 w-fit">
                            <FaHashtag className="text-zinc-400 text-[10px]" />
                            <span>
                              {item.transactionId ? item.transactionId.slice(0, 14) + '...' : item._id.slice(0, 14) + '...'}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-zinc-600 font-medium text-sm">
                            <FaCalendarAlt className="text-zinc-400" />
                            <span>
                              {item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }) : 'N/A'}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <Link
                              href={`/recipes/${item.recipeId}`}
                              title="View Details"
                              className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                            >
                              <FaEye />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PurchasedRecipes;