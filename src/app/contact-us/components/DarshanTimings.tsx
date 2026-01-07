'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function DarshanTimings() {
  const { t } = useTranslation();

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-orange-100 p-4 border-b border-orange-200 flex items-center gap-3">
        <span className="material-symbols-outlined text-orange-500 text-2xl">
          schedule
        </span>
        <h2 className="text-lg font-bold text-fg">{t('contactUs.darshanTimings.title')}</h2>
      </div>

      {/* Timings Content */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <span className="text-muted font-medium">{t('contactUs.darshanTimings.morning')}</span>
          <span className="text-fg font-bold text-lg">{t('contactUs.darshanTimings.morningTime')}</span>
        </div>
        <div className="flex justify-between items-center pb-1">
          <span className="text-muted font-medium">{t('contactUs.darshanTimings.evening')}</span>
          <span className="text-fg font-bold text-lg">{t('contactUs.darshanTimings.eveningTime')}</span>
        </div>

        {/* Special Note */}
        <div className="mt-2 p-3 bg-orange-100 rounded border border-orange-200 text-center">
          <p className="text-orange-700 text-sm font-medium">
            {t('contactUs.darshanTimings.abhishekam')}
          </p>
        </div>
      </div>
    </div>
  );
}
