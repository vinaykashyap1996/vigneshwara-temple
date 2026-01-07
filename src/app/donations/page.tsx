'use client';

import { useState } from 'react';
import DonationsHero from './components/DonationsHero';
import CauseSelector from './components/CauseSelector';
import AmountSelector from './components/AmountSelector';
import DonorInfoForm from './components/DonorInfoForm';
import DonationSummaryCard from './components/DonationSummaryCard';
import PaymentMethodSection from './components/PaymentMethodSection';
import TrustBadges from './components/TrustBadges';
import { causeOptions, presetAmounts } from './data';
import { DonationCause, DonorInfo } from './types';

export default function DonationsPage() {
  const [selectedCause, setSelectedCause] =
    useState<DonationCause>('maintenance');
  const [customCauseText, setCustomCauseText] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(1001);
  const [donorInfo, setDonorInfo] = useState<Partial<DonorInfo>>({
    wantsTaxReceipt: false,
  });

  const handleDonate = () => {
    // TODO: Implement payment processing
    console.log('Donate clicked', {
      cause: selectedCause,
      customCauseText: selectedCause === 'custom' ? customCauseText : undefined,
      amount: selectedAmount,
      donorInfo,
    });
    alert(
      'Payment processing would happen here. This is a demo implementation.'
    );
  };

  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden bg-ivory'>
      {/* Hero Section */}
      <DonationsHero />

      {/* Main Content */}
      <main className='relative flex flex-col items-center w-full pb-20'>
        <div className='layout-content-container flex flex-col max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            {/* Left Column: Donation Selection */}
            <div className='flex-1 lg:max-w-2xl flex flex-col gap-6'>
              {/* Step 1: Choose Cause */}
              <CauseSelector
                causes={causeOptions}
                selectedCause={selectedCause}
                customCauseText={customCauseText}
                onCauseChange={setSelectedCause}
                onCustomCauseTextChange={setCustomCauseText}
              />

              {/* Step 2: Select Amount */}
              <AmountSelector
                presetAmounts={presetAmounts}
                selectedAmount={selectedAmount}
                onAmountChange={setSelectedAmount}
              />

              {/* Step 3: Donor Details */}
              <DonorInfoForm
                donorInfo={donorInfo}
                onInfoChange={setDonorInfo}
              />
            </div>

            {/* Right Column: Summary & Payment */}
            <div className='w-full lg:w-96 flex flex-col gap-6 overflow-y-auto'>
              <div className='lg:sticky lg:top-20 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-2 flex flex-col gap-6'>
                {/* Donation Summary Card */}
                <DonationSummaryCard
                  cause={selectedCause}
                  customCauseText={customCauseText}
                  amount={selectedAmount}
                  showTaxBenefit={donorInfo.wantsTaxReceipt || false}
                />

                {/* Payment Method */}
                <PaymentMethodSection
                  amount={selectedAmount}
                  onDonate={handleDonate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <TrustBadges />
      </main>
    </div>
  );
}
