'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, Calendar, MessageSquare, Search, ShieldCheck } from 'lucide-react';

export default function OfflinePage() {
    const [isOnline, setIsOnline] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleRetry = () => {
        setIsRetrying(true);
        if (navigator.onLine) {
            window.location.reload();
        } else {
            setTimeout(() => {
                setIsRetrying(false);
            }, 800);
        }
    };

    return (
        <main className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
            <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
                {/* Status Icon */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 text-[#0B3D3E] dark:text-emerald-400">
                    <WifiOff className={`w-12 h-12 transition-transform duration-500 ${isRetrying ? 'scale-110 rotate-12' : ''}`} />
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500"></span>
                    </span>
                </div>

                {/* Connection Alert Banner */}
                {isOnline ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm py-2 px-4 rounded-full inline-flex items-center gap-2 animate-bounce">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Connection restored! Reconnecting...
                    </div>
                ) : (
                    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs uppercase tracking-wider font-semibold py-1.5 px-3 rounded-full inline-block">
                        Offline Mode
                    </div>
                )}

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        You&apos;re Offline
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        It looks like your internet connection was interrupted. Check your network or try reconnecting below.
                    </p>
                </div>

                {/* Action Button */}
                <div>
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#0B3D3E] hover:bg-[#0B3D3E]/90 text-white font-medium py-3 px-6 rounded-2xl shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-75"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                        {isRetrying ? 'Checking connection...' : 'Try Again'}
                    </button>
                </div>

                {/* Cached Pages Shortcuts */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                        Or explore cached sections:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <Link
                            href="/"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            <Home className="w-4 h-4 mb-1 text-[#0B3D3E] dark:text-emerald-400" />
                            Home
                        </Link>
                        <Link
                            href="/bookings"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            <Calendar className="w-4 h-4 mb-1 text-[#0B3D3E] dark:text-emerald-400" />
                            Bookings
                        </Link>
                        <Link
                            href="/messages"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            <MessageSquare className="w-4 h-4 mb-1 text-[#0B3D3E] dark:text-emerald-400" />
                            Messages
                        </Link>
                    </div>
                </div>

                {/* Footer badge */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Oja Progressive Web App</span>
                </div>
            </div>
        </main>
    );
}
