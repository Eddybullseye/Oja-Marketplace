'use client';

import { useState } from 'react';
import { ShieldCheck, CheckCircle2, Calendar, DollarSign, Clock, MessageSquare, AlertCircle, Search, ArrowRight, Filter, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Booking {
  id: number;
  workerName: string;
  profession: string;
  date: string;
  time: string;
  amount: number;
  fee: number;
  status: 'escrow' | 'completed' | 'disputed';
  about: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 1,
    workerName: 'Sarah Jenkins',
    profession: 'Home Cleaner',
    date: 'Aug 14, 2026',
    time: '10:00 AM',
    amount: 105.00,
    fee: 10.50,
    status: 'escrow',
    about: 'House deep cleaning (estimated 3 hours).'
  },
  {
    id: 2,
    workerName: 'Marcus Chen',
    profession: 'Plumber',
    date: 'Aug 11, 2026',
    time: '4:30 PM',
    amount: 85.00,
    fee: 8.50,
    status: 'escrow',
    about: 'Emergency kitchen pipe replacement.'
  },
  {
    id: 3,
    workerName: 'Elena Rodriguez',
    profession: 'Electrician',
    date: 'Aug 5, 2026',
    time: '2:00 PM',
    amount: 190.00,
    fee: 19.00,
    status: 'completed',
    about: 'Upgraded living room panel and smart lighting installer.'
  }
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleReleaseFunds = (id: number) => {
    if (confirm('Are you sure you want to release the escrowed funds? This confirms you have inspected the work and are satisfied.')) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed' } : b));
      showToast('✅ Escrow funds released successfully!');
    }
  };

  const handleDispute = (id: number) => {
    const reason = prompt('Please enter the reason for filing a dispute. Our resolution agents will review the case:');
    if (reason && reason.trim()) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'disputed' } : b));
      showToast('⚠️ Dispute filed. Funds frozen in escrow until resolved.');
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'escrow' || b.status === 'disputed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const filteredBookings = activeTab === 'active' ? activeBookings : completedBookings;

  const totalEscrow = activeBookings.reduce((sum, b) => sum + b.amount + b.fee, 0);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-28 md:pb-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-4 right-4 z-50 max-w-md mx-auto bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-zinc-700/40 text-xs font-semibold">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="flex-1">{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">My Bookings</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Track professional services, manage contracts, and authorize escrow releases.</p>
          </div>

          {/* Escrow Overview Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl px-4 py-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">Active Escrow</p>
                <p className="font-black text-emerald-800 dark:text-emerald-300 text-sm">${totalEscrow.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === 'active'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Active & Escrow
            {activeBookings.length > 0 && (
              <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md font-black ${activeTab === 'active' ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'
                }`}>{activeBookings.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === 'completed'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed History
            {completedBookings.length > 0 && (
              <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md font-black ${activeTab === 'completed' ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'
                }`}>{completedBookings.length}</span>
            )}
          </button>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const total = booking.amount + booking.fee;
              return (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Status Ribbon */}
                  <div className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${booking.status === 'escrow'
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                      : booking.status === 'completed'
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                    }`}>
                    {booking.status === 'escrow' && <><ShieldCheck className="w-3.5 h-3.5" /> Funds Held in Escrow</>}
                    {booking.status === 'completed' && <><CheckCircle2 className="w-3.5 h-3.5" /> Funds Released • Completed</>}
                    {booking.status === 'disputed' && <><AlertCircle className="w-3.5 h-3.5" /> Order Frozen • Investigation Active</>}
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Worker Info */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{booking.workerName}</h3>
                        <span className="text-[10px] font-bold uppercase text-primary dark:text-teal-400 bg-primary/10 px-2 py-0.5 rounded-md">
                          {booking.profession}
                        </span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{booking.about}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">${total.toFixed(2)}</p>
                        <p className="text-[10px] text-zinc-400 font-medium">Service + ${booking.fee.toFixed(2)} fee</p>
                      </div>
                    </div>

                    {/* Date & Time Metadata */}
                    <div className="grid grid-cols-2 gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                        <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                        <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                        {booking.time}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {booking.status === 'escrow' && (
                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => handleReleaseFunds(booking.id)}
                          className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-transparent font-bold py-3 px-4 rounded-xl text-xs transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                        >
                          <ShieldCheck className="w-4 h-4" /> Approve & Release Payment
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/messages"
                            className="bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold py-2.5 px-3 rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Message
                          </Link>
                          <button
                            onClick={() => handleDispute(booking.id)}
                            className="border border-rose-200 hover:border-rose-300 dark:border-rose-950 dark:hover:border-rose-900/50 hover:bg-rose-50/30 text-rose-600 dark:text-rose-400 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <AlertCircle className="w-3.5 h-3.5" /> Dispute
                          </button>
                        </div>
                      </div>
                    )}

                    {booking.status === 'completed' && (
                      <div className="flex gap-2 pt-1">
                        <div className="flex-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950/50 text-emerald-800 dark:text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed Successfully
                        </div>
                        <Link
                          href="/"
                          className="bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center gap-1"
                        >
                          Book Again <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}

                    {booking.status === 'disputed' && (
                      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/50 text-rose-800 dark:text-rose-400 px-4 py-3 rounded-xl text-xs font-semibold flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Order Frozen in Escrow</p>
                          <p className="font-medium text-rose-700 dark:text-rose-400 mt-0.5">Escrow agent assigned. Resolution within 24-48 hours. You will be notified by email.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">No bookings found</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {activeTab === 'active' ? 'You have no active escrow bookings.' : 'You have no completed marketplace transactions.'}
              </p>
              <Link href="/" className="inline-flex items-center gap-1 mt-4 text-primary font-bold text-xs hover:underline">
                Find Professionals <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
