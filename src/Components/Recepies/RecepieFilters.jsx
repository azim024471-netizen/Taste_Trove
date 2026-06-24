'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const RecepieFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key); 
    }

     params.set("page", "1");


    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
 




  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-10 space-y-4">

      <div className="w-full block">
        <div className="relative w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search recipes... (e.g. Biryani, Pizza)"
            defaultValue={searchParams.get('search') || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>
      </div>


      <div className="flex flex-col sm:flex-row gap-3 w-full">


        <select
          value={searchParams.get('category') || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="flex-1 min-w-35 px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200
           dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-rose-500 text-sm capitalize cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Desserts & Sweets</option>
          <option value="drinks">Drinks</option>
        </select>


        <select
          value={searchParams.get('cuisine') || ''}
          onChange={(e) => handleFilterChange('cuisine', e.target.value)}
          className="flex-1 min-w-35 px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-rose-500 text-sm cursor-pointer"
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

        <select
          value={searchParams.get('servings') || ''}
          onChange={(e) => handleFilterChange('servings', e.target.value)}
          className="flex-1 min-w-35 px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-rose-500 text-sm cursor-pointer"
        >
          <option value="">All Servings</option>
          <option value="1_person">1 Person</option>
          <option value="2_people">2 People</option>
          <option value="4_people">4 People</option>
          <option value="6_plus">6+ People</option>
        </select>

      </div>

    </div>
  );
};

export default RecepieFilters;