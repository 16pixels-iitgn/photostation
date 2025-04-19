import PhotoGrid from '@/components/PhotoGrid';
import SearchBar from '@/components/SearchBar';
import { getPhotos } from '@/utils/photos';

// Static page with client-side search handling

export default async function Home() {
  // Load all photos during static generation
  const photos = await getPhotos();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Welcome to 16 Pixels PhotoStation</h1>
        <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto mb-6 transition-colors duration-300">
          Explore our collection of stunning photographs. Hover over any photo to see the photographer's details, and click to open a larger preview.
        </p>
        <SearchBar />
      </div>

      {photos.length === 0 ? (
        <div className="text-center p-8 bg-red-50 dark:bg-red-900 rounded-lg transition-colors duration-300">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2 transition-colors duration-300">No photos found</h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Please make sure you have added photos to the public/photos directory and updated the metadata.csv file.
          </p>
        </div>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}
