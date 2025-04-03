import React from 'react';
import './ReraAbout.css';

const ReraAbout = () => {
  const stats = [
    {
      number: '50,000+',
      label: 'Verifications Completed'
    },
    {
      number: '98%',
      label: 'Customer Satisfaction'
    },
    {
      number: '28',
      label: 'States Covered'
    },
    {
      number: '24/7',
      label: 'Customer Support'
    }
  ];

  return (
    <section className="townmanor-rera-about-section">
      <div className="townmanor-rera-about-container">
        <div className="townmanor-rera-about-header">
          <h2>About RERA Verification</h2>
          <p>Your trusted partner for property verification under RERA regulations</p>
        </div>

        <div className="townmanor-rera-about-content">
          <div className="townmanor-rera-about-text">
            <h3>Why Choose Our RERA Verification Service?</h3>
            <p>
              Our RERA verification service provides a quick and reliable way to check if a real estate project is registered with the Real Estate Regulatory Authority. We help you make informed decisions about your property investments by ensuring compliance with RERA regulations.
            </p>
            <p>
              With our advanced verification system, you can easily check the registration status of any project across India. Our service is trusted by thousands of homebuyers, real estate agents, and property developers.
            </p>
          </div>

          <div className="townmanor-rera-about-stats">
            {stats.map((stat, index) => (
              <div key={index} className="townmanor-rera-about-stat">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReraAbout; 