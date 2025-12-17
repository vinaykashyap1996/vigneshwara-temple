'use client';

import { useState, useEffect } from 'react';
import { getTodaySankalpa, type SankalpaData } from '@/lib/panchang';

export default function SankalpaSection() {
  const [sankalpaData, setSankalpaData] = useState<SankalpaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);

  useEffect(() => {
    loadSankalpa();
  }, []);

  const loadSankalpa = async () => {
    try {
      setLoading(true);
      const data = await getTodaySankalpa();
      setSankalpaData(data);
    } catch (error) {
      console.error('Error loading Sankalpa:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-orange-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-orange-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!sankalpaData) return null;

  const { panchangData, sankalpa } = sankalpaData;
  const today = new Date();

  return (
    <section className="py-16 bg-gradient-to-r from-orange-100 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-orange-900 mb-2">
              🕉️ Today&apos;s Sankalpa
            </h2>
            <p className="text-orange-700 text-lg">
              {today.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Panchang Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">
              Panchang Details
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Tithi</p>
                <p className="font-semibold text-orange-900">{panchangData.tithi}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Nakshatra</p>
                <p className="font-semibold text-orange-900">{panchangData.nakshatra}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Paksha</p>
                <p className="font-semibold text-orange-900">{panchangData.paksha}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Masa</p>
                <p className="font-semibold text-orange-900">{panchangData.masa}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Samvatsara</p>
                <p className="font-semibold text-orange-900">{panchangData.samvatsara}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Day</p>
                <p className="font-semibold text-orange-900">{panchangData.day}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-around text-center">
              <div>
                <p className="text-sm text-gray-600">Sunrise</p>
                <p className="font-semibold text-orange-800">{panchangData.sunrise}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sunset</p>
                <p className="font-semibold text-orange-800">{panchangData.sunset}</p>
              </div>
            </div>
          </div>

          {/* Sankalpa Text */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-orange-800">Sankalpa Mantra</h3>
              <button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className="text-sm bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-full transition"
              >
                {showTransliteration ? 'Show Sanskrit' : 'Show Transliteration'}
              </button>
            </div>

            {/* Sanskrit or Transliteration */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg mb-6 border-l-4 border-orange-600">
              <p className="text-lg md:text-xl leading-relaxed text-gray-800 text-center font-serif">
                {showTransliteration ? sankalpa.transliteration : sankalpa.sanskrit}
              </p>
            </div>

            {/* English Translation */}
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-3">English Translation:</h4>
              <p className="text-gray-700 leading-relaxed">
                {sankalpa.english}
              </p>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-700">
                <strong className="text-orange-900">Note:</strong> Recite this Sankalpa at the beginning of your puja or spiritual practice. 
                It sets the intention and invokes divine blessings for the auspicious activities of the day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
