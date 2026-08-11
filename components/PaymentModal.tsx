'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, Lock, CreditCard, Loader2, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails?: {
    serviceName: string;
    workerName: string;
    amount: number;
    fee: number;
  };
}

export default function PaymentModal({ isOpen, onClose, bookingDetails }: PaymentModalProps) {
  const [step, setStep] = useState<'initial' | 'verifying' | 'holding' | 'success'>('initial');

  const defaultDetails = {
    serviceName: 'Home Cleaning',
    workerName: 'Sarah Jenkins',
    amount: 120,
    fee: 15
  };

  const details = bookingDetails || defaultDetails;
  const total = details.amount + details.fee;

  const handleConfirm = () => {
    setStep('verifying');

    const t1 = setTimeout(() => {
      setStep('holding');
    }, 1500);

    const t2 = setTimeout(() => {
      setStep('success');
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  const handleClose = () => {
    if (step !== 'verifying' && step !== 'holding') {
      onClose();
      // Reset step after animation completes
      setTimeout(() => setStep('initial'), 300);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep('initial');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
            >
              {step === 'initial' && (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Secure Checkout</h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Oja Escrow Protection
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-100 dark:border-zinc-800">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">Service Hourly Rate</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">${details.amount.toFixed(2)}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">Estimated Duration</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">1 hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">Marketplace Platform Fee</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">${details.fee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2 flex justify-between font-bold">
                        <span className="text-zinc-900 dark:text-zinc-50">Total</span>
                        <span className="text-zinc-900 dark:text-zinc-50">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl flex gap-3 mb-6 border border-emerald-100 dark:border-emerald-900/50">
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">
                      Your payment will be held securely in escrow.
                      Funds are only released to {details.workerName} after you confirm the job is complete.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 px-4 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Confirm & Hold Funds
                  </button>
                  <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-4">
                    Cancel anytime within 24 hours for a full refund of your escrow deposit.
                  </p>
                </div>
              )}

              {(step === 'verifying' || step === 'holding') && (
                <div className="p-12 flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-zinc-900 dark:border-white rounded-full border-t-transparent dark:border-t-transparent animate-spin absolute top-0 left-0"></div>
                    <Lock className="w-6 h-6 text-zinc-900 dark:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
                    {step === 'verifying' ? 'Verifying Details' : 'Holding Escrow'}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    {step === 'verifying' ? 'Checking availability and payment method...' : 'Placing payment in Oja Escrow...'}
                  </p>
                </div>
              )}

              {step === 'success' && (
                <div className="p-12 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                    className="relative w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1.2, 1], opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-emerald-500"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Booking Confirmed!</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                    Your funds are safely held in escrow. {details.workerName} has been notified to start the job.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white py-3 px-4 rounded-xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
