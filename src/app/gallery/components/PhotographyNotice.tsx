'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function PhotographyNotice() {
  const { t } = useTranslation();

  return (
    <div className='mt-12 mx-auto max-w-2xl text-center border-t border-border pt-8'>
      <div className='flex items-center justify-center gap-2 mb-2 text-orange-600/70'>
        <span className='material-symbols-outlined text-sm'>photo_camera</span>
        <span className='text-xs font-bold tracking-widest uppercase'>
          {t('gallery.notice.title')}
        </span>
      </div>
      <p className='text-muted/70 text-xs leading-relaxed font-light'>
        {t('gallery.notice.content')}
      </p>
    </div>
  );
}
