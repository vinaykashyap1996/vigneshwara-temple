import ContactHero from './components/ContactHero';
import ContactInfoCards from './components/ContactInfoCards';
import ContactForm from './components/ContactForm';
import MapEmbed from './components/MapEmbed';
import HowToReach from './components/HowToReach';
import DarshanTimings from './components/DarshanTimings';

export const metadata = {
  title: 'Contact & Visit - Ganesha Temple',
  description:
    'Visit Ganesha Temple - Find our location, timings, and contact information. We are here to help you with your spiritual journey.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT COLUMN: Location & Info (7/12) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <MapEmbed />
              <ContactInfoCards />
              <HowToReach />
            </div>

            {/* RIGHT COLUMN: Timings & Form (5/12) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <DarshanTimings />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
