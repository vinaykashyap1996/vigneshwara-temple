'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    {
      number: 1,
      icon: 'search',
      title: t('sevas.howItWorks.step1.title'),
      description: t('sevas.howItWorks.step1.description'),
    },
    {
      number: 2,
      icon: 'calendar_month',
      title: t('sevas.howItWorks.step2.title'),
      description: t('sevas.howItWorks.step2.description'),
    },
    {
      number: 3,
      icon: 'check_circle',
      title: t('sevas.howItWorks.step3.title'),
      description: t('sevas.howItWorks.step3.description'),
    },
  ];

  return (
    <section className='py-16 bg-gradient-to-b from-orange-50/50 to-white rounded-2xl mb-12'>
      <div className='container-page'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-black text-fg mb-3'>
            {t('sevas.howItWorks.title')}
          </h2>
          <p className='text-muted text-lg'>
            {t('sevas.howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {steps.map((step, idx) => (
            <div key={step.number} className='relative'>
              {/* Connector Line (hidden on mobile) */}
              {idx < steps.length - 1 && (
                <div className='hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-orange-200 z-0' />
              )}

              <div className='relative bg-white border-2 border-orange-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                {/* Number Badge */}
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-black text-xl rounded-full mb-4 shadow-lg'>
                  {step.number}
                </div>

                {/* Icon */}
                <div className='mb-4'>
                  <span className='material-symbols-outlined text-5xl text-orange-500'>
                    {step.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className='text-xl font-bold text-fg mb-2'>
                  {step.title}
                </h3>
                <p className='text-muted text-sm leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className='max-w-3xl mx-auto'>
          <div className='bg-orange-100 border-l-4 border-orange-500 rounded-lg p-6'>
            <h4 className='font-bold text-orange-900 mb-3 flex items-center gap-2'>
              <span className='material-symbols-outlined'>info</span>
              {t('sevas.howItWorks.guidelines.title')}
            </h4>
            <ul className='space-y-2 text-sm text-orange-900/80'>
              <li className='flex items-start gap-2'>
                <span className='material-symbols-outlined text-base mt-0.5'>
                  schedule
                </span>
                <span>{t('sevas.howItWorks.guidelines.arrival')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='material-symbols-outlined text-base mt-0.5'>
                  checkroom
                </span>
                <span>{t('sevas.howItWorks.guidelines.attire')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='material-symbols-outlined text-base mt-0.5'>
                  restaurant
                </span>
                <span>{t('sevas.howItWorks.guidelines.prasadam')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='material-symbols-outlined text-base mt-0.5'>
                  no_photography
                </span>
                <span>{t('sevas.howItWorks.guidelines.photography')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
