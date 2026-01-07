'use client';

import { useState, useMemo } from 'react';
// import GalleryHero from './components/GalleryHero';
import GalleryFilters from './components/GalleryFilters';
import GalleryGrid from './components/GalleryGrid';
import LoadMoreButton from './components/LoadMoreButton';
import PhotographyNotice from './components/PhotographyNotice';
import { galleryFilters, galleryItems } from './data';
import { GalleryCategory } from './types';

const ITEMS_PER_PAGE = 8;

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Get items to display based on pagination
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, itemsToShow);
  }, [filteredItems, itemsToShow]);

  // Check if there are more items to load
  const hasMore = itemsToShow < filteredItems.length;

  // Handle filter change
  const handleFilterChange = (filter: GalleryCategory) => {
    setActiveFilter(filter);
    setItemsToShow(ITEMS_PER_PAGE); // Reset pagination when filter changes
  };

  // Handle load more
  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden bg-ivory'>
      <main className='flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-28 pb-20 relative'>
        {/* Hero Section */}
        {/* <GalleryHero /> */}

        {/* Filters */}
        <GalleryFilters
          filters={galleryFilters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Gallery Grid */}
        <GalleryGrid items={displayedItems} />

        {/* Load More Button */}
        <LoadMoreButton onClick={handleLoadMore} hasMore={hasMore} />

        {/* Photography Notice */}
        <PhotographyNotice />
      </main>
    </div>
  );
}
