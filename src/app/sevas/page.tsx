'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18next';
import SevasHero from './components/SevasHero';
import FeaturedSevas from './components/FeaturedSevas';
import SevasFilters from './components/SevasFilters';
import SevaGrid from './components/SevaGrid';
import HowItWorks from './components/HowItWorks';
import SevasFAQ from './components/SevasFAQ';
import TempleNotice from './components/TempleNotice';
import { sevas } from './data';
import { SevaCategory, SevaTiming } from './types';

export default function SevasPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SevaCategory | 'all'>(
    'all'
  );
  const [activeTiming, setActiveTiming] = useState<SevaTiming | 'all'>('all');

  // Filter sevas based on search and filters
  const filteredSevas = useMemo(() => {
    return sevas.filter((seva) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        seva.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seva.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seva.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        activeCategory === 'all' || seva.category === activeCategory;

      // Timing filter
      const matchesTiming =
        activeTiming === 'all' || seva.timing.includes(activeTiming);

      return matchesSearch && matchesCategory && matchesTiming;
    });
  }, [searchQuery, activeCategory, activeTiming]);

  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden bg-ivory'>
      {/* Hero Section */}
      <SevasHero />

      {/* Main Content */}
      <main className='relative flex flex-col items-center w-full pb-20'>
        <div className='layout-content-container flex flex-col max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
          {/* Featured Sevas */}
          <FeaturedSevas />

          {/* Filters & Grid Section */}
          <div id='sevas'>
            <SevasFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              activeTiming={activeTiming}
              onTimingChange={setActiveTiming}
            />

            {/* Results Count */}
            <div className='mb-6 text-sm text-muted'>
              {t('sevas.showingResults', { count: filteredSevas.length, total: sevas.length })}
            </div>

            {/* Sevas Grid */}
            <SevaGrid sevas={filteredSevas} />
          </div>

          {/* How It Works */}
          <HowItWorks />

          {/* FAQ */}
          <SevasFAQ />

          {/* Temple Notice */}
          <TempleNotice />
        </div>
      </main>
    </div>
  );
}
