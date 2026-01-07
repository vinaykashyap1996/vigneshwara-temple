'use client';

import { DayPanchangResponse } from '@/lib/panchang/types';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface TodayPanchangCardProps {
  data: DayPanchangResponse;
  showShareButton?: boolean;
}

export default function TodayPanchangCard({
  data,
  showShareButton = false,
}: TodayPanchangCardProps) {
  const { t, i18n } = useTranslation('events');

  const formatDate = (dateISO: string) => {
    const dateObj = new Date(dateISO);
    const locale = i18n.language === 'kn' ? 'kn-IN' : 'en-IN';

    const formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
      timeZone: 'Asia/Kolkata',
    });

    const parts = formatter.formatToParts(dateObj);
    const day = parts.find((p) => p.type === 'day')?.value || '';
    const month = parts.find((p) => p.type === 'month')?.value || '';
    const year = parts.find((p) => p.type === 'year')?.value || '';
    const weekday = parts.find((p) => p.type === 'weekday')?.value || '';

    return {
      day: parseInt(day),
      monthName: month,
      year: parseInt(year),
      weekday,
    };
  };

  const dateInfo = formatDate(data.dateISO);

  return (
    <div className='rounded-xl border border-border bg-white p-6 shadow-sm'>
      {/* Header */}
      <h3 className='mb-5 flex items-center gap-2 text-xl font-bold text-fg'>
        <span className='material-symbols-outlined text-orange-600'>
          wb_sunny
        </span>
        {t('todaysPanchang.title')}
      </h3>

      {/* Date */}
      <div className='mb-4 border-b border-border pb-4'>
        <div className='text-3xl font-bold text-orange-600'>{dateInfo.day}</div>
        <div className='mt-1 text-xs uppercase tracking-wider text-muted'>
          {dateInfo.monthName} {dateInfo.year}
        </div>
        <div className='mt-1 text-sm font-medium text-fg'>
          {dateInfo.weekday}
        </div>
      </div>

      {/* Panchang Details Grid */}
      <div className='mb-6 space-y-4'>
        {/* Tithi & Paksha */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='mb-1 text-xs font-medium uppercase tracking-wider text-muted'>
              {t('todaysPanchang.paksha')} / {t('todaysPanchang.tithi')}
            </div>
            <div className='font-semibold text-orange-600'>
              {data.tithi.paksha || 'Shukla'} Paksha
            </div>
            <div className='mt-0.5 text-sm text-fg'>
              {data.tithi.name}
              {(data.tithi.start || data.tithi.end) && (
                <span className='ml-1 text-xs text-muted'>
                  {data.tithi.start && data.tithi.end
                    ? `(${data.tithi.start} ${t('todaysPanchang.to')} ${
                        data.tithi.end
                      })`
                    : data.tithi.end
                    ? `(${t('todaysPanchang.till')} ${data.tithi.end})`
                    : `(${t('todaysPanchang.from')} ${data.tithi.start})`}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className='mb-1 text-xs font-medium uppercase tracking-wider text-muted'>
              {t('todaysPanchang.nakshatra')}
            </div>
            <div className='font-semibold text-fg'>{data.nakshatra.name}</div>
            {(data.nakshatra.start || data.nakshatra.end) && (
              <div className='mt-0.5 text-xs text-muted'>
                {data.nakshatra.start && data.nakshatra.end
                  ? `${data.nakshatra.start} ${t('todaysPanchang.to')} ${
                      data.nakshatra.end
                    }`
                  : data.nakshatra.end
                  ? `${t('todaysPanchang.till')} ${data.nakshatra.end}`
                  : `${t('todaysPanchang.from')} ${data.nakshatra.start}`}
              </div>
            )}
          </div>
        </div>

        {/* Yoga & Karana */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='mb-1 text-xs font-medium uppercase tracking-wider text-muted'>
              {t('todaysPanchang.yoga')}
            </div>
            <div className='font-semibold text-fg'>{data.yoga.name}</div>
            {(data.yoga.start || data.yoga.end) && (
              <div className='mt-0.5 text-xs text-muted'>
                {data.yoga.start && data.yoga.end
                  ? `${data.yoga.start} ${t('todaysPanchang.to')} ${
                      data.yoga.end
                    }`
                  : data.yoga.end
                  ? `${t('todaysPanchang.till')} ${data.yoga.end}`
                  : `${t('todaysPanchang.from')} ${data.yoga.start}`}
              </div>
            )}
          </div>

          <div>
            <div className='mb-1 text-xs font-medium uppercase tracking-wider text-muted'>
              {t('todaysPanchang.karana')}
            </div>
            <div className='font-semibold text-fg'>{data.karana.name}</div>
            {(data.karana.start || data.karana.end) && (
              <div className='mt-0.5 text-xs text-muted'>
                {data.karana.start && data.karana.end
                  ? `${data.karana.start} ${t('todaysPanchang.to')} ${
                      data.karana.end
                    }`
                  : data.karana.end
                  ? `${t('todaysPanchang.till')} ${data.karana.end}`
                  : `${t('todaysPanchang.from')} ${data.karana.start}`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auspicious & Inauspicious Times */}
      {(data.rahu ||
        data.yamaghanda ||
        data.abhijit ||
        data.gulika ||
        data.durmuhurta ||
        data.amritakala ||
        data.varjyam) && (
        <div className='mb-6 space-y-3 border-t border-border pt-4'>
          <h4 className='text-sm font-semibold text-fg mb-2'>
            {t('todaysPanchang.auspiciousTimes')}
          </h4>

          {/* Auspicious Times */}
          <div className='space-y-2'>
            {data.abhijit && (
              <div className='flex items-center justify-between text-sm bg-green-50 p-2 rounded-md border border-green-200'>
                <span className='flex items-center gap-1.5 text-green-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-green-600'></span>
                  {t('todaysPanchang.abhijitMuhurat')}
                </span>
                <span className='font-medium text-green-900'>
                  {data.abhijit}
                </span>
              </div>
            )}
            {data.amritakala && (
              <div className='flex items-center justify-between text-sm bg-green-50 p-2 rounded-md border border-green-200'>
                <span className='flex items-center gap-1.5 text-green-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-green-600'></span>
                  {t('todaysPanchang.amritKaal')}
                </span>
                <span className='font-medium text-green-900'>
                  {data.amritakala}
                </span>
              </div>
            )}
          </div>

          {/* Inauspicious Times */}
          <div className='space-y-2 pt-2'>
            <h5 className='text-xs font-medium text-muted uppercase tracking-wider'>
              {t('todaysPanchang.inauspiciousTimes')}
            </h5>
            {data.rahu && (
              <div className='flex items-center justify-between text-sm bg-red-50 p-2 rounded-md border border-red-200'>
                <span className='flex items-center gap-1.5 text-red-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-red-600'></span>
                  {t('todaysPanchang.rahuKalam')}
                </span>
                <span className='font-medium text-red-900'>{data.rahu}</span>
              </div>
            )}
            {data.yamaghanda && (
              <div className='flex items-center justify-between text-sm bg-red-50 p-2 rounded-md border border-red-200'>
                <span className='flex items-center gap-1.5 text-red-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-red-600'></span>
                  {t('todaysPanchang.yamaghanda')}
                </span>
                <span className='font-medium text-red-900'>
                  {data.yamaghanda}
                </span>
              </div>
            )}
            {data.gulika && (
              <div className='flex items-center justify-between text-sm bg-red-50 p-2 rounded-md border border-red-200'>
                <span className='flex items-center gap-1.5 text-red-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-red-600'></span>
                  {t('todaysPanchang.gulika')}
                </span>
                <span className='font-medium text-red-900'>{data.gulika}</span>
              </div>
            )}
            {data.durmuhurta && (
              <div className='flex items-center justify-between text-sm bg-red-50 p-2 rounded-md border border-red-200'>
                <span className='flex items-center gap-1.5 text-red-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-red-600'></span>
                  {t('todaysPanchang.durMuhurat')}
                </span>
                <span className='font-medium text-red-900'>
                  {data.durmuhurta}
                </span>
              </div>
            )}
            {data.varjyam && (
              <div className='flex items-center justify-between text-sm bg-red-50 p-2 rounded-md border border-red-200'>
                <span className='flex items-center gap-1.5 text-red-700 font-medium'>
                  <span className='h-2 w-2 rounded-full bg-red-600'></span>
                  {t('todaysPanchang.varjyam')}
                </span>
                <span className='font-medium text-red-900'>{data.varjyam}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sunrise & Sunset */}
      <div className='mb-6 grid grid-cols-2 gap-4'>
        <div className='rounded-lg border border-border bg-orange-50 p-3'>
          <div className='mb-1 flex items-center gap-2 text-xs font-medium text-muted'>
            <span className='material-symbols-outlined text-base text-orange-600'>
              wb_twilight
            </span>
            {t('todaysPanchang.sunrise')}
          </div>
          <div className='text-lg font-bold text-orange-600'>
            {data.sunrise}
          </div>
        </div>

        <div className='rounded-lg border border-border bg-indigo-50 p-3'>
          <div className='mb-1 flex items-center gap-2 text-xs font-medium text-muted'>
            <span className='material-symbols-outlined text-base text-indigo-600'>
              nights_stay
            </span>
            {t('todaysPanchang.sunset')}
          </div>
          <div className='text-lg font-bold text-indigo-600'>{data.sunset}</div>
        </div>
      </div>

      {/* Today's Special */}
      {data.festivals && data.festivals.length > 0 && (
        <div className='mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4'>
          <h4 className='mb-2 text-xs font-medium uppercase tracking-wider text-muted'>
            {t('todaysPanchang.todaysSpecial')}
          </h4>
          <div className='space-y-2'>
            {data.festivals.map((festival, idx) => (
              <div key={idx}>
                <div className='font-medium text-fg'>
                  {festival.importance === 'major' && '⭐ '}
                  {festival.name}
                </div>
                {!festival.allDay && (festival.start || festival.end) && (
                  <div className='mt-0.5 text-xs text-muted'>
                    {festival.start && festival.end
                      ? `${festival.start} ${t('todaysPanchang.to')} ${
                          festival.end
                        }`
                      : festival.end
                      ? `${t('todaysPanchang.till')} ${festival.end}`
                      : `${t('todaysPanchang.from')} ${festival.start}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className='flex gap-3'>
        <Link
          href={`/events/${data.dateISO}`}
          className='flex-1 rounded-lg bg-orange-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-orange-700'>
          {t('todaysPanchang.viewFullDetails')}
        </Link>
        {showShareButton && (
          <button className='rounded-lg border border-border bg-white p-2.5 transition-colors hover:bg-orange-50'>
            <span className='material-symbols-outlined text-fg'>share</span>
          </button>
        )}
      </div>
    </div>
  );
}
