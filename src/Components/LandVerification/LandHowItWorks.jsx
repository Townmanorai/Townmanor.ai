import React from 'react';
import { FaFileAlt, FaSearch, FaCheckCircle, FaShieldAlt, FaClock, FaDatabase } from 'react-icons/fa';
import './LandHowItWorks.css';

const LandHowItWorks = () => {
  return (
    <section className="townmanor-land-how-it-works-section">
      <div className="townmanor-land-how-it-works-container">
        <div className="townmanor-land-how-it-works-header">
          <h2>How Land Verification Works</h2>
          <p>Simple three-step process to verify your land records</p>
        </div>

        <div className="townmanor-land-how-it-works-steps">
          <div className="townmanor-land-how-it-works-step">
            <div className="townmanor-land-how-it-works-step-icon">
              <FaFileAlt />
            </div>
            <h3>Enter Details</h3>
            <p>Provide basic information about your land including location and owner details</p>
          </div>

          <div className="townmanor-land-how-it-works-step">
            <div className="townmanor-land-how-it-works-step-icon">
              <FaSearch />
            </div>
            <h3>Verification</h3>
            <p>Our system checks your details against government databases</p>
          </div>

          <div className="townmanor-land-how-it-works-step">
            <div className="townmanor-land-how-it-works-step-icon">
              <FaCheckCircle />
            </div>
            <h3>Get Results</h3>
            <p>Receive a comprehensive report with verified land details</p>
          </div>
        </div>

        <div className="townmanor-land-how-it-works-features">
          <div className="townmanor-land-how-it-works-feature">
            <FaShieldAlt className="townmanor-land-how-it-works-feature-icon" />
            <h4>Secure Verification</h4>
            <p>All data is encrypted and processed through secure channels</p>
          </div>

          <div className="townmanor-land-how-it-works-feature">
            <FaClock className="townmanor-land-how-it-works-feature-icon" />
            <h4>Quick Results</h4>
            <p>Get verification results within minutes</p>
          </div>

          <div className="townmanor-land-how-it-works-feature">
            <FaDatabase className="townmanor-land-how-it-works-feature-icon" />
            <h4>Official Sources</h4>
            <p>Data verified against government databases</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandHowItWorks; 