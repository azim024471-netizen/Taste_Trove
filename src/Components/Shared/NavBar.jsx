"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaUtensils, FaPlus, FaSignOutAlt } from "react-icons/fa";
// import { HiUserCircle } from "react-icons/hi";
import { authClient, useSession } from "@/lib/auth-client";
import { Avatar, Button, Skeleton, toast } from "@heroui/react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = useSession()
    const user = session?.user;
    const router = useRouter()

    console.log(user, 'user from nav')


 const handleSignOut = async () => {
    // setDropdownOpen(false);
    try {
      await authClient.signOut();
      router.push('/');
      toast.success('Sign Out Successful!!!', {
        description: "You have been logged out successfully.",
        indicator: true,
      });
    } catch (error) {
      toast.danger('Sign Out Failed!', { 
        description: error.message || "Something went wrong during sign out.",
        indicator: true,
      });
    }
  };


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore Recipes", path: "/recipes" },
        { name: "DashBoard", path: "/dashboard" },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
                ? "bg-slate-50/90 border-slate-200 text-slate-800 backdrop-blur-md shadow-sm"
                : "bg-zinc-950 border-zinc-900/40 text-zinc-100"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight">
                    <FaUtensils className="text-rose-600" />
                    <span className={isScrolled ? "text-slate-900" : "text-zinc-100"}>
                        Taste<span className="text-rose-600">Trove</span>
                    </span>
                </Link>


                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;

                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`transition-all pb-1 ${isActive
                                    ? "text-rose-600 border-b-2 border-rose-600 font-bold"
                                    : isScrolled
                                        ? "text-slate-600 hover:text-rose-600"
                                        : "text-zinc-300 hover:text-rose-500"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
               <div className="flex items-center min-w-30 justify-end">
    {isPending ? (
        <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700" />
            <Skeleton className="w-16 h-6 rounded-lg bg-zinc-800" />
        </div>
    ) : user ? (
        <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center gap-0.5">
                <Avatar className="border-2 border-rose-500 w-9 h-9 md:w-10 md:h-10" size="sm">
                    <Avatar.Image
                        referrerPolicy="no-referrer"
                        alt={user.name}
                        src={user.image}
                    />
                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <span className={`hidden sm:block text-[10px] font-bold max-w-30 truncate transition-colors duration-300 ${isScrolled ? "text-zinc-950" : "text-zinc-300"}`}>
                    {user.name}
                </span>
            </div>

            <button
                onClick={handleSignOut}
                className="text-rose-600 hover:text-rose-700 text-xs md:text-sm font-bold px-2 py-1.5 transition-all active:scale-95 flex items-center gap-2 bg-transparent"
            >
                <FaSignOutAlt className="text-xs opacity-90" />
                <span>Logout</span>
            </button>
        </div>
    ) : (
        <div className="flex items-center space-x-2 md:space-x-3">
            <Link
                href="/Access/login"
                className={`text-[8px] md:text-xs font-bold px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border transition-all duration-350 ${isScrolled
                        ? "border-slate-300 text-zinc-300 hover:bg-slate-100 bg-slate-900"
                        : "border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 bg-transparent"
                    }`}
            >
                Sign In
            </Link>

            <Link
                href="/Access/register"
                className="bg-rose-600 hover:bg-rose-700 text-white md:text-xs text-[8px] px-2 py-1.5 font-bold md:px-4 md:py-2.5 md:rounded-xl rounded-lg transition-all shadow-md shadow-rose-600/10 active:scale-95"
            >
                Sign Up
            </Link>
        </div>
    )}
</div>
            </div>
        </nav>
    );
}