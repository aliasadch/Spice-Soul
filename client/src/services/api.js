const API_BASE = '/api';
const ADMIN_TOKEN_KEY = 'spice-soul-admin-token';

async function adminRequest(path, options = {}) {
  const token = window.sessionStorage.getItem(ADMIN_TOKEN_KEY);
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(body.error || `Admin request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export const api = {
  async loginAdmin(password) {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.error || `Admin sign-in failed (${response.status}).`);
    }
    window.sessionStorage.setItem(ADMIN_TOKEN_KEY, body.token);
    return body;
  },

  logoutAdmin() {
    window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  },

  hasAdminSession() {
    return Boolean(window.sessionStorage.getItem(ADMIN_TOKEN_KEY));
  },

  // Menu
  async getMenu() {
    const res = await fetch(`${API_BASE}/menu`);
    if (!res.ok) throw new Error('Failed to load menu');
    return res.json();
  },

  async addMenuItem(item) {
    return adminRequest('/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  },

  // Reservations
  async getReservations() {
    return adminRequest('/reservations');
  },

  async createReservation(reservationData) {
    const res = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit reservation');
    }
    return res.json();
  },

  async updateReservationStatus(id, status) {
    return adminRequest(`/reservations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  },

  // Orders
  async getOrders() {
    return adminRequest('/orders');
  },

  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to place order');
    }
    return res.json();
  },

  async updateOrderStatus(id, status) {
    return adminRequest(`/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  },

  // Reviews
  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error('Failed to load reviews');
    return res.json();
  },

  async createReview(reviewData) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit review');
    }
    return res.json();
  },

  // Stats
  async getStats() {
    return adminRequest('/stats');
  }
};
