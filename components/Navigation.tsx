/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Search,
  Briefcase,
  MessageCircle,
  UserCircle,
  Home,
  Bell,
  MapPin,
  Menu,
} from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
  { id: 'bookings', label: 'Bookings', icon: Briefcase, path: '/bookings' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
  { id: 'profile', label: 'Profile', icon: UserCircle, path: '/profile' },
];

export const Navigation = React.memo(function Navigation() {
  return (
    <>
      {/* Desktop & Tablet Header */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm h-18 items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">O</span>
            </div>
            <span className="text-xl font-bold text-surface-dark hidden lg:block">Oja</span>
          </Link>
          <div className="relative hidden lg:flex items-center">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full h-11 px-4 shadow-sm w-[400px]">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="What service do you need?"
                className="bg-transparent border-none outline-none text-sm w-full px-3 text-gray-700 placeholder-gray-400"
              />
              <div className="h-6 w-px bg-gray-200 mx-2" />
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent border-none outline-none text-sm w-24 px-2 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/search" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Find Jobs</Link>
          <button className="bg-accent hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95">
            Post a Job
          </button>
          <div className="flex items-center gap-4 border-l border-gray-200 pl-6 ml-2">
            <button className="text-gray-500 hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
              <img src="https://picsum.photos/seed/avatar1/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-4 justify-between">
        <Menu className="w-6 h-6 text-gray-700" />
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm leading-none">O</span>
          </div>
          <span className="text-lg font-bold text-surface-dark">Oja</span>
        </Link>
        <div className="w-8 flex justify-end">
          <Search className="w-5 h-5 text-gray-700" />
        </div>
      </header>
    </>
  );
});
