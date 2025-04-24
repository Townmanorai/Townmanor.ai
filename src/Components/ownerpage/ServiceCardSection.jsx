import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCouch, FaFileContract, FaBullhorn } from "react-icons/fa";
import "./ServiceCardSectionStyles.css";

const cardInfoData = [
  {
    icon: <FaHome size={24} />,
    title: "Co-Living Space",
    details: [
      "Find Perfect Co-Living Spaces",
      "Coming Soon to Townmanor"
    ],
    buttonText: "Coming Soon",
    url: "#"
  },
  {
    icon: <FaCouch size={24} />,
    title: "Interiors Package",
    details: [
      "Customized Solutions",
      "10-Year Warranty"
    ],
    buttonText: "Book a Consultation Now",
    url: "/homelane"
  },
  {
    icon: <FaFileContract size={24} />,
    title: "Rent Agreement",
    details: [
      "Make your Rent Agreement at home",
      "At Very Affordable Price"
    ],
    buttonText: "Request Professional Valuation",
    url: "/rentagreements"
  },
  {
    icon: <FaBullhorn size={24} />,
    title: "Check your Credit Score",
    details: [
      "Absolutely free",
      "Quick Response Time"
    ],
    buttonText: "Check Credit Score",
    url: "/credit-score"
  }
];

const ServiceCardSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
  };

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
          <button 
            className="custom-card-action-button"
            onClick={() => handleNavigate(card.url)}
          >
            {card.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServiceCardSection;
