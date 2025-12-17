import Link from "next/link";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="bg-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">🕉️ Ganesha Temple</Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-orange-200 transition">Home</Link>
              <Link href="/about" className="hover:text-orange-200 transition">About</Link>
              <Link href="/events" className="hover:text-orange-200 transition">Events</Link>
              <Link href="/gallery" className="text-orange-200">Gallery</Link>
              <Link href="/donations" className="hover:text-orange-200 transition">Donate</Link>
              <Link href="/contact" className="hover:text-orange-200 transition">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-orange-900 mb-8 text-center">Photo Gallery</h1>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Glimpses of our temple, festivals, and community celebrations
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="h-64 bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center">
                <span className="text-6xl">🕉️</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Temple Gallery {item}</h3>
                <p className="text-sm text-gray-600">Beautiful moments captured</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Note: This is a placeholder gallery. Add your temple photos by placing images in the public folder.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Ganesha Temple. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
