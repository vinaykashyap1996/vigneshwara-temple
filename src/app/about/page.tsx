import AboutClient from '@/components/AboutClient';

export default function About() {
  return <AboutClient />;
}

<section className='bg-white p-8 rounded-lg shadow-md'>
  <h2 className='text-3xl font-bold text-orange-800 mb-4'>Temple Services</h2>
  <div className='grid md:grid-cols-2 gap-6'>
    <div>
      <h3 className='text-xl font-semibold text-orange-700 mb-2'>Daily Puja</h3>
      <p className='text-gray-600'>
        Morning and evening prayers conducted by our priests
      </p>
    </div>
    <div>
      <h3 className='text-xl font-semibold text-orange-700 mb-2'>
        Special Ceremonies
      </h3>
      <p className='text-gray-600'>
        Weddings, naming ceremonies, and other rituals
      </p>
    </div>
    <div>
      <h3 className='text-xl font-semibold text-orange-700 mb-2'>Festivals</h3>
      <p className='text-gray-600'>
        Grand celebrations of major Hindu festivals
      </p>
    </div>
    <div>
      <h3 className='text-xl font-semibold text-orange-700 mb-2'>Classes</h3>
      <p className='text-gray-600'>Yoga, meditation, and Sanskrit classes</p>
    </div>
  </div>
</section>;

{
  /* Footer */

  <footer className='bg-orange-900 text-white py-12 mt-16'>
    <div className='container mx-auto px-4 text-center'>
      <p>&copy; 2025 Ganesha Temple. All rights reserved.</p>
    </div>
  </footer>;
}
