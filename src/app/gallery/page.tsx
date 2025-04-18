import fs from 'fs';
import path from 'path';

// Get the base path from environment or default to empty string
const basePath = process.env.NODE_ENV === 'production' ? '/photostation' : '';

// Function to get all image files from the photos directory
function getImageFiles() {
  const photosDir = path.join(process.cwd(), 'public', 'photos');
  try {
    const files = fs.readdirSync(photosDir);
    return files.filter(file =>
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.png')
    );
  } catch (error) {
    console.error('Error reading photos directory:', error);
    return [];
  }
}

export default function GalleryPage() {
  // Get all image files
  const imageFiles = getImageFiles();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Photo Gallery</h1>

      {imageFiles.length === 0 ? (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">No images found in the photos directory.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageFiles.map((file, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <img
                  src={`${basePath}/photos/${file}`}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2">{file}</h2>
                <p className="text-gray-700">Click to view details</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
