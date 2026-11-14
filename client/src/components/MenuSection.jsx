import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Plus, Check } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const categories = [
  "All",
  "Chef's Signatures",
  "Charcoal BBQ & Tandoor",
  "Royal Karahi & Curries",
  "Rice & Dum Biryani",
  "Continental & Grills",
  "Artisanal Breads",
  "Decadent Desserts",
  "Soul Beverages & Mocktails"
];

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedIds, setAddedIds] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await api.getMenu();
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  const handleAdd = (item) => {
    addToCart(item, 1);
    setAddedIds(prev => ({ ...prev, [item.id || item._id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id || item._id]: false }));
    }, 1200);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="menu-section relative overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="menu-section__glow menu-section__glow--one" />
      <div aria-hidden="true" className="menu-section__glow menu-section__glow--two" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="menu-section__intro text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-800 font-extrabold px-4 py-2 rounded-full bg-white/80 border border-amber-200 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Made fresh in Johar Town
          </span>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Find your <span className="menu-section__title-accent">new favourite.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            From smoky charcoal grills to slow-cooked handi, every plate is prepared fresh with bold Lahore flavour.
          </p>
        </div>

        {/* Search & Counter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="menu-search relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
            <input
              type="text"
              placeholder="Search handi, karahi, steak, biryani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white/90 py-3.5 pl-11 pr-4 text-sm text-stone-900 shadow-sm transition duration-300 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          <div className="self-end rounded-full border border-amber-100 bg-white/80 px-4 py-2 text-xs font-medium text-stone-500 shadow-sm md:self-center">
            Showing <strong className="font-bold text-amber-800">{filteredItems.length}</strong> delicious dishes
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="menu-categories mb-10 flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`menu-category-pill shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 sm:text-sm ${
                activeCategory === cat
                  ? 'menu-category-pill--active bg-stone-900 text-white shadow-lg shadow-stone-900/15'
                  : 'border border-stone-200/80 bg-white/75 text-stone-700 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-stone-500 font-medium">Loading delicious dishes...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-base font-semibold">No dishes found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => {
              const isAdded = addedIds[item.id || item._id];
              const isMalaiBoti = item.name === 'Afghani Velvet Malai Boti';
              const image = isMalaiBoti ? '/images/menu/afghani-malai-boti.jpg' : item.image;
              return (
                <div
                  key={item.id || item._id}
                  className="menu-card group flex flex-col justify-between overflow-hidden rounded-[1.4rem] border border-stone-200/80 bg-white shadow-[0_8px_28px_rgba(54,36,19,0.07)] transition duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-[0_24px_55px_rgba(93,56,19,0.16)]"
                  style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                >
                  {/* Dish Image */}
                  <div className="menu-card__image relative h-60 w-full overflow-hidden bg-stone-200">
                    <img
                      src={image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#170d08]/80 via-[#170d08]/5 to-[#170d08]/15 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="max-w-[72%] truncate rounded-full border border-white/35 bg-stone-950/45 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md sm:text-[11px]">
                        {item.category}
                      </span>
                      {item.isSignature && (
                        <span className="rounded-full border border-amber-200/40 bg-amber-400 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-stone-950 shadow-md">
                          Chef's Pick
                        </span>
                      )}
                    </div>

                    {/* Rating badge */}
                    <div className="flex items-center gap-1 rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-xs font-extrabold text-stone-900 shadow-lg backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{item.rating || 4.9}</span>
                    </div>

                    <div className="text-xs font-bold text-white drop-shadow-lg">
                      {item.prepTime || "20 mins"}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-stone-900 transition-colors group-hover:text-amber-800">
                        {item.name}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Info & Cart Action */}
                    <div className="mt-5 flex items-center justify-between border-t border-amber-950/5 pt-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-stone-400">Price</span>
                        <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-stone-900">
                          Rs {item.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-extrabold shadow-md transition duration-300 hover:-translate-y-0.5 ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-emerald-700/15'
                            : 'bg-amber-500 text-stone-950 shadow-amber-700/20 hover:bg-amber-400'
                        }`}
                        title="Add to order"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
