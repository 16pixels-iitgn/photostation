import { getPhotos } from '@/utils/photos';
import Link from 'next/link';

export default async function ContributorsPage() {
  const photos = await getPhotos();

  // Get unique photographers and count their photos
  const photographerCounts = photos.reduce((acc, photo) => {
    const photographer = photo.photographer || 'Unknown';
    acc[photographer] = (acc[photographer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by photo count (descending)
  const contributors = Object.entries(photographerCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Contributors</h1>

      <p className="text-lg text-gray-600 mb-8">
        We are grateful to all the talented photographers who have contributed to our collection.
        Below is a list of our contributors and the number of photographs they have shared. Click on the tile to view their photos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor) => (
          <Link
            key={contributor.name}
            href={`/?q=${encodeURIComponent(contributor.name)}`}
            className="bg-white rounded-lg shadow-md p-6 block hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{contributor.name}</h2>
            <p className="text-gray-600">
              {contributor.count} {contributor.count === 1 ? 'photo' : 'photos'}
            </p>
            {/* <p className="text-xs text-blue-500 mt-2">Click to view photos</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
