// RentSection.jsx - Enhanced Hero Section
import React from 'react';
import './RentSection.css';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const RentSection = () => {

  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = () => {
    navigate("/rent-agreement");
  };

  return (
    <section className="rent-hero-section">
      <div className="rent-hero-container">
        <motion.div 
          className="rent-hero-content"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Create Legal Rent Agreements Online</h1>
          <p>Generate legally valid rental agreements instantly. No physical visits required.</p>
          <button className="rent-cta-button" onClick={handleNavigation}>
            Create Agreement Now
            <span className="cta-arrow">→</span>
          </button>
          <div className="trust-badges">
            <div className="badge">✓ Legal Compliance</div>
            <div className="badge">🔒 Bank-Level Security</div>
          </div>
        </motion.div>

        <motion.div 
          className="rent-hero-image"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-container">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/extra-images/f0c31e61-8b1f-4da8-b30f-bcc5c956eda1.jpg" alt="Digital Agreement" />
            <div className="floating-element doc-badge">
              <span>📄 5000+ Agreements Created</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default RentSection;
