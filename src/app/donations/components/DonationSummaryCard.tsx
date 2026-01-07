'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { DonationCause } from '../types';

interface DonationSummaryCardProps {
  cause: DonationCause;
  customCauseText?: string;
  amount: number;
  showTaxBenefit: boolean;
}

export default function DonationSummaryCard({
  cause,
  customCauseText,
  amount,
  showTaxBenefit,
}: DonationSummaryCardProps) {
  const { t } = useTranslation();
  const formatAmount = (amt: number) => {
    return amt.toLocaleString('en-IN');
  };

  const getCauseDisplay = () => {
    if (cause === 'custom' && customCauseText) {
      return customCauseText;
    }
    return t(`donations.causes.${cause}`);
  };

  return (
    <div className='bg-orange-50 rounded-xl border border-orange-200 overflow-hidden shadow-xl'>
      {/* Header */}
      <div className='bg-orange-500/20 p-4 border-b border-orange-200 flex items-center gap-3'>
        <span className='material-symbols-outlined text-orange-600'>
          receipt_long
        </span>
        <h3 className='text-fg font-bold text-lg'>{t('donations.summary.title')}</h3>
      </div>

      {/* Body */}
      <div className='p-6 flex flex-col gap-4'>
        {/* Cause */}
        <div className='flex justify-between items-start border-b border-border pb-4'>
          <div className='flex flex-col'>
            <span className='text-muted text-sm'>{t('donations.summary.cause')}</span>
            <span className='text-fg font-medium'>{getCauseDisplay()}</span>
          </div>
          {showTaxBenefit && (
            <div className='text-right'>
              <span className='text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded'>
                {t('donations.summary.taxBenefits')}
              </span>
            </div>
          )}
        </div>

        {/* Subtotal */}
        <div className='flex justify-between items-center'>
          <span className='text-muted text-sm'>{t('donations.summary.subtotal')}</span>
          <span className='text-fg font-medium'>₹ {formatAmount(amount)}</span>
        </div>

        {/* Processing Fee */}
        <div className='flex justify-between items-center'>
          <span className='text-muted text-sm'>{t('donations.summary.processingFee')}</span>
          <span className='text-green-600 font-medium text-sm'>{t('donations.summary.free')}</span>
        </div>

        {/* Total */}
        <div className='pt-4 border-t border-border flex justify-between items-center mt-2'>
          <span className='text-fg font-bold text-lg'>{t('donations.summary.total')}</span>
          <span className='text-orange-600 font-black text-2xl'>
            ₹ {formatAmount(amount)}
          </span>
        </div>
      </div>
    </div>
  );
}
