import React from 'react';
import { Flame, Star, Phone, MapPin, Clock, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-[#f5f2eb] border-t border-stone-200 pt-16 pb-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 p-0.5 shadow-md shadow-amber-600/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <span className="font-heading text-2xl font-bold tracking-wider text-stone-900">
                Spice <span className="text-amber-600">&amp;</span> Soul
              </span>
            </div>

            <p className="text-stone-600 leading-relaxed text-xs max-w-sm">
              "Spice up your soul with our dangerously delicious cuisine." <br />
              Bold flavors, tender chicken, and spices that sing—serving culinary masterpieces in every bite at Johar Town, Lahore.
            </p>

            <div className="flex items-center gap-2 pt-1 text-amber-800 text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>4.9 Star Dining Experience · 218+ Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-heading text-xs uppercase tracking-wider text-stone-900 font-bold">
              Navigation
            </h5>
            <ul className="space-y-2 font-medium">
              <li><a href="#menu" className="hover:text-amber-600 transition-colors">Explore Our Menu</a></li>
              <li><a href="#menu" className="hover:text-amber-600 transition-colors">Artisanal Food Menu</a></li>
              <li><a href="#reserve" className="hover:text-amber-600 transition-colors">Book a Table</a></li>
              <li><a href="#reviews" className="hover:text-amber-600 transition-colors">Customer Reviews (4.9 ★)</a></li>
              <li><a href="#location" className="hover:text-amber-600 transition-colors">Location &amp; Directions</a></li>
            </ul>
          </div>

          {/* Hours & Dining */}
          <div className="space-y-3">
            <h5 className="font-heading text-xs uppercase tracking-wider text-stone-900 font-bold">
              Johar Town Branch
            </h5>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-900">12:00 PM – 02:00 AM</p>
                  <p className="text-[11px] text-stone-500">Open 7 Days a Week</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  281 Abdul Haque Rd, Opposite Emporium Mall, Johar Town
                </p>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h5 className="font-heading text-xs uppercase tracking-wider text-stone-900 font-bold">
              Contact &amp; Social
            </h5>
            <div className="space-y-2">
              <a
                href="tel:+923390008804"
                className="flex items-center gap-2 text-amber-700 font-extrabold hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+92 339 0008804</span>
              </a>
              <a
                href="tel:+923099998626"
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>030 9999 8626</span>
              </a>

              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/spiceandsoullhr/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-pink-600 border border-stone-200 shadow-2xs transition-colors"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/SpiceandSoulLHR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-blue-600 border border-stone-200 shadow-2xs transition-colors"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Spice &amp; Soul Restaurant. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Lahore's Food Lovers
          </p>
        </div>

      </div>
    </footer>
  );
}
