export default function GalleryHero() {
  return (
    <div className='relative py-10 md:py-16 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6'>
      {/* Subtle glow effect */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-orange-500/5 blur-[120px] rounded-full pointer-events-none'></div>

      {/* Breadcrumb/Label */}
      <div className='flex items-center gap-2 text-orange-600 text-sm font-medium uppercase tracking-[0.2em] mb-2 z-10'>
        <span className='h-[1px] w-8 bg-orange-500/40'></span>
        Visual Archive
        <span className='h-[1px] w-8 bg-orange-500/40'></span>
      </div>

      {/* Title */}
      <h1 className='text-5xl md:text-7xl font-light text-fg tracking-wide leading-tight z-10'>
        Sacred <span className='font-serif italic text-orange-500'>Moments</span>
      </h1>

      {/* Description */}
      <p className='text-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl z-10'>
        A curated collection of divine darshans, festive grandeur, and the
        silent daily rituals that breathe life into Shri Vighneshwara Swamy
        Temple.
      </p>
    </div>
  );
}
