'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { Seva } from '../types';

interface BookingFormProps {
  seva: Seva;
}

export default function BookingForm({ seva }: BookingFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timing: '',
    participants: '1',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Booking request submitted for ${seva.name}!\n\nThis is a demo. In production, this would:\n1. Send confirmation email\n2. Process payment\n3. Create booking in system\n\nDetails:\n${JSON.stringify(formData, null, 2)}`
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className='p-6 space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.fullName')} *
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          value={formData.name}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg'
          placeholder='Enter your name'
        />
      </div>

      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.email')} *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          required
          value={formData.email}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg'
          placeholder='your@email.com'
        />
      </div>

      <div>
        <label
          htmlFor='phone'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.phone')} *
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          required
          value={formData.phone}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg'
          placeholder='+91 99999 99999'
        />
      </div>

      <div>
        <label
          htmlFor='date'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.date')} *
        </label>
        <input
          type='date'
          id='date'
          name='date'
          required
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg'
        />
      </div>

      <div>
        <label
          htmlFor='timing'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.timing')} *
        </label>
        <select
          id='timing'
          name='timing'
          required
          value={formData.timing}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg'>
          <option value=''>{t('sevas.booking.selectTiming')}</option>
          {seva.timing.map((time) => (
            <option key={time} value={time}>
              {time.charAt(0).toUpperCase() +
                time.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor='participants'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.participants')}
        </label>
        <input
          type='number'
          id='participants'
          name='participants'
          min='1'
          max='50'
          value={formData.participants}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg'
        />
      </div>

      <div>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-fg mb-1'>
          {t('sevas.booking.specialRequests')}
        </label>
        <textarea
          id='message'
          name='message'
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-fg resize-none'
          placeholder={t('sevas.booking.placeholder')}
        />
      </div>

      <button
        type='submit'
        className='w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group'>
        <span>{t('sevas.booking.submit')}</span>
        <span className='material-symbols-outlined group-hover:translate-x-1 transition-transform'>
          arrow_forward
        </span>
      </button>

      <p className='text-xs text-muted text-center'>
        {t('sevas.booking.confirmation')}
      </p>
    </form>
  );
}
