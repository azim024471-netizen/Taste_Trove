'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const RecepieFilters = ({
  onSearchChange,
  onCategoryChange,
  onCuisineChange,
  onDifficultyChange,
  onServingsChange,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-10">
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search recipes... (e.g. Biryani, Pizza)"
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-[#FF6B35] text-sm"
          />
        </div>

        {/* Category */}
        <select
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-[#FF6B35] text-sm"
        >
          <option value="">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>

        {/* Cuisine */}
        <select
          onChange={(e) => onCuisineChange(e.target.value)}
          className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-[#FF6B35] text-sm"
        >
          <option value="">All Cuisines</option>
          <option value="traditional_bengali">Traditional Bengali</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="american">American</option>
          <option value="japanese">Japanese</option>
          <option value="international">International</option>
        </select>

        {/* Difficulty */}
        <select
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-[#FF6B35] text-sm"
        >
          <option value="">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Servings */}
        <select
          onChange={(e) => onServingsChange(e.target.value)}
          className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-[#FF6B35] text-sm"
        >
          <option value="">All Servings</option>
          <option value="1_people">1 Person</option>
          <option value="2_people">2 People</option>
          <option value="3_people">3 People</option>
          <option value="4_people">4 People</option>
          <option value="5_people">5+ People</option>
        </select>
      </div>
    </div>
  );
};

export default RecepieFilters;