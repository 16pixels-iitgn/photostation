import PhotoGrid from '@/components/PhotoGrid';
import SearchBar from '@/components/SearchBar';
import { getPhotos } from '@/utils/photos';

// Use static rendering with client-side search handling
// This allows static export while still supporting search

type HomeProps = {
  searchParams?: { q?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  // For static export, we'll load all photos and handle filtering on the client
  const photos = await getPhotos();

  // We'll still respect the searchQuery for when this page is viewed in dev mode
  const searchQuery = searchParams?.q || '';

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to 16 Pixels PhotoStation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Explore our collection of stunning photographs. Hover over any photo to see the photographer's details, and click to open a larger preview.
        </p>
        <SearchBar />
        {searchQuery && (
          <div className="mt-4 text-sm text-gray-600">
            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
            <a href="/" className="ml-2 text-blue-600 hover:text-blue-800">(Clear)</a>
          </div>
        )}
      </div>

      {photos.length === 0 ? (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">No photos found</h2>
          <p className="text-gray-600">
            Please make sure you have added photos to the public/photos directory and updated the metadata.csv file.
          </p>
        </div>
      ) : (
        <PhotoGrid photos={photos} />
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Collection Info:</h3>
        <p>Total photos: {photos.length}</p>
        <p>Contributors: {new Set(photos.map(photo => photo.photographer)).size}</p>
      </div>
    </div>
  );
}
