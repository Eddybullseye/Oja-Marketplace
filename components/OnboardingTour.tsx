'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Check, Award, ShieldQuestion } from 'lucide-react';

interface Step {
    selectors: string[]; // List of fallbacks: e.g. ['#search-desktop', '#search-mobile']
    title: string;
    desc: string;
    targetName?: string;
}

export function OnboardingTour() {
    const [activeStep, setActiveStep] = useState<number>(-1); // -1 means welcome prompt, >= 0 are tour steps
    const [isCompleted, setIsCompleted] = useState<boolean>(true);
    const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

    const tourSteps: Step[] = [
        {
            selectors: [],
            title: "Welcome to Oja",
            desc: "Discover verified local professionals in your area. Here is a quick overview of how to find help, book services, and manage your projects.",
        },
        {
            selectors: ["#tour-buyer-search-desktop", "#tour-buyer-search"],
            targetName: "Search Professionals",
            title: "Browse Verified Providers",
            desc: "Search, filter, and compare top-rated service professionals in cleaning, plumbing, electrical, carpentry, events, and more based on verified reviews and pricing.",
        },
        {
            selectors: ["#tour-buyer-bookings-desktop", "#tour-buyer-bookings"],
            targetName: "Manage Hired Bookings",
            title: "Escrow-Protected Bookings",
            desc: "Track scheduled work in real time. Payment is held securely in escrow upfront and is only released after you confirm the job is completed to your satisfaction.",
        },
        {
            selectors: ["#tour-buyer-messages-desktop", "#tour-buyer-messages"],
            targetName: "Direct Messages",
            title: "Direct Client Messaging",
            desc: "Chat directly with providers to discuss project details, share photos, and agree on quotes before confirming a booking.",
        },
        {
            selectors: ["#tour-buyer-post-job-desktop", "#tour-buyer-profile-desktop", "#tour-buyer-profile"],
            targetName: "Post custom task",
            title: "Custom Requests & Account",
            desc: "Post a specific task to receive quotes from nearby specialists, manage payment methods, and configure your profile settings.",
        },
        {
            selectors: [],
            title: "You're all set",
            desc: "You are ready to explore the marketplace and hire trusted local professionals.",
        }
    ];

    useEffect(() => {
        // Check if user has completed onboarding check
        const tourStatus = localStorage.getItem('oja_buyer_tour_completed');
        if (!tourStatus) {
            setIsCompleted(false);
            setActiveStep(0);
        }
    }, []);

    const currentStep = tourSteps[activeStep];

    // Update target bounding box bounds dynamically based on active viewport elements
    const updateRect = () => {
        if (!currentStep || currentStep.selectors.length === 0) {
            setRect(null);
            return;
        }

        // Find first visible element in selectors fallback list
        let visibleElement: Element | null = null;
        for (const selector of currentStep.selectors) {
            const element = document.querySelector(selector);
            if (element) {
                // Double check display style or height constraints
                const style = window.getComputedStyle(element);
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                    visibleElement = element;
                    break;
                }
            }
        }

        if (visibleElement) {
            const elRect = visibleElement.getBoundingClientRect();
            // Scroll into view if needed
            if (activeStep > 0 && activeStep < tourSteps.length - 1) {
                visibleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setRect({
                x: elRect.left,
                y: elRect.top,
                w: elRect.width,
                h: elRect.height,
            });
        } else {
            setRect(null);
        }
    };

    useEffect(() => {
        if (activeStep >= 0 && activeStep < tourSteps.length) {
            // Let layout shift settle
            const timeout = setTimeout(updateRect, 300);
            window.addEventListener('resize', updateRect);
            window.addEventListener('scroll', updateRect);
            return () => {
                clearTimeout(timeout);
                window.removeEventListener('resize', updateRect);
                window.removeEventListener('scroll', updateRect);
            };
        }
    }, [activeStep]);

    const handleNext = () => {
        if (activeStep < tourSteps.length - 1) {
            setActiveStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem('oja_buyer_tour_completed', 'true');
        setIsCompleted(true);
    };

    if (isCompleted || activeStep === -1) return null;

    // Determine card placement position coordinates dynamically
    const getCardStyle = () => {
        if (!rect) {
            return {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed' as const,
            };
        }

        const spaceBelow = window.innerHeight - (rect.y + rect.h);
        const spaceAbove = rect.y;

        if (spaceBelow > 260) {
            return {
                top: rect.y + rect.h + 16,
                left: Math.max(16, Math.min(window.innerWidth - 356, rect.x + rect.w / 2 - 170)),
                position: 'fixed' as const,
            };
        } else if (spaceAbove > 260) {
            return {
                top: rect.y - 240,
                left: Math.max(16, Math.min(window.innerWidth - 356, rect.x + rect.w / 2 - 170)),
                position: 'fixed' as const,
            };
        } else {
            return {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed' as const,
            };
        }
    };

    return (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
            {/* Spotlight Canvas Mask */}
            <AnimatePresence>
                {rect ? (
                    <motion.svg
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full pointer-events-auto"
                    >
                        <defs>
                            <mask id="buyer-tour-spotlight-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <rect
                                    x={rect.x - 8}
                                    y={rect.y - 8}
                                    width={rect.w + 16}
                                    height={rect.h + 16}
                                    rx="16"
                                    ry="16"
                                    fill="black"
                                />
                            </mask>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="rgba(15, 23, 42, 0.7)"
                            mask="url(#buyer-tour-spotlight-mask)"
                        />
                    </motion.svg>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900 pointer-events-auto"
                    />
                )}
            </AnimatePresence>

            {/* Guide detail Card bubble popup */}
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={getCardStyle()}
                className="w-[340px] bg-white rounded-[32px] p-6 shadow-2xl border border-slate-200/50 pointer-events-auto select-none"
            >
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {activeStep === 0 ? "Getting Started" : activeStep === tourSteps.length - 1 ? "Completed" : `Step ${activeStep} of ${tourSteps.length - 2}`}
                    </span>
                    <button
                        onClick={handleComplete}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {activeStep === 0 && (
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 animate-bounce">
                        <ShieldQuestion size={24} />
                    </div>
                )}

                {activeStep === tourSteps.length - 1 && (
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                        <Award size={24} />
                    </div>
                )}

                <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight">
                    {currentStep.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {currentStep.desc}
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex gap-1">
                        {tourSteps.slice(0, tourSteps.length).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeStep ? 'bg-primary' : 'bg-slate-200'}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {activeStep > 0 && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md"
                        >
                            {activeStep === 0 ? "Let's Go" : activeStep === tourSteps.length - 1 ? (
                                <>Finish <Check size={14} /></>
                            ) : (
                                <>Next <ChevronRight size={14} /></>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
