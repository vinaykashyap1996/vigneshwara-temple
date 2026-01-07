'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import SankalpaSection from '@/components/SankalpaSection';
import '../i18next';
import ActionCard from './ActionCard';
import Image from 'next/image';

export default function HomePageClient() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className='relative text-center section'>
        {/* Background layer (70%) */}
        <div className='absolute inset-x-0 top-0 h-[70%] bg-orange-600' />

        {/* Content */}
        <div className='container-page'>
          <div className='relative flex flex-col items-center justify-center'>
            <h1 className='h1 py-10 text-ivory'>{t('welcome')}</h1>

            {/* Image wrapper becomes positioning context */}
            <div className='relative w-full max-w-4xl aspect-[4/3]'>
              <Image
                src='/vigneshwara.png'
                alt='Vigneshwara Temple'
                className='rounded-xl object-cover'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className='section'>
        <div className='container-page'>
          <div className='h3'>
            <p className='mb-4'>Quick Actions</p>
            <div className='flex gap-6 flex-wrap items-center justify-center'>
              <ActionCard
                key='temple'
                icon='temple_hindu'
                title='Explore Temples'
                description='Discover sacred spaces and divine architecture.'
              />
              <ActionCard
                key='puja'
                icon='spa'
                title='Book Puja'
                description='Schedule religious ceremonies and offerings.'
              />
              <ActionCard
                key='donate'
                icon='volunteer_activism'
                title='Donate'
                description='Support temple activities and community services.'
              />
              <ActionCard
                key='events'
                icon='event'
                title='Upcoming Events'
                description='View festivals, celebrations, and special occasions.'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Daily Sankalpa Section */}
      {/* <SankalpaSection /> */}

      {/* Temple Timings */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            {t("timings.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-orange-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                {t("timings.morning")}
              </h3>
              <p className="text-gray-700 text-lg">
                {t("timings.morningTime")}
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                {t("timings.evening")}
              </h3>
              <p className="text-gray-700 text-lg">
                {t("timings.eveningTime")}
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Upcoming Events */}
      {/* <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            {t("festivals.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-orange-600 text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("festivals.ganeshChaturthi")}
              </h3>
              <p className="text-gray-600">
                {t("festivals.ganeshChaturthiDesc")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-orange-600 text-4xl mb-4">🪔</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("festivals.diwali")}
              </h3>
              <p className="text-gray-600">{t("festivals.diwaliDesc")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-orange-600 text-4xl mb-4">📿</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("festivals.abhishekam")}
              </h3>
              <p className="text-gray-600">{t("festivals.abhishekamDesc")}</p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
