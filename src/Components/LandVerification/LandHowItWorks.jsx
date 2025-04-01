import React from 'react';
import './LandHowItWorks.css';

const steps = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Enter Details Icon"
        role="img"
      >
        <rect x="8" y="6" width="24" height="28" rx="2" fill="#3B82F6" />
        <path d="M8 12H32V16H8V12Z" fill="#ffffff" />
        <path d="M12 20H28V24H12V20Z" fill="#ffffff" />
        <path d="M12 26H20V30H12V26Z" fill="#ffffff" />
      </svg>
    ),
    title: 'Enter Details',
    description: 'Provide land location and owner information'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Verify Icon"
        role="img"
      >
        <path d="M20 8L8 20V32H32V20L20 8Z" fill="#10B981" />
        <path d="M20 16V24" stroke="#ffffff" strokeWidth="2" />
        <circle cx="20" cy="28" r="2" fill="#ffffff" />
      </svg>
    ),
    title: 'Verify',
    description: 'Our system checks government records instantly'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Get Results Icon"
        role="img"
      >
        <circle cx="20" cy="20" r="16" fill="#EF4444" />
        <path d="M16 20L20 24L24 16" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    title: 'Get Results',
    description: 'Download verification report with official details'
  }
];

const features = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Digital Icon"
        role="img"
      >
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#F59E0B" />
        <rect x="12" y="12" width="4" height="4" fill="#ffffff" />
        <rect x="20" y="12" width="4" height="4" fill="#ffffff" />
        <rect x="28" y="12" width="4" height="4" fill="#ffffff" />
        <rect x="12" y="20" width="4" height="4" fill="#ffffff" />
        <rect x="20" y="20" width="4" height="4" fill="#ffffff" />
        <rect x="28" y="20" width="4" height="4" fill="#ffffff" />
      </svg>
    ),
    title: '100% Digital',
    description: 'Complete the entire process online without any paperwork'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Secure Icon"
        role="img"
      >
        <rect x="12" y="12" width="16" height="16" rx="2" fill="#10B981" />
        <path d="M16 16L20 12L24 16" stroke="#ffffff" strokeWidth="2" />
        <path d="M24 24L20 28L16 24" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    title: 'Secure & Reliable',
    description: 'Your data is protected with bank-grade security'
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Support Icon"
        role="img"
      >
        <rect x="10" y="16" width="20" height="8" rx="2" fill="#8B5CF6" />
        <path d="M14 12H26V16H14V12Z" fill="#7C3AED" />
        <rect x="16" y="24" width="8" height="8" rx="2" fill="#A78BFA" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Get help anytime with our dedicated support team'
  }
];

function LandHowItWorks() {
  return (
    <section className="townmanor-land-how-it-works-section">
      <div className="townmanor-land-how-it-works-container">
        <div className="townmanor-land-how-it-works-header">
          <h2>How It Works</h2>
          <p>Simple 3-step process to verify your land records</p>
        </div>
        <div className="townmanor-land-how-it-works-steps">
          {steps.map((step, index) => (
            <div key={index} className="townmanor-land-how-it-works-step">
              <div className="townmanor-land-how-it-works-step-icon">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && (
                <div className="townmanor-land-how-it-works-step-arrow">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="townmanor-land-how-it-works-steps">
          {features.map((feature, index) => (
            <div key={index} className="townmanor-land-how-it-works-step">
              <div className="townmanor-land-how-it-works-step-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandHowItWorks; 