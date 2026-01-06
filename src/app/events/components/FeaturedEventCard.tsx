import Link from 'next/link';
import { Festival } from '@/lib/panchang/types';

interface FeaturedEventCardProps {
  festival: Festival;
  date: string; // YYYY-MM-DD
}

export default function FeaturedEventCard({
  festival,
  date,
}: FeaturedEventCardProps) {
  // Default image for festivals
  const defaultImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAKGmNGFWxebe22WUyZFLRpdzaF9Y-hXDhghzZywhvRVuwNerPoH0upP-9HFnF_uvBCbgiySNBq0kOc9kT1HboY27vc-ZcilyIHVbtXG4RN2zvD5DyfmnoHZ5icsFyQFBrkFXok_QhxzuNvt5YlYJveUC-m_JbvbpJJE9ox3SzO6AMQwiZsB-IUL1q_sHFJyUTxlOeYbi1A7Ywur4n37MEFTHnPLfLmUqAcYUgCgktWHaX0CqIU89FvK3JvJW5PFtoW85HqNOzpaQ';

  return (
    <div className='relative overflow-hidden rounded-xl bg-white border border-border shadow-sm'>
      <div
        className='relative h-40 w-full bg-cover bg-center'
        style={{
          backgroundImage: `url('${defaultImage}')`,
        }}>
        <div className='absolute inset-0 bg-gradient-to-t from-white to-transparent'></div>
      </div>
      <div className='relative -mt-12 p-6 pt-0'>
        <div className='mb-3 inline-flex items-center rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white'>
          {festival.kind === 'festival' ? 'Major Festival' : 'Special Event'}
        </div>
        <h3 className='text-2xl font-bold text-fg'>{festival.name}</h3>
        <p className='mt-2 text-sm text-muted'>
          {festival.description ||
            'Join us for this auspicious celebration. Pre-booking for special sevas is available.'}
        </p>
        <Link
          href={`/events/${date}`}
          className='mt-4 w-full block text-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700 transition-colors'>
          View Details
        </Link>
      </div>
    </div>
  );
}
