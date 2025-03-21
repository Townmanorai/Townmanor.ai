

// RentPricing.jsx - Enhanced with sticky scroll effect
import React from 'react';
import { motion } from 'framer-motion';
import './RentPricing.css';
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const pricingVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};

const RentPricing = () => {
  const navigate = useNavigate(); // Hook for navigation
  
    const handleNavigation = () => {
      navigate("/rent-agreement");
    };
  return (
    <section className="rent-pricing">
      <h2>Simple & Transparent Pricing</h2>
      <motion.div 
        className="rent-pricing-card"
        variants={pricingVariants}
      >
        <div className="rent-price-section">
    <div className="rent-price">₹500</div>
    <div className="price-details">
      <p>Per Agreement</p>
      <small>No hidden charges</small>
    </div>
  </div>
  <ul>
          <li><FaCheck /> Verified Document</li>
          <li><FaCheck /> Digital Signatures</li>
          <li><FaCheck /> Instant Download</li>
        </ul>
  <div className="price-benefits">
    <p>✅ Free Guide for Document Certification</p>
    <p>✅ Free Lifetime Storage</p>
  </div>
  <button className="rent-cta-button rent-price-started" onClick={handleNavigation}>Get Started</button>
      </motion.div>
    </section>
  );
};

export default RentPricing;