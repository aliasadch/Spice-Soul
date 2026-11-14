# 🔥 Spice & Soul — 3D MERN Restaurant Web Application

> **"Spice up your soul with our dangerously delicious cuisine."**  
> **Rating:** 4.9 ★ (218+ Google Reviews)  
> **Dining Tier:** Rs 3,000–4,000 per person (Family-friendly)  
> **Location:** 281 Abdul Haque Rd, Block H 2 Phase 2 Opposite Emporium Mall, Johar Town, Lahore  
> **Contact:** +92 339 0008804 / 030 9999 8626  
> **Hours:** Open daily until 2:00 AM  

---

## 🌟 Overview

A luxury 3D interactive web platform for **Spice & Soul**, Lahore's premier dining destination in Johar Town. Built on the **MERN** stack (MongoDB, Express, React 19, Node.js) with **Three.js** and **React Three Fiber**, this application brings Lahore's rich food heritage to life in an immersive digital dining experience.

---

## ✨ Features

### 1. 🍲 3D Hero Experience
- **Interactive 3D Royal Handi**: Drag and rotate 360° to inspect the terracotta and hammered brass handi vessel with sizzling gravy and herb garnishes.
- **Dynamic Particle Systems**: Procedural steam cloud rising from the hot dish, floating whole spices (star anise, emerald cardamom pods, rolled cinnamon sticks) and golden embers.
- **Atmospheric Lighting Studio**: Switch live between **Royal Amber**, **Fiery Sizzle**, and **Midnight** ambiance presets, and toggle steam particle simulation on/off.

### 2. 🔍 3D Culinary Masterpiece Showcase
- Switch between signature items:
  - **Dum Pukht Lamb Shank Handi** (earthen clay vessel with rogan josh glaze)
  - **Spice & Soul Grand Tandoori Platter** (sizzling cast iron skillet, charred seekh kebabs, lemon wedges)
  - **Artisanal Truffle Garlic Naan** (blistered clay oven bread with truffle glaze and herbs)
  - **Saffron Tres Leches Cake** (layered dessert with 24K edible gold leaf and pistachio crumble)
  - **Johar Town Sunset Glow Mocktail** (tall frosted tumbler with sunset gradient liquids and bubbles)
- **Flavor Signature Analysis**: Dynamic radar bars for Spiciness, Richness, Aroma, and Crispiness.
- **Key Ingredients breakdown** & one-click ordering.

### 3. 📋 Artisanal Menu & Online Basket
- Categorized browsing: Chef's Signatures, Charcoal BBQ & Tandoor, Royal Karahi & Curries, Rice & Dum Biryani, Continental & Grills, Artisanal Breads, Decadent Desserts, Soul Beverages.
- Real-time search with instant filtering.
- Full shopping cart with quantity controls, service type selector (**Dine-In**, **Takeaway**, **Delivery** in Johar Town), and coupon code support (`SPICE10` for 10% VIP discount).

### 4. 📅 Instant Table Reservation Engine
- Book tables in real time with guest count (1–20 persons), date, and time slot (open until 2:00 AM).
- Choose your seating preference: **Royal Indoor Lounge**, **Rooftop Gazebo**, **Johar Family Hall**, or **Chef's Counter**.
- Instant booking code generation (e.g., `SS-7842`), confetti celebration, and direct WhatsApp sync.

### 5. ⭐ Google Verified Reviews & Community
- Reflects the true **4.9 ★ Rating** with 218 reviews breakdown (5-star distribution).
- Verified Google review badges and favorite dishes cited.
- Interactive **Write a Review** modal that posts directly to the backend database.

### 6. 📍 Location & Contact
- Exact location opposite Emporium Mall, Abdul Haque Rd, Johar Town, Lahore.
- Embedded interactive dark-mode Google Map with one-click directions.
- Direct quick dial (`0339 0008804`) and social integration (@spiceandsoullhr on Instagram & Facebook).

### 7. 🛡️ Live Kitchen & Admin Management Portal
- Password-protected management portal to track reservations and incoming food orders.
- Change statuses in real-time (e.g., "Confirmed", "Seated", "Preparing", "Ready").
- Add new artisanal dishes directly to the live menu.
- Reservation, order, stats, and menu-management endpoints require an admin session.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Three.js, @react-three/fiber, @react-three/drei, TailwindCSS, Lucide React, Canvas Confetti |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB / Mongoose schema validation with resilient JSON/in-memory auto-fallback |
| **Typography** | Cinzel, Playfair Display, Plus Jakarta Sans |

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v20.19+ or v22.12+)
- npm

### Quick Start (Both Backend & Frontend)
```bash
# 1. Create a local environment file and set unique admin credentials.
#    PowerShell: Copy-Item .env.example .env
#    Set ADMIN_PASSWORD (at least 12 characters) and
#    ADMIN_TOKEN_SECRET (at least 32 characters) in .env.

# 2. Start backend and frontend from the project root.
npm run dev
```

The admin portal is available from the header's staff control and requires the
`ADMIN_PASSWORD` configured on the server. Admin sessions expire after 8 hours.
Do not commit `.env`; configure the same environment variables in your hosting
provider before deployment. Deploy behind HTTPS so admin passwords and sessions
are encrypted in transit.

Visit:
- **Client Website:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 🌐 Public Deployment (Render + MongoDB Atlas)

GitHub stores the source code but does not run the app. This repository includes
a Render Blueprint for a single web service that builds the React client, serves
it from Express, and exposes the API on the same domain.

1. Push the project to GitHub and create a MongoDB Atlas database. Create a
   database user and copy the Atlas connection string.
2. In Render, choose **New → Blueprint**, connect this repository, and select
   `render.yaml`.
3. Enter `MONGODB_URI` and a unique `ADMIN_PASSWORD` when prompted. Render
   generates `ADMIN_TOKEN_SECRET`; keep all three values private.
4. Deploy. Render builds both apps and gives the website a public HTTPS URL.
   The frontend uses the same domain for `/api`; `/health` is the backend health
   check.

Production startup requires a working `MONGODB_URI`; it will fail rather than
silently switching to temporary local storage. The database seeds the sample
menu only when its menu collection is empty. Reviews and customer orders are
not copied from local `server/data/store.json`.

Before sharing the site publicly, verify the restaurant details and replace any
sample or unverified menu, ratings, and review claims with accurate business
information. Render's free web service may sleep when idle, so the first visit
after inactivity can take longer.

---

## 📡 API Endpoints

- `GET /api/menu` - Fetch all dishes
- `POST /api/admin/login` - Sign in with `ADMIN_PASSWORD` and receive an admin session
- `POST /api/menu` - Add a new dish (admin session required)
- `GET /api/reservations` - List all reservations (admin session required)
- `POST /api/reservations` - Create a table reservation
- `PUT /api/reservations/:id` - Update reservation status (admin session required)
- `GET /api/orders` - List all kitchen orders (admin session required)
- `POST /api/orders` - Place a new order
- `PUT /api/orders/:id` - Update order kitchen status (admin session required)
- `GET /api/reviews` - Fetch customer reviews
- `POST /api/reviews` - Submit a verified review
- `GET /api/stats` - Restaurant stats & 4.9 rating summary (admin session required)
