import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <header style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        background: `linear-gradient(rgba(29, 53, 87, 0.8), rgba(29, 53, 87, 0.6)), url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '20px'
      }}>
        <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
          <h1 style={{ color: '#f1faee', marginBottom: '20px' }}>Bridge the Gap Between <br/> <span style={{ color: '#e63946' }}>Surplus & Hunger</span></h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#a8dadc' }}>
            A transparent platform connecting food donors, NGOs, and volunteers to fight food waste effectively.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/donor">
              <button className="btn-primary">I want to Donate</button>
            </Link>
            <Link to="/ngo">
              <button className="btn-secondary" style={{ background: 'transparent', border: '2px solid #a8dadc' }}>I represent an NGO</button>
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>How MealBridge Works</h2>
        
        <div className="grid-layout">
          {/* Card 1 */}
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🍲</div>
            <h3>1. You Donate</h3>
            <p>Enter details of your surplus food. It takes less than 2 minutes to post a request.</p>
          </div>

          {/* Card 2 */}
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏢</div>
            <h3>2. NGO Accepts</h3>
            <p>Nearby NGOs get notified instantly. They review and accept the donation based on need.</p>
          </div>

          {/* Card 3 */}
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚚</div>
            <h3>3. We Deliver</h3>
            <p>A volunteer or delivery partner picks up the food and ensures it reaches the hungry.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;