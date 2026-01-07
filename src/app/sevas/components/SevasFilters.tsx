'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { SevaCategory, SevaTiming } from '../types';

interface SevasFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: SevaCategory | 'all';
  onCategoryChange: (category: SevaCategory | 'all') => void;
  activeTiming: SevaTiming | 'all';
  onTimingChange: (timing: SevaTiming | 'all') => void;
}

export default function SevasFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeTiming,
  onTimingChange,
}: SevasFiltersProps) {
  const { t } = useTranslation();

  const categories: { id: SevaCategory | 'all'; label: string }[] = [
    { id: 'all', label: t('sevas.filters.all') },
    { id: 'daily', label: t('sevas.filters.daily') },
    { id: 'weekly', label: t('sevas.filters.weekly') },
    { id: 'monthly', label: t('sevas.filters.monthly') },
    { id: 'festival', label: t('sevas.filters.festival') },
    { id: 'special', label: t('sevas.filters.special') },
  ];

  const timings: { id: SevaTiming | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: t('sevas.filters.anyTime'), icon: 'schedule' },
    { id: 'morning', label: t('sevas.filters.morning'), icon: 'wb_twilight' },
    { id: 'evening', label: t('sevas.filters.evening'), icon: 'nightlight' },
    { id: 'full-day', label: t('sevas.filters.fullDay'), icon: 'wb_sunny' },
  ];

  return (
    <div className='bg-white border border-border rounded-xl p-6 shadow-sm sticky top-20 z-10 mb-8'>
      {/* Search */}
      <div className='mb-6'>
        <div className='relative'>
          <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xl'>
            search
          </span>
          <input
            type='text'
            placeholder={t('sevas.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-fg placeholder:text-muted/50'
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className='mb-6'>
        <h3 className='text-sm font-bold text-muted uppercase tracking-wider mb-3'>
          {t('sevas.filters.category')}
        </h3>
        <div className='flex flex-wrap gap-2'>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-orange-50 text-orange-900 hover:bg-orange-100 border border-orange-200'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timing Filters */}
      <div>
        <h3 className='text-sm font-bold text-muted uppercase tracking-wider mb-3'>
          {t('sevas.filters.timing')}
        </h3>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
          {timings.map((time) => (
            <button
              key={time.id}
              onClick={() => onTimingChange(time.id)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTiming === time.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-fg hover:bg-orange-50 border border-border'
              }`}>
              <span className='material-symbols-outlined text-lg'>
                {time.icon}
              </span>
              <span className='hidden sm:inline'>{time.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
