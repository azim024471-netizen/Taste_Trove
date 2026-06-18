import Link from 'next/link';
import { FaUtensils, FaFacebook, FaTwitter, FaInstagram, FaGithub, FaHeart } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-t border-slate-100
     dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-slate-900 dark:text-zinc-50">
              <FaUtensils className="text-rose-600" />
              <span>Taste<span className="text-rose-600">Trove</span></span>
            </Link>
            <p className="text-sm leading-relaxed">
              A treasure trove of flavors. Discover outstanding recipes from top chefs around the world and share your own culinary magic with the community.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors"><FaGithub size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/recipes" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Browse Recipes</Link></li>
              <li><Link href="/premium" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Premium Membership</Link></li>
              <li><Link href="/about" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
              Management
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">User Dashboard</Link></li>
              <li><Link href="/dashboard/add-recipe" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Add New Recipe</Link></li>
              <li><Link href="/admin" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Admin Panel</Link></li>
              <li><Link href="/privacy" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <HiMail className="text-rose-600 text-lg shrink-0" />
                <span className="truncate">support@tastetrove.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiPhone className="text-rose-600 text-lg shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiLocationMarker className="text-rose-600 text-lg shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800 text-center text-xs flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-slate-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} TasteTrove. All rights reserved.</p>
        <p className='inline-flex items-center gap-1.5'>
  Built with <FaHeart className="text-rose-600" /> for Food Lovers
</p>
        </div>

      </div>
    </footer>
  );
}