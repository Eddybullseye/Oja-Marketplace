/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

const BOOKINGS = [
  {
    id: 'BK-8842',
    workerName: 'Sarah Jenkins',
    service: 'Deep House Cleaning',
    date: 'Oct 15, 2024',
    time: '09:00 AM',
    status: 'Upcoming',
    price: '$120.00',
    image: 'https://picsum.photos/seed/worker1/100/100',
  },
  {
    id: 'BK-7721',
    workerName: 'David Okafor',
    service: 'Fix leaking pipe',
    date: 'Oct 10, 2024',
    time: '02:30 PM',
    status: 'Completed',
    price: '$85.00',
    image: 'https://picsum.photos/seed/worker2/100/100',
  }
];

export default function BookingsPage() {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredBookings = BOOKINGS.filter(b => 
    tab === 'upcoming' ? b.status === 'Upcoming' : 
    tab === 'completed' ? b.status === 'Completed' : false
  );

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-500 text-sm">Manage your upcoming and past service requests.</p>
        </div>
        <button className="hidden md:block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Download Receipts
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100/50 p-1 rounded-xl mb-6 border border-gray-100 overflow-x-auto hide-scrollbar">
        {['upcoming', 'completed', 'cancelled'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`flex-1 min-w-[100px] text-sm font-medium py-2.5 px-4 rounded-lg transition-all capitalize ${
              tab === t 
                ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200/50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
              <circle cx="60" cy="60" r="50" fill="#E4F1F1" />
              <path d="M40 45C40 42.2386 42.2386 40 45 40H75C77.7614 40 80 42.2386 80 45V75C80 77.7614 77.7614 80 75 80H45C42.2386 80 40 77.7614 40 75V45Z" fill="#028090" />
              <path d="M50 35V45M70 35V45" stroke="#F9A826" strokeWidth="4" strokeLinecap="round" />
              <path d="M40 55H80" stroke="#00A896" strokeWidth="4" />
              <circle cx="50" cy="65" r="3" fill="#F9A826" />
              <circle cx="60" cy="65" r="3" fill="#F9A826" />
              <circle cx="70" cy="65" r="3" fill="#F9A826" />
              <circle cx="50" cy="73" r="3" fill="#F9A826" />
              <circle cx="60" cy="73" r="3" fill="#F9A826" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No {tab} bookings</h3>
            <p className="text-gray-500 text-sm mb-6">When you book a service, it will show up here.</p>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-sm">
              Explore Services
            </button>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 md:items-center"
            >
              <div className="flex items-center gap-4 flex-1">
                <img src={booking.image} alt={booking.workerName} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">{booking.id}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                      booking.status === 'Upcoming' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{booking.service}</h3>
                  <p className="text-sm text-gray-500">with {booking.workerName}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:items-end">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {booking.time}
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg mt-1 md:mt-0">
                  {booking.price}
                </div>
              </div>

              <div className="w-full md:w-auto border-t border-gray-100 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-5 flex md:flex-col gap-2 mt-2 md:mt-0">
                 {booking.status === 'Upcoming' ? (
                   <>
                     <button className="flex-1 md:w-full bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                        Reschedule
                     </button>
                     <button className="flex-1 md:w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                     </button>
                   </>
                 ) : (
                   <>
                     <button className="flex-1 md:w-full bg-accent/10 text-accent-dark border border-accent/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-colors">
                        Leave Review
                     </button>
                     <button className="flex-1 md:w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Book Again
                     </button>
                   </>
                 )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
