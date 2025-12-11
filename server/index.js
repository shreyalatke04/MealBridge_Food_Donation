require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Donation = require('./models/Donation');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite frontend URL
    methods: ["GET", "POST"]
  }
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// --- ROUTES ---

// 1. Create Donation (Donor)
app.post('/api/donations', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    const savedDonation = await newDonation.save();
    // Real-time: Alert NGOs of new donation
    io.emit('new_donation', savedDonation); 
    res.status(201).json(savedDonation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Get All Donations (For NGO/Delivery to view)
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. Update Status (NGO accepts, Driver picks up)
app.put('/api/donations/:id/status', async (req, res) => {
  try {
    const { status, assignedNgoId, assignedDeliveryId } = req.body;
    const updateData = { status };
    if (assignedNgoId) updateData.assignedNgoId = assignedNgoId;
    if (assignedDeliveryId) updateData.assignedDeliveryId = assignedDeliveryId;

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    
    // Real-time: update everyone watching this donation
    io.emit('donation_updated', updatedDonation);
    res.status(200).json(updatedDonation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));