'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { DayPanchang } from '@/lib/panchang/types';

interface UpcomingEventsListProps {
  monthData: DayPanchang[];
}

export default function UpcomingEventsList({
  monthData,
}: UpcomingEventsListProps) {
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
      <div className='text-sm text-muted text-center py-4'>
        No upcoming festivals this month
      </div>
    );
  }

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className='space-y-4'>
      {upcomingEvents.map((day) => {
        const mainFestival = day.festivals[0];

        return (
          <Link
            key={day.dateISO}
            href={`/events/${day.dateISO}`}
            className='group relative flex gap-4 rounded-lg bg-white border border-border p-3 transition-colors hover:bg-orange-50 shadow-sm'>
            <div className='flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-orange-50 text-center border border-border'>
              <span className='text-xs font-medium uppercase text-muted'>
                {day.month >= 1 && day.month <= 12
                  ? monthNames[day.month - 1]
                  : '---'}
              </span>
              <span className='text-xl font-bold text-fg'>{day.day}</span>
            </div>
            <div className='flex-1'>
              <h4 className='font-bold text-fg group-hover:text-orange-600 transition-colors'>
                {mainFestival.name}
              </h4>
              <p className='text-sm text-muted line-clamp-2 mt-1'>
                {day.tithi.name} • {day.nakshatra.name}
              </p>
              {day.sunrise && day.sunset && (
                <div className='mt-2 flex items-center text-xs text-orange-600 font-medium'>
                  Sunrise {day.sunrise} • Sunset {day.sunset}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
