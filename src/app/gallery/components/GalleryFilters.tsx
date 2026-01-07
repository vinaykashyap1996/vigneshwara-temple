'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { GalleryCategory, GalleryFilter } from '../types';

interface GalleryFiltersProps {
  filters: GalleryFilter[];
  activeFilter: GalleryCategory;
  onFilterChange: (filter: GalleryCategory) => void;
}

export default function GalleryFilters({
  filters,
  activeFilter,
  onFilterChange,
}: GalleryFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className='mt-12 flex flex-wrap justify-center gap-3 z-10'>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className='group relative px-6 py-2 rounded-full transition-all duration-300 hover:bg-orange-50'
            aria-label={`Filter by ${t(filter.label)}`}
            aria-pressed={isActive}>
            <span
              className={`absolute inset-0 border rounded-full transition-colors ${
                isActive
                  ? 'border-orange-500/60'
                  : 'border-border group-hover:border-orange-300'
              }`}></span>
            <span
              className={`text-sm font-semibold tracking-wide ${
                isActive
                  ? 'text-orange-500'
                  : 'text-muted group-hover:text-fg'
              }`}>
              {t(filter.label)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
