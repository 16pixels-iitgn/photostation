"use client";

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current sort from URL or default to 'older-first'
  const currentSort = searchParams.get('sort') || 'older-first';
  const [isLoading, setIsLoading] = useState(false);

  const handleSortChange = useCallback((newSort: string) => {
    setIsLoading(true);
    
    // Create new URLSearchParams with the current URL parameters
    const params = new URLSearchParams();

    // Copy all existing parameters except 'page' (reset to page 1)
    searchParams.forEach((value, key) => {
      if (key !== 'page') {
        params.append(key, value);
      }
    });

    // Set the new sort parameter
    params.set('sort', newSort);
    
    // Always reset to page 1 when sorting changes
    params.set('page', '1');

    // Navigate to the same page with updated parameters
    router.push(`/?${params.toString()}`);
    
    // Reset loading state after a short delay
    setTimeout(() => setIsLoading(false), 300);
  }, [router, searchParams]);

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
        Sort by:
      </span>
      <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors duration-300">
        <button
          onClick={() => handleSortChange('older-first')}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
            currentSort === 'older-first'
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isLoading && currentSort !== 'older-first' ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
              Older First
            </div>
          ) : (
            'Older First'
          )}
        </button>
        <button
          onClick={() => handleSortChange('newer-first')}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
            currentSort === 'newer-first'
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isLoading && currentSort !== 'newer-first' ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
              Newer First
            </div>
          ) : (
            'Newer First'
          )}
        </button>
      </div>
    </div>
  );
}
