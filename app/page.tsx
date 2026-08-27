'use client';

import { useState } from 'react';
import PaymentModal from '@/components/PaymentModal';
import { WorkerCardSkeleton } from '@/components/WorkerCardSkeleton';
import { Star, MapPin, Shield, CheckCircle, Search, Sparkles, TrendingUp, Clock, ArrowRight, Zap, ChevronRight, Award, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    about: 'Experienced cleaner specializing in deep cleaning and move-in/move-out services. Bring my own eco-friendly supplies.',
    responseTime: '< 15 min'
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
    about: 'Licensed master plumber with 15 years of experience. Available for emergency calls and routine maintenance.',
    responseTime: '< 30 min'
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
    about: 'Residential electrical expert. Wiring, fixtures, panel upgrades, and smart home installations.',
    responseTime: '< 1 hr'
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
    about: 'Professional lawn care, garden design, and seasonal yard cleanup services.',
    responseTime: '< 20 min'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    profession: 'Deep Cleaning Specialist',
    rating: 5.0,
    reviews: 67,
    hourlyRate: 40,
    location: 'Westside',
    image: 'https://picsum.photos/seed/lisa/200/200',
    verified: true,
    badges: ['Top Rated', 'Perfect Score'],
    about: '14 years of commercial and residential deep cleaning experience. Eco-friendly cleaning products included.',
    responseTime: '< 10 min'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    profession: 'General Handyman',
    rating: 4.6,
    reviews: 42,
    hourlyRate: 50,
    location: 'Downtown',
    image: 'https://picsum.photos/seed/robert/200/200',
    verified: false,
    badges: ['Insured'],
    about: 'Lawn fixtures, wall hanging, furniture assembly, and general home repairs.',
    responseTime: '< 45 min'
  }
];

const CATEGORIES = [
  { name: 'All Services', icon: '🏠', count: 6 },
  { name: 'Cleaning', icon: '🧹', count: 2 },
  { name: 'Plumbing', icon: '🔧', count: 1 },
  { name: 'Electrical', icon: '⚡', count: 1 },
  { name: 'Handyman', icon: '🛠️', count: 1 },
  { name: 'Landscaping', icon: '🌿', count: 1 },
];

export default function Home() {
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBook = (worker: any) => {
    setSelectedWorker(worker);
    setIsPaymentModalOpen(true);
  };

  const filteredWorkers = MOCK_WORKERS.filter(w => {
    const matchesCategory = activeCategory === 'All Services' || w.profession.toLowerCase().includes(activeCategory.toLowerCase().replace('ing', '').slice(0, 5));
    const matchesSearch = !searchQuery || w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.profession.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-28 md:pb-8">

      {/* Hero Dashboard Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-primary/30">
                  <Shield className="w-3 h-3" /> Escrow Protected Marketplace
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Find Trusted Local <span className="text-primary">Professionals</span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-lg">
                Book verified workers with Oja Escrow Protection. Your funds are secured until you approve the completed work.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-white text-lg sm:text-2xl font-black">2,400+</p>
                <p className="text-zinc-400 text-[10px] sm:text-xs font-medium">Verified Pros</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-white text-lg sm:text-2xl font-black">4.8★</p>
                <p className="text-zinc-400 text-[10px] sm:text-xs font-medium">Avg Rating</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-white text-lg sm:text-2xl font-black">$0</p>
                <p className="text-zinc-400 text-[10px] sm:text-xs font-medium">Upfront Fees</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 bg-white dark:bg-zinc-800 rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
              />
            </div>
            <Link
              href="/search"
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-3.5 px-8 rounded-xl text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <Search className="w-4 h-4" /> Search Pros
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Category Filter Pills */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50">Browse by Category</h2>
            <Link href="/search" className="text-xs font-bold text-primary dark:text-teal-400 flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl border text-center transition-all ${activeCategory === cat.name
                    ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900 shadow-lg scale-[1.02]'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
                  }`}
              >
                <span className="text-xl sm:text-2xl">{cat.icon}</span>
                <span className="text-[10px] sm:text-xs font-bold leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Provider Spotlight */}
        <section className="bg-gradient-to-r from-primary/10 via-teal-50 to-emerald-50 dark:from-primary/10 dark:via-teal-950/20 dark:to-emerald-950/20 rounded-3xl p-5 sm:p-6 border border-primary/20 dark:border-primary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-sm text-zinc-900 dark:text-zinc-50">Featured: Sarah Jenkins – Home Cleaning Expert</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">124 verified reviews • 4.9★ average • Responds in under 15 min • Eco-friendly supplies included</p>
              </div>
            </div>
            <button
              onClick={() => handleBook(MOCK_WORKERS[0])}
              className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-center"
            >
              <Zap className="w-3.5 h-3.5" /> Book Instantly
            </button>
          </div>
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50">
            {activeCategory === 'All Services' ? 'Top Local Professionals' : activeCategory}
            <span className="text-zinc-400 font-medium text-sm ml-2">({filteredWorkers.length} available)</span>
          </h2>
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <>
              <WorkerCardSkeleton />
              <WorkerCardSkeleton />
              <WorkerCardSkeleton />
              <WorkerCardSkeleton />
              <WorkerCardSkeleton />
              <WorkerCardSkeleton />
            </>
          ) : filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <div key={worker.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5 group">
                {/* Card Header with image */}
                <div className="p-5 pb-4">
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-zinc-100 dark:border-zinc-800">
                      <Image src={worker.image} alt={worker.name} fill className="object-cover" referrerPolicy="no-referrer" />
                      {worker.verified && (
                        <div className="absolute bottom-0 right-0 bg-primary text-white p-0.5 rounded-tl-lg">
                          <CheckCircle className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50 flex items-center gap-1 group-hover:text-primary transition-colors">
                            {worker.name}
                          </h3>
                          <p className="text-xs font-semibold text-primary dark:text-teal-400">{worker.profession}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-black text-lg text-zinc-900 dark:text-zinc-50">${worker.hourlyRate}</div>
                          <div className="text-[10px] text-zinc-400 font-medium">per hour</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1 font-bold text-zinc-700 dark:text-zinc-300">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {worker.rating} <span className="text-zinc-400 font-normal">({worker.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {worker.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges Row */}
                <div className="px-5 pb-3 flex flex-wrap gap-1.5">
                  {worker.badges.map(badge => (
                    <span key={badge} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] rounded-md font-semibold">
                      {badge}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-[10px] rounded-md font-semibold flex items-center gap-0.5">
                    <Shield className="w-2.5 h-2.5" /> Escrow
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 text-[10px] rounded-md font-semibold flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" /> {worker.responseTime}
                  </span>
                </div>

                {/* Description */}
                <p className="px-5 pb-4 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {worker.about}
                </p>

                {/* Action Footer */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => handleBook(worker)}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all text-sm flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
                  >
                    <Shield className="w-4 h-4" /> Book with Escrow
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">No professionals found</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Try a different category or adjust your search.</p>
            </div>
          )}
        </div>

        {/* Trust & Safety Banner */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Escrow Protected</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Funds held securely until work is verified and you approve the release.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Background Verified</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">All top-rated professionals are identity and license verified.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Satisfaction Guarantee</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">File a dispute within 48 hours for full escrow arbitration support.</p>
            </div>
          </div>
        </section>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingDetails={selectedWorker ? {
          serviceName: selectedWorker.profession,
          workerName: selectedWorker.name,
          amount: selectedWorker.hourlyRate,
          fee: selectedWorker.hourlyRate * 0.1
        } : undefined}
      />
    </main>
  );
}
