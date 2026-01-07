'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';
import Link from 'next/link';
import { sevas } from '../data';

export default function FeaturedSevas() {
  const { t } = useTranslation();
  const featuredSevas = sevas.filter((seva) => seva.featured);

  if (featuredSevas.length === 0) return null;

  const formatAmount = (amount: number) => amount.toLocaleString('en-IN');

  return (
    <section className='mb-12'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl md:text-4xl font-black text-fg mb-3'>
          {t('sevas.featuredTitle')}
        </h2>
        <p className='text-muted text-lg'>
          {t('sevas.featuredSubtitle')}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {featuredSevas.map((seva) => (
          <div
            key={seva.id}
            className='bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
            {/* Featured Badge */}
            <div className='bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 px-4'>
              <div className='flex items-center justify-center gap-2'>
                <span className='material-symbols-outlined text-lg'>star</span>
                <span className='font-bold text-sm uppercase tracking-wider'>
                  Featured Seva
                </span>
              </div>
            </div>

            <div className='p-6'>
              <h3 className='text-2xl font-black text-fg mb-3'>{seva.name}</h3>
              <p className='text-muted leading-relaxed mb-4'>
                {seva.shortDescription}
              </p>

              {/* Benefits Preview */}
              <div className='mb-6'>
                <h4 className='text-sm font-bold text-orange-900 mb-2 uppercase tracking-wider'>
                  Key Benefits:
                </h4>
                <ul className='space-y-1'>
                  {seva.benefits.slice(0, 3).map((benefit, idx) => (
                    <li
                      key={idx}
                      className='flex items-start gap-2 text-sm text-muted'>
                      <span className='material-symbols-outlined text-orange-500 text-base mt-0.5'>
                        check_circle
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Donation */}
              <div className='mb-6 p-4 bg-white rounded-lg border border-orange-200'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-xs text-muted uppercase'>
                    Starting from
                  </span>
                  <span className='text-3xl font-black text-orange-600'>
                    ₹{formatAmount(seva.suggestedDonation.min)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/sevas/${seva.slug}`}
                className='flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-500/20 group'>
                <span>{t('sevas.bookButton')}</span>
                <span className='material-symbols-outlined group-hover:translate-x-1 transition-transform'>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
