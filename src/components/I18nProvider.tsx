'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize i18n on mount
    if (typeof window !== 'undefined') {
      require('../i18next');
    }
  }, []);

  return (
    <>
      <div className='fixed top-4 right-4 z-50'>
        <LanguageSwitcher />
      </div>
      {children}
    </>
  );
}
