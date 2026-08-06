/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  UserCircle, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings,
  Heart,
  Moon,
  Sun,
  Monitor,
  CheckCircle,
  Star
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  // Mock dynamic user status
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://picsum.photos/seed/avatar1/150/150",
    type: "Buyer Account",
    isVerified: true,
    isTopRated: true,
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">
      
      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-wrap sm:flex-nowrap">
        <div className="relative shrink-0">
          <img 
            src={user.avatar} 
            alt="My Profile" 
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight truncate">{user.name}</h1>
          <p className="text-gray-500 text-sm mb-3 truncate">{user.email}</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide shrink-0">
              {user.type}
            </span>
            {user.isVerified && (
              <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-1 shrink-0">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
            {user.isTopRated && (
              <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3 fill-current" /> Top Rated
              </span>
            )}
          </div>
        </div>
        <button className="hidden sm:block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shrink-0">
          Edit Profile
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Account Settings */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">Account Settings</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={UserCircle} label="Personal Information" />
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={CreditCard} label="Payment Methods" />
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={Bell} label="Notifications" />
          </div>
        </section>

        {/* Saved & Favorites */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">My Oja</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={Heart} label="Saved Workers" badge="3" />
          </div>
        </section>

        {/* Preferences & Appearance */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">Appearance</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="font-medium text-gray-800 text-sm">Theme</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Sun className="w-4 h-4" /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Moon className="w-4 h-4" /> Dark
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'system' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Monitor className="w-4 h-4" /> System
              </button>
            </div>
          </div>
        </section>

        {/* Support & Legal */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">Support & Legal</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={HelpCircle} label="Help Center" />
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={ShieldCheck} label="Trust & Safety" />
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={Settings} label="Other Preferences" />
          </div>
        </section>
        
        <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-4 rounded-2xl transition-colors">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
      
    </div>
  );
}

function SettingsItem({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors active:bg-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <span className="font-medium text-gray-800 text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );
}
