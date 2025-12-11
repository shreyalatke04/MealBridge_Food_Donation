import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar glass-card" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      margin: '0', 
      borderRadius: '0 0 20px 20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 5%' 
    }}>
      <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--red)' }}>MealBridge</h2>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--dark-blue)', fontWeight: '600' }}>Home</Link>
        <Link to="/donor" style={{ textDecoration: 'none', color: 'var(--dark-blue)', fontWeight: '600' }}>Donate</Link>
        <Link to="/ngo" style={{ textDecoration: 'none', color: 'var(--dark-blue)', fontWeight: '600' }}>NGO</Link>
        <Link to="/delivery" style={{ textDecoration: 'none', color: 'var(--dark-blue)', fontWeight: '600' }}>Delivery</Link>
      </div>
    </nav>
  );
};

export default Navbar;