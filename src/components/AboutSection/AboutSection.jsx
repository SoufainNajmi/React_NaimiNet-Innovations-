import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-badge">
            <span className="badge">Who We Are</span>
          </div>
          <h2 className="about-title">
            About <span className="gradient-text">NaimiNet</span> Innovations
          </h2>
          <p className="about-description">
            We blend AI-driven analytics, next-gen infrastructure, and human-centric
            design to deliver transformative digital ecosystems. Our mission is to
            empower enterprises with future-ready tools that drive innovation and
            sustainable growth.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Enterprise Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>

          <button className="about-btn">Learn More →</button>
        </div>

        <div className="about-image">
          <div className="image-placeholder">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="180" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
              <path d="M200 80 L220 140 L280 140 L240 180 L260 240 L200 200 L140 240 L160 180 L120 140 L180 140 L200 80Z" fill="url(#gradient)" opacity="0.6"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
