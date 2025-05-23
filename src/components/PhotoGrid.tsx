"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Photo } from '@/utils/photos';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get page from URL or default to 1
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Add loading state
  const [isLoading, setIsLoading] = useState(false);

  const photosPerPage = 20;
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Track previous search query to detect changes
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  // Handle search filtering on the client side
  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    const exactMatch = searchParams.get('exact') === 'true';
    const searchChanged = searchQuery !== prevSearchQuery;

    // Update previous search query
    setPrevSearchQuery(searchQuery);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      let filtered;

      if (exactMatch) {
        // Exact match - only match whole words/names
        filtered = photos.filter(photo =>
          (photo.photographer && photo.photographer.toLowerCase() === query) ||
          (photo.title && photo.title.toLowerCase() === query) ||
          (photo.description && photo.description.toLowerCase() === query) ||
          (photo.date && photo.date.toLowerCase() === query)
        );
      } else {
        // Substring match - default behavior
        filtered = photos.filter(photo =>
          (photo.photographer && photo.photographer.toLowerCase().includes(query)) ||
          (photo.title && photo.title.toLowerCase().includes(query)) ||
          (photo.description && photo.description.toLowerCase().includes(query)) ||
          (photo.date && photo.date.toLowerCase().includes(query))
        );
      }

      setFilteredPhotos(filtered);

      // Only reset to page 1 if the search query has changed
      if (searchChanged) {
        setCurrentPage(1);
        // Update URL with page 1
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', '1');
        router.push(`/?${newParams.toString()}`, { scroll: false });
      }
    } else {
      setFilteredPhotos(photos);

      // If clearing search, go to page 1
      if (searchChanged && prevSearchQuery) {
        setCurrentPage(1);
        // Update URL with page 1
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', '1');
        router.push(`/?${newParams.toString()}`, { scroll: false });
      }
    }
  }, [searchParams, photos, prevSearchQuery]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  // Get current photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Update modal when page changes and handle loading state
  useEffect(() => {
    // If modal is open and the selected photo is not in the current page, close the modal
    if (modalOpen && selectedPhoto && !currentPhotos.find(p => p.id === selectedPhoto.id)) {
      setModalOpen(false);
    }

    // Reset loading state after a delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentPage, currentPhotos, modalOpen, selectedPhoto]);

  // Change page
  const paginate = (pageNumber: number) => {
    // Set loading state
    setIsLoading(true);
    setCurrentPage(pageNumber);

    // Update URL with the new page number
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());

    // Preserve other query parameters like search and exact match
    const query = searchParams.get('q');
    if (query) {
      params.set('q', query);
    }

    const exact = searchParams.get('exact');
    if (exact) {
      params.set('exact', exact);
    }

    // Update URL without refreshing the page
    router.push(`/?${params.toString()}`, { scroll: false });

    // Scroll to top with smooth behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open modal with photo
  const handleOpenModal = (photo: Photo) => {
    const index = currentPhotos.findIndex(p => p.id === photo.id);
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Navigate to previous photo
  const handlePrevPhoto = () => {
    // If we're at the first photo and not on the first page, go to previous page
    if (currentPhotoIndex === 0 && currentPage > 1) {
      const newPage = currentPage - 1;

      // Set loading state
      setIsLoading(true);
      setCurrentPage(newPage);

      // Update URL with the new page number
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());

      // Preserve other query parameters
      const query = searchParams.get('q');
      if (query) {
        params.set('q', query);
      }

      const exact = searchParams.get('exact');
      if (exact) {
        params.set('exact', exact);
      }

      // Update URL without refreshing the page
      router.push(`/?${params.toString()}`, { scroll: false });

      // Scroll to top with smooth behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Calculate the index of the last photo on the previous page
      const photosOnPrevPage = Math.min(photosPerPage, filteredPhotos.length - (newPage - 1) * photosPerPage);
      const newIndex = photosOnPrevPage - 1;

      // We need to wait for the page change to update currentPhotos
      setTimeout(() => {
        const prevPagePhotos = filteredPhotos.slice(
          (newPage - 1) * photosPerPage,
          newPage * photosPerPage
        );

        // Make sure we have photos on the previous page
        if (prevPagePhotos.length > 0) {
          setCurrentPhotoIndex(newIndex);
          setSelectedPhoto(prevPagePhotos[newIndex]);
          // Keep the modal open for a seamless experience
          setModalOpen(true);
        }
      }, 500); // Increased timeout to ensure page change is complete
    } else if (currentPhotoIndex > 0) {
      // Standard behavior - previous photo on same page
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(currentPhotos[newIndex]);
    } else {
      // We're at the first photo on the first page, loop to the last photo
      const newIndex = currentPhotos.length - 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(currentPhotos[newIndex]);
    }
  };

  // Navigate to next photo
  const handleNextPhoto = () => {
    // If we're at the last photo and not on the last page, go to next page
    if (currentPhotoIndex === currentPhotos.length - 1 && currentPage < totalPages) {
      const newPage = currentPage + 1;

      // Set loading state
      setIsLoading(true);
      setCurrentPage(newPage);

      // Update URL with the new page number
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());

      // Preserve other query parameters
      const query = searchParams.get('q');
      if (query) {
        params.set('q', query);
      }

      const exact = searchParams.get('exact');
      if (exact) {
        params.set('exact', exact);
      }

      // Update URL without refreshing the page
      router.push(`/?${params.toString()}`, { scroll: false });

      // Scroll to top with smooth behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // On the next page, show the first photo
      const newIndex = 0;

      // We need to wait for the page change to update currentPhotos
      setTimeout(() => {
        const nextPagePhotos = filteredPhotos.slice(
          (newPage - 1) * photosPerPage,
          newPage * photosPerPage
        );

        // Make sure we have photos on the next page
        if (nextPagePhotos.length > 0) {
          setCurrentPhotoIndex(newIndex);
          setSelectedPhoto(nextPagePhotos[newIndex]);
          // Keep the modal open for a seamless experience
          setModalOpen(true);
        }
      }, 500); // Increased timeout to ensure page change is complete
    } else if (currentPhotoIndex < currentPhotos.length - 1) {
      // Standard behavior - next photo on same page
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(currentPhotos[newIndex]);
    } else {
      // We're at the last photo on the last page, loop back to the first photo
      setCurrentPhotoIndex(0);
      setSelectedPhoto(currentPhotos[0]);
    }
  };

  // Get the current search query and exact match parameter
  const searchQuery = searchParams.get('q') || '';
  const exactMatch = searchParams.get('exact') === 'true';

  return (
    <div className="space-y-8">
      {/* Search results indicator */}
      {searchQuery && (
        <div className="text-center mt-4 mb-6 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
          Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          <Link
            href={`/?page=${currentPage}${exactMatch ? '&exact=true' : ''}`}
            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            (Clear)
          </Link>
        </div>
      )}

      {/* Loading overlay - only shown during page transitions */}
      {isLoading && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-50 flex items-center justify-center transition-colors duration-300">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
            <p className="mt-6 text-gray-700 dark:text-gray-200 text-lg font-medium transition-colors duration-300">Loading photos...</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Please wait while we prepare the next page</p>
          </div>
        </div>
      )}

      {filteredPhotos.length === 0 ? (
        <div className="text-center p-8 bg-yellow-50 dark:bg-yellow-900 rounded-lg transition-colors duration-300">
          <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-2 transition-colors duration-300">No photos found</h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            No photos match your search criteria. Try a different search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      )}

      {/* Photo Modal */}
      <PhotoModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        photo={selectedPhoto}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
      />

      {/* Pagination - only show if we have photos */}
      {filteredPhotos.length > 0 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => {
              const newPage = Math.max(currentPage - 1, 1);
              paginate(newPage);
            }}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium transition-colors duration-300 ${currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <span className="sr-only">Previous</span>
            &laquo; Prev
          </button>

          {/* Page numbers */}
          <div className="hidden md:flex">
            {[...Array(totalPages)].map((_, index) => {
              // Show only a window of 5 pages around the current page
              if (
                index + 1 === 1 ||
                index + 1 === totalPages ||
                (index + 1 >= currentPage - 2 && index + 1 <= currentPage + 2)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium transition-colors duration-300 ${currentPage === index + 1 ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                index + 1 === currentPage - 3 ||
                index + 1 === currentPage + 3
              ) {
                return (
                  <span
                    key={index}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-400 transition-colors duration-300"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Mobile pagination */}
          <span className="md:hidden relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-400 transition-colors duration-300">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => {
              const newPage = Math.min(currentPage + 1, totalPages);
              paginate(newPage);
            }}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium transition-colors duration-300 ${currentPage === totalPages ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <span className="sr-only">Next</span>
            Next &raquo;
          </button>
        </nav>
      </div>
      )}

      {/* Collection Info and Footer */}
      <footer className="mt-12">
        {/* Collection Stats */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">Collection Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{photos.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium transition-colors duration-300">Total Photos</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{new Set(photos.map(photo => photo.photographer)).size}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium transition-colors duration-300">Contributors</p>
            </div>
            {searchQuery ? (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{filteredPhotos.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium transition-colors duration-300">Matching Photos</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{Math.round(photos.length / new Set(photos.map(photo => photo.photographer)).size)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium transition-colors duration-300">Avg. Photos per Contributor</p>
              </div>
            )}
          </div>
        </div>

        {/* Credits and Contact */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg mt-6 shadow-sm transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">16 Pixels, The Photography Club of IIT Gandhinagar</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">We capture every precious moment and shares it with the IITGN community. </p>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-6">
              <a href="https://instagram.com/16pixels_iitgn" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:16pixels@iitgn.ac.in" className="text-gray-700 hover:text-black transition-colors">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
            © 2025 16 Pixels PhotoStation. All rights reserved to the respective member of the Club.
          </div>
        </div>
      </footer>
    </div>
  );
}
