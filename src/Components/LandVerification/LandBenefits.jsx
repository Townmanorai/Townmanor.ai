import React from 'react';
import './LandBenefits.css';

const benefits = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Prevent Fraud Icon"
        role="img"
      >
        <rect x="4" y="8" width="32" height="24" rx="4" fill="#3B82F6" />
        <path d="M4 16H36V20H4V16Z" fill="#ffffff" />
        <circle cx="14" cy="26" r="4" fill="#10B981" />
        <circle cx="26" cy="26" r="4" fill="#EF4444" />
      </svg>
    ),
    title: 'Prevent Fraud',
    description: 'Avoid scams and fraudulent property claims with official verification'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Legal Certainty Icon"
        role="img"
      >
        <path d="M8 6H28V14L32 18V34H8V6Z" fill="#6EE7B7" />
        <path d="M28 14H32L28 10V14Z" fill="#34D399" />
        <path d="M12 18H24V22H12V18Z" fill="#ffffff" />
        <path d="M12 26H24V30H12V26Z" fill="#ffffff" />
      </svg>
    ),
    title: 'Legal Certainty',
    description: 'Ensure clear titles and prevent future legal disputes'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Save Time Icon"
        role="img"
      >
        <rect x="6" y="14" width="24" height="12" rx="2" fill="#6B7280" />
        <path d="M30 18H34V26H30V18Z" fill="#4B5563" />
        <circle cx="14" cy="30" r="4" fill="#9CA3AF" />
        <circle cx="26" cy="30" r="4" fill="#9CA3AF" />
      </svg>
    ),
    title: 'Save Time',
    description: 'Quick online verification without visiting government offices'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Accuracy Icon"
        role="img"
      >
        <path d="M20 8L8 20V32H32V20L20 8Z" fill="#10B981" />
        <path d="M20 16V24" stroke="#ffffff" strokeWidth="2" />
        <circle cx="20" cy="28" r="2" fill="#ffffff" />
      </svg>
    ),
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