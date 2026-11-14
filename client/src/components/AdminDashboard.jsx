import React, { useState, useEffect } from 'react';
import { X, Calendar, ShoppingBag, Utensils, TrendingUp, Check, Clock, Plus, RefreshCw, LogOut, LockKeyhole } from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => api.hasAdminSession());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [dashboardError, setDashboardError] = useState('');
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // New item form
  const [newItem, setNewItem] = useState({
    name: '',
    category: "Chef's Signatures",
    price: 2500,
    description: '',
    prepTime: '20 mins',
    dietary: 'Halal / Chef Special',
    modelType: 'handi',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80',
    isSignature: false
  });
  const [addItemSuccess, setAddItemSuccess] = useState(false);

  const handleSessionExpired = () => {
    api.logoutAdmin();
    setIsAuthenticated(false);
    setLoginError('Your admin session expired. Please sign in again.');
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    setDashboardError('');
    try {
      const [resData, ordData, statsData] = await Promise.all([
        api.getReservations(),
        api.getOrders(),
        api.getStats()
      ]);
      setReservations(resData);
      setOrders(ordData);
      setStats(statsData);
    } catch (err) {
      setDashboardError(err.message);
      if (err.status === 401) {
        handleSessionExpired();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      await api.loginAdmin(password);
      setPassword('');
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = () => {
    api.logoutAdmin();
    setIsAuthenticated(false);
    setReservations([]);
    setOrders([]);
    setStats(null);
  };

  const handleUpdateReservation = async (id, status) => {
    try {
      await api.updateReservationStatus(id, status);
      setReservations(prev =>
        prev.map(r => ((r.id === id || r.bookingCode === id) ? { ...r, status } : r))
      );
    } catch (err) {
      if (err.status === 401) {
        handleSessionExpired();
        return;
      }
      alert(err.message);
    }
  };

  const handleUpdateOrder = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status);
      setOrders(prev =>
        prev.map(o => ((o.id === id || o.orderCode === id) ? { ...o, status } : o))
      );
    } catch (err) {
      if (err.status === 401) {
        handleSessionExpired();
        return;
      }
      alert(err.message);
    }
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    try {
      await api.addMenuItem(newItem);
      setAddItemSuccess(true);
      setTimeout(() => {
        setAddItemSuccess(false);
        setNewItem({
          name: '',
          category: "Chef's Signatures",
          price: 2500,
          description: '',
          prepTime: '20 mins',
          dietary: 'Halal / Chef Special',
          modelType: 'handi',
          image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80',
          isSignature: false
        });
        loadData();
      }, 1500);
    } catch (err) {
      if (err.status === 401) {
        handleSessionExpired();
        return;
      }
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900">Spice &amp; Soul Operations Portal</h3>
              <p className="text-xs text-stone-500 font-medium">
                {isAuthenticated ? 'Johar Town Branch Management' : 'Admin sign-in required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={handleAdminLogout}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 transition-colors"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <button
                  onClick={loadData}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 border border-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleAdminLogin} className="mx-auto w-full max-w-sm py-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h4 className="text-center text-lg font-bold text-stone-900">Staff sign-in</h4>
            <p className="mt-1 text-center text-sm text-stone-500">
              Enter the admin password to open reservations and kitchen orders.
            </p>
            <label htmlFor="admin-password" className="mt-6 mb-1 block text-xs font-bold text-stone-700">
              Admin password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
            />
            {loginError && (
              <p role="alert" className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-amber-600 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-700 disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        ) : (
          <>
        {/* Quick Stats Grid */}
        {dashboardError && (
          <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
            {dashboardError}
          </p>
        )}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <p className="text-[10px] text-stone-500 uppercase font-bold">Active Reservations</p>
              <p className="text-xl font-extrabold text-amber-700">{reservations.length}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <p className="text-[10px] text-stone-500 uppercase font-bold">Kitchen Orders</p>
              <p className="text-xl font-extrabold text-emerald-700">{orders.length}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <p className="text-[10px] text-stone-500 uppercase font-bold">Customer Rating</p>
              <p className="text-xl font-extrabold text-stone-900">{stats.rating} ★ ({stats.reviewCount} customer reviews)</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <p className="text-[10px] text-stone-500 uppercase font-bold">Price Tier</p>
              <p className="text-xs font-bold text-stone-800 mt-1">{stats.priceRange}</p>
            </div>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'reservations'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reservations ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add-item')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'add-item'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Menu Dish</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* TAB 1: Reservations */}
          {activeTab === 'reservations' && (
            <div className="space-y-3">
              {reservations.length === 0 ? (
                <p className="text-xs text-stone-500 text-center py-8">No table bookings recorded yet.</p>
              ) : (
                reservations.map(res => (
                  <div
                    key={res.id || res._id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-amber-700">{res.bookingCode}</span>
                        <span className="text-sm font-bold text-stone-900">{res.name}</span>
                        <span className="text-xs text-stone-500 font-medium">({res.phone})</span>
                      </div>
                      <div className="text-xs text-stone-600 mt-1 flex flex-wrap gap-x-4">
                        <span>👥 {res.guests} Guests</span>
                        <span>📅 {res.date} at {res.time}</span>
                        <span>🪑 {res.seatingArea}</span>
                      </div>
                      {res.specialRequests && (
                        <p className="text-[11px] text-stone-500 italic mt-1 font-medium">
                          Note: "{res.specialRequests}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <select
                        value={res.status}
                        onChange={(e) => handleUpdateReservation(res.id || res._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${
                          res.status === 'Confirmed'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : res.status === 'Seated'
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                            : 'bg-rose-50 border-rose-300 text-rose-800'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Seated">Seated</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-xs text-stone-500 text-center py-8">No kitchen orders recorded yet.</p>
              ) : (
                orders.map(ord => (
                  <div
                    key={ord.id || ord._id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-amber-700">{ord.orderCode}</span>
                        <span className="text-sm font-bold text-stone-900">{ord.customerName}</span>
                        <span className="text-xs text-stone-500 font-medium">({ord.phone})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-700">
                          {ord.orderType}
                        </span>
                      </div>

                      <div className="text-xs text-stone-700 mt-1 space-y-0.5">
                        <div className="flex gap-2 text-stone-500 text-[11px] font-medium">
                          {ord.items.map((it, idx) => (
                            <span key={idx}>
                              {it.quantity}x {it.name}
                            </span>
                          ))}
                        </div>
                        {ord.tableNumber && (
                          <p className="text-[11px] text-amber-800 font-bold">Table: {ord.tableNumber}</p>
                        )}
                        {ord.deliveryAddress && (
                          <p className="text-[11px] text-stone-500">Deliver: {ord.deliveryAddress}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-sm font-extrabold text-emerald-700">
                        Rs {ord.totalAmount.toLocaleString()}
                      </span>

                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrder(ord.id || ord._id, e.target.value)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-800 focus:outline-none"
                      >
                        <option value="Received">Received</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Add Menu Item */}
          {activeTab === 'add-item' && (
            <div className="max-w-xl mx-auto py-2">
              {addItemSuccess ? (
                <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">Dish Added to Live Menu!</p>
                </div>
              ) : (
                <form onSubmit={handleCreateMenuItem} className="space-y-4">
                  <h4 className="text-sm font-bold text-stone-900">Add New Artisanal Dish</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Dish Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Peshawari Namkeen Karahi"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                      >
                        <option value="Chef's Signatures">Chef's Signatures</option>
                        <option value="Charcoal BBQ & Tandoor">Charcoal BBQ &amp; Tandoor</option>
                        <option value="Royal Karahi & Curries">Royal Karahi &amp; Curries</option>
                        <option value="Rice & Dum Biryani">Rice &amp; Dum Biryani</option>
                        <option value="Continental & Grills">Continental &amp; Grills</option>
                        <option value="Artisanal Breads">Artisanal Breads</option>
                        <option value="Decadent Desserts">Decadent Desserts</option>
                        <option value="Soul Beverages & Mocktails">Soul Beverages &amp; Mocktails</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Price in PKR (Rs) *</label>
                      <input
                        type="number"
                        required
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Description *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Ingredients, preparation technique and flavor profile..."
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-600/25"
                  >
                    Save &amp; Publish to Menu
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

          </>
        )}

      </div>
    </div>
  );
}
