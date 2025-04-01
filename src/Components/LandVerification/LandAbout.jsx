import React from 'react';
import './LandAbout.css';

function LandAbout() {
  return (
    <section className="townmanor-land-about-section">
      <div className="townmanor-land-about-container">
        <div className="townmanor-land-about-header">
          <h2>About Our Land Verification Service</h2>
          <p>Trusted partner for property verification across India</p>
        </div>
        <div className="townmanor-land-about-content">
          <div className="townmanor-land-about-text">
            <p>Our land verification service provides a comprehensive solution for verifying land ownership and property details across India. With direct integration to government databases, we ensure that you receive accurate and up-to-date information about any property.</p>
            <p>We understand the importance of due diligence in property transactions, which is why we've created a simple, efficient platform that anyone can use to verify land records within minutes.</p>
            <p>Our team of experts in property law and technology work together to provide a seamless verification experience. Whether you're a property buyer, seller, or investor, our service helps you make informed decisions with confidence.</p>
          </div>
          <div className="townmanor-land-about-stats">
            <div className="townmanor-land-about-stat">
              <h3>50,000+</h3>
              <p>Verifications Completed</p>
            </div>
            <div className="townmanor-land-about-stat">
              <h3>98%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="townmanor-land-about-stat">
              <h3>3</h3>
              <p>States Covered</p>
            </div>
            <div className="townmanor-land-about-stat">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandAbout; 