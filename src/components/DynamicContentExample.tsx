'use client';

import { useTranslation } from 'react-i18next';
import '../i18next';

interface DynamicContentExampleProps {
  userName?: string;
  devoteeCount?: number;
  eventName?: string;
  eventDate?: Date;
  donationAmount?: number;
}

export default function DynamicContentExample({
  userName = 'Devotee',
  devoteeCount = 150,
  eventName = 'Ganesh Chaturthi',
  eventDate = new Date('2025-09-05'),
  donationAmount = 50000,
}: DynamicContentExampleProps) {
  const { t, i18n } = useTranslation();

  // Format date according to current language
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Format currency according to locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className='bg-orange-50 p-8 rounded-lg space-y-4'>
      <h3 className='text-2xl font-bold text-orange-900 mb-4'>
        Dynamic Content Examples
      </h3>

      {/* Example 1: Simple interpolation with name */}
      <div className='bg-white p-4 rounded shadow-sm'>
        <p className='text-gray-800'>
          {t('dynamic.greeting', { name: userName })}
        </p>
      </div>

      {/* Example 2: Interpolation with formatted date */}
      <div className='bg-white p-4 rounded shadow-sm'>
        <p className='text-gray-800'>
          {t('dynamic.upcomingEvent', {
            eventName,
            date: formatDate(eventDate),
          })}
        </p>
      </div>

      {/* Example 3: Pluralization (count) */}
      <div className='bg-white p-4 rounded shadow-sm'>
        <p className='text-gray-800'>
          {t('dynamic.devoteeCount', { count: devoteeCount })}
        </p>
      </div>

      {/* Example 4: Currency formatting */}
      <div className='bg-white p-4 rounded shadow-sm'>
        <p className='text-gray-800'>
          {t('dynamic.donationAmount', {
            amount: formatCurrency(donationAmount),
          })}
        </p>
      </div>

      {/* Example 5: Current date/time */}
      <div className='bg-white p-4 rounded shadow-sm'>
        <p className='text-gray-800'>
          {t('dynamic.lastUpdated', {
            date: formatDate(new Date()),
          })}
        </p>
      </div>

      <div className='mt-6 p-4 bg-blue-50 rounded'>
        <p className='text-sm text-gray-600'>
          <strong>How it works:</strong>
        </p>
        <ul className='text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside'>
          <li>
            Use <code className='bg-gray-200 px-1'>{'{{variable}}'}</code> in
            translation strings
          </li>
          <li>
            Pass values via{' '}
            <code className='bg-gray-200 px-1'>
              t('key', {'{ variable: value }'})
            </code>
          </li>
          <li>Use Intl API for dates, numbers, and currency</li>
          <li>Supports pluralization with _plural suffix</li>
        </ul>
      </div>
    </div>
  );
}
