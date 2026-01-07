'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function TempleNotice() {
  const { t } = useTranslation();
  return (
    <section className='mb-12'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-orange-100/40 border-l-4 border-orange-500 rounded-lg p-6'>
          <h3 className='font-bold text-fg mb-3 flex items-center gap-2 text-lg'>
            <span className='material-symbols-outlined text-orange-500'>
              temple_hindu
            </span>
            {t('sevas.notice.title')}
          </h3>
          <div className='space-y-3 text-sm text-muted leading-relaxed'>
            <p>{t('sevas.notice.content1')}</p>
            <p>{t('sevas.notice.content2')}</p>
            <p>{t('sevas.notice.content3')}</p>
          </div>
          <div className='mt-4 pt-4 border-t border-orange-200/50 text-center'>
            <p className='text-orange-900 font-medium'>
              {t('sevas.notice.blessing')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
