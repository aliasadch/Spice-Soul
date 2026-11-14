const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { initialMenuItems, initialReviews, initialReservations } = require('./data/seedData');

const STORE_PATH = path.join(__dirname, 'data', 'store.json');

// Memory/JSON backup store
let inMemoryStore = {
  menu: [...initialMenuItems],
  reviews: [...initialReviews],
  reservations: [...initialReservations],
  orders: [
    {
      id: "ord-501",
      orderCode: "SSO-3390",
      customerName: "Ahmed Raza",
      phone: "03028889911",
      items: [
        { id: "item-1", name: "Dum Pukht Lamb Shank Handi", price: 3450, quantity: 1 },
        { id: "item-5", name: "Artisanal Truffle Garlic Naan", price: 850, quantity: 2 }
      ],
      totalAmount: 5150,
      orderType: "Dine-In",
      tableNumber: "T-07",
      status: "Preparing",
      createdAt: new Date().toISOString()
    }
  ]
};

// Load existing store.json if available
try {
  if (fs.existsSync(STORE_PATH)) {
    const data = JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
    inMemoryStore = { ...inMemoryStore, ...data };
  } else {
    fs.writeFileSync(STORE_PATH, JSON.stringify(inMemoryStore, null, 2));
  }
} catch (e) {
  console.warn("Could not read local store, using default seed:", e.message);
}

function persistStore() {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(inMemoryStore, null, 2));
  } catch (err) {
    console.error("Error saving store to disk:", err.message);
  }
}

let isMongoConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spice_and_soul';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log(`[Database] Connected to MongoDB at ${uri}`);
  } catch (err) {
    isMongoConnected = false;
    console.log(`[Database] MongoDB not running locally (${err.message}). Defaulting to High-Performance JSON/Memory Engine!`);
  }
}

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  getStore: () => inMemoryStore,
  persistStore
};
