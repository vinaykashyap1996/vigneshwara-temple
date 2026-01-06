export default function ContactHero() {
  return (
    <section className="relative">
      {/* Background layer matching Home page pattern (70% height) */}
      <div className="absolute inset-x-0 top-0 h-[70%] bg-orange-600" />

      {/* Hero Content */}
      <div className="relative">
        <div className="container-page">
          <div className="relative flex flex-col items-center justify-center text-center py-12 md:py-16 lg:py-20">
            <h1 className="h1 text-ivory mb-4">Contact &amp; Visit</h1>
            <p className="text-orange-100 text-lg md:text-xl font-medium max-w-2xl">
              We welcome you with open hearts. Reach out to us for any
              inquiries about Sevas, events, or your spiritual journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
