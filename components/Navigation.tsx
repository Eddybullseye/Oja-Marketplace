'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  Search,
  Bell,
  MapPin,
  Menu,
  LogOut,
} from 'lucide-react';

export const Navigation = React.memo(function Navigation() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 shadow-sm h-16 items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">O</span>
            </div>
            <span className="text-xl font-bold text-surface-dark dark:text-zinc-50 hidden lg:block">Oja</span>
          </Link>
          <div className="relative hidden lg:flex items-center">
            <div className="flex items-center bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-850 rounded-full h-11 px-4 shadow-sm w-[400px]">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="bg-transparent border-none outline-none text-sm w-full px-3 text-gray-700 dark:text-zinc-300 placeholder-gray-400"
              />
              <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800 mx-2" />
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent border-none outline-none text-sm w-24 px-2 text-gray-700 dark:text-zinc-300 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${pathname === '/'
              ? 'text-primary dark:text-teal-400 font-bold'
              : 'text-gray-600 dark:text-zinc-400 hover:text-primary dark:hover:text-teal-400'
              }`}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={`text-sm font-medium transition-colors ${pathname === '/search'
              ? 'text-primary dark:text-teal-400 font-bold'
              : 'text-gray-600 dark:text-zinc-400 hover:text-primary dark:hover:text-teal-400'
              }`}
          >
            Find Pros
          </Link>
          <Link
            href="/bookings"
            className={`text-sm font-medium transition-colors ${pathname === '/bookings'
              ? 'text-primary dark:text-teal-400 font-bold'
              : 'text-gray-600 dark:text-zinc-400 hover:text-primary dark:hover:text-teal-400'
              }`}
          >
            Bookings
          </Link>
          <Link
            href="/messages"
            className={`text-sm font-medium transition-colors ${pathname === '/messages'
              ? 'text-primary dark:text-teal-400 font-bold'
              : 'text-gray-600 dark:text-zinc-400 hover:text-primary dark:hover:text-teal-400'
              }`}
          >
            Messages
          </Link>
          <button className="bg-accent hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95">
            Post a Job
          </button>
          <div className="flex items-center gap-4 border-l border-gray-200 dark:border-zinc-800 pl-6 ml-2">
            <button className="text-gray-500 hover:text-primary dark:hover:text-teal-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white dark:border-zinc-950"></span>
            </button>
            <Link
              href="/profile"
              className={`w-9 h-9 rounded-full bg-gray-200 overflow-hidden cursor-pointer border-2 transition-colors ${pathname === '/profile'
                ? 'border-primary dark:border-teal-400'
                : 'border-transparent hover:border-primary dark:hover:border-teal-400'
                }`}
              title={user?.name || 'Profile'}
            >
              <img src="https://picsum.photos/seed/avatar1/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
            <button
              onClick={() => logout()}
              className="text-gray-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 h-16 flex items-center px-4 justify-between">
        <Menu className="w-6 h-6 text-gray-700 dark:text-zinc-350" />
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm leading-none">O</span>
          </div>
          <span className="text-lg font-bold text-surface-dark dark:text-zinc-50">Oja</span>
        </Link>
        <div className="w-8 flex justify-end">
          <Search className="w-5 h-5 text-gray-700 dark:text-zinc-350" />
        </div>
      </header>
    </>
  );
});
