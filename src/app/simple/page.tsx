export default function SimplePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Simple Photo Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="border rounded-lg overflow-hidden shadow-md">
            <img 
              src={`/photos/photo${num}.jpg`} 
              alt={`Photo ${num}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">Photo {num}</h2>
              <p className="text-gray-700">Test photo {num}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
