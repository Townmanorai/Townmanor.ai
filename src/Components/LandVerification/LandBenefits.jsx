import React from 'react';
import { FaShieldAlt, FaFileAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import './LandBenefits.css';

const benefits = [
  {
    icon: <FaShieldAlt />,
    title: 'Prevent Fraud',
    description: 'Avoid scams and fraudulent property claims with official verification'
  },
  {
    icon: <FaFileAlt />,
    title: 'Legal Certainty',
    description: 'Ensure clear titles and prevent future legal disputes'
  },
  {
    icon: <FaClock />,
    title: 'Save Time',
    description: 'Quick online verification without visiting government offices'
  },
  {
    icon: <FaCheckCircle />,
    title: '100% Accuracy',
    description: 'Direct integration with government databases for reliable results'
  }
];

function LandBenefits() {
  return (
    <section className="townmanor-land-benefits-section">
      <div className="townmanor-land-benefits-container">
        <div className="townmanor-land-benefits-header">
          <h2>Why Verify Your Land Records?</h2>
          <p>Protect your investment and ensure legal compliance</p>
        </div>
        <div className="townmanor-land-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="townmanor-land-benefit-card">
              <div className="townmanor-land-benefit-icon">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandBenefits; 