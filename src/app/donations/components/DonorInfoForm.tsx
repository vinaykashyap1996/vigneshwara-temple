'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { DonorInfo } from '../types';

interface DonorInfoFormProps {
  donorInfo: Partial<DonorInfo>;
  onInfoChange: (info: Partial<DonorInfo>) => void;
}

export default function DonorInfoForm({
  donorInfo,
  onInfoChange,
}: DonorInfoFormProps) {
  const { t } = useTranslation('donations');
  const handleChange = (field: keyof DonorInfo, value: string | boolean) => {
    onInfoChange({ ...donorInfo, [field]: value });
  };

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center gap-3 mb-2'>
        <span className='flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm'>
          3
        </span>
        <h2 className='text-fg text-xl font-bold'>
          {t('donations.donorInfo.title')}
        </h2>
      </div>

      <div className='bg-orange-50 rounded-xl p-6 border border-border grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Full Name */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='fullName'
            className='text-muted text-xs font-bold uppercase tracking-wider'>
            {t('donations.donorInfo.fullName')}
          </label>
          <input
            id='fullName'
            className='bg-white border border-border rounded-lg p-3 text-fg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all'
            placeholder={t('donations.donorInfo.fullNamePlaceholder')}
            type='text'
            value={donorInfo.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            required
            aria-required='true'
          />
        </div>

        {/* Phone Number */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='phone'
            className='text-muted text-xs font-bold uppercase tracking-wider'>
            {t('donations.donorInfo.phone')}
          </label>
          <input
            id='phone'
            className='bg-white border border-border rounded-lg p-3 text-fg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all'
            placeholder={t('donations.donorInfo.phonePlaceholder')}
            type='tel'
            value={donorInfo.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            aria-required='true'
          />
        </div>

        {/* Email Address */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <label
            htmlFor='email'
            className='text-muted text-xs font-bold uppercase tracking-wider'>
            {t('donations.donorInfo.email')}
          </label>
          <input
            id='email'
            className='bg-white border border-border rounded-lg p-3 text-fg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all'
            placeholder={t('donations.donorInfo.emailPlaceholder')}
            type='email'
            value={donorInfo.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-label='Email address (optional)'
          />
        </div>

        {/* Message / Prayer */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <label
            htmlFor='message'
            className='text-muted text-xs font-bold uppercase tracking-wider'>
            {t('donations.donorInfo.message')}
          </label>
          <textarea
            id='message'
            className='bg-white border border-border rounded-lg p-3 text-fg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none'
            placeholder={t('donations.donorInfo.messagePlaceholder')}
            rows={2}
            value={donorInfo.message || ''}
            onChange={(e) => handleChange('message', e.target.value)}
            aria-label='Optional message or prayer'
          />
        </div>

        {/* Tax Benefit Checkbox */}
        <div className='flex items-start gap-3 md:col-span-2 mt-2'>
          <input
            id='tax-benefit'
            className='mt-1 bg-white border-border text-orange-500 rounded focus:ring-orange-500'
            type='checkbox'
            checked={donorInfo.wantsTaxReceipt || false}
            onChange={(e) => handleChange('wantsTaxReceipt', e.target.checked)}
            aria-describedby='tax-benefit-note'
          />
          <label
            htmlFor='tax-benefit'
            className='text-sm text-muted leading-tight'>
            {t('donations.donorInfo.taxReceipt')}
            <br />
            <span id='tax-benefit-note' className='text-xs text-muted/70'>
              {t('donations.donorInfo.taxReceiptNote')}
            </span>
          </label>
        </div>
      </div>
    </section>
  );
}
