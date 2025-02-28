import React from 'react';
import './RentFooter.css';

const RentFooter = () => {
  return (
    <footer className="rent-footer">
      <div className="rent-footer-container">
        <div className="rent-footer-logo">
          <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" />
          <p>Making rental agreements simple, secure, and hassle-free.</p>
        </div>
        <div className="rent-footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="rent-footer-bottom">
        <p>&copy; 2024 TownManor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default RentFooter;
