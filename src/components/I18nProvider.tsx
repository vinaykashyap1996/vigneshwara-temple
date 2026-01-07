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
    // Initialize i18n once at app startup
    if (typeof window !== 'undefined') {
      import('../i18next').catch((error) => {
        console.error('Failed to initialize i18n:', error);
      });
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
