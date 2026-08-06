'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Search,
  Briefcase,
  MessageCircle,
  UserCircle,
  Home,
} from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
  { id: 'bookings', label: 'Bookings', icon: Briefcase, path: '/bookings' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
  { id: 'profile', label: 'Profile', icon: UserCircle, path: '/profile' },
];

export const BottomNav = React.memo(function BottomNav() {
  const pathname = usePathname();

  const renderedTabs = useMemo(() => {
    return TABS.map((tab) => {
      const isActive = pathname === tab.path || (tab.path !== '/' && pathname.startsWith(tab.path));
      const Icon = tab.icon;

      return (
        <Link
          key={tab.id}
          href={tab.path}
          className="relative flex flex-col items-center justify-center w-16 h-full"
        >
          <div className="relative z-10 flex flex-col items-center gap-1 mt-1">
            <div className="relative flex items-center justify-center w-10 h-10">
              <Icon
                strokeWidth={isActive ? 2.5 : 2}
                className={`w-6 h-6 z-10 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="active-bottom-tab"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {/* Mock notification badge for messages */}
              {tab.id === 'messages' && (
                <span className="absolute top-1.5 right-1.5 z-20 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white" />
              )}
            </div>
            <span
              className={`text-[10px] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
          </div>
        </Link>
      );
    });
  }, [pathname]);

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 h-[72px] pb-safe flex justify-around items-center px-2 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      {renderedTabs}
    </nav>
  );
});
