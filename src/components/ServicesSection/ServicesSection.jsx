// src/components/ServicesSection.jsx
import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      title: "Software Development",
      description: "Custom software development to meet your business needs."
    },
    {
      title: "AI and Machine Learning",
      description: "Advanced AI models to drive innovation efficiency."
    },
    {
      title: "Cloud Computing",
      description: "Secure and scalable cloud solutions for your enterprise."
    }
  ];

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
