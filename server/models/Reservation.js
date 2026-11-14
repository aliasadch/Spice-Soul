const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  guests: { type: Number, required: true, default: 2 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seatingArea: { type: String, default: "Royal Indoor Lounge" },
  specialRequests: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Seated', 'Cancelled'], default: 'Confirmed' }
}, { timestamps: true });

module.exports = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);
