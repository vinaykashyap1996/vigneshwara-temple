'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
}

export default function LoadMoreButton({
  onClick,
  hasMore,
}: LoadMoreButtonProps) {
  const { t } = useTranslation();

  if (!hasMore) return null;

  return (
    <div className='flex justify-center mt-20 mb-10'>
      <button
        onClick={onClick}
        className='group flex flex-col items-center gap-2 text-muted hover:text-orange-500 transition-colors duration-500'
        aria-label='Load more gallery items'>
        <span className='text-xs font-bold tracking-[0.2em] uppercase'>
          {t('gallery.loadMore')}
        </span>
        <div className='w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:scale-110'>
          <span className='material-symbols-outlined text-lg'>
            arrow_downward
          </span>
        </div>
      </button>
    </div>
  );
}
