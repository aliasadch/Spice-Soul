import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export default function LocationContact() {
  const googleMapsUrl = "https://maps.google.com/?q=281+Abdul+Haque+Rd+Block+H+2+Phase+2+Johar+Town+Lahore";

  return (
    <section id="location" className="py-20 md:py-28 bg-[#faf8f5] border-t border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-extrabold px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
            Johar Town, Lahore
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mt-3 tracking-tight">
            Find <span className="gold-gradient-text">Spice &amp; Soul</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Conveniently located on Abdul Haque Road, right opposite Emporium Mall.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-stone-200 shadow-xl">
            
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Address</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-1 leading-relaxed">
                    281 Abdul Haque Rd, Block H 2 Phase 2, <br />
                    Opposite Emporium Mall, Johar Town, Lahore
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-bold mt-2 hover:underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Opening Hours</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-1">
                    Monday – Sunday: <span className="text-emerald-700 font-extrabold">12:00 PM – 02:00 AM</span>
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open Now · Late Night Kitchen</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-stone-100 text-stone-700 border border-stone-200 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Reservations &amp; Enquiries</h4>
                  <div className="mt-1 space-y-1">
                    <a
                      href="tel:+923390008804"
                      className="block text-sm text-amber-700 font-extrabold hover:underline"
                    >
                      +92 339 0008804
                    </a>
                    <a
                      href="tel:+923099998626"
                      className="block text-xs text-stone-600 font-medium hover:text-stone-900"
                    >
                      +92 30 9999 8626
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Channels & WhatsApp */}
            <div className="pt-6 border-t border-stone-100 space-y-3">
              <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Follow Spice &amp; Soul Community
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/spiceandsoullhr/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-2 transition-all shadow-2xs"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-600" />
                  <span>@spiceandsoullhr (1.1K+)</span>
                </a>

                <a
                  href="https://www.facebook.com/SpiceandSoulLHR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-2 transition-all shadow-2xs"
                >
                  <FacebookIcon className="w-4 h-4 text-blue-600" />
                  <span>Spice &amp; Soul (1.3K+)</span>
                </a>

                <a
                  href="https://wa.me/923390008804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 transition-all shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Map Canvas Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl relative min-h-[420px]">
            {/* Clean Google Map iframe */}
            <iframe
              title="Spice and Soul Johar Town Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.491228020921!2d74.26949367629575!3d31.455648850337077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903000ee14c75%3A0x40e5ea1d53d9d66b!2sSpice%20%26%20Soul!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Custom Interactive Floating Pin Badge */}
            <div className="absolute top-4 left-4 z-10 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <Navigation className="w-4 h-4 text-amber-600" />
                <span>Spice &amp; Soul Lahore</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 font-medium">
                Opposite Emporium Mall, Abdul Haque Rd
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
