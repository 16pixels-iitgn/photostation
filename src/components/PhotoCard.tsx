"use client";

import { Photo } from '@/utils/photos';

interface PhotoCardProps {
  photo: Photo;
  onOpenModal: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onOpenModal }: PhotoCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer"
      onClick={() => onOpenModal(photo)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Info shown on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-xl font-bold mb-1">{photo.title || ''}</h3>
          <p className="text-sm mb-2">by {photo.photographer || 'Unknown'}</p>
          <p className="text-xs text-center">{photo.description || ''}</p>
        </div>
      </div>
    </div>
  );
}
