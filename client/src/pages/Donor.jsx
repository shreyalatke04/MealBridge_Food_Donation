import React, { useState, useEffect } from 'react';
import { api, socket } from '../api'; 
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Map click handler
const LocationMarker = ({ setPosition, position }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
};

const Donor = () => {
  const defaultPos = { lat: 19.0760, lng: 72.8777 }; // Default: Mumbai

  const [formData, setFormData] = useState({
    foodName: '', foodType: 'Veg', quantity: '', expiryTime: '', pickupAddress: '', specialNotes: '',
    pickupLocation: defaultPos
  });
  
  const [myDonations, setMyDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
    
    // Real-time listener using the imported socket
    socket.on('donation_updated', (updated) => {
      setMyDonations(prev => prev.map(d => d._id === updated._id ? updated : d));
    });

    return () => socket.off('donation_updated');
  }, []);

  const fetchDonations = async () => {
    try {
      // USING api.get INSTEAD OF axios.get
      const res = await api.get('/api/donations');
      setMyDonations(res.data);
    } catch(e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // USING api.post INSTEAD OF axios.post
      await api.post('/api/donations', formData);
      alert('Donation Request Created!');
      fetchDonations();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '30px' }}>Donor Dashboard</h2>
      
      <div className="grid-layout" style={{ alignItems: 'start' }}>
        
        {/* LEFT COLUMN: FORM */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '20px', color: 'var(--red)' }}>Donate Food</h3>
          <form onSubmit={handleSubmit}>
            <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Food Item</label>
            <input type="text" placeholder="Ex: 50 Rotis..." onChange={e => setFormData({...formData, foodName: e.target.value})} required />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <select onChange={e => setFormData({...formData, foodType: e.target.value})}>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                </select>
                <input type="text" placeholder="Qty" onChange={e => setFormData({...formData, quantity: e.target.value})} required />
            </div>

            <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Expiry Date & Time</label>
            <input type="datetime-local" onChange={e => setFormData({...formData, expiryTime: e.target.value})} required />
            
            <input type="text" placeholder="Pickup Address" onChange={e => setFormData({...formData, pickupAddress: e.target.value})} required />
            
            <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Pin Location on Map (Click to set)</label>
            <div style={{ height: '300px', marginBottom: '15px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e0e0e0', zIndex: 0 }}>
                <MapContainer center={defaultPos} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    <LocationMarker 
                        position={formData.pickupLocation} 
                        setPosition={(pos) => setFormData({...formData, pickupLocation: pos})} 
                    />
                </MapContainer>
            </div>

            <textarea placeholder="Special Notes" rows="3" onChange={e => setFormData({...formData, specialNotes: e.target.value})} />
            
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Submit Request</button>
          </form>
        </div>

        {/* RIGHT COLUMN: HISTORY */}
        <div>
          <h3 style={{ marginBottom: '20px' }}>Your Donation History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {myDonations.map(d => (
              <div key={d._id} className="glass-card" style={{ padding: '15px', borderLeft: `5px solid ${d.status === 'Pending' ? 'orange' : 'green'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0 }}>{d.foodName}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: d.status === 'Pending' ? 'orange' : 'green' }}>{d.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>📍 {d.pickupAddress}</p>
                
                <a 
                    href={`https://www.openstreetmap.org/?mlat=${d.pickupLocation.lat}&mlon=${d.pickupLocation.lng}#map=16/${d.pickupLocation.lat}/${d.pickupLocation.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'block', marginTop: '10px', background: '#f1faee', color: '#457b9d', textAlign: 'center', padding: '8px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}
                >
                    🗺️ View on Map
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donor;