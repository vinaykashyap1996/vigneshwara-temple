import Link from 'next/link';
import { DayPanchang } from '@/lib/panchang/types';

interface CalendarDayCellProps {
  dayData: DayPanchang;
}

export default function CalendarDayCell({ dayData }: CalendarDayCellProps) {
  if (!dayData.isCurrentMonth) {
    return (
      <div className='h-24 sm:h-32 rounded-lg border border-transparent bg-transparent p-2'></div>
    );
  }

  const hasFestivals = dayData.festivals.length > 0;
  const hasMajorFestival = dayData.festivals.some(
    (f) => f.importance === 'major'
  );

  return (
    <Link
      href={`/events/${dayData.dateISO}`}
      className={`group relative flex h-24 sm:h-32 flex-col rounded-lg border p-2 transition-all cursor-pointer ${
        hasMajorFestival
          ? 'border-red-500/40 bg-red-50 hover:bg-red-100 shadow-sm'
          : 'border-border bg-orange-50/30 hover:bg-orange-50 hover:border-orange-500/50'
      }`}>
      <span
        className={`text-sm font-medium group-hover:text-fg ${
          hasMajorFestival
            ? 'flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm'
            : 'text-muted'
        }`}>
        {dayData.day}
      </span>

      {hasFestivals && (
        <div className='mt-1 flex-1 space-y-1 overflow-hidden'>
          {dayData.festivals.slice(0, 2).map((festival, index) => (
            <div
              key={`${festival.name}-${index}`}
              className={`rounded px-1.5 py-0.5 text-xs font-medium truncate ${
                festival.importance === 'major'
                  ? 'bg-red-500 text-white'
                  : festival.kind === 'special'
                  ? 'bg-orange-500/20 border-l-2 border-orange-500 text-orange-700'
                  : 'bg-white border border-border text-muted'
              }`}>
              {festival.name}
            </div>
          ))}
        </div>
      )}

      {!hasFestivals && (
        <div className='mt-1 flex-1 overflow-hidden'>
          <div className='text-[10px] text-muted/70 truncate'>
            {dayData.tithi.name}
          </div>
        </div>
      )}
    </Link>
  );
}
