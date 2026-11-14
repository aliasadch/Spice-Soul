const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { initialMenuItems, initialReviews, initialReservations } = require('./data/seedData');
const MenuItem = require('./models/MenuItem');

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
  const isProduction = process.env.NODE_ENV === 'production';
  const uri = process.env.MONGODB_URI || (isProduction ? null : 'mongodb://127.0.0.1:27017/spice_and_soul');

  if (!uri) {
    throw new Error('MONGODB_URI must be configured in production.');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isProduction ? 10000 : 2000
    });
    isMongoConnected = true;
    console.log('[Database] Connected to MongoDB.');
  } catch (err) {
    isMongoConnected = false;
    if (isProduction) {
      throw err;
    }
    console.log(`[Database] MongoDB not running locally (${err.message}). Defaulting to High-Performance JSON/Memory Engine!`);
    return;
  }

  if (await MenuItem.countDocuments() === 0) {
    const seedMenuItems = initialMenuItems.map(({ id, ...item }) => item);
    await MenuItem.insertMany(seedMenuItems);
    console.log(`[Database] Seeded menu with ${seedMenuItems.length} sample items.`);
  }
}

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  getStore: () => inMemoryStore,
  persistStore
};
