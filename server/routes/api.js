const express = require('express');
const router = express.Router();
const { isMongoConnected, getStore, persistStore } = require('../db');
const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');
const Order = require('../models/Order');
const Review = require('../models/Review');
const { loginAdmin, requireAdmin } = require('../middleware/adminAuth');

// --- MENU ROUTES ---
router.post('/admin/login', loginAdmin);

router.get('/menu', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const items = await MenuItem.find().sort({ createdAt: -1 });
      return res.json(items);
    }
    const store = getStore();
    return res.json(store.menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/menu', requireAdmin, async (req, res) => {
  try {
    const newItemData = req.body;
    if (isMongoConnected()) {
      const created = await MenuItem.create(newItemData);
      return res.status(201).json(created);
    }
    const store = getStore();
    const created = {
      id: `item-${Date.now()}`,
      ...newItemData,
      rating: newItemData.rating || 5.0,
      reviewsCount: 1
    };
    store.menu.unshift(created);
    persistStore();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- RESERVATIONS ROUTES ---
router.get('/reservations', requireAdmin, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const reservations = await Reservation.find().sort({ createdAt: -1 });
      return res.json(reservations);
    }
    const store = getStore();
    return res.json(store.reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/reservations', async (req, res) => {
  try {
    const { name, phone, email, guests, date, time, seatingArea, specialRequests } = req.body;
    
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: 'Name, phone, date, and time are required.' });
    }

    const bookingCode = `SS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation = {
      bookingCode,
      name,
      phone,
      email: email || '',
      guests: Number(guests) || 2,
      date,
      time,
      seatingArea: seatingArea || 'Royal Indoor Lounge',
      specialRequests: specialRequests || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const created = await Reservation.create(newReservation);
      return res.status(201).json(created);
    }

    const store = getStore();
    const created = { id: `res-${Date.now()}`, ...newReservation };
    store.reservations.unshift(created);
    persistStore();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/reservations/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isMongoConnected()) {
      const updated = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
      return res.json(updated);
    }

    const store = getStore();
    const item = store.reservations.find(r => r.id === id || r.bookingCode === id);
    if (item) {
      item.status = status;
      persistStore();
      return res.json(item);
    }
    res.status(404).json({ error: 'Reservation not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- ORDERS ROUTES ---
router.get('/orders', requireAdmin, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    }
    const store = getStore();
    return res.json(store.orders || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { customerName, phone, items, totalAmount, orderType, tableNumber, deliveryAddress, instructions } = req.body;

    if (!customerName || !phone || !items || !items.length) {
      return res.status(400).json({ error: 'Customer name, phone, and items are required.' });
    }

    const orderCode = `SSO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderCode,
      customerName,
      phone,
      items,
      totalAmount: Number(totalAmount) || 0,
      orderType: orderType || 'Dine-In',
      tableNumber: tableNumber || '',
      deliveryAddress: deliveryAddress || '',
      instructions: instructions || '',
      status: 'Received',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const created = await Order.create(newOrder);
      return res.status(201).json(created);
    }

    const store = getStore();
    if (!store.orders) store.orders = [];
    const created = { id: `ord-${Date.now()}`, ...newOrder };
    store.orders.unshift(created);
    persistStore();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/orders/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isMongoConnected()) {
      const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
      return res.json(updated);
    }

    const store = getStore();
    const item = (store.orders || []).find(o => o.id === id || o.orderCode === id);
    if (item) {
      item.status = status;
      persistStore();
      return res.json(item);
    }
    res.status(404).json({ error: 'Order not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- REVIEWS ROUTES ---
router.get('/reviews', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.json(reviews);
    }
    const store = getStore();
    return res.json(store.reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/reviews', async (req, res) => {
  try {
    const { author, rating, comment, dishOrdered } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ error: 'Author, rating, and comment are required.' });
    }

    const newReview = {
      author,
      rating: Number(rating),
      comment,
      dishOrdered: dishOrdered || 'Signature Delight',
      verifiedGoogle: false,
      date: 'Just now',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const created = await Review.create(newReview);
      return res.status(201).json(created);
    }

    const store = getStore();
    const created = { id: `rev-${Date.now()}`, ...newReview };
    store.reviews.unshift(created);
    persistStore();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- RESTAURANT STATS ---
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    let totalOrders;
    let totalReservations;
    let activeMenuCount;
    let reviews;

    if (isMongoConnected()) {
      [totalOrders, totalReservations, activeMenuCount, reviews] = await Promise.all([
        Order.countDocuments(),
        Reservation.countDocuments(),
        MenuItem.countDocuments(),
        Review.find()
      ]);
    } else {
      const store = getStore();
      totalOrders = store.orders ? store.orders.length : 0;
      totalReservations = store.reservations ? store.reservations.length : 0;
      activeMenuCount = store.menu.length;
      reviews = store.reviews || [];
    }

    const avgRating = reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / reviews.length).toFixed(1)
      : '0.0';

    res.json({
      name: "Spice & Soul",
      location: "281 Abdul Haque Rd, Block H 2 Phase 2 Opposite Emporium Mall, Johar Town, Lahore",
      phone: "+92 339 0008804",
      secondaryPhone: "030 9999 8626",
      hours: "12:00 PM - 02:00 AM Daily",
      rating: Number(avgRating),
      reviewCount: reviews.length,
      priceRange: "Rs 3,000–4,000",
      totalOrders,
      totalReservations,
      activeMenuCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
