const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: { type: String, default: 'Anonymous Donor' }, // Simplified for no-auth setup
  foodName: { type: String, required: true },
  foodType: { type: String, enum: ['Veg', 'Non-Veg'], required: true },
  quantity: { type: String, required: true }, // e.g., "10kg" or "20 servings"
  expiryTime: { type: Date, required: true },
  pickupAddress: { type: String, required: true },
  pickupLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  pickupTimeSlot: { type: String },
  specialNotes: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Assigned', 'Picked-up', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  assignedNgoId: { type: String, default: null },
  assignedDeliveryId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);