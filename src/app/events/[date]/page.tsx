import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDayPanchang } from '@/lib/panchang/client';
import { generateGoogleCalendarLink } from '@/lib/panchang/client';
import ShareButton from './components/ShareButton';

interface EventDetailPageProps {
  params: Promise<{
    date: string; // YYYY-MM-DD
  }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { date } = await params;

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    notFound();
  }

  // Fetch day data
  let dayData;
  try {
    dayData = await getDayPanchang(date);
  } catch (error) {
    console.error('Failed to load day data:', error);
    notFound();
  }

  const formatDate = (dateStr: string) => {
    // Parse YYYY-MM-DD as local date to avoid timezone issues
    const [year, month, dayNum] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, dayNum);

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = dateObj.getDate();
    const suffix =
      day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';

    return `${days[dateObj.getDay()]}, ${
      months[dateObj.getMonth()]
    } ${day}${suffix}, ${dateObj.getFullYear()}`;
  };

  const mainFestival = dayData.festivals?.find((f) => f.importance === 'major');
  const title = mainFestival
    ? `${mainFestival.name}`
    : `Daily Panchang - ${dayData.tithi.name}`;

  const defaultImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0cGrLbBkPaFBj62B_pONPLH9rgkeXKHPguN8_bAEEnx9_LmRZ-fY1bdraQFvpLyBFkP_8G7hsW9wC5aROmkDv5uIK9xpqxgeqbs7Ar5ql1n7rNhLjEd_dHVCmjmNUS88ipgGHppmQzrjRWt-viVof3zmtp4XDRtZRFO0_LHmK-F08pqY1D0nrK9XayIBIdKZmehUL5VqPRQQZW5uY3q_ucnPlSSMc7hoAXMs9dMByXvaKitQcBrKW-uZzGMWCf6zUMvoCyXVuZw';

  return (
    <div className='flex min-h-screen flex-col bg-ivory'>
      <main className='flex-grow'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Back Button */}
          <Link
            href='/events'
            className='inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6'>
            <span className='material-symbols-outlined'>arrow_back</span>
            Back to Calendar
          </Link>

          {/* Event Detail */}
          <div className='rounded-xl border border-border bg-white p-8 md:p-10 relative overflow-hidden shadow-sm'>
            <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/5 blur-[100px]'></div>

            <div className='relative grid gap-8 lg:grid-cols-2'>
              <div>
                <div className='mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-600'>
                  <span className='material-symbols-outlined text-lg'>
                    calendar_month
                  </span>
                  {formatDate(dayData.dateISO)}
                </div>

                <h2 className='text-3xl font-bold text-fg md:text-4xl'>
                  {title}
                </h2>

                {/* Panchang Details */}
                <div className='mt-6 space-y-4'>
                  {dayData.festivals.length > 0 && (
                    <div>
                      <h3 className='text-lg font-bold text-fg mb-2'>
                        Festivals & Special Days
                      </h3>
                      <div className='space-y-2'>
                        {dayData.festivals.map((festival, idx) => (
                          <div
                            key={idx}
                            className='flex items-start gap-2 text-muted'>
                            <span className='material-symbols-outlined text-orange-600 text-sm mt-0.5'>
                              celebration
                            </span>
                            <span>
                              {festival.name}
                              {festival.importance === 'major' && (
                                <span className='ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded'>
                                  Major Festival
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className='grid grid-cols-2 gap-4 rounded-lg bg-orange-50 p-4 border border-border'>
                    <div>
                      <div className='text-xs text-muted'>Sunrise</div>
                      <div className='font-semibold text-fg'>
                        {dayData.sunrise}
                      </div>
                    </div>
                    <div>
                      <div className='text-xs text-muted'>Sunset</div>
                      <div className='font-semibold text-fg'>
                        {dayData.sunset}
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='bg-orange-50 p-3 rounded-lg border border-border'>
                      <div className='text-xs text-muted mb-1'>Tithi</div>
                      <div className='font-semibold text-fg'>
                        {dayData.tithi.name}
                      </div>
                      {dayData.tithi.paksha && (
                        <div className='text-xs text-muted mt-1'>
                          {dayData.tithi.paksha} Paksha
                        </div>
                      )}
                    </div>

                    <div className='bg-orange-50 p-3 rounded-lg border border-border'>
                      <div className='text-xs text-muted mb-1'>Nakshatra</div>
                      <div className='font-semibold text-fg'>
                        {dayData.nakshatra.name}
                      </div>
                    </div>

                    <div className='bg-orange-50 p-3 rounded-lg border border-border'>
                      <div className='text-xs text-muted mb-1'>Yoga</div>
                      <div className='font-semibold text-fg'>
                        {dayData.yoga.name}
                      </div>
                    </div>

                    <div className='bg-orange-50 p-3 rounded-lg border border-border'>
                      <div className='text-xs text-muted mb-1'>Karana</div>
                      <div className='font-semibold text-fg'>
                        {dayData.karana.name}
                      </div>
                    </div>
                  </div>

                  {/* Extended details if available */}
                  {(dayData.rahu ||
                    dayData.gulika ||
                    dayData.abhijit ||
                    dayData.yamaghanda) && (
                    <div className='mt-6 border-t border-border pt-4'>
                      <h3 className='text-sm font-bold text-fg mb-3'>
                        Auspicious & Inauspicious Times
                      </h3>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
                        {dayData.rahu && (
                          <div>
                            <span className='text-muted'>Rahu Kalam:</span>{' '}
                            <span className='text-fg font-medium'>
                              {dayData.rahu}
                            </span>
                          </div>
                        )}
                        {dayData.gulika && (
                          <div>
                            <span className='text-muted'>Gulika:</span>{' '}
                            <span className='text-fg font-medium'>
                              {dayData.gulika}
                            </span>
                          </div>
                        )}
                        {dayData.yamaghanda && (
                          <div>
                            <span className='text-muted'>Yamaghanda:</span>{' '}
                            <span className='text-fg font-medium'>
                              {dayData.yamaghanda}
                            </span>
                          </div>
                        )}
                        {dayData.abhijit && (
                          <div>
                            <span className='text-muted'>Abhijit:</span>{' '}
                            <span className='text-fg font-medium'>
                              {dayData.abhijit}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {dayData.notes && (
                    <div className='mt-4 p-4 bg-orange-50 rounded-lg border border-border'>
                      <p className='text-sm text-muted'>{dayData.notes}</p>
                    </div>
                  )}
                </div>

                <div className='mt-8 flex flex-wrap gap-4'>
                  <a
                    href={generateGoogleCalendarLink({
                      title: title,
                      date: dayData.dateISO,
                      startTime: dayData.sunrise,
                      description: `Panchang details: ${dayData.tithi.name}, ${dayData.nakshatra.name}`,
                    })}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex-1 rounded-lg bg-orange-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all text-center'>
                    Add to Google Calendar
                  </a>
                  <ShareButton
                    title={title}
                    text={`${title} - ${formatDate(dayData.dateISO)}`}
                    url={`${
                      process.env.NEXT_PUBLIC_BASE_URL ||
                      (typeof window !== 'undefined'
                        ? window.location.origin
                        : 'https://ganesha-temple.com')
                    }/events/${dayData.dateISO}`}
                  />
                </div>
              </div>

              <div className='relative h-64 overflow-hidden rounded-xl lg:h-auto bg-orange-50'>
                <Image
                  className='absolute inset-0 h-full w-full object-cover opacity-90'
                  alt={title}
                  src={defaultImage}
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ params }: EventDetailPageProps) {
  const { date } = await params;

  try {
    const dayData = await getDayPanchang(date);
    const mainFestival = dayData.festivals.find(
      (f) => f.importance === 'major'
    );
    const title = mainFestival
      ? mainFestival.name
      : `Panchang - ${dayData.tithi.name}`;

    return {
      title: `${title} | Shri Vighneshwara Swamy Temple`,
      description: `${dayData.tithi.name}, ${dayData.nakshatra.name} - Complete Panchang details for ${date}`,
    };
  } catch {
    return {
      title: 'Event Details | Shri Vighneshwara Swamy Temple',
    };
  }
}
