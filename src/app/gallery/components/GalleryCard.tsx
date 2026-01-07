'use client';

import Image from 'next/image';
import { GalleryItem } from '../types';

interface GalleryCardProps {
  item: GalleryItem;
}

export default function GalleryCard({ item }: GalleryCardProps) {
  const getSizeClasses = () => {
    switch (item.size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2 h-[500px] md:h-auto';
      case 'medium':
        return 'md:row-span-2 h-[400px] md:h-auto';
      case 'wide':
        return 'md:col-span-2 h-[280px]';
      case 'small':
      default:
        return 'h-[280px]';
    }
  };

  if (item.featured) {
    return (
      <div
        className={`group relative ${getSizeClasses()} rounded-xl overflow-hidden bg-orange-50/30 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500`}>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-fg/90 via-fg/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500'></div>

        {/* Featured Badge */}
        <div className='absolute top-6 left-6 z-20'>
          <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm border border-white/10'>
            <span className='w-1.5 h-1.5 rounded-full bg-white animate-pulse'></span>
            <span className='text-[10px] font-bold uppercase tracking-widest text-white'>
              Featured Event
            </span>
          </span>
        </div>

        {/* Content */}
        <div className='absolute bottom-0 left-0 p-8 md:p-10 w-full z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
          <h3 className='text-white text-3xl md:text-4xl font-light mb-3 leading-tight tracking-wide'>
            {item.title}
            {item.subtitle && (
              <>
                <br />
                <span className='font-serif italic text-orange-300'>
                  {item.subtitle}
                </span>
              </>
            )}
          </h3>
          <div className='h-[1px] w-12 bg-orange-300/50 mb-4 group-hover:w-24 transition-all duration-500'></div>
          {item.description && (
            <p className='text-gray-300 text-sm md:text-base font-light max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
              {item.description}
            </p>
          )}
          <div className='mt-6 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-orange-300 opacity-80'>
            <span>View Gallery</span>
            <span className='material-symbols-outlined text-sm transition-transform group-hover:translate-x-1'>
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Medium card with date
  if (item.size === 'medium') {
    return (
      <div
        className={`group relative ${getSizeClasses()} rounded-xl overflow-hidden bg-orange-50/30 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500`}>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fg/90'></div>

        {/* Content */}
        <div className='absolute bottom-0 left-0 p-6 w-full z-20'>
          {item.subtitle && (
            <p className='text-orange-600 text-xs font-bold tracking-widest uppercase mb-1'>
              {item.subtitle}
            </p>
          )}
          <h4 className='text-white text-xl font-normal leading-snug'>
            {item.title}
          </h4>
          {item.date && (
            <p className='text-gray-400 text-xs mt-2 font-light'>{item.date}</p>
          )}
        </div>

        {/* Hover Icon */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[1px]'>
          <span className='material-symbols-outlined text-white text-4xl font-light drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300'>
            visibility
          </span>
        </div>
      </div>
    );
  }

  // Wide card
  if (item.size === 'wide') {
    return (
      <div
        className={`group relative ${getSizeClasses()} rounded-xl overflow-hidden bg-orange-50/30 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500`}>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className='object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw'
          />
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-fg/90 via-fg/40 to-transparent'></div>

        {/* Expand Icon */}
        <div className='absolute top-0 right-0 p-4'>
          <div className='w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
            <span className='material-symbols-outlined text-sm'>
              open_in_full
            </span>
          </div>
        </div>

        {/* Content */}
        <div className='absolute bottom-0 left-0 p-8 flex flex-col justify-end h-full w-2/3'>
          {item.subtitle && (
            <span className='text-orange-600 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2'>
              <span className='w-2 h-[1px] bg-orange-500'></span>
              {item.subtitle}
            </span>
          )}
          <h3 className='text-white text-2xl font-light leading-tight mb-2'>
            {item.title}
          </h3>
          {item.description && (
            <p className='text-gray-400 text-sm font-light leading-relaxed line-clamp-2'>
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default small card
  return (
    <div
      className={`group relative ${getSizeClasses()} rounded-xl overflow-hidden bg-orange-50/30 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500`}>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className='object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
        />
      </div>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-fg/90 to-transparent'></div>

      {/* Content */}
      <div className='absolute bottom-0 left-0 p-6 w-full z-20'>
        <h4 className='text-white text-lg font-normal mb-1'>{item.title}</h4>
        {item.subtitle && (
          <p className='text-gray-400 text-xs tracking-wider uppercase'>
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
