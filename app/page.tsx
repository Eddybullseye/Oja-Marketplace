'use client';

import { useState } from 'react';
import PaymentModal from '@/components/PaymentModal';
import { WorkerCardSkeleton } from '@/components/WorkerCardSkeleton';
import { Star, MapPin, Shield, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const MOCK_WORKERS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    profession: 'Home Cleaner',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 35,
    location: 'Downtown & 5 miles',
    image: 'https://picsum.photos/seed/sarah/200/200',
    verified: true,
    badges: ['Top Rated', 'Fast Responder'],
    about: 'Experienced cleaner specializing in deep cleaning and move-in/move-out services. Bring my own eco-friendly supplies.'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    profession: 'Plumber',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 85,
    location: 'Metro Area',
    image: 'https://picsum.photos/seed/marcus/200/200',
    verified: true,
    badges: ['Licensed'],
    about: 'Licensed master plumber with 15 years of experience. Available for emergency calls and routine maintenance.'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    profession: 'Electrician',
    rating: 4.7,
    reviews: 56,
    hourlyRate: 95,
    location: 'Westside',
    image: 'https://picsum.photos/seed/elena/200/200',
    verified: true,
    badges: ['Licensed', 'Insured'],
    about: 'Residential electrical expert. Wiring, fixtures, panel upgrades, and smart home installations.'
  },
  {
    id: 4,
    name: 'David Smith',
    profession: 'Landscaper',
    rating: 4.9,
    reviews: 210,
    hourlyRate: 45,
    location: 'All Areas',
    image: 'https://picsum.photos/seed/david/200/200',
    verified: true,
    badges: ['Top Rated'],
    about: 'Professional lawn care, garden design, and seasonal yard cleanup services.'
  }
];

export default function Home() {
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Can be used to show skeletons

  const handleBook = (worker: any) => {
    setSelectedWorker(worker);
    setIsPaymentModalOpen(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Find Local Professionals</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Trusted workers with Oja Escrow Protection.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['All Services', 'Cleaning', 'Plumbing', 'Electrical', 'Handyman'].map((category, idx) => (
          <button
            key={category}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <WorkerCardSkeleton />
            <WorkerCardSkeleton />
            <WorkerCardSkeleton />
            <WorkerCardSkeleton />
          </>
        ) : (
          MOCK_WORKERS.map((worker) => (
            <div key={worker.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={worker.image} alt={worker.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 flex items-center gap-1">
                        {worker.name}
                        {worker.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                      </h3>
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{worker.profession}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-zinc-900 dark:text-zinc-50">${worker.hourlyRate}<span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">/hr</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {worker.rating} <span className="text-zinc-400 font-normal">({worker.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {worker.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {worker.badges.map(badge => (
                  <span key={badge} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs rounded-md font-medium">
                    {badge}
                  </span>
                ))}
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs rounded-md font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Escrow
                </span>
              </div>

              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {worker.about}
              </p>

              <div className="mt-5">
                <button
                  onClick={() => handleBook(worker)}
                  className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium py-2.5 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingDetails={selectedWorker ? {
          serviceName: selectedWorker.profession,
          workerName: selectedWorker.name,
          amount: selectedWorker.hourlyRate,
          fee: selectedWorker.hourlyRate * 0.1 // 10% fee
        } : undefined}
      />
    </main>
  );
}
