'use client';

import { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { DayPanchang } from '@/lib/panchang/types';
import { useTranslation } from 'react-i18next';

interface UpcomingEventsListProps {
  monthData: DayPanchang[];
}

export default function UpcomingEventsList({
  monthData,
}: UpcomingEventsListProps) {
  const { t, i18n } = useTranslation('events');

  useEffect(() => {
    // Initialize i18n on client
    import('@/i18next');
  }, []);

  // Get upcoming festivals - use useMemo to avoid SSR/client hydration mismatches
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const upcomingEvents = monthData
    .filter((day) => {
      const dayDate = new Date(day.dateISO);
      return dayDate >= today && day.festivals.length > 0;
    })
    .slice(0, 3);

  if (upcomingEvents.length === 0) {
    return (
      <div className='py-4 text-center text-sm text-muted'>
        {t('upcomingEvents.noEvents')}
      </div>
    );
  }

  const getMonthShort = (month: number) => {
    const monthKeys = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    return month >= 1 && month <= 12
      ? t(`monthNamesShort.${monthKeys[month - 1]}`)
      : '---';
  };

  return (
    <div className='space-y-4'>
      {upcomingEvents.map((day) => {
        const mainFestival = day.festivals[0];

        return (
          <Link
            key={day.dateISO}
            href={`/events/${day.dateISO}`}
            className='group relative flex gap-4 rounded-lg border border-border bg-white p-3 shadow-sm transition-colors hover:bg-orange-50'>
            <div className='flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md border border-border bg-orange-50 text-center'>
              <span className='text-xs font-medium uppercase text-muted'>
                {getMonthShort(day.month)}
              </span>
              <span className='text-xl font-bold text-fg'>{day.day}</span>
            </div>
            <div className='flex-1'>
              <h4 className='font-bold text-fg transition-colors group-hover:text-orange-600'>
                {mainFestival.name}
              </h4>
              <p className='mt-1 line-clamp-2 text-sm text-muted'>
                {day.tithi.name} • {day.nakshatra.name}
              </p>
              {day.sunrise && day.sunset && (
                <div className='mt-2 flex items-center text-xs font-medium text-orange-600'>
                  {t('todaysPanchang.sunrise')} {day.sunrise} •{' '}
                  {t('todaysPanchang.sunset')} {day.sunset}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
