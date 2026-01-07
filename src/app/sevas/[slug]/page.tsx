import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sevas } from '../data';
import BookingForm from '../components/BookingForm';

interface SevaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SevaDetailPage({ params }: SevaDetailPageProps) {
  const resolvedParams = await params;
  const seva = sevas.find((s) => s.slug === resolvedParams.slug);

  if (!seva) {
    notFound();
  }

  const formatAmount = (amount: number) => amount.toLocaleString('en-IN');

  // Related sevas (same category, excluding current)
  const relatedSevas = sevas
    .filter((s) => s.category === seva.category && s.id !== seva.id)
    .slice(0, 3);

  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden bg-ivory'>
      {/* Breadcrumb */}
      <div className='bg-white border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <nav className='flex items-center gap-2 text-sm text-muted'>
            <Link href='/' className='hover:text-orange-500 transition-colors'>
              Home
            </Link>
            <span className='material-symbols-outlined text-base'>
              chevron_right
            </span>
            <Link
              href='/sevas'
              className='hover:text-orange-500 transition-colors'>
              Sevas
            </Link>
            <span className='material-symbols-outlined text-base'>
              chevron_right
            </span>
            <span className='text-fg font-medium'>{seva.name}</span>
          </nav>
        </div>
      </div>

      <main className='flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column: Seva Details */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Header */}
            <div>
              <div className='flex flex-wrap gap-2 mb-4'>
                {seva.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full'>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className='text-4xl md:text-5xl font-black text-fg mb-4'>
                {seva.name}
              </h1>
              <p className='text-xl text-muted leading-relaxed'>
                {seva.shortDescription}
              </p>
            </div>

            {/* Description */}
            <div className='bg-white border border-border rounded-xl p-6 shadow-sm'>
              <h2 className='text-2xl font-bold text-fg mb-4 flex items-center gap-2'>
                <span className='material-symbols-outlined text-orange-500'>
                  description
                </span>
                About This Seva
              </h2>
              <p className='text-muted leading-relaxed'>
                {seva.fullDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className='bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-6'>
              <h2 className='text-2xl font-bold text-fg mb-4 flex items-center gap-2'>
                <span className='material-symbols-outlined text-orange-500'>
                  auto_awesome
                </span>
                Divine Benefits
              </h2>
              <ul className='space-y-3'>
                {seva.benefits.map((benefit, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <span className='material-symbols-outlined text-orange-500 text-xl mt-0.5 flex-shrink-0'>
                      check_circle
                    </span>
                    <span className='text-fg'>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className='bg-white border border-border rounded-xl p-6 shadow-sm'>
              <h2 className='text-2xl font-bold text-fg mb-4 flex items-center gap-2'>
                <span className='material-symbols-outlined text-orange-500'>
                  checklist
                </span>
                Requirements & Preparation
              </h2>
              <ul className='space-y-3'>
                {seva.requirements.map((req, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <span className='material-symbols-outlined text-muted text-xl mt-0.5 flex-shrink-0'>
                      arrow_right
                    </span>
                    <span className='text-muted'>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Sevas */}
            {relatedSevas.length > 0 && (
              <div>
                <h2 className='text-2xl font-bold text-fg mb-6'>
                  Related Sevas
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {relatedSevas.map((relatedSeva) => (
                    <Link
                      key={relatedSeva.id}
                      href={`/sevas/${relatedSeva.slug}`}
                      className='bg-white border border-border rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-1'>
                      <h3 className='font-bold text-fg mb-2'>
                        {relatedSeva.name}
                      </h3>
                      <p className='text-sm text-muted line-clamp-2 mb-3'>
                        {relatedSeva.shortDescription}
                      </p>
                      <div className='text-orange-600 font-bold text-sm'>
                        From ₹{formatAmount(relatedSeva.suggestedDonation.min)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking Card */}
          <div className='lg:col-span-1'>
            <div className='lg:sticky lg:top-20'>
              <div
                id='book'
                className='bg-white border-2 border-orange-200 rounded-xl overflow-hidden shadow-lg'>
                {/* Price Header */}
                <div className='bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6'>
                  <div className='text-sm uppercase tracking-wider mb-1'>
                    Suggested Donation
                  </div>
                  <div className='flex items-baseline gap-2 mb-2'>
                    <span className='text-4xl font-black'>
                      ₹{formatAmount(seva.suggestedDonation.recommended)}
                    </span>
                  </div>
                  <div className='text-orange-100 text-sm'>
                    Minimum: ₹{formatAmount(seva.suggestedDonation.min)}
                  </div>
                </div>

                {/* Seva Info */}
                <div className='p-6 space-y-4 border-b border-border'>
                  <div className='flex items-center gap-3 text-sm'>
                    <span className='material-symbols-outlined text-muted'>
                      schedule
                    </span>
                    <span className='text-fg'>
                      <strong>Duration:</strong> {seva.duration}
                    </span>
                  </div>
                  <div className='flex items-center gap-3 text-sm'>
                    <span className='material-symbols-outlined text-muted'>
                      calendar_month
                    </span>
                    <span className='text-fg'>
                      <strong>Frequency:</strong>{' '}
                      {seva.frequency.replace('-', ' ')}
                    </span>
                  </div>
                  <div className='flex items-start gap-3 text-sm'>
                    <span className='material-symbols-outlined text-muted'>
                      light_mode
                    </span>
                    <div className='text-fg'>
                      <strong>Available:</strong>{' '}
                      {seva.timing
                        .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                        .join(', ')}
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <BookingForm seva={seva} />
              </div>

              {/* Contact Card */}
              <div className='mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4'>
                <div className='flex items-start gap-3'>
                  <span className='material-symbols-outlined text-orange-500 text-2xl'>
                    support_agent
                  </span>
                  <div>
                    <h3 className='font-bold text-fg mb-1 text-sm'>
                      Need Assistance?
                    </h3>
                    <p className='text-xs text-muted mb-2'>
                      Contact our temple office for booking help
                    </p>
                    <a
                      href='tel:+915551234567'
                      className='text-orange-600 font-medium text-sm hover:text-orange-700'>
                      +91 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static paths for all sevas
export async function generateStaticParams() {
  return sevas.map((seva) => ({
    slug: seva.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: SevaDetailPageProps): Promise<{
  title: string;
  description: string;
}> {
  const resolvedParams = await params;
  const seva = sevas.find((s) => s.slug === resolvedParams.slug);

  if (!seva) {
    return {
      title: 'Seva Not Found',
      description: 'The requested seva could not be found',
    };
  }

  return {
    title: `${seva.name} - Book Temple Seva | Shri Vighneshwara Swamy Temple`,
    description: seva.shortDescription,
  };
}
