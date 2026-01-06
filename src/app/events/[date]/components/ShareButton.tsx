'use client';

import { useState, useEffect } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported (SSR-safe)
    setIsSupported(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  const handleShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      // Silently ignore user cancellation (AbortError)
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  // Don't render if not supported
  if (!isSupported) {
    return null;
  }

  return (
    <button
      aria-label='Share event'
      className='rounded-lg border border-border bg-transparent px-4 py-3 text-fg hover:bg-orange-50 transition-colors'
      onClick={handleShare}>
      <span className='material-symbols-outlined'>share</span>
    </button>
  );
}
