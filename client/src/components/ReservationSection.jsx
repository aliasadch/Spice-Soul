import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, MapPin, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

const seatingAreas = [
  {
    id: "Royal Indoor Lounge",
    title: "Royal Indoor Lounge",
    desc: "Plush velvet booth seating with warm golden chandelier mood lighting."
  },
  {
    id: "Rooftop Gazebo",
    title: "Rooftop Gazebo",
    desc: "Open-air starlit dining overlooking Abdul Haque Road."
  },
  {
    id: "Family Hall",
    title: "Johar Family Hall",
    desc: "Spacious private dining setups ideal for 6-20 family gatherings."
  },
  {
    id: "Chef's Counter",
    title: "Chef's Counter",
    desc: "Intimate table setting facing the open flame grill and tandoor."
  }
];

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 4,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '20:30',
    seatingArea: 'Royal Indoor Lounge',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.createReservation(formData);
      setConfirmation(res);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setError(err.message || 'Failed to confirm reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserve" className="py-20 md:py-28 bg-[#faf8f5] border-t border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant Table Confirmation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Reserve Your <span className="gold-gradient-text">Table</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Open daily until 2:00 AM. Family gatherings and special celebrations welcomed.
          </p>
        </div>

        {/* Confirmation Card */}
        {confirmation ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-emerald-500/50 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                We Look Forward to Hosting You, {confirmation.name}!
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2">
                Your table is confirmed at Spice &amp; Soul, Johar Town Lahore.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left">
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">Booking Code</p>
                <p className="text-sm font-extrabold text-amber-700">{confirmation.bookingCode}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">Date &amp; Time</p>
                <p className="text-xs font-bold text-stone-900">{confirmation.date} · {confirmation.time}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">Guests</p>
                <p className="text-xs font-bold text-stone-900">{confirmation.guests} Persons</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">Seating</p>
                <p className="text-xs font-bold text-stone-900 truncate">{confirmation.seatingArea}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/923390008804?text=Hi%20Spice%20%26%20Soul%2C%20I%20have%20a%20confirmed%20reservation%20${confirmation.bookingCode}%20for%20${confirmation.guests}%20guests%20on%20${confirmation.date}%20at%20${confirmation.time}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <span>Notify via WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmation(null)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all border border-stone-200"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form Layout */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Seating Area Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2 uppercase tracking-wider">
                  Select Seating Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {seatingAreas.map(area => (
                    <button
                      type="button"
                      key={area.id}
                      onClick={() => setFormData({ ...formData, seatingArea: area.id })}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        formData.seatingArea === area.id
                          ? 'bg-amber-50/80 border-amber-600 shadow-sm'
                          : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100 text-stone-600'
                      }`}
                    >
                      <p className={`text-xs font-bold ${formData.seatingArea === area.id ? 'text-amber-900' : 'text-stone-900'}`}>
                        {area.title}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {area.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usman Malik"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0339 0008804"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              {/* Guests, Date, Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Time Slot (Open till 2 AM)</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  >
                    {[
                      "13:00", "14:00", "15:00", "17:00", "18:30", "19:30", 
                      "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", 
                      "23:00", "23:30", "00:00", "00:30", "01:00"
                    ].map(t => (
                      <option key={t} value={t}>{t} HRS</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Special Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday / Anniversary celebration, baby chair, mild spice"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant table reservation. Zero deposit required.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-amber-600/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Confirming Table...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Table Reservation</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
