import React, { useState, useEffect } from 'react';
import { api, socket } from '../api'; 

const Delivery = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();

    socket.on('donation_updated', (updated) => {
      // Refresh jobs when status changes
      if(['Assigned', 'Picked-up', 'Delivered'].includes(updated.status)) {
         fetchJobs(); 
      }
    });
    
    return () => socket.off('donation_updated');
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/api/donations'); // USING api.get
      // Filter only active jobs
      setJobs(res.data.filter(d => ['Assigned', 'Picked-up'].includes(d.status)));
    } catch(e) { console.error(e); }
  };

  const updateJobStatus = async (id, status) => {
    try {
      await api.put(`/api/donations/${id}/status`, {
        status,
        assignedDeliveryId: 'RIDER_007'
      });
    } catch(e) { console.error(e); }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '30px' }}>Delivery Partner Dashboard</h2>
      
      <div className="grid-layout">
        {jobs.length === 0 ? <p>No active delivery jobs assigned.</p> : jobs.map(job => (
          <div key={job._id} className="glass-card" style={{ borderTop: '5px solid var(--med-blue)' }}>
            <h3 style={{ marginBottom: '10px' }}>Job #{job._id.slice(-4)}</h3>
            <p><strong>📍 Pickup:</strong> {job.pickupAddress}</p>
            <p><strong>📦 Contents:</strong> {job.quantity} of {job.foodName}</p>
            
            <div style={{ margin: '20px 0', padding: '15px', background: '#f1faee', borderRadius: '10px' }}>
                <p style={{fontSize: '0.9rem', color: '#666'}}>Navigate:</p>
                <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${job.pickupLocation.lat},${job.pickupLocation.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--med-blue)', fontWeight: 'bold' }}
                >
                    Open Google Maps Navigation ↗
                </a>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {job.status === 'Assigned' && (
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => updateJobStatus(job._id, 'Picked-up')}>
                  Confirm Pickup
                </button>
              )}
              {job.status === 'Picked-up' && (
                <button className="btn-primary" style={{ flex: 1, background: 'gold', color: 'black' }} onClick={() => updateJobStatus(job._id, 'Delivered')}>
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delivery;