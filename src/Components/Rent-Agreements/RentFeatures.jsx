// RentFeatures.jsx
import React from 'react';
import './RentFeatures.css';
import { MdGppGood, MdSupportAgent, MdEditDocument } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const RentFeatures = () => {
  const features = [
    { icon: <MdGppGood  size={24}/>, title: 'Paperless Rental Agreement', text: 'Draft agreements adhering to latest rent control laws' },
    { icon: <MdEditDocument size={24} />, title: 'Customizable Templates', text: 'Modify clauses as per your specific requirements' },
    { icon: <MdSupportAgent size={24}/>, title: 'Expert Support', text: '24/7 legal assistance for agreement creation' }
  ];
  const navigate = useNavigate(); // Hook for navigation
  
    const handleNavigation = () => {
      navigate("/rent-agreement");
    };

  return (
    <section className="rent-features">
      <div className="rent-features-container">
        {features.map((feature, index) => (
          <div key={index} className="rent-feature-card" onClick={handleNavigation}>
            <div className="rent-feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RentFeatures;