const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    restaurant: 'Spice & Soul (Johar Town, Lahore)',
    tagline: 'Spice up your soul with our dangerously delicious cuisine',
    endpoints: {
      menu: '/api/menu',
      reservations: '/api/reservations',
      orders: '/api/orders',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

// Connect to DB and listen
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` SPICE & SOUL RESTAURANT API SERVER RUNNING   `);
    console.log(` Port: ${PORT}                                 `);
    console.log(` Address: 281 Abdul Haque Rd, Johar Town Lahore`);
    console.log(` API Endpoint: http://localhost:${PORT}/api    `);
    console.log(`===============================================`);
  });
});
