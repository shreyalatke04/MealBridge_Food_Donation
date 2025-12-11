import React, { useState, useEffect } from 'react';
import { api, socket } from '../api'; 

const NGO = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
    
    // Listen for new donations via socket
    socket.on('new_donation', (data) => {
      setDonations(prev => [data, ...prev]);
    });
    
    // Listen for status updates
    socket.on('donation_updated', (updated) => {
      setDonations(prev => prev.map(d => d._id === updated._id ? updated : d));
    });

    return () => { socket.off('new_donation'); socket.off('donation_updated'); };
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get('/api/donations'); // USING api.get
      setDonations(res.data);
    } catch(e) { console.error(e); }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      // USING api.put
      await api.put(`/api/donations/${id}/status`, {
        status,
        assignedNgoId: 'NGO_123' 
      });
    } catch(e) { console.error(e); }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '30px' }}>NGO Dashboard</h2>
      
      <div className="glass-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd', color: 'var(--med-blue)' }}>
                <th style={{ padding: '15px' }}>Food</th>
                <th style={{ padding: '15px' }}>Type</th>
                <th style={{ padding: '15px' }}>Qty</th>
                <th style={{ padding: '15px' }}>Expiry</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{d.foodName}</td>
                  <td style={{ padding: '15px' }}>{d.foodType}</td>
                  <td style={{ padding: '15px' }}>{d.quantity}</td>
                  <td style={{ padding: '15px' }}>{new Date(d.expiryTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                        padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                        background: d.status === 'Pending' ? '#ffecd1' : '#d8f3dc',
                        color: d.status === 'Pending' ? 'orange' : 'green'
                    }}>
                      {d.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    {d.status === 'Pending' && (
                      <button className="btn-primary" style={{ padding: '8px 15px', fontSize: '0.9rem' }} onClick={() => handleStatusUpdate(d._id, 'Accepted')}>
                        Accept
                      </button>
                    )}
                    {d.status === 'Accepted' && (
                      <button className="btn-secondary" style={{ padding: '8px 15px', fontSize: '0.9rem' }} onClick={() => handleStatusUpdate(d._id, 'Assigned')}>
                        Assign Driver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NGO;