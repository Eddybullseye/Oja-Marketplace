'use client';

import { useState, useMemo } from 'react';
import PaymentModal from '@/components/PaymentModal';
import { Star, MapPin, Shield, CheckCircle, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

const MOCK_WORKERS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    profession: 'Home Cleaner',
    category: 'Cleaning',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 35,
    location: 'Downtown',
    image: 'https://picsum.photos/seed/sarah/200/200',
    verified: true,
    badges: ['Top Rated', 'Fast Responder'],
    about: 'Experienced cleaner specializing in deep cleaning and move-in/move-out services. Bring my own eco-friendly supplies.'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    profession: 'Plumber',
    category: 'Plumbing',
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
    category: 'Electrical',
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
    category: 'Landscaping',
    rating: 4.9,
    reviews: 210,
    hourlyRate: 45,
    location: 'All Areas',
    image: 'https://picsum.photos/seed/david/200/200',
    verified: true,
    badges: ['Top Rated'],
    about: 'Professional lawn care, garden design, and seasonal yard cleanup services.'
  },
  {
    id: 5,
    name: 'Robert Taylor',
    profession: 'General Handyman',
    category: 'Handyman',
    rating: 4.6,
    reviews: 42,
    hourlyRate: 50,
    location: 'Downtown',
    image: 'https://picsum.photos/seed/robert/200/200',
    verified: false,
    badges: ['Insured'],
    about: 'Lawn fixtures, wall hanging, furniture assembly, and general home repairs.'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    profession: 'Deep Cleaning Specialist',
    category: 'Cleaning',
    rating: 5.0,
    reviews: 67,
    hourlyRate: 40,
    location: 'Westside',
    image: 'https://picsum.photos/seed/lisa/200/200',
    verified: true,
    badges: ['Top Rated', 'Perfect Score'],
    about: '14 years of commercial and residential deep cleaning experience. Eco-friendly cleaning products included.'
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const categories = ['All', 'Cleaning', 'Plumbing', 'Electrical', 'Landscaping', 'Handyman'];

  const filteredAndSortedWorkers = useMemo(() => {
    let result = [...MOCK_WORKERS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.profession.toLowerCase().includes(q) ||
          w.about.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((w) => w.category === selectedCategory);
    }

    if (showVerifiedOnly) {
      result = result.filter((w) => w.verified);
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    }

    return result;
  }, [searchQuery, selectedCategory, showVerifiedOnly, sortBy]);

  const handleBook = (worker: any) => {
    setSelectedWorker(worker);
    setIsPaymentModalOpen(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Search Local Pros</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Discover and hire verified professionals with Oja escrow safeguards.</p>
      </div>

      {/* Search Input Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, trade or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50 text-sm placeholder-zinc-400"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end">
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Filters</span>
            <input
              type="checkbox"
              id="verified-only"
              checked={showVerifiedOnly}
              onChange={(e) => setShowVerifiedOnly(e.target.checked)}
              className="ml-2 accent-primary scale-105 rounded"
            />
            <label htmlFor="verified-only" className="text-xs text-zinc-500 dark:text-zinc-400 select-none cursor-pointer">Verified</label>
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2">
            <ArrowUpDown className="w-4 h-4 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-zinc-650 dark:text-zinc-300 outline-none cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="priceAsc">Price: Low-High</option>
              <option value="priceDesc">Price: High-Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedCategory === category
                ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-150 dark:border-zinc-150 dark:text-zinc-950'
                : 'bg-white border-zinc-200 text-zinc-650 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedWorkers.length > 0 ? (
          filteredAndSortedWorkers.map((worker) => (
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
                      {worker.rating} <span className="text-zinc-450 dark:text-zinc-400 font-normal">({worker.reviews})</span>
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
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-xs rounded-md font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Escrow Protect
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
        ) : (
          <div className="col-span-full py-16 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">No professionals found</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
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

