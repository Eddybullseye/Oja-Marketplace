/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { WorkerCardSkeleton } from '@/components/WorkerCardSkeleton';
import PaymentModal from '@/components/PaymentModal';
import {
  Search,
  MapPin,
  Wrench,
  Sparkles,
  GraduationCap,
  PartyPopper,
  MonitorSmartphone,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  { id: 'home-repair', label: 'Home Repair', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
  { id: 'cleaning', label: 'Cleaning', icon: Sparkles, color: 'bg-emerald-100 text-emerald-600' },
  { id: 'tutoring', label: 'Tutoring', icon: GraduationCap, color: 'bg-purple-100 text-purple-600' },
  { id: 'events', label: 'Events', icon: PartyPopper, color: 'bg-orange-100 text-orange-600' },
  { id: 'beauty', label: 'Beauty', icon: Sparkles, color: 'bg-pink-100 text-pink-600' },
  { id: 'tech-help', label: 'Tech Help', icon: MonitorSmartphone, color: 'bg-slate-100 text-slate-600' },
];

const TOP_WORKERS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    category: 'Home Cleaning',
    rating: 4.9,
    reviews: 128,
    price: '$25/hr',
    verified: true,
    image: 'https://picsum.photos/seed/worker1/200/200',
  },
  {
    id: 2,
    name: 'David Okafor',
    category: 'Plumbing',
    rating: 4.8,
    reviews: 84,
    price: '$45/hr',
    verified: true,
    image: 'https://picsum.photos/seed/worker2/200/200',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    category: 'Math Tutoring',
    rating: 5.0,
    reviews: 212,
    price: '$35/hr',
    verified: true,
    image: 'https://picsum.photos/seed/worker3/200/200',
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-surface-dark text-white pt-12 pb-20 px-4 md:px-8 lg:px-12 rounded-b-3xl md:rounded-none relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-surface-dark opacity-80" />
        <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-serif"
          >
            Find trusted locals for any job
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-teal-50 mb-8 max-w-xl"
          >
            From home repairs to tutoring, book vetted professionals in your neighborhood instantly.
          </motion.p>
          
          {/* Mobile Search Input (Visible only on mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md bg-white rounded-2xl p-2 flex items-center shadow-lg md:hidden"
          >
            <div className="bg-gray-100 p-3 rounded-xl">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input 
              type="text"
              placeholder="What do you need help with?"
              className="flex-1 bg-transparent border-none outline-none px-4 text-gray-800"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 md:px-8 lg:px-12 py-10 max-w-7xl mx-auto w-full -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link href={`/search?category=${cat.id}`} className="flex flex-col items-center gap-3 group">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-105 transition-transform duration-200 shadow-sm`}>
                    <cat.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Workers */}
      <section className="px-4 md:px-8 lg:px-12 py-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Near You</h2>
          <Link href="/search" className="text-primary font-medium text-sm hover:underline">View all</Link>
        </div>
        
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 gap-5 snap-x hide-scrollbar">
          {isLoading 
            ? Array.from({ length: 3 }).map((_, i) => (
                <WorkerCardSkeleton key={`skeleton-${i}`} isHome={true} index={i} />
              ))
            : TOP_WORKERS.map((worker) => (
            <motion.div 
              key={worker.id}
              whileHover={{ y: -4 }}
              className="min-w-[260px] md:min-w-[300px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 snap-center flex flex-col cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-full object-cover" />
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 className="w-5 h-5 text-secondary fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight">{worker.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{worker.category}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="text-sm font-bold text-gray-700">{worker.rating}</span>
                    <span className="text-xs text-gray-400">({worker.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto border-t border-gray-50 pt-3 flex items-center justify-between">
                <div className="text-sm font-bold text-gray-900">
                  {worker.price}
                </div>
                <button 
                  onClick={() => {
                    setSelectedWorker(worker);
                    setIsPaymentModalOpen(true);
                  }}
                  className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-white mt-auto">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Vetted Professionals</h3>
              <p className="text-sm text-gray-600">Every worker passes a strict identity and background check.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Genuine Reviews</h3>
              <p className="text-sm text-gray-600">Ratings you can trust, left only by verified buyers after a job.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Fast Response</h3>
              <p className="text-sm text-gray-600">Average response time under 15 minutes. Book instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        bookingDetails={selectedWorker ? {
          serviceName: selectedWorker.category,
          workerName: selectedWorker.name,
          amount: parseFloat(selectedWorker.price.replace(/[^0-9.]/g, '')) || 0,
          fee: 15
        } : undefined}
      />
    </div>
  );
}
