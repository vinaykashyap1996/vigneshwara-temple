'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import Link from 'next/link';
import { Seva } from '../types';

interface SevaCardProps {
  seva: Seva;
}

export default function SevaCard({ seva }: SevaCardProps) {
  const { t } = useTranslation();
  const formatAmount = (amount: number) => amount.toLocaleString('en-IN');

  const getTimingIcon = (timing: string) => {
    switch (timing) {
      case 'morning':
        return 'wb_twilight';
      case 'evening':
        return 'nightlight';
      case 'full-day':
        return 'wb_sunny';
      default:
        return 'schedule';
    }
  };

  return (
    <div className='bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full'>
      {/* Header */}
      <div className='p-6 flex-grow'>
        {/* Tags */}
        <div className='flex flex-wrap gap-2 mb-3'>
          {seva.tags.map((tag) => (
            <span
              key={tag}
              className='inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded'>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className='text-xl font-bold text-fg mb-2'>{seva.name}</h3>

        {/* Description */}
        <p className='text-muted text-sm leading-relaxed mb-4'>
          {seva.shortDescription}
        </p>

        {/* Meta Info */}
        <div className='flex flex-col gap-2 mb-4'>
          {/* Duration */}
          <div className='flex items-center gap-2 text-sm text-muted'>
            <span className='material-symbols-outlined text-lg'>schedule</span>
            <span>{seva.duration}</span>
          </div>

          {/* Timing */}
          <div className='flex items-center gap-2 text-sm text-muted flex-wrap'>
            {seva.timing.map((time, idx) => (
              <div key={time} className='flex items-center gap-1'>
                <span className='material-symbols-outlined text-lg'>
                  {getTimingIcon(time)}
                </span>
                <span className='capitalize'>{time.replace('-', ' ')}</span>
                {idx < seva.timing.length - 1 && <span className='mx-1'>•</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Donation */}
        <div className='pt-4 border-t border-border'>
          <div className='flex items-baseline gap-2'>
            <span className='text-xs text-muted uppercase'>{t('sevas.card.from')}</span>
            <span className='text-2xl font-black text-orange-600'>
              ₹{formatAmount(seva.suggestedDonation.min)}
            </span>
          </div>
          <span className='text-xs text-muted'>
            {t('sevas.card.recommended')}: ₹{formatAmount(seva.suggestedDonation.recommended)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className='p-4 bg-orange-50/50 border-t border-border flex gap-2'>
        <Link
          href={`/sevas/${seva.slug}`}
          className='flex-1 text-center px-4 py-2.5 bg-white border border-border text-fg font-medium rounded-lg hover:bg-orange-50 transition-colors text-sm'>
          {t('sevas.card.viewDetails')}
        </Link>
        <Link
          href={`/sevas/${seva.slug}#book`}
          className='flex-1 text-center px-4 py-2.5 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm text-sm'>
          {t('sevas.card.bookNow')}
        </Link>
      </div>
    </div>
  );
}
