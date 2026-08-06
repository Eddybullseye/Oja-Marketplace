import React from 'react';
import { motion } from 'motion/react';

export function WorkerCardSkeleton({ 
  viewMode = 'grid',
  isHome = false,
  index = 0
}: { 
  viewMode?: 'grid' | 'list',
  isHome?: boolean,
  index?: number
}) {
  const shimmer = {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' as const, delay: index * 0.15 }
  };

  if (isHome) {
    return (
      <div className="min-w-[260px] md:min-w-[300px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 snap-center flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <motion.div className="w-16 h-16 rounded-full bg-gray-200" {...shimmer} />
          </div>
          <div className="flex-1 py-1">
            <motion.div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2.5" {...shimmer} />
            <motion.div className="h-3 bg-gray-200 rounded-md w-1/2 mb-2.5" {...shimmer} />
            <motion.div className="h-3 bg-gray-200 rounded-md w-1/3" {...shimmer} />
          </div>
        </div>
        <div className="mt-auto border-t border-gray-50 pt-3 flex items-center justify-between">
          <motion.div className="h-4 bg-gray-200 rounded-md w-12" {...shimmer} />
          <motion.div className="h-8 w-16 bg-gray-200 rounded-full" {...shimmer} />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 ${viewMode === 'list' ? 'flex flex-col sm:flex-row gap-5' : 'flex flex-col'}`}>
      <div className="relative shrink-0 self-start">
        <motion.div 
          className={`${viewMode === 'list' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16'} rounded-full bg-gray-200`}
          {...shimmer}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-4">
          <div className="w-full py-1">
            <motion.div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2.5" {...shimmer} />
            <motion.div className="h-3 bg-gray-200 rounded-md w-1/2" {...shimmer} />
          </div>
          <motion.div className="h-5 bg-gray-200 rounded-md w-12 shrink-0" {...shimmer} />
        </div>
        
        <div className="flex items-center gap-3 mb-3 mt-2">
          <motion.div className="h-3 bg-gray-200 rounded-md w-28" {...shimmer} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          <motion.div className="h-6 w-16 bg-gray-200 rounded-md" {...shimmer} />
          <motion.div className="h-6 w-24 bg-gray-200 rounded-md" {...shimmer} />
          <motion.div className="h-6 w-20 bg-gray-200 rounded-md" {...shimmer} />
        </div>
        
        <div className={`${viewMode === 'list' ? 'sm:self-end mt-auto w-full sm:w-auto' : 'mt-auto'}`}>
          <motion.div 
            className="h-9 w-full sm:w-28 bg-gray-200 rounded-xl"
            {...shimmer}
          />
        </div>
      </div>
    </div>
  );
}
