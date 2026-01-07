'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { Seva } from '../types';
import SevaCard from './SevaCard';

interface SevaGridProps {
  sevas: Seva[];
}

export default function SevaGrid({ sevas }: SevaGridProps) {
  const { t } = useTranslation();

  if (sevas.length === 0) {
    return (
      <div className='text-center py-16'>
        <span className='material-symbols-outlined text-6xl text-muted/30 mb-4 block'>
          search_off
        </span>
        <h3 className='text-xl font-bold text-fg mb-2'>{t('sevas.noResults.title')}</h3>
        <p className='text-muted'>{t('sevas.noResults.message')}</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {sevas.map((seva) => (
        <SevaCard key={seva.id} seva={seva} />
      ))}
    </div>
  );
}
