'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

interface PaymentMethodSectionProps {
  amount: number;
  onDonate: () => void;
}

export default function PaymentMethodSection({
  amount,
  onDonate,
}: PaymentMethodSectionProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upi' | 'card'>('upi');

  const formatAmount = (amt: number) => {
    return amt.toLocaleString('en-IN');
  };

  return (
    <div className='bg-orange-50 rounded-xl border border-orange-200 overflow-hidden p-6'>
      <h3 className='text-fg font-bold text-lg mb-4'>{t('donations.payment.title')}</h3>

      {/* Tabs */}
      <div className='flex p-1 bg-white rounded-lg mb-6 border border-border'>
        <button
          onClick={() => setActiveTab('upi')}
          className={`flex-1 py-2 text-sm font-bold rounded transition-all ${
            activeTab === 'upi'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-muted hover:text-fg'
          }`}
          aria-pressed={activeTab === 'upi'}
          aria-label='Select UPI payment method'>
          {t('donations.payment.upiTab')}
        </button>
        <button
          onClick={() => setActiveTab('card')}
          className={`flex-1 py-2 text-sm font-bold rounded transition-all ${
            activeTab === 'card'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-muted hover:text-fg'
          }`}
          aria-pressed={activeTab === 'card'}
          aria-label='Select card payment method'>
          {t('donations.payment.cardTab')}
        </button>
      </div>

      {/* UPI Content */}
      {activeTab === 'upi' && (
        <div className='flex flex-col items-center gap-4'>
          <div className='p-4 bg-white rounded-xl shadow-inner border-4 border-orange-500/20'>
            <Image
              alt='UPI QR Code for Payment'
              className='w-32 h-32 opacity-90'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuDqRTA5rYH3xxusdz2eWwCPbw4HjhMmRobpXhi7LULoT26IOQFlUJSOMZC4qYpv_ER3NXKRxlMTRQXPVnfrhEZSrqq6Y6F9Hx-WlzADQpRl0db7UUpk14DtLfb64afgOOxGhymzwWA8M7acSwlSVJN34g_6yAesAD3ejrtzFEQxHZdDwEwrtwQA8gPvR_MjwxES0LlWB1Weihqk8gm9K4F0AcdIB4tpnqbAWMRfdSkGcxAmNtH7OhfgUiP_RXanEw1VLk6ZYmTHyQ'
              width={128}
              height={128}
            />
          </div>
          <p className='text-sm text-muted text-center'>
            {t('donations.payment.scanUpi')}
            <br />
            {t('donations.payment.upiApps')}
          </p>

          {/* Divider */}
          <div className='w-full flex items-center gap-2 mt-2 mb-4'>
            <div className='h-px bg-border flex-1' />
            <span className='text-xs text-muted/70 uppercase'>
              {t('donations.payment.securePayment')}
            </span>
            <div className='h-px bg-border flex-1' />
          </div>

          {/* Donate Button */}
          <button
            onClick={onDonate}
            className='w-full py-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group'
            aria-label={`Donate ${formatAmount(amount)} rupees now`}>
            <span>{t('donations.payment.donateButton', { amount: formatAmount(amount) })}</span>
            <span className='material-symbols-outlined group-hover:translate-x-1 transition-transform'>
              arrow_forward
            </span>
          </button>

          {/* Security Badge */}
          <div className='flex items-center justify-center gap-4 mt-2'>
            <span className='material-symbols-outlined text-muted text-xl'>
              lock
            </span>
            <span className='text-xs text-muted/70'>
              {t('donations.payment.secureTransaction')}
            </span>
          </div>
        </div>
      )}

      {/* Card Content */}
      {activeTab === 'card' && (
        <div className='flex flex-col items-center gap-4 py-8'>
          <span className='material-symbols-outlined text-muted text-6xl'>
            credit_card
          </span>
          <p className='text-sm text-muted text-center'>
            {t('donations.payment.cardComingSoon')}
          </p>
        </div>
      )}
    </div>
  );
}
