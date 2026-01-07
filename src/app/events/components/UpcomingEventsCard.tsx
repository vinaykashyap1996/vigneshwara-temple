'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UpcomingEventsList from './UpcomingEventsList';
import { DayPanchang } from '@/lib/panchang/types';

interface UpcomingEventsCardProps {
  monthData: DayPanchang[];
}

export default function UpcomingEventsCard({
  monthData,
}: UpcomingEventsCardProps) {
  const { t } = useTranslation('events');

  useEffect(() => {
    // Initialize i18n on client
    import('@/i18next');
  }, []);

  return (
    <div className='rounded-xl border border-border bg-white p-6 shadow-sm'>
      <h3 className='mb-5 flex items-center gap-2 text-xl font-bold text-fg'>
        <span className='material-symbols-outlined text-orange-600'>
          event_upcoming
        </span>
        {t('upcomingEvents.title')}
      </h3>
      <UpcomingEventsList monthData={monthData} />
    </div>
  );
}
