'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function TrustBadges() {
  const { t } = useTranslation('donations');

  const badges = [
    {
      icon: 'verified_user',
      titleKey: 'donations.trust.secure.title',
      subtitleKey: 'donations.trust.secure.subtitle',
    },
    {
      icon: 'account_balance',
      titleKey: 'donations.trust.official.title',
      subtitleKey: 'donations.trust.official.subtitle',
    },
    {
      icon: 'receipt',
      titleKey: 'donations.trust.tax.title',
      subtitleKey: 'donations.trust.tax.subtitle',
    },
  ];

  return (
    <div className='w-full border-t border-border bg-orange-50/50 mt-20 py-12'>
      <div className='layout-content-container max-w-[960px] mx-auto px-4 md:px-10 lg:px-40'>
        <div className='flex flex-wrap justify-center gap-8 md:gap-16'>
          {badges.map((badge) => (
            <div key={badge.icon} className='flex items-center gap-3'>
              <span className='material-symbols-outlined text-4xl text-muted'>
                {badge.icon}
              </span>
              <div className='flex flex-col'>
                <span className='text-fg text-sm font-bold'>
                  {t(badge.titleKey)}
                </span>
                <span className='text-muted text-xs'>
                  {t(badge.subtitleKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
