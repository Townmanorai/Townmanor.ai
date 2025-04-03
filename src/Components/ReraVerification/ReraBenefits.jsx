import React from 'react';
import './ReraBenefits.css';

const benefits = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Legal Compliance Icon"
        role="img"
      >
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#3B82F6" />
        <path d="M16 16L20 20L24 16" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    title: 'Legal Compliance',
    description: 'Verify if your property is registered under RERA regulations'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Project Details Icon"
        role="img"
      >
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#10B981" />
        <path d="M12 12H28V16H12V12Z" fill="#ffffff" />
        <path d="M12 20H28V24H12V20Z" fill="#ffffff" />
        <path d="M12 28H20V32H12V28Z" fill="#ffffff" />
      </svg>
    ),
    title: 'Project Details',
    description: 'Access accurate project information and completion status'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Quick Verification Icon"
        role="img"
      >
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#F59E0B" />
        <path d="M16 16L20 20L24 16" stroke="#ffffff" strokeWidth="2" />
        <path d="M20 20L20 24" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    title: 'Quick Verification',
    description: 'Get instant verification without visiting RERA offices'
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
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#EF4444" />
        <path d="M16 16L20 20L24 16" stroke="#ffffff" strokeWidth="2" />
        <path d="M20 20L20 24" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    title: '100% Accuracy',
    description: 'Direct integration with RERA databases for reliable results'
  }
];

function ReraBenefits() {
  return (
    <section className="townmanor-rera-benefits-section">
      <div className="townmanor-rera-benefits-container">
        <div className="townmanor-rera-benefits-header">
          <h2>Why Verify Your Property Under RERA?</h2>
          <p>Ensure compliance and protect your investment</p>
        </div>
        <div className="townmanor-rera-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="townmanor-rera-benefit-card">
              <div className="townmanor-rera-benefit-icon">
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

export default ReraBenefits; 