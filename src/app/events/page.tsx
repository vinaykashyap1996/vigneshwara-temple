import { Suspense } from 'react';
import CalendarMonthView from './components/CalendarMonthView';
import UpcomingEventsList from './components/UpcomingEventsList';
import FeaturedEventCard from './components/FeaturedEventCard';
import NewsletterSection from './components/NewsletterSection';
import MonthNavigator from './components/MonthNavigator';
import { getMonthPanchang } from '@/lib/panchang/client';
import { generateGoogleCalendarLink } from '@/lib/panchang/client';

interface EventsPageProps {
  searchParams: Promise<{
    year?: string;
    month?: string;
  }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  // Get current date or use query params
  const now = new Date();
  const params = await searchParams;

  // Parse and validate year parameter
  let year = now.getFullYear();
  if (params.year) {
    const parsedYear = parseInt(params.year, 10);
    if (
      Number.isFinite(parsedYear) &&
      parsedYear >= 1900 &&
      parsedYear <= 2100
    ) {
      year = parsedYear;
    }
  }

  // Parse and validate month parameter
  let month = now.getMonth() + 1;
  if (params.month) {
    const parsedMonth = parseInt(params.month, 10);
    if (Number.isFinite(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
      month = parsedMonth;
    }
  }

  // Fetch month data from API
  let monthData;
  try {
    monthData = await getMonthPanchang(year, month);
  } catch (error) {
    console.error('Failed to load month data:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
      <div className='flex min-h-screen flex-col bg-ivory'>
        <main className='flex-grow'>
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-fg mb-4'>
                Unable to Load Calendar Data
              </h2>
              <p className='text-muted mb-4'>
                Please check your API configuration and try again.
              </p>
              {isDevelopment && (
                <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto'>
                  <p className='text-sm text-red-800 font-mono text-left'>
                    <strong>Error:</strong> {errorMessage}
                  </p>
                  <p className='text-xs text-red-600 mt-2 text-left'>
                    Make sure PANCHANG_API_KEY is set in .env.local and restart
                    your dev server.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Prepare calendar grid with padding days
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Add empty days before the 1st
  const paddedDays = [...Array(startingDayOfWeek)].map((_, i) => ({
    ...monthData.days[0],
    day: i,
    isCurrentMonth: false,
  }));

  const allDays = [...paddedDays, ...monthData.days];

  // Find featured festival
  const featuredDay = monthData.days.find((day) =>
    day.festivals.some((f) => f.importance === 'major')
  );

  return (
    <div className='flex min-h-screen flex-col bg-ivory'>
      <main className='flex-grow'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Page Header */}
          <div className='mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end'>
            <div className='max-w-2xl'>
              <h2 className='text-4xl font-black leading-tight tracking-tight text-fg sm:text-5xl'>
                Events &amp; Festivals
              </h2>
              <p className='mt-3 text-lg text-muted'>
                Complete Hindu Panchang with festivals, tithis, and auspicious
                timings for Bengaluru
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <a
                href={generateGoogleCalendarLink({
                  title: 'Temple Events',
                  date: `${year}-${String(month).padStart(2, '0')}-01`,
                  description: 'Monthly temple events and festivals',
                })}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 rounded-lg bg-white border border-border px-4 py-2.5 text-sm font-medium text-fg hover:bg-orange-50 transition-colors shadow-sm'>
                <span className='material-symbols-outlined text-lg'>
                  calendar_add_on
                </span>
                Add to Calendar
              </a>
              <a
                href='#newsletter'
                className='flex items-center gap-2 rounded-lg bg-white border border-border px-4 py-2.5 text-sm font-medium text-fg hover:bg-orange-50 transition-colors shadow-sm'>
                <span className='material-symbols-outlined text-lg'>mail</span>
                Subscribe to Updates
              </a>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
            {/* Main Calendar Section (Left/Top) */}
            <div className='lg:col-span-8'>
              <div className='overflow-hidden rounded-xl border border-border bg-white shadow-lg'>
                {/* Calendar Controls */}
                <div className='border-b border-border p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <MonthNavigator currentYear={year} currentMonth={month} />

                  <div className='text-sm text-muted'>
                    Bengaluru • {monthData.timezone}
                  </div>
                </div>

                {/* Calendar Grid */}
                <Suspense
                  fallback={
                    <div className='p-8 text-center text-muted'>
                      Loading calendar...
                    </div>
                  }>
                  <CalendarMonthView days={allDays} />
                </Suspense>
              </div>
            </div>

            {/* Upcoming List Section (Right Sidebar) */}
            <div className='lg:col-span-4 space-y-6'>
              <div className='rounded-xl border border-border bg-white p-6 shadow-sm'>
                <h3 className='mb-5 flex items-center gap-2 text-xl font-bold text-fg'>
                  <span className='material-symbols-outlined text-orange-600'>
                    event_upcoming
                  </span>
                  Upcoming Events
                </h3>
                <UpcomingEventsList monthData={monthData.days} />
              </div>

              {/* Featured Festival Card */}
              {featuredDay && featuredDay.festivals.length > 0 && (
                <FeaturedEventCard
                  festival={featuredDay.festivals[0]}
                  date={featuredDay.dateISO}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <div id='newsletter'>
        <NewsletterSection />
      </div>
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ searchParams }: EventsPageProps) {
  const now = new Date();
  const params = await searchParams;
  const year = params.year ? parseInt(params.year) : now.getFullYear();
  const month = params.month ? parseInt(params.month) : now.getMonth() + 1;

  const monthNames = [
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

  return {
    title: `Events & Festivals - ${
      monthNames[month - 1]
    } ${year} | Shri Vighneshwara Swamy Temple`,
    description: `Hindu Panchang, festivals, and auspicious timings for ${
      monthNames[month - 1]
    } ${year} in Bengaluru`,
  };
}
