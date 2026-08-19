'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Share, Smartphone, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PwaInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIos, setIsIos] = useState(false);
    const [showIosPrompt, setShowIosPrompt] = useState(false);
    const [installedSuccess, setInstalledSuccess] = useState(false);

    useEffect(() => {
        // Check if running in standalone mode (already installed as PWA)
        const checkStandalone = () => {
            const isStandaloneMode =
                window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as any).standalone === true;
            setIsStandalone(isStandaloneMode);
        };

        checkStandalone();

        // Check if dismissed recently (within 7 days)
        const lastDismissed = localStorage.getItem('oja_pwa_prompt_dismissed');
        const isDismissedRecently = lastDismissed && Date.now() - parseInt(lastDismissed, 10) < 7 * 24 * 60 * 60 * 1000;

        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIos(isIosDevice);

        if (isIosDevice && !isStandalone && !isDismissedRecently) {
            // Show iOS prompt after brief delay
            const timer = setTimeout(() => setShowIosPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        // Listen for beforeinstallprompt event (Android / Chromium desktop)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            const promptEvent = e as BeforeInstallPromptEvent;
            setDeferredPrompt(promptEvent);

            if (!isDismissedRecently) {
                // Show custom banner after 2 seconds for smooth load
                setTimeout(() => setShowPrompt(true), 2000);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Listen for appinstalled event
        const handleAppInstalled = () => {
            setShowPrompt(false);
            setShowIosPrompt(false);
            setInstalledSuccess(true);
            setTimeout(() => setInstalledSuccess(false), 5000);
        };

        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, [isStandalone]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowPrompt(false);
        } else {
            handleDismiss();
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        setShowIosPrompt(false);
        localStorage.setItem('oja_pwa_prompt_dismissed', Date.now().toString());
    };

    if (isStandalone) return null;

    return (
        <>
            {/* Installed Success Toast */}
            {installedSuccess && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span className="text-sm font-medium">Oja App installed successfully!</span>
                </div>
            )}

            {/* Standard Android / Desktop Install Prompt Banner */}
            {showPrompt && deferredPrompt && (
                <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9990] bg-[#0B3D3E] text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-emerald-500/20 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-6 duration-300">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                                <Smartphone className="w-6 h-6 text-emerald-300" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-white leading-snug">Install Oja App</h3>
                                <p className="text-xs text-emerald-100/80 mt-0.5">Fast, offline access & direct bookings</p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Dismiss prompt"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <button
                            onClick={handleInstallClick}
                            className="flex-1 bg-white hover:bg-emerald-50 text-[#0B3D3E] font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                        >
                            <Download className="w-4 h-4" />
                            Install Now
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="px-3 py-2.5 text-xs text-white/70 hover:text-white transition-colors"
                        >
                            Not Now
                        </button>
                    </div>
                </div>
            )}

            {/* iOS Safari Share Sheet Guide */}
            {showIosPrompt && (
                <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9990] bg-[#0B3D3E] text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-emerald-500/20 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-6 duration-300">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                                <Share className="w-6 h-6 text-emerald-300 animate-bounce" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-white leading-snug">Install Oja on iOS</h3>
                                <p className="text-xs text-emerald-100/80 mt-0.5">
                                    Tap <Share className="w-3.5 h-3.5 inline mx-0.5" /> then select <span className="font-semibold text-white">&quot;Add to Home Screen&quot;</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Dismiss prompt"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
