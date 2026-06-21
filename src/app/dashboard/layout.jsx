'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiOutlineBookOpen, HiOutlineFlag, HiOutlineHeart, HiOutlinePlusCircle, HiOutlineShoppingBag,
     HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';
import {  FaUtensils,  FaBars, } from 'react-icons/fa';
import { HiOutlineCreditCard } from 'react-icons/hi';



const menuItem = [
  {
    name: "Overview",
    href: "/dashboard/admin",
    icon: HiHome,
  },
  {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: HiOutlineUsers,
    },
    {
        name: "Manage Recipes",
        href: "/dashboard/admin/manage-recipes",
        icon: HiOutlineBookOpen,
    },
    {
      name: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: HiOutlineCreditCard,
    },
  {
    name: "Reports",
    href: "/dashboard/admin/reports",
    icon: HiOutlineFlag,
  },
];




const menuItems= [
  {
    name: "Overview",
    href: "/dashboard/user",
    icon: HiHome,
  },
  {
    name: "My Recipes",
    href: "/dashboard/user/my_recpies",
    icon: HiOutlineBookOpen,
  },
  {
    name: "Add Recipe",
    href: "/dashboard/user/post_recipe",
    icon: HiOutlinePlusCircle,
  },
  {
    name: "My Favorites",
    href: "/dashboard/user/my_favorites",
    icon: HiOutlineHeart,
  },
  {
    name: "My Purchased Recipes",
    href: "/dashboard/user/purchased_recipes",
    icon: HiOutlineShoppingBag,
  },
  {
    name: "Profile",
    href: "/dashboard/user/profile",
    icon: HiOutlineUser,
  },
];



export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDF6F0] dark:bg-zinc-950">
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 
        transform transition-transform duration-300 lg:translate-x-0 overflow-hidden flex-shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center">
              <FaUtensils className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">TasteTrove</h1>
          </div>

          <nav className="flex-1 p-6 overflow-y-auto">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">MENU</p>
            
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-rose-500 text-white' 
                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <item.icon className="text-lg" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-16 lg:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-2xl text-zinc-700 dark:text-zinc-300"
          >
            <FaBars />
          </button>

          <div className="lg:hidden text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Welcome back
          </div>
        </header>

        <main className="overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}