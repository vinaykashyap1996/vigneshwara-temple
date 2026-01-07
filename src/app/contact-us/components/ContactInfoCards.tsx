'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

export default function ContactInfoCards() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const address =
    '3, 26th Main Rd, MCHS Colony, BTM 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076, India';
  const phoneNumber = '+91 98765 43210';

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      // Clear existing timeout before setting new one
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    // Sanitize to digits only (remove +, spaces, and other non-numeric chars)
    const sanitized = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${sanitized}`, '_blank');
  };

  return (
    <div className='bg-orange-50 rounded-xl border border-border p-6 md:p-8 shadow-sm'>
      <div className='flex flex-col md:flex-row gap-6 justify-between items-start'>
        <div className='flex-1'>
          <p className='text-muted text-sm uppercase tracking-wider font-bold mb-3'>
            {t('contactUs.info.addressLabel')}
          </p>
          <p className='text-fg text-lg leading-relaxed mb-4'>{address}</p>
          <button
            onClick={handleCopyAddress}
            className='text-orange-500 hover:text-orange-700 text-sm font-bold flex items-center gap-2 transition-colors group'
            aria-label='Copy address to clipboard'>
            <span className='material-symbols-outlined text-lg group-hover:scale-110 transition-transform'>
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? t('contactUs.info.copied') : t('contactUs.info.copyAddress')}
          </button>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
          <button
            onClick={handleCall}
            className='flex-1 md:flex-none h-12 px-6 bg-orange-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors shadow-md'
            aria-label='Call temple'>
            <span className='material-symbols-outlined'>call</span>
            {t('contactUs.info.callNow')}
          </button>
          <button
            onClick={handleWhatsApp}
            className='flex-1 md:flex-none h-12 px-6 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md'
            aria-label='Contact via WhatsApp'>
            <span className='material-symbols-outlined'>chat</span>
            {t('contactUs.info.whatsapp')}
          </button>
        </div>
      </div>

      {/* Contact Details */}
      <div className='mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex items-start gap-3'>
          <span className='material-symbols-outlined text-orange-500 mt-1'>
            phone
          </span>
          <div>
            <p className='text-muted text-sm font-medium mb-1'>{t('contactUs.info.phoneLabel')}</p>
            <a
              href={`tel:${phoneNumber}`}
              className='text-fg hover:text-orange-500 transition-colors'>
              {phoneNumber}
            </a>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <span className='material-symbols-outlined text-orange-500 mt-1'>
            email
          </span>
          <div>
            <p className='text-muted text-sm font-medium mb-1'>{t('contactUs.info.emailLabel')}</p>
            <a
              href='mailto:info@ganeshatempel.org'
              className='text-fg hover:text-orange-500 transition-colors'>
              info@ganeshatempel.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
