import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Donations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Page Content */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-orange-900 mb-8 text-center">
          Support Our Temple
        </h1>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Your generous donations help us maintain the temple, organize
          festivals, and serve the community
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-orange-800 mb-3">
              Temple Maintenance
            </h3>
            <p className="text-gray-700 mb-4">
              Help us maintain and beautify the temple premises
            </p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition">
              Donate Now
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-orange-800 mb-3">
              Festival Sponsorship
            </h3>
            <p className="text-gray-700 mb-4">
              Sponsor festivals and cultural events
            </p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition">
              Sponsor
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🍛</div>
            <h3 className="text-2xl font-bold text-orange-800 mb-3">
              Annadanam
            </h3>
            <p className="text-gray-700 mb-4">
              Contribute to community meal programs
            </p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition">
              Support
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
            Other Ways to Contribute
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-orange-600 text-2xl mr-4">✨</span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Monthly Subscription
                </h4>
                <p className="text-gray-600">
                  Set up recurring monthly donations to provide sustained
                  support
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-600 text-2xl mr-4">🙏</span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Volunteer</h4>
                <p className="text-gray-600">
                  Donate your time and skills to help with temple activities
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-600 text-2xl mr-4">📚</span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Educational Programs
                </h4>
                <p className="text-gray-600">
                  Support our cultural and educational initiatives for children
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-orange-50 rounded-lg">
            <h3 className="font-bold text-orange-900 mb-3">Bank Details</h3>
            <p className="text-gray-700">
              <strong>Bank Name:</strong> Community Bank
            </p>
            <p className="text-gray-700">
              <strong>Account Name:</strong> Ganesha Temple Trust
            </p>
            <p className="text-gray-700">
              <strong>Account Number:</strong> [Account Number]
            </p>
            <p className="text-gray-700">
              <strong>Tax ID:</strong> [Tax ID for tax deduction]
            </p>
            <p className="text-sm text-gray-600 mt-3">
              All donations are tax-deductible
            </p>
          </div>
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
