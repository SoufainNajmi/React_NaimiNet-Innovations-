// src/components/AboutSection.jsx
import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about">
      <h2>About Us</h2>
      <div className="about-content">
        <p>
          NaimiNet Innovations is a leader in technological advancement.
          Our mission is to transform businesses through innovative technology
          solutions. We are committed to excellence, providing our clients with
          the tools they need to succeed in a rapidly evolving digital landscape.
        </p>
      </div>

      <div className="software-section">
        <h3>NaimiNet</h3>
        <div className="software-card">
          <span>Software</span>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
