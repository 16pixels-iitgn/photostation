import { getSecretaries } from '@/utils/photos';

export default async function AboutPage() {
  const secretaries = await getSecretaries();

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Club Secretary Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Club Secretaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secretaries.map((secretary) => (
            <div key={secretary.Sr} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-4">
                  <img
                    src={secretary.src}
                    alt={secretary.Name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 text-center transition-colors duration-300">
                  {secretary.Name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
                  {secretary.Status}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 transition-colors duration-300">
                  {secretary.Year}
                </p>
                <div className="flex space-x-3">
                  {secretary.Email && (
                    <a
                      href={`mailto:${secretary.Email}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                      title="Email"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                  )}
                  {secretary.LinkedIn && secretary.LinkedIn !== 'https://www.linkedin.com/' && (
                    <a
                      href={secretary.LinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                      title="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {secretary.Instagram && secretary.Instagram !== 'https://www.instagram.com/' && (
                    <a
                      href={secretary.Instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors duration-300"
                      title="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">About 16 Pixels PhotoStation</h1>

      <div className="prose lg:prose-xl">
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-6 transition-colors duration-300">
          16 Pixels PhotoStation is a platform showcasing the photography talent of our community.
          This gallery features a diverse collection of photographs captured by passionate photographers.
          Originally Developed by Chandrabhan Patel (Secretary 2024-25). Actively maintained by the Club.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4 transition-colors duration-300">Our Mission</h2>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-6 transition-colors duration-300">
          Our mission is to provide a platform for photographers to showcase their work and connect with a wider audience.
          We believe in the power of visual storytelling and aim to create a space where photographers can share their unique perspectives.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4 transition-colors duration-300">The Collection</h2>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-6 transition-colors duration-300">
          Our collection features a wide range of photography styles and subjects, from landscapes and portraits to street photography and abstract compositions.
          Each photograph tells a story and offers a glimpse into the photographer's vision and creativity.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4 transition-colors duration-300">Join Us</h2>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-6 transition-colors duration-300">
          We welcome photographers of all skill levels to contribute to our growing collection.
          If you're interested in sharing your work, please contact us for more information on how to submit your photographs.
        </p>
      </div>
    </div>
  );
}
