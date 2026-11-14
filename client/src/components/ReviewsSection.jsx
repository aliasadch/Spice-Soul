import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ThumbsUp } from 'lucide-react';
import { api } from '../services/api';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    comment: '',
    dishOrdered: 'Dum Pukht Lamb Shank Handi'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await api.getReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createReview(newReview);
      setSubmitted(true);
      setTimeout(() => {
        setIsWriting(false);
        setSubmitted(false);
        setNewReview({ author: '', rating: 5, comment: '', dishOrdered: 'Dum Pukht Lamb Shank Handi' });
        loadReviews();
      }, 1500);
    } catch (err) {
      alert(err.message || 'Error submitting review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#ffffff] border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Google Verified Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              Loved by <span className="gold-gradient-text">Lahoris</span>
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-xl">
              Authentic feedback from food enthusiasts who cherish our tender BBQ, authentic handi, and late night dining.
            </p>
          </div>

          <button
            onClick={() => setIsWriting(!isWriting)}
            className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wide transition-all flex items-center gap-2 shadow-md shadow-amber-600/25"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{isWriting ? 'Cancel Review' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-5xl font-extrabold text-stone-900">4.9</span>
              <div>
                <div className="flex text-amber-500 gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 font-medium mt-1">Based on 218+ Google Reviews</p>
              </div>
            </div>
            <p className="text-xs text-amber-800 font-bold mt-3">
              Rs 3,000–4,000 per person · Family-Friendly
            </p>
          </div>

          <div className="md:col-span-5 space-y-1.5">
            {[
              { stars: 5, pct: 92 },
              { stars: 4, pct: 6 },
              { stars: 3, pct: 1 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 1 }
            ].map(row => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-3 text-stone-500 font-bold">{row.stars}</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-stone-500 text-[11px] font-semibold">{row.pct}%</span>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 text-center md:text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              ● Top Rated in Johar Town
            </span>
            <p className="text-xs text-stone-500">
              Kitchen open daily until 2:00 AM.
            </p>
          </div>

        </div>

        {/* Write a Review Modal / Expand Form */}
        {isWriting && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xl">
            {submitted ? (
              <div className="py-6 text-center text-emerald-600 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-bold">Thank you for sharing your experience!</span>
              </div>
            ) : (
              <form onSubmit={handlePostReview} className="space-y-4 max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-stone-900 text-center">Share Your Experience</h3>
                
                <div className="flex justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newReview.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zainab Tariq"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Favorite Dish Ordered</label>
                  <input
                    type="text"
                    placeholder="e.g. Dum Pukht Lamb Shank Handi / Truffle Naan"
                    value={newReview.dishOrdered}
                    onChange={(e) => setNewReview({ ...newReview, dishOrdered: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Review Comments</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other diners about the food taste, service, ambiance..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md shadow-amber-600/25 disabled:opacity-50"
                >
                  {submitting ? 'Submitting Review...' : 'Publish Review'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id || rev._id}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-amber-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500 gap-0.5">
                    {Array.from({ length: Math.round(rev.rating) }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">{rev.date || 'Recently'}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-stone-900">{rev.author}</p>
                    <p className="text-[11px] text-amber-800 font-semibold">
                      Ordered: {rev.dishOrdered}
                    </p>
                  </div>
                  {rev.verifiedGoogle && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200 font-bold">
                      Google
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
