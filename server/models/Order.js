const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  orderCode: { type: String, required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  orderType: { type: String, enum: ['Dine-In', 'Takeaway', 'Delivery'], default: 'Dine-In' },
  tableNumber: { type: String },
  deliveryAddress: { type: String },
  instructions: { type: String },
  status: { type: String, enum: ['Received', 'Preparing', 'Ready', 'Completed', 'Cancelled'], default: 'Received' }
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
