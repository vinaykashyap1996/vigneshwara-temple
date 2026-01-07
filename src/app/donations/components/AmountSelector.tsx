'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

interface AmountSelectorProps {
  presetAmounts: number[];
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
}

export default function AmountSelector({
  presetAmounts,
  selectedAmount,
  onAmountChange,
}: AmountSelectorProps) {
  const { t } = useTranslation();
  const [customAmount, setCustomAmount] = useState('');

  const handlePresetClick = (amount: number) => {
    onAmountChange(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value) || 0;
    if (numValue > 0) {
      onAmountChange(numValue);
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center gap-3 mb-2'>
        <span className='flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm'>
          2
        </span>
        <h2 className='text-fg text-xl font-bold'>{t('donations.amount.title')}</h2>
      </div>

      <div className='bg-orange-50 rounded-xl p-6 border border-border'>
        {/* Preset Amount Buttons */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6'>
          {presetAmounts.map((amount) => {
            const isSelected =
              selectedAmount === amount && customAmount === '';
            return (
              <button
                key={amount}
                onClick={() => handlePresetClick(amount)}
                className={`py-2 px-4 rounded-lg border transition-all font-medium ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500 text-white font-bold shadow-lg ring-2 ring-orange-500/30'
                    : 'border-border text-fg hover:border-orange-500 hover:text-orange-500 bg-white'
                }`}
                aria-pressed={isSelected}
                aria-label={`Select amount ${formatAmount(amount)} rupees`}>
                ₹ {formatAmount(amount)}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className='relative'>
          <label
            htmlFor='custom-amount'
            className='text-muted text-xs uppercase font-bold tracking-wider mb-2 block'>
            {t('donations.amount.custom')}
          </label>
          <div className='relative flex items-center'>
            <span className='absolute left-4 text-muted text-lg font-medium'>
              ₹
            </span>
            <input
              id='custom-amount'
              className='w-full bg-white border border-border rounded-lg py-3 pl-10 pr-4 text-fg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-muted/50'
              placeholder={t('donations.amount.placeholder')}
              type='number'
              min='1'
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              aria-label='Enter custom donation amount'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
