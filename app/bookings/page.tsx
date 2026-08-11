'use client';

import { useState } from 'react';
import { ShieldCheck, CheckCircle2, Calendar, DollarSign, Clock, MessageSquare, AlertCircle } from 'lucide-react';
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

  const handleReleaseFunds = (id: number) => {
    if (confirm('Are you sure you want to release the escrowed funds? This confirms you have inspected the work and are satisfied.')) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed' } : b));
    }
  };

  const handleDispute = (id: number) => {
    const reason = prompt('Please enter the reason for filing a dispute. Our resolution agents will review the case:');
    if (reason && reason.trim()) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'disputed' } : b));
      alert('Dispute filed successfully. Funds are frozen in escrow until resolved.');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'active') {
      return b.status === 'escrow' || b.status === 'disputed';
    } else {
      return b.status === 'completed';
    }
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">My Bookings</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Track professional services, manage contracts, and authorize escrow releases.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'active'
              ? 'border-primary text-primary dark:text-teal-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300'
            }`}
        >
          Active Orders & Escrow
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'completed'
              ? 'border-primary text-primary dark:text-teal-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300'
            }`}
        >
          Completed History
        </button>
      </div>

      {/* Details list */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const total = booking.amount + booking.fee;
            return (
              <div
                key={booking.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6"
              >
                {/* Description info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{booking.workerName}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-150 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-300 rounded-md">
                      {booking.profession}
                    </span>
                    {booking.status === 'escrow' && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> In Escrow
                      </span>
                    )}
                    {booking.status === 'completed' && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-850 dark:text-zinc-400 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Funds Released
                      </span>
                    )}
                    {booking.status === 'disputed' && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 rounded-md flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> In Dispute
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-650 dark:text-zinc-300 mb-4">{booking.about}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 md:col-span-1">
                      <DollarSign className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>Total contract: <strong className="text-zinc-850 dark:text-zinc-200">${total.toFixed(2)}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Operations column */}
                <div className="shrink-0 flex flex-col justify-center gap-2.5 w-full md:w-auto">
                  {booking.status === 'escrow' && (
                    <>
                      <button
                        onClick={() => handleReleaseFunds(booking.id)}
                        className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-transparent font-semibold py-2 px-4 rounded-xl text-sm transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-100 flex justify-center items-center gap-1.5 shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4" /> Release Payment
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/messages"
                          className="bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold py-2 px-3 rounded-xl text-xs text-center transition-colors flex justify-center items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Message
                        </Link>
                        <button
                          onClick={() => handleDispute(booking.id)}
                          className="border border-red-200 hover:border-red-300 dark:border-red-950 dark:hover:border-red-900/50 hover:bg-red-50/20 text-red-650 dark:text-red-400 font-semibold py-2 px-3 rounded-xl text-xs transition-colors flex justify-center items-center gap-1.5"
                        >
                          Dispute
                        </button>
                      </div>
                    </>
                  )}
                  {booking.status === 'completed' && (
                    <div className="flex flex-col gap-2">
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950/50 text-emerald-800 dark:text-emerald-450 px-4 py-2 rounded-xl text-xs font-semibold text-center flex justify-center items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Completed Successfully
                      </div>
                      <Link
                        href="/"
                        className="bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-center text-zinc-700 dark:text-zinc-300 font-semibold py-2 px-4 rounded-xl text-xs transition-transform"
                      >
                        Book again
                      </Link>
                    </div>
                  )}
                  {booking.status === 'disputed' && (
                    <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/50 text-rose-800 dark:text-rose-450 px-4 py-3 rounded-xl text-xs font-semibold max-w-sm flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Order Frozen</p>
                        <p className="font-medium text-rose-700 dark:text-rose-400 mt-0.5">Escrow agent assigned. Standard case handling resolution is 24-48 hours.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">No bookings found</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {activeTab === 'active' ? 'You have no active escrow bookings.' : 'You have no completed marketplace transactions.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

