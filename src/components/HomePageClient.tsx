'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import SankalpaSection from '@/components/SankalpaSection';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import '../i18next';

export default function HomePageClient() {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen'>
      {/* Navigation */}
      <nav className='bg-primary text-white'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>🕉️ {t('temple')}</h1>
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
              <Link
                href='/sankalpa'
                className='hover:text-orange-200 transition'>
                {t('nav.sankalpa')}
              </Link>
              <Link
                href='/gallery'
                className='hover:text-orange-200 transition'>
                {t('nav.gallery')}
              </Link>
              <Link
                href='/donations'
                className='hover:text-orange-200 transition'>
                {t('nav.donations')}
              </Link>
              <Link
                href='/contact'
                className='hover:text-orange-200 transition'>
                {t('nav.contact')}
              </Link>
              <div className='ml-4'>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='bg-primary h-[600px] flex items-center justify-center text-center'>
        <div className='relative z-10 px-4'>
          <div className='header1 secondary-color'>{t('welcome')}</div>
          <div className='header4 default'>{t('description')}</div>
          <div className='flex gap-4 justify-center'>
            <Link
              href='/events'
              className='bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition'>
              {t('nav.events')}
            </Link>
            <Link
              href='/donations'
              className='bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition'>
              {t('nav.donations')}
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Sankalpa Section */}
      <SankalpaSection />

      {/* Temple Timings */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center text-orange-900 mb-12'>
            {t('timings.title')}
          </h2>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <div className='bg-orange-50 p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold text-orange-800 mb-4'>
                {t('timings.morning')}
              </h3>
              <p className='text-gray-700 text-lg'>
                {t('timings.morningTime')}
              </p>
            </div>
            <div className='bg-orange-50 p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold text-orange-800 mb-4'>
                {t('timings.evening')}
              </h3>
              <p className='text-gray-700 text-lg'>
                {t('timings.eveningTime')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className='py-16 bg-gradient-to-b from-white to-orange-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center text-orange-900 mb-12'>
            {t('festivals.title')}
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition'>
              <div className='text-orange-600 text-4xl mb-4'>🎉</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                {t('festivals.ganeshChaturthi')}
              </h3>
              <p className='text-gray-600'>
                {t('festivals.ganeshChaturthiDesc')}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition'>
              <div className='text-orange-600 text-4xl mb-4'>🪔</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                {t('festivals.diwali')}
              </h3>
              <p className='text-gray-600'>{t('festivals.diwaliDesc')}</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition'>
              <div className='text-orange-600 text-4xl mb-4'>📿</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                {t('festivals.abhishekam')}
              </h3>
              <p className='text-gray-600'>{t('festivals.abhishekamDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-orange-900 text-white py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-xl font-bold mb-4'>{t('temple')}</h3>
              <p className='text-orange-200'>{t('footer.tagline')}</p>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>
                {t('footer.quickLinks')}
              </h3>
              <ul className='space-y-2 text-orange-200'>
                <li>
                  <Link href='/about' className='hover:text-white transition'>
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link href='/events' className='hover:text-white transition'>
                    {t('nav.events')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/donations'
                    className='hover:text-white transition'>
                    {t('nav.donations')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-4'>{t('nav.contact')}</h3>
              <p className='text-orange-200'>
                {t('footer.email')}: info@ganeshatempel.org
              </p>
              <p className='text-orange-200'>
                {t('footer.phone')}: +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-orange-800 text-center text-orange-200'>
            <p>
              &copy; 2025 {t('temple')}. {t('footer.rights')}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
