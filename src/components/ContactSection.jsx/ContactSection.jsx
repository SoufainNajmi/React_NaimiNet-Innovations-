// src/components/ContactSection.jsx
import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contact">
      <h2>Contact Details</h2>
      <div className="contact-info">
        <div className="contact-item">
          <strong>Name:</strong> [Your Name]
        </div>
        <div className="contact-item">
          <strong>Email:</strong> [Your Email]
        </div>
        <div className="contact-item">
          <strong>Phone:</strong> [Your Phone]
        </div>
        <div className="contact-item">
          <strong>Website:</strong> <a href="#">Visit Website</a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
