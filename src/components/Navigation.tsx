'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import '../i18next';

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className='bg-orange-600 text-white shadow-lg'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold'>
            🕉️ {t('temple')}
          </Link>
          <div className='hidden md:flex space-x-6 items-center'>
            <Link href='/' className='hover:text-orange-200 transition'>
              {t('nav.home')}
            </Link>
            <Link href='/about' className='hover:text-orange-200 transition'>
              {t('nav.about')}
            </Link>
            <Link href='/events' className='hover:text-orange-200 transition'>
              {t('nav.events')}
            </Link>
            <Link href='/sankalpa' className='hover:text-orange-200 transition'>
              {t('nav.sankalpa')}
            </Link>
            <Link href='/gallery' className='hover:text-orange-200 transition'>
              {t('nav.gallery')}
            </Link>
            <Link
              href='/donations'
              className='hover:text-orange-200 transition'>
              {t('nav.donations')}
            </Link>
            <Link href='/contact' className='hover:text-orange-200 transition'>
              {t('nav.contact')}
            </Link>
            <div className='ml-4'>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
