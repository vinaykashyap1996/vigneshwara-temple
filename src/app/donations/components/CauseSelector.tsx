'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { DonationCause, CauseOption } from '../types';

interface CauseSelectorProps {
  causes: CauseOption[];
  selectedCause: DonationCause;
  customCauseText: string;
  onCauseChange: (cause: DonationCause) => void;
  onCustomCauseTextChange: (text: string) => void;
}

export default function CauseSelector({
  causes,
  selectedCause,
  customCauseText,
  onCauseChange,
  onCustomCauseTextChange,
}: CauseSelectorProps) {
  const { t } = useTranslation('donations');

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center gap-3 mb-2'>
        <span className='flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm'>
          1
        </span>
        <h2 className='text-fg text-xl font-bold'>
          {t('donations.causes.title')}
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {causes.map((cause, index) => {
          const isSelected = selectedCause === cause.id;
          const isWide = index >= 2; // Last two cards are wider

          return (
            <div
              key={cause.id}
              className={`relative group cursor-pointer ${
                isWide ? 'sm:col-span-2' : ''
              }`}>
              <input
                className='peer sr-only'
                id={`cause-${cause.id}`}
                name='cause'
                type='radio'
                checked={isSelected}
                onChange={() => onCauseChange(cause.id)}
                aria-label={`Select ${cause.title}`}
              />
              <label
                className={`flex flex-col h-full bg-orange-50 border-2 transition-all rounded-xl p-4 cursor-pointer hover:bg-orange-100 ${
                  isWide ? 'sm:flex-row gap-4 items-start sm:items-center' : ''
                } ${
                  isSelected
                    ? 'border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'border-border'
                }`}
                htmlFor={`cause-${cause.id}`}>
                {/* Check Icon */}
                <div
                  className={`absolute top-4 right-4 text-orange-500 transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <span className='material-symbols-outlined fill-current'>
                    check_circle
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg ${cause.iconBgColor} ${
                    cause.iconColor
                  } flex items-center justify-center mb-4 ${
                    isWide ? 'mb-0 shrink-0' : ''
                  }`}>
                  <span className='material-symbols-outlined'>
                    {cause.icon}
                  </span>
                </div>

                {/* Content */}
                <div className='flex flex-col'>
                  <h3 className='text-fg font-bold text-lg mb-2'>
                    {t(cause.title)}
                  </h3>
                  <p className='text-muted text-sm'>{t(cause.description)}</p>
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Custom Cause Input - Shows when custom is selected */}
      {selectedCause === 'custom' && (
        <div className='mt-2 bg-orange-50 rounded-xl p-6 border-2 border-orange-500 shadow-lg shadow-orange-500/20'>
          <label
            htmlFor='custom-cause-text'
            className='text-muted text-xs font-bold uppercase tracking-wider mb-2 block'>
            {t('causes.customLabel')}
          </label>
          <input
            id='custom-cause-text'
            className='w-full bg-white border border-border rounded-lg p-3 text-fg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-muted/50'
            placeholder={t('causes.customPlaceholder')}
            type='text'
            value={customCauseText}
            onChange={(e) => onCustomCauseTextChange(e.target.value)}
            required
            aria-required='true'
            aria-label='Enter your custom donation purpose'
          />
          <p className='text-xs text-muted/70 mt-2'>{t('causes.customNote')}</p>
        </div>
      )}
    </section>
  );
}
