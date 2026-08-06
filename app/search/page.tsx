/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { WorkerCardSkeleton } from '@/components/WorkerCardSkeleton';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  CheckCircle2, 
  ChevronDown,
  LayoutGrid,
  List
} from 'lucide-react';

const WORKERS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    category: 'Home Cleaning',
    rating: 4.9,
    reviews: 128,
    price: '$25/hr',
    verified: true,
    distance: '2.1 mi',
    image: 'https://picsum.photos/seed/worker1/200/200',
    tags: ['Deep Cleaning', 'Move in/out', 'Organizing']
  },
  {
    id: 2,
    name: 'David Okafor',
    category: 'Plumbing',
    rating: 4.8,
    reviews: 84,
    price: '$45/hr',
    verified: true,
    distance: '3.4 mi',
    image: 'https://picsum.photos/seed/worker2/200/200',
    tags: ['Pipes', 'Water Heater', 'Emergency']
  },
  {
    id: 3,
    name: 'Elena Rostova',
    category: 'Math Tutoring',
    rating: 5.0,
    reviews: 212,
    price: '$35/hr',
    verified: true,
    distance: '1.2 mi',
    image: 'https://picsum.photos/seed/worker3/200/200',
    tags: ['Calculus', 'Algebra', 'SAT Prep']
  },
  {
    id: 4,
    name: 'Michael Chang',
    category: 'Tech Help',
    rating: 4.7,
    reviews: 56,
    price: '$40/hr',
    verified: false,
    distance: '5.0 mi',
    image: 'https://picsum.photos/seed/worker4/200/200',
    tags: ['WiFi Setup', 'Virus Removal', 'PC Build']
  },
];

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(25);
  const [maxPrice, setMaxPrice] = useState(150);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 5);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 5);
    setMaxPrice(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6">
      
      {/* Mobile Search & Filter Bar */}
      <div className="md:hidden flex flex-col gap-3 mb-6">
        <div className="flex items-center bg-white rounded-full h-12 px-4 shadow-sm border border-gray-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search workers..."
            className="bg-transparent border-none outline-none text-sm w-full px-3 text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <div className="flex bg-gray-100 rounded-full p-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0 space-y-8 sticky top-24">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Category</h3>
            <div className="space-y-3">
              {['Home Repair', 'Cleaning', 'Tutoring', 'Tech Help'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
            <div className="px-2 mb-4">
              <div className="relative h-12 flex items-center">
                <div className="absolute w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-primary"
                    style={{ 
                      left: `${(minPrice / 200) * 100}%`, 
                      right: `${100 - (maxPrice / 200) * 100}%` 
                    }}
                  />
                </div>
                <input 
                  type="range"
                  min="0"
                  max="200"
                  value={minPrice}
                  onChange={handleMinChange}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm cursor-pointer"
                />
                <input 
                  type="range"
                  min="0"
                  max="200"
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" value={minPrice} readOnly className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-7 pr-2 text-sm outline-none text-gray-700" />
              </div>
              <span className="text-gray-400">-</span>
              <div className="w-full relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" value={maxPrice} readOnly className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-7 pr-2 text-sm outline-none text-gray-700" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Trust & Safety</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-700">Verified workers only</span>
            </label>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full">
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">42 Workers found</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 cursor-pointer shadow-sm">
                Sort by: <span className="font-medium">Relevance</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Worker List/Grid */}
          <div className={WORKERS.length > 0 && !isLoading ? `grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}` : ''}>
            {isLoading 
              ? <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <WorkerCardSkeleton key={`skeleton-${i}`} viewMode={viewMode} index={i} />
                  ))}
                </div>
              : WORKERS.length > 0 ? (
                  WORKERS.map((worker) => (
              <motion.div 
                key={worker.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 cursor-pointer transition-shadow hover:shadow-md ${viewMode === 'list' ? 'flex flex-col sm:flex-row gap-5' : 'flex flex-col'}`}
              >
                <div className="relative shrink-0 self-start">
                  <img src={worker.image} alt={worker.name} className={`${viewMode === 'list' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16'} rounded-full object-cover`} />
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 className="w-5 h-5 text-secondary fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{worker.name}</h3>
                      <p className="text-sm text-gray-500">{worker.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{worker.price}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm font-bold text-gray-700">{worker.rating}</span>
                      <span className="text-xs text-gray-400">({worker.reviews})</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {worker.distance}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {worker.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-xs font-medium text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'sm:self-end mt-auto w-full sm:w-auto' : 'mt-auto'}`}>
                     <button className="w-full bg-primary text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                        View Profile
                     </button>
                  </div>
                </div>
              </motion.div>
            ))) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed w-full">
                  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
                    <circle cx="70" cy="70" r="60" fill="#E4F1F1" />
                    <path d="M45 50C45 47.2386 47.2386 45 50 45H90C92.7614 45 95 47.2386 95 50V90C95 92.7614 92.7614 95 90 95H50C47.2386 95 45 92.7614 45 90V50Z" fill="#028090" />
                    <path d="M60 70C60 64.4772 64.4772 60 70 60C75.5228 60 80 64.4772 80 70C80 75.5228 75.5228 80 70 80C64.4772 80 60 75.5228 60 70Z" stroke="#F9A826" strokeWidth="4" />
                    <path d="M77 77L85 85" stroke="#F9A826" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="45" cy="40" r="4" fill="#F9A826" />
                    <circle cx="95" cy="35" r="3" fill="#00A896" />
                    <circle cx="105" cy="80" r="5" fill="#F9A826" />
                    <circle cx="35" cy="85" r="3" fill="#00A896" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No workers found</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">We couldn&apos;t find any professionals matching your current filters. Try adjusting your search criteria.</p>
                  <button className="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-sm hover:bg-primary-dark transition-colors">
                    Clear Filters
                  </button>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
