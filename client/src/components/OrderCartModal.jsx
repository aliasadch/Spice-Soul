import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export default function OrderCartModal() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, isCartOpen, setIsCartOpen } = useCart();

  const [orderType, setOrderType] = useState('Dine-In');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SPICE10') {
      setDiscountPercent(10);
      setCouponMsg('10% VIP Discount Applied!');
    } else {
      setCouponMsg('Invalid coupon code. Try SPICE10');
      setDiscountPercent(0);
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setError('');
    setLoading(true);

    try {
      const orderPayload = {
        customerName,
        phone,
        items: cartItems.map(item => ({
          id: item.id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: finalTotal,
        orderType,
        tableNumber: orderType === 'Dine-In' ? tableNumber : '',
        deliveryAddress: orderType === 'Delivery' ? deliveryAddress : '',
        instructions
      };

      const res = await api.createOrder(orderPayload);
      setOrderSuccess(res);
      clearCart();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {
      setError(err.message || 'Could not place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCartOpen(false);
            setOrderSuccess(null);
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 border border-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderSuccess ? (
          /* Order Confirmation View */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Order Confirmed, {orderSuccess.customerName}!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Our kitchen team is now preparing your delicious meal. A confirmation SMS has been sent to {orderSuccess.phone}.
            </p>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-500 font-semibold">Order ID:</span>
                <span className="font-extrabold text-amber-700">{orderSuccess.orderCode}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500 font-semibold">Service Type:</span>
                <span className="font-bold text-stone-900">{orderSuccess.orderType}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500 font-semibold">Total Amount:</span>
                <span className="font-extrabold text-emerald-700">Rs {orderSuccess.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500 font-semibold">Kitchen Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {orderSuccess.status}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setOrderSuccess(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wide shadow-sm"
              >
                Back to Restaurant
              </button>
            </div>
          </div>
        ) : (
          /* Cart List & Checkout Form */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Your Order Basket</h3>
                <p className="text-xs text-stone-500 font-medium">
                  Spice &amp; Soul Johar Town Kitchen
                </p>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-stone-400">
                <p className="text-base font-semibold text-stone-600">Your basket is currently empty.</p>
                <p className="text-xs text-stone-500 mt-1">Add handi, BBQ platters or mocktails to place an order!</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-6">
                
                {/* Cart Items List */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=120&q=80"}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-stone-900">{item.name}</p>
                          <p className="text-[11px] text-amber-700 font-bold">
                            Rs {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg bg-white border border-stone-200 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-amber-600 text-stone-500"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-amber-600 text-stone-500"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Service Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                    Service Option
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Dine-In', 'Takeaway', 'Delivery'].map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                          orderType === type
                            ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bilal Khan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0339 0008804"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                    />
                  </div>

                  {orderType === 'Dine-In' && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">Table Number (if seated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Table 04 / Rooftop Gazebo"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                      />
                    </div>
                  )}

                  {orderType === 'Delivery' && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">Delivery Address (Johar Town &amp; surrounding)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. House 45, Block H2, Johar Town Lahore"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Kitchen Instructions (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Extra mint dip, medium spice, well done"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (Try SPICE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600 uppercase shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800 border border-stone-200"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[11px] font-semibold ${discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {couponMsg}
                  </p>
                )}

                {/* Bill Summary */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                      <span>Discount (10%):</span>
                      <span>- Rs {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>GST (Tax):</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-900">
                    <span>Grand Total:</span>
                    <span className="text-amber-700">Rs {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-600 font-semibold">{error}</p>
                )}

                {/* Submit Checkout */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-amber-600/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <span>Place Order · Rs {finalTotal.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
