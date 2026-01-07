'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function DonationsHero() {
  const { t } = useTranslation();

  return (
    <div className='w-full bg-orange-900 border-b border-orange-800'>
      <div className='flex flex-col items-center justify-center py-16 px-4 md:px-10 lg:px-40 text-center relative overflow-hidden'>
        {/* Background Image Overlay */}
        <div
          className='absolute inset-0 z-0 opacity-20 bg-cover bg-center'
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAngQ4Tw9StGsWlUrlhpFfh0jdLVJxGbtxD9YMZ8VtqDb1fqDy52QEtdO1VrrB7KvTGjdARFoyVu7KN_8TdAKVk_iCfVKTeyl626ci2XHkImOLLjS-_ZRgQ88b79TkIJ7osVasfurJSL6wd2R10H6_1JpOHx1cL1s4QputQXlui0-Tkp2wrqamPzySkFodHz8NjFldlOxB-WKtBPlGKayCloF9Aulk2xFWR-OQAa-9tKn_ls1-B7YoHLY9aN1IT0E_qvQ353Z35AQ')",
          }}
        />
        <div className='absolute inset-0 z-0 bg-gradient-to-b from-orange-900/80 to-orange-900' />

        <div className='relative z-10 max-w-3xl'>
          <span className='inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/30'>
            {t('donations.hero.badge')}
          </span>
          <h1 className='text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4'>
            {t('donations.hero.title')}
          </h1>
          <p className='text-orange-100/80 text-lg max-w-xl mx-auto'>
            {t('donations.hero.subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
}
