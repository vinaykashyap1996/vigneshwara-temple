'use client';

import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function MapEmbed() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-orange-500 text-2xl">
          location_on
        </span>
        <h2 className="h3 text-fg">{t('contactUs.map.title')}</h2>
      </div>

      <div className="relative w-full h-[320px] md:h-[400px] bg-orange-50 rounded-xl overflow-hidden border border-border group">
        {/* Embedded Google Map - Replace src with actual temple location */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6589844919424!2d77.60844931482144!3d12.925674990883753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1507d6b5b3e9%3A0x8c6c0b3f7f3b3b3b!2s3%2C%2026th%20Main%20Rd%2C%20MCHS%20Colony%2C%20BTM%202nd%20Stage%2C%20BTM%20Layout%2C%20Bengaluru%2C%20Karnataka%20560076!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ganesha Temple Location Map"
          className="grayscale-[30%] contrast-110"
        />

        {/* Overlay with CTA */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
          <a
            href="https://maps.google.com/?q=3,+26th+Main+Rd,+MCHS+Colony,+BTM+2nd+Stage,+BTM+Layout,+Bengaluru,+Karnataka+560076,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto btn btn-gold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            <span className="material-symbols-outlined">map</span>
            {t('contactUs.map.openInMaps')}
          </a>
        </div>
      </div>
    </div>
  );
}
