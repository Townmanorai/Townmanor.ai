import React from 'react';
import './ReraBenefits.css';

const ReraBenefits = () => {
  const benefits = [
    {
      title: 'Legal Compliance',
      description: 'Ensure your property investment complies with RERA regulations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      )
    },
    {
      title: 'Quick Verification',
      description: 'Get instant results about your property\'s RERA status',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10B981">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      )
    },
    {
      title: 'Transparent Process',
      description: 'Access detailed information about project approvals and status',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EF4444">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
        </svg>
      )
    },
    {
      title: 'Secure Platform',
      description: 'Your data is protected with advanced security measures',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="townmanor-rera-benefits-section">
      <div className="townmanor-rera-benefits-container">
        <div className="townmanor-rera-benefits-header">
          <h2>Benefits of RERA Verification</h2>
          <p>Why verifying your property under RERA is essential</p>
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
};

export default ReraBenefits; 