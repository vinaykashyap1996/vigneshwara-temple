'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: 'General Enquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with actual API endpoint
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        purpose: 'General Enquiry',
        message: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Clear phone error when user types
    if (name === 'phone' && phoneError) {
      setPhoneError('');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? value.trim() : value,
    }));
  };

  return (
    <div className='bg-orange-50 rounded-xl border border-border p-6 md:p-8 shadow-sm'>
      <div className='mb-6'>
        <h2 className='h4 text-fg mb-2'>Send an Enquiry</h2>
        <p className='text-muted text-sm'>
          Have questions about Sevas or events? Reach out to us.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* Name Field */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='text-sm font-medium text-muted'>
            Full Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            placeholder='Enter your name'
            className='bg-white border border-border rounded-lg px-4 py-3 text-fg placeholder:text-muted/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all'
            aria-required='true'
          />
        </div>

        {/* Phone Field */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='phone' className='text-sm font-medium text-muted'>
            Phone Number <span className='text-red-500'>*</span>
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder='+91 98765 43210'
            inputMode='tel'
            pattern='[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}'
            className={`bg-white border rounded-lg px-4 py-3 text-fg placeholder:text-muted/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all ${
              phoneError ? 'border-red-500' : 'border-border'
            }`}
            aria-required='true'
            aria-invalid={phoneError ? 'true' : 'false'}
            aria-describedby={phoneError ? 'phone-error' : undefined}
          />
          {phoneError && (
            <p id='phone-error' className='text-sm text-red-600'>
              {phoneError}
            </p>
          )}
        </div>

        {/* Purpose Field */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='purpose' className='text-sm font-medium text-muted'>
            Purpose
          </label>
          <div className='relative'>
            <select
              id='purpose'
              name='purpose'
              value={formData.purpose}
              onChange={handleChange}
              className='w-full bg-white border border-border rounded-lg px-4 py-3 text-fg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 appearance-none transition-all cursor-pointer'>
              <option>General Enquiry</option>
              <option>Seva Booking</option>
              <option>Donation</option>
              <option>Volunteering</option>
            </select>
            <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none text-xl'>
              expand_more
            </span>
          </div>
        </div>

        {/* Message Field */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='message' className='text-sm font-medium text-muted'>
            Message <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            placeholder='How can we help you?'
            rows={4}
            className='bg-white border border-border rounded-lg px-4 py-3 text-fg placeholder:text-muted/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none'
            aria-required='true'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-2 w-full btn btn-gold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          aria-label='Submit enquiry form'>
          {isSubmitting ? (
            <>
              <span className='animate-spin material-symbols-outlined text-sm'>
                progress_activity
              </span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <span className='material-symbols-outlined text-sm'>send</span>
            </>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div
            className='p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium text-center'
            role='alert'>
            Thank you! Your message has been sent successfully.
          </div>
        )}
        {submitStatus === 'error' && (
          <div
            className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium text-center'
            role='alert'>
            Something went wrong. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
}
