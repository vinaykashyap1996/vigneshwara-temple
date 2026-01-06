'use client';

export default function MapEmbed() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-orange-500 text-2xl">
          location_on
        </span>
        <h2 className="h3 text-fg">Locate Us</h2>
      </div>

      <div className="relative w-full h-[320px] md:h-[400px] bg-orange-50 rounded-xl overflow-hidden border border-border group">
        {/* Embedded Google Map - Replace src with actual temple location */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3892469916687!2d77.56789931482254!3d13.010181990827537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d6411bda3fb%3A0x7426c58ea576e0f8!2sMalleshwaram%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ganesha Temple Location Map"
          className="grayscale-[30%] contrast-110"
        />

        {/* Overlay with CTA */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
          <a
            href="https://maps.google.com/?q=Ganesha+Temple+Malleshwaram+Bangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto btn btn-gold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            <span className="material-symbols-outlined">map</span>
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
