const express = require('express');
const cors = require('cors');
const path = require('node:path');
require('dotenv').config();
const { connectDB } = require('./db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
  : (process.env.NODE_ENV === 'production' ? false : '*');

// Middlewares
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
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

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'), err => {
      if (err) next(err);
    });
  });
}

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` SPICE & SOUL RESTAURANT API SERVER RUNNING   `);
    console.log(` Port: ${PORT}                                 `);
    console.log(` Address: 281 Abdul Haque Rd, Johar Town Lahore`);
    console.log(` API Endpoint: http://localhost:${PORT}/api    `);
    console.log(`===============================================`);
  });
}

startServer().catch(err => {
  console.error(`[Startup] Could not start server: ${err.message}`);
  process.exitCode = 1;
});
