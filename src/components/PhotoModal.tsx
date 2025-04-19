"use client";

import { useEffect, useRef } from 'react';
import { Photo } from '@/utils/photos';
import { useRouter } from 'next/navigation';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: Photo | null;
  onPrev: () => void;
  onNext: () => void;
}

export default function PhotoModal({ isOpen, onClose, photo, onPrev, onNext }: PhotoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen || !photo) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center m-0 p-0 w-screen h-screen top-0 left-0"
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0 }}
    >
      <button
        className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-gray-300 z-50 bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 ease-in-out"
        onClick={onClose}
      >
        &times;
      </button>

      <div className="flex flex-col items-center max-w-7xl w-full px-2">
        <div className="relative w-full max-h-[85vh] flex justify-center mb-2">
          <img
            src={photo.src}
            alt={photo.title || 'Photo'}
            className="max-h-[85vh] max-w-full object-contain shadow-lg rounded-lg"
          />
        </div>

        <div className="bg-black bg-opacity-60 p-4 rounded-lg text-white text-center max-w-xl">
          <h2 className="text-xl font-bold mb-1">{photo.title || ''}</h2>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-1">
            <p className="text-sm">by
              <button
                className="text-blue-400 hover:text-blue-300 hover:underline ml-1 focus:outline-none transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  router.push(`/?q=${encodeURIComponent(photo.photographer || 'Unknown')}&exact=true&page=1`);
                }}
                title={`Search for photos by ${photo.photographer || 'Unknown'}`}
              >
                {photo.photographer || 'Unknown'}
              </button>
            </p>
            {photo.date && (
              <>
                <span className="text-gray-400">•</span>
                <button
                  className="text-sm text-gray-300 hover:text-blue-300 hover:underline focus:outline-none transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    // Use the date field for search with exact matching
                    router.push(`/?q=${encodeURIComponent(photo.date || '')}&exact=true&page=1`);
                  }}
                  title={`Search for photos from ${photo.date}`}
                >
                  {photo.date}
                </button>
              </>
            )}
          </div>
          {photo.description && <p className="text-xs mt-2">{photo.description}</p>}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className="bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-2 mx-2 focus:outline-none transition-all duration-200 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className="bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-2 mx-2 focus:outline-none transition-all duration-200 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
