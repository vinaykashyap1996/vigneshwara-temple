'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function HowToReach() {
  const { t } = useTranslation();

  const transportOptions = [
    {
      icon: 'subway',
      titleKey: 'contactUs.howToReach.metro.title',
      descriptionKey: 'contactUs.howToReach.metro.description',
    },
    {
      icon: 'directions_bus',
      titleKey: 'contactUs.howToReach.bus.title',
      descriptionKey: 'contactUs.howToReach.bus.description',
    },
    {
      icon: 'local_parking',
      titleKey: 'contactUs.howToReach.parking.title',
      descriptionKey: 'contactUs.howToReach.parking.description',
    },
  ];

  return (
    <div>
      <h2 className="h3 text-fg mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-orange-500 text-2xl">
          directions
        </span>
        {t('contactUs.howToReach.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transportOptions.map((option, index) => (
          <div
            key={index}
            className="bg-orange-50 p-5 rounded-lg border border-border hover:border-orange-300 transition-colors"
          >
            <div className="size-10 rounded-full bg-white flex items-center justify-center text-orange-500 mb-4 border border-border shadow-sm">
              <span className="material-symbols-outlined">{option.icon}</span>
            </div>
            <h3 className="text-fg font-bold mb-2">{t(option.titleKey)}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {t(option.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
