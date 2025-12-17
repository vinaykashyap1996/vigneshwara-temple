import Link from "next/link";
import SankalpaSection from "@/components/SankalpaSection";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Daily Sankalpa - Ganesha Temple",
  description:
    "View today's Sankalpa based on Hindu Panchang with Tithi, Nakshatra, and auspicious timings",
};

export default function SankalpaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Page Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-5xl font-bold text-orange-900 mb-4">
            Daily Sankalpa
          </h1>
          <p className="text-xl text-gray-700">
            Begin your spiritual practice with the proper Sankalpa based on
            today&apos;s Panchang
          </p>
        </div>
      </div>

      {/* Sankalpa Section */}
      <SankalpaSection />

      {/* Additional Information */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">
              About Sankalpa
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">
                  What is Sankalpa?
                </h3>
                <p className="leading-relaxed">
                  Sankalpa is a sacred vow or resolution taken at the beginning
                  of any puja, yajna, or spiritual practice. It declares the
                  intention, purpose, and auspicious timing of the ritual,
                  invoking divine blessings for its successful completion.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">
                  Why is it Important?
                </h3>
                <p className="leading-relaxed">
                  The Sankalpa establishes a spiritual connection between the
                  devotee and the divine. By stating the exact time (Tithi,
                  Nakshatra, Masa, etc.) and purpose, we align our actions with
                  cosmic energies and seek divine grace for the fulfillment of
                  our prayers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">
                  How to Use
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>
                    Visit this page daily to get the current Sankalpa based on
                    today&apos;s Panchang
                  </li>
                  <li>
                    Sit in a comfortable meditation posture facing east or north
                  </li>
                  <li>
                    Hold water in your right palm (Achamana) or touch sacred
                    items
                  </li>
                  <li>Recite the Sankalpa with devotion and clear intention</li>
                  <li>Proceed with your puja or spiritual practice</li>
                </ol>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-800 mb-2">
                  Panchang Elements Explained
                </h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Tithi:</strong> Lunar day in the Hindu calendar
                  </li>
                  <li>
                    <strong>Nakshatra:</strong> Constellation or lunar mansion
                  </li>
                  <li>
                    <strong>Paksha:</strong> Lunar fortnight (Shukla/Krishna)
                  </li>
                  <li>
                    <strong>Masa:</strong> Hindu month
                  </li>
                  <li>
                    <strong>Samvatsara:</strong> Year in the 60-year cycle
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Ganesha Temple. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
