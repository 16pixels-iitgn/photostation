import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

// Get the base path from environment or default to empty string
// This helps with GitHub Pages deployment where the base path is /photostation
const basePath = process.env.NODE_ENV === 'production' ? '/photostation' : '';

export interface Photo {
  id: string;
  filename: string;
  photographer: string;
  title: string;
  description: string;
  date?: string; // Added date field as optional
  src: string;
}

// Fallback data for testing
const fallbackPhotos: Photo[] = [
  {
    id: '1',
    filename: 'photo1.jpg',
    photographer: 'John Doe',
    title: 'Sunset at the Beach',
    description: 'A beautiful sunset captured at the beach',
    src: `${basePath}/photos/photo1.jpg`
  },
  {
    id: '2',
    filename: 'photo2.jpg',
    photographer: 'Jane Smith',
    title: 'Mountain View',
    description: 'Breathtaking view of mountains in the morning',
    src: `${basePath}/photos/photo2.jpg`
  },
  {
    id: '3',
    filename: 'photo3.jpg',
    photographer: 'Alex Johnson',
    title: 'City Lights',
    description: 'Night view of the city skyline',
    src: `${basePath}/photos/photo3.jpg`
  },
  {
    id: '4',
    filename: 'photo4.jpg',
    photographer: 'Sarah Williams',
    title: 'Forest Path',
    description: 'A serene path through the dense forest',
    src: `${basePath}/photos/photo4.jpg`
  },
  {
    id: '5',
    filename: 'photo5.jpg',
    photographer: 'Michael Brown',
    title: 'Ocean Waves',
    description: 'Powerful ocean waves crashing on rocks',
    src: `${basePath}/photos/photo5.jpg`
  }
];

export async function getPhotos(searchQuery?: string): Promise<Photo[]> {
  try {
    // Read the CSV file
    const csvPath = path.join(process.cwd(), 'public', 'photos', 'metadata.csv');

    const csvData = await fsPromises.readFile(csvPath, 'utf-8');

    // Parse CSV data
    const lines = csvData.split('\n');

    const headers = lines[0].split(',');

    const photos: Photo[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(',');

      if (values.length !== headers.length) {
        // Skip lines with incorrect number of values
        continue;
      }

      const photo: any = {};

      headers.forEach((header, index) => {
        photo[header.trim()] = values[index]?.trim() || '';
      });

      // Add the image source path with the correct base path
      photo.src = `${basePath}/photos/${photo.filename}`;

      photos.push(photo as Photo);
    }

    // If no photos were loaded from CSV, use fallback data
    if (photos.length === 0) {
      return fallbackPhotos;
    }

    // Filter photos by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return photos.filter(photo =>
        (photo.photographer && photo.photographer.toLowerCase().includes(query)) ||
        (photo.title && photo.title.toLowerCase().includes(query)) ||
        (photo.description && photo.description.toLowerCase().includes(query))
      );
    }

    return photos;
  } catch (error) {
    console.error('Error loading photos:', error);
    return fallbackPhotos;
  }
}

export async function getPhotoById(id: string): Promise<Photo | null> {
  const photos = await getPhotos();
  return photos.find(photo => photo.id === id) || null;
}
