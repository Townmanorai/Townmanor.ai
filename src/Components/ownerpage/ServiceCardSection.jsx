import React from "react";
import { FaHome, FaCouch, FaFileContract, FaBullhorn } from "react-icons/fa";
import "./ServiceCardSectionStyles.css";

const cardInfoData = [
  {
    icon: <FaHome size={24} />,
    title: "Home Loan Estimate",
    details: [
      "50+ Partner Banks Network",
      "Lowest Interest Rates"
    ],
    buttonText: "Get CIBIL-Linked Estimate"
  },
  {
    icon: <FaCouch size={24} />,
    title: "Interiors Package",
    details: [
      "Customized Solutions",
      "10-Year Warranty"
    ],
    buttonText: "Book a Consultation Now"
  },
  {
    icon: <FaFileContract size={24} />,
    title: "Rent Agreement",
    details: [
      "Make your Rent Agreement at home",
      "At Very Affordable Price"
    ],
    buttonText: "Request Professional Valuation"
  },
  {
    icon: <FaBullhorn size={24} />,
    title: "Check your Credit Score",
    details: [
      "Absolutely free",
      "Quick Response Time"
    ],
    buttonText: "Check Credit Score"
  }
];

const ServiceCardSection = () => {
  return (
    <div className="custom-section-wrapper-service-cards">
      {cardInfoData.map((card, index) => (
        <div className="custom-single-card-container" key={index}>
          <div className="custom-card-icon-circle">{card.icon}</div>
          <h3 className="custom-card-title-text">{card.title}</h3>
          <ul className="custom-card-list-info">
            {card.details.map((item, idx) => (
              <li key={idx} className="custom-card-info-list-item">
                <span className="custom-checkmark-icon">✓</span> {item}
              </li>
            ))}
          </ul>
          <button className="custom-card-action-button">{card.buttonText}</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceCardSection;
