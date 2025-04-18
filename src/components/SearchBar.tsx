"use client";

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Create new URLSearchParams with the current URL parameters
    const params = new URLSearchParams();

    // Copy all existing parameters
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    // Update or remove the 'q' parameter
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }

    // Navigate to the same page with updated query parameters
    router.push(`/?${params.toString()}`);
  }, [searchQuery, router, searchParams]);

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by photographer or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
