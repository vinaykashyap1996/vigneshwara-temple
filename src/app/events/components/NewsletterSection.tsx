'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');

        // Auto-reset after 5 seconds to allow re-subscription
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        // Wrap response.json() in try-catch for malformed responses
        let errorMessage = 'Failed to subscribe. Please try again.';
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch (parseError) {
          // Use statusText as fallback if JSON parsing fails
          errorMessage = response.statusText || errorMessage;
        }
        setStatus('error');
        setMessage(errorMessage);
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section className='border-t border-border bg-orange-50 py-12 mt-12'>
      <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
        <span className='material-symbols-outlined mb-4 text-4xl text-orange-600'>
          mark_email_unread
        </span>
        <h2 className='text-2xl font-bold text-fg'>
          Stay Connected with the Divine
        </h2>
        <p className='mx-auto mt-2 max-w-2xl text-muted'>
          Subscribe to receive weekly updates on festival schedules, auspicious
          timings, and temple news.
        </p>
        <form
          onSubmit={handleSubmit}
          className='mx-auto mt-6 flex max-w-md gap-2'>
          <label htmlFor='newsletter-email' className='sr-only'>
            Email address
          </label>
          <input
            id='newsletter-email'
            className='flex-1 rounded-lg border border-border bg-white px-4 py-3 text-fg placeholder-muted focus:ring-2 focus:ring-orange-500 focus:outline-none'
            placeholder='Enter your email address'
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <button
            className='rounded-lg bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={status === 'loading'}>
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
        {message && (
          <p
            className={`mt-3 text-sm ${
              status === 'error' ? 'text-red-600' : 'text-green-600'
            }`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
