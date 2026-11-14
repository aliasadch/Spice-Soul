import React, { useState } from 'react';
import { Star, Clock, Sparkles, Plus, Check, Flame } from 'lucide-react';
import DishViewer3D from './3d/DishViewer3D';
import { useCart } from '../context/CartContext';

const showcaseItems = [
  {
    id: "item-1",
    name: "Dum Pukht Lamb Shank Handi",
    modelType: "handi",
    tagline: "Slow-cooked 8 hours in sealed earthen handi with Kashmiri spices",
    price: 3450,
    rating: 4.95,
    prepTime: "25-30 mins",
    dietary: "Chef Special / Halal",
    description: "Our crowning jewel: tender prime lamb shanks slow-simmered in rich bone marrow jus, saffron, and pure country butter inside a dough-sealed clay pot.",
    flavorProfile: { Spiciness: 65, Richness: 95, Aroma: 98, Crispiness: 25 },
    ingredients: ["Prime Lamb Shank", "Kashmiri Chili", "Pure Desi Ghee", "Iranian Saffron", "Green Cardamom", "Ginger Juliennes"]
  },
  {
    id: "item-2",
    name: "Spice & Soul Grand Tandoori Platter",
    modelType: "platter",
    tagline: "Sizzling charcoal BBQ cuts served with fresh clay oven bread",
    price: 3850,
    rating: 4.98,
    prepTime: "20-25 mins",
    dietary: "Family Sharing",
    description: "The ultimate gathering feast: succulent Afghani Malai Boti, smoked beef seekh kebabs, fiery wings, and charred chicken tikka with minted raita and hot naan.",
    flavorProfile: { Spiciness: 85, Richness: 88, Aroma: 95, Crispiness: 90 },
    ingredients: ["Afghani Malai Boti", "Beef Seekh Kebabs", "Charred Tikka", "Garlic Naan", "Mint Dip", "Charred Onions"]
  },
  {
    id: "item-5",
    name: "Artisanal Truffle Garlic Naan",
    modelType: "naan",
    tagline: "Tandoor blistered bread drizzled with imported Italian truffle oil",
    price: 850,
    rating: 4.94,
    prepTime: "10 mins",
    dietary: "Vegetarian",
    description: "Hand-stretched organic leavened flatbread baked against glowing tandoor clay, brushed with roasted garlic butter, molten mozzarella, and white truffle glaze.",
    flavorProfile: { Spiciness: 20, Richness: 88, Aroma: 98, Crispiness: 85 },
    ingredients: ["Fine Organic Flour", "Italian Truffle Oil", "Roasted Garlic", "Molten Mozzarella", "Fresh Parsley"]
  },
  {
    id: "item-9",
    name: "Saffron Tres Leches Milk Cake",
    modelType: "dessert",
    tagline: "Delicate sponge soaked in three saffron-infused creamy milks",
    price: 950,
    rating: 4.95,
    prepTime: "5 mins",
    dietary: "House Dessert",
    description: "An airy sponge cake steeped overnight in a rich reduction of condensed, evaporated, and whole milk infused with royal saffron, finished with chantilly cream and 24K gold leaf.",
    flavorProfile: { Spiciness: 0, Richness: 96, Aroma: 94, Crispiness: 20 },
    ingredients: ["Airy Sponge", "Iranian Saffron", "Condensed Milk", "Chantilly Cream", "Pistachio Slivers", "24K Gold Leaf"]
  },
  {
    id: "item-10",
    name: "Johar Town Sunset Glow Mocktail",
    modelType: "drink",
    tagline: "Cold sparkling elixir with blood orange, passionfruit & mint",
    price: 680,
    rating: 4.91,
    prepTime: "5 mins",
    dietary: "Refreshing Mocktail",
    description: "A refreshing sensory experience: cold-pressed blood orange reduction, tart passion fruit nectar, crushed mountain ice, fresh garden mint, and sparkling mist.",
    flavorProfile: { Spiciness: 10, Richness: 40, Aroma: 90, Crispiness: 95 },
    ingredients: ["Blood Orange", "Passion Fruit Nectar", "Johar Town Mint", "Sparkling Mist", "Crushed Ice", "Citrus Wheel"]
  }
];

export default function CulinaryShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  const item = showcaseItems[selectedIdx];

  const handleAdd = () => {
    addToCart(item, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <section id="showcase" className="py-20 md:py-28 bg-[#fdfbf7] border-y border-stone-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive 3D Dish Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Culinary <span className="gold-gradient-text">Masterpieces</span> in 3D
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Rotate, examine, and explore the textures, aromas, and craftsmanship behind 
            Spice &amp; Soul’s most celebrated dishes.
          </p>
        </div>

        {/* Dish Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar">
          {showcaseItems.map((dish, idx) => (
            <button
              key={dish.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 shadow-xs ${
                selectedIdx === idx
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 border border-amber-600'
                  : 'bg-white text-stone-700 hover:text-amber-600 border border-stone-200/90'
              }`}
            >
              <span>{dish.name.split(' ')[0]} {dish.name.split(' ')[1] || ''}</span>
              <span className={`text-[11px] ${selectedIdx === idx ? 'text-amber-100' : 'text-stone-400 font-semibold'}`}>
                Rs {dish.price.toLocaleString()}
              </span>
            </button>
          ))}
        </div>

        {/* 3D Showcase Presentation Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 3D Interactive Canvas */}
          <div className="lg:col-span-7 w-full">
            <DishViewer3D modelType={item.modelType} />
          </div>

          {/* Right Column: Dish Details & Flavor Radar */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  {item.dietary}
                </span>
                <div className="flex items-center gap-1 text-amber-600 text-xs font-bold bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{item.rating} Rating</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
                {item.name}
              </h3>
              <p className="text-xs text-amber-700 font-semibold mt-1">
                {item.tagline}
              </p>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {item.description}
            </p>

            {/* Flavor Profile Bars */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Flavor Signature Analysis
              </p>
              {Object.entries(item.flavorProfile).map(([trait, value]) => (
                <div key={trait} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-600 font-medium">{trait}</span>
                    <span className="text-amber-700 font-extrabold">{value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200/90 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Key Ingredients */}
            <div>
              <p className="text-xs font-bold text-stone-700 mb-2">Key Ingredients:</p>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Add to Order CTA */}
            <div className="pt-3 flex items-center justify-between border-t border-stone-200">
              <div>
                <p className="text-[11px] text-stone-500 font-medium">Price (inclusive of taxes)</p>
                <p className="text-2xl font-extrabold text-stone-900">
                  Rs {item.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={handleAdd}
                className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-sm ${
                  justAdded
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/25 hover:scale-[1.02]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Order</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
