import React, { useEffect, useRef } from 'react';
import { ChevronRight, MapPin, Phone, Sparkles, Star } from 'lucide-react';

export default function Hero({ onOpenReserve }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pauseForReducedMotion = () => {
      if (motionPreference.matches) videoRef.current?.pause();
    };

    pauseForReducedMotion();
    motionPreference.addEventListener('change', pauseForReducedMotion);
    return () => motionPreference.removeEventListener('change', pauseForReducedMotion);
  }, []);

  return (
    <section className="cinematic-hero relative isolate flex min-h-[min(780px,100svh)] items-end overflow-hidden bg-stone-950 pt-36 pb-12 text-white sm:pt-40 md:pb-16">
      <video
        ref={videoRef}
        aria-hidden="true"
        className="cinematic-hero__video absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/cinematic-grill-poster.jpg"
      >
        <source src="/videos/cinematic-grill.mp4" type="video/mp4" />
      </video>
      <div aria-hidden="true" className="cinematic-hero__shade absolute inset-0 -z-10" />
      <div aria-hidden="true" className="cinematic-hero__grain absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-amber-100 shadow-2xl backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.9)]" />
            JOHAR TOWN · LAHORE
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-1.5 font-bold text-amber-300">
              <Star className="h-4 w-4 fill-current" />
              4.9
            </span>
            <span className="text-white/40">/</span>
            <span>218+ guest reviews</span>
            <span className="hidden text-white/40 sm:inline">·</span>
            <span className="hidden sm:inline">Open daily until 2:00 AM</span>
          </div>

          <h1 className="max-w-3xl font-heading text-5xl font-bold leading-[1.04] tracking-wide text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            Made with fire.
            <br />
            <span className="cinematic-hero__title-accent">Served with soul.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Slow-cooked handi, charcoal-kissed BBQ, and warm Lahore hospitality.
            Come hungry; leave with a story.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#reserve"
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-stone-950 shadow-[0_12px_35px_rgba(245,158,11,0.3)] transition duration-300 hover:-translate-y-1 hover:bg-amber-400"
            >
              <Sparkles className="h-4 w-4" />
              Reserve a table
              <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#menu"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              Explore the menu
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-white/75 sm:text-sm">
            <a
              href="https://maps.google.com/?q=281+Abdul+Haque+Rd,+Johar+Town,+Lahore"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-amber-200"
            >
              <MapPin className="h-4 w-4 text-amber-300" />
              Opposite Emporium Mall
            </a>
            <a
              href="tel:+923390008804"
              className="inline-flex items-center gap-2 transition hover:text-amber-200"
            >
              <Phone className="h-4 w-4 text-amber-300" />
              0339 0008804
            </a>
          </div>
        </div>

        <div className="cinematic-hero__feature mt-10 hidden max-w-xs rounded-2xl border border-white/20 bg-black/25 p-4 shadow-2xl backdrop-blur-lg md:block lg:absolute lg:bottom-16 lg:right-[max(3rem,calc((100vw-80rem)/2))] lg:mt-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
            The house favourite
          </p>
          <p className="mt-1 font-heading text-lg font-bold text-white">
            Dum Pukht Handi
          </p>
          <p className="mt-1 text-xs leading-5 text-white/70">
            Sealed, slow-cooked, and made for sharing.
          </p>
        </div>
      </div>

      <a
        href="#menu"
        aria-label="Scroll to menu"
        className="absolute bottom-5 right-5 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-white sm:flex lg:bottom-8 lg:right-10"
      >
        Discover the menu
        <span className="h-px w-8 bg-amber-400" />
      </a>
    </section>
  );
}
