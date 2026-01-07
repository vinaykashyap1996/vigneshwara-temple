'use client';

import { GalleryItem } from '../types';
import GalleryCard from './GalleryCard';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-dense mt-8'>
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
