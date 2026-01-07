'use client';

import { useTranslation } from 'react-i18next';
import UpcomingEventsList from './UpcomingEventsList';
import TodayPanchangCard from '@/components/TodayPanchangCard';
import FeaturedEventCard from './FeaturedEventCard';
import { DayPanchang, DayPanchangResponse } from '@/lib/panchang/types';

interface EventsSidebarProps {
  monthData: DayPanchang[];
  todayData: DayPanchangResponse | null;
  featuredDay: DayPanchang | undefined;
}

export default function EventsSidebar({
  monthData,
  todayData,
  featuredDay,
}: EventsSidebarProps) {
  const { t } = useTranslation('events');

  return (
    <div className='space-y-6'>
      {/* Upcoming Events Card */}
      <div className='rounded-xl border border-border bg-white p-6 shadow-sm'>
        <h3 className='mb-5 flex items-center gap-2 text-xl font-bold text-fg'>
          <span className='material-symbols-outlined text-orange-600'>
            event_upcoming
          </span>
          {t('upcomingEvents.title')}
        </h3>
        <UpcomingEventsList monthData={monthData} />
      </div>

      {/* Today's Panchang Card */}
      {todayData && (
        <TodayPanchangCard data={todayData} showShareButton={true} />
      )}

      {/* Featured Festival Card */}
      {featuredDay && featuredDay.festivals.length > 0 && (
        <FeaturedEventCard
          festival={featuredDay.festivals[0]}
          date={featuredDay.dateISO}
        />
      )}
    </div>
  );
}
