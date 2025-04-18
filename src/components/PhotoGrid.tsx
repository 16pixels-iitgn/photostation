"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Photo } from '@/utils/photos';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 20;
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Handle search filtering on the client side
  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = photos.filter(photo =>
        (photo.photographer && photo.photographer.toLowerCase().includes(query)) ||
        (photo.title && photo.title.toLowerCase().includes(query)) ||
        (photo.description && photo.description.toLowerCase().includes(query))
      );
      setFilteredPhotos(filtered);
      setCurrentPage(1); // Reset to first page when search changes
    } else {
      setFilteredPhotos(photos);
    }
  }, [searchParams, photos]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  // Get current photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    const newIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(currentPhotos[newIndex]);
  };

  // Navigate to next photo
  const handleNextPhoto = () => {
    const newIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(currentPhotos[newIndex]);
  };

  // Get the current search query
  const searchQuery = searchParams.get('q') || '';

  return (
    <div className="space-y-8">
      {/* Search results indicator */}
      {searchQuery && (
        <div className="text-center mt-4 mb-6 text-sm text-gray-600">
          Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          <a href="/" className="ml-2 text-blue-600 hover:text-blue-800">(Clear)</a>
        </div>
      )}

      {filteredPhotos.length === 0 ? (
        <div className="text-center p-8 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">No photos found</h2>
          <p className="text-gray-600">
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
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
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
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
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
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Mobile pagination */}
          <span className="md:hidden relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <span className="sr-only">Next</span>
            Next &raquo;
          </button>
        </nav>
      </div>
      )}

      {/* Collection Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Collection Info:</h3>
        <p>Total photos: {photos.length}</p>
        <p>Contributors: {new Set(photos.map(photo => photo.photographer)).size}</p>
        {searchQuery && (
          <p>Matching photos: {filteredPhotos.length}</p>
        )}
      </div>
    </div>
  );
}
