const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 10 },
  spiceLevel: { type: String, default: "Medium" },
  dietary: { type: String, default: "Halal" },
  prepTime: { type: String, default: "20 mins" },
  isSignature: { type: Boolean, default: false },
  description: { type: String, required: true },
  image: { type: String },
  modelType: { type: String, default: "handi" },
  flavorProfile: {
    Spiciness: { type: Number, default: 50 },
    Richness: { type: Number, default: 50 },
    Aroma: { type: Number, default: 50 },
    Crispiness: { type: Number, default: 50 }
  }
}, { timestamps: true });

module.exports = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
