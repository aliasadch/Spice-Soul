import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Flame, Menu as MenuIcon, X, Star, Clock, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      
      {/* Top Quick Info Bar */}
      <div className="bg-[#1c1917] text-stone-200 text-[11px] py-1.5 px-4 hidden md:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              281 Abdul Haque Rd, Opposite Emporium Mall, Johar Town, Lahore
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <strong className="text-white">Open Today:</strong> 12:00 PM – 02:00 AM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              4.9 (218 Reviews)
            </span>
            <span className="text-stone-500">|</span>
            <a
              href="tel:+923390008804"
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>+92 339 0008804</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky White Navbar */}
      <nav
        className={`bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'py-3 shadow-md border-b border-stone-200' : 'py-4 border-b border-stone-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 p-0.5 shadow-md shadow-amber-600/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-stone-900">
                    Spice <span className="text-amber-600">&amp;</span> Soul
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                  Johar Town · Lahore
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-700">
              <a href="#menu" className="hover:text-amber-600 transition-colors py-1">
                Our Menu
              </a>
              <a href="#reserve" className="hover:text-amber-600 transition-colors py-1 flex items-center gap-1.5">
                <span>Book a Table</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </a>
              <a href="#reviews" className="hover:text-amber-600 transition-colors py-1">
                Guest Reviews
              </a>
              <a href="#location" className="hover:text-amber-600 transition-colors py-1">
                Location &amp; Map
              </a>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Direct Call Button */}
              <a
                href="tel:+923390008804"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-xs font-bold transition-all border border-stone-200"
                title="Call Restaurant"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>0339 0008804</span>
              </a>

              {/* Order / Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-600/25"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Online</span>
                {totalCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white text-amber-700 text-[11px] font-extrabold shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>

            </div>

            {/* Mobile Actions: Cart & Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-amber-600 text-white shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {totalCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 p-4 rounded-2xl bg-white border border-stone-200 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs text-stone-600 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Open Now · Closes 2:00 AM
                </span>
                <span className="text-amber-700 font-bold">Rs 3,000–4,000</span>
              </div>

              <div className="flex flex-col gap-2 text-sm font-semibold text-stone-800">
                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-stone-50 hover:text-amber-600 transition-colors"
                >
                  Our Menu
                </a>
                <a
                  href="#reserve"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-stone-50 hover:text-amber-600 transition-colors flex items-center justify-between"
                >
                  <span>Book Table</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">Instant</span>
                </a>
                <a
                  href="#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-stone-50 hover:text-amber-600 transition-colors"
                >
                  Customer Reviews (4.9 ★)
                </a>
                <a
                  href="#location"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-stone-50 hover:text-amber-600 transition-colors"
                >
                  Location &amp; Directions
                </a>
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                <a
                  href="tel:+923390008804"
                  className="w-full py-2.5 rounded-xl bg-amber-600 text-white text-center font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 0339 0008804</span>
                </a>

              </div>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}
