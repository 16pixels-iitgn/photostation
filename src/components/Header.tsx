"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Get the base path based on environment
const basePath = process.env.NODE_ENV === 'production' ? '/photostation' : '';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={`${basePath}/?q=`} className="flex items-center space-x-2">
          <Image
            src={`${basePath}/logo.png`}
            alt="16 Pixels PhotoStation Logo"
            width={48}
            height={48}
            className="rounded-md object-contain"
            priority
          />
          <span className="text-2xl font-bold text-gray-800 hidden sm:inline">16 Pixels PhotoStation</span>
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <Link href={`${basePath}/`} className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href={`${basePath}/about`} className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href={`${basePath}/contributors`} className="text-gray-600 hover:text-gray-900">
              Contributors
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              href={`${basePath}/`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={`${basePath}/about`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={`${basePath}/contributors`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contributors
            </Link>
          </div>
        </div>
    </header>
  );
}
