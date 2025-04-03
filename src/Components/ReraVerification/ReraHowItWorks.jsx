import React from 'react';
import './ReraHowItWorks.css';

const ReraHowItWorks = () => {
  const steps = [
    {
      title: 'Enter Details',
      description: 'Provide the project name or RERA registration number',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      )
    },
    {
      title: 'Verify',
      description: 'Our system checks the RERA database for the project details',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10B981">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      )
    },
    {
      title: 'Get Results',
      description: 'Receive detailed information about the project\'s RERA status',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EF4444">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
        </svg>
      )
    }
  ];

  const features = [
    {
      title: 'Digital Verification',
      description: 'Quick and easy online verification process',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        </svg>
      )
    },
    {
      title: 'Secure Process',
      description: 'Your data is protected with advanced security measures',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10B981">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      )
    },
    {
      title: '24/7 Support',
      description: 'Get assistance whenever you need it',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B5CF6">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="townmanor-rera-how-it-works-section">
      <div className="townmanor-rera-how-it-works-container">
        <div className="townmanor-rera-how-it-works-header">
          <h2>How RERA Verification Works</h2>
          <p>Simple steps to verify your property's RERA registration</p>
        </div>

        <div className="townmanor-rera-how-it-works-steps">
          {steps.map((step, index) => (
            <div key={index} className="townmanor-rera-how-it-works-step">
              <div className="townmanor-rera-how-it-works-step-icon">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className="townmanor-rera-how-it-works-steps">
          {features.map((feature, index) => (
            <div key={index} className="townmanor-rera-how-it-works-step">
              <div className="townmanor-rera-how-it-works-step-icon">
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
};

export default ReraHowItWorks; 