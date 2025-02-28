// RentFeatures.jsx
import React from 'react';
import './RentFeatures.css';
import { MdGppGood, MdSupportAgent, MdEditDocument } from "react-icons/md";

const RentFeatures = () => {
  const features = [
    { icon: <MdGppGood />, title: '100% Legal Compliance', text: 'Draft agreements adhering to latest rent control laws' },
    { icon: <MdEditDocument />, title: 'Customizable Templates', text: 'Modify clauses as per your specific requirements' },
    { icon: <MdSupportAgent />, title: 'Expert Support', text: '24/7 legal assistance for agreement creation' }
  ];

  return (
    <section className="rent-features">
      <div className="rent-features-container">
        {features.map((feature, index) => (
          <div key={index} className="rent-feature-card">
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