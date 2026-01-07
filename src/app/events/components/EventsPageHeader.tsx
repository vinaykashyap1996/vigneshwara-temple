'use client';

import { useTranslation } from 'react-i18next';

interface EventsPageHeaderProps {
  calendarLink: string;
}

export default function EventsPageHeader({
  calendarLink,
}: EventsPageHeaderProps) {
  const { t } = useTranslation('events');

  return (
    <div className='mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end'>
      <div className='max-w-2xl'>
        <h2 className='text-4xl font-black leading-tight tracking-tight text-fg sm:text-5xl'>
          {t('pageTitle')}
        </h2>
        <p className='mt-3 text-lg text-muted'>{t('pageDescription')}</p>
      </div>
      <div className='flex flex-wrap gap-3'>
        <a
          href={calendarLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-fg shadow-sm transition-colors hover:bg-orange-50'>
          <span className='material-symbols-outlined text-lg'>
            calendar_add_on
          </span>
          {t('addToCalendar')}
        </a>
        <a
          href='#newsletter'
          className='flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-fg shadow-sm transition-colors hover:bg-orange-50'>
          <span className='material-symbols-outlined text-lg'>mail</span>
          {t('subscribeToUpdates')}
        </a>
      </div>
    </div>
  );
}
