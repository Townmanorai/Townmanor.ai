import React from "react";
import "./Services.css";

// Popup modal component
const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

const servicesData = [
  {
    title: "Check Credit Score",
    description:
      "Get instant access to your credit score and financial health report",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <path d="M2 10h20" />
        <path d="M6 14h4" />
        <path d="M6 18h2" />
      </svg>
    ),
    link: "https://townmanor.ai/credit-score"
  },
  {
    title: "RERA Verification",
    description: "Verify property registration status under RERA regulations",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    title: "Land Verification",
    description:
      "Comprehensive land title and ownership verification service",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 22l10-5 10 5V2z" />
        <path d="M12 2v15" />
      </svg>
    ),
  },
  {
    title: "eStamp",
    description: "Expert and secure electronic stamp paper processing",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Rent Agreement",
    description: "Digital rental agreement creation and registration",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M13 2v7h7" />
        <path d="M9 15h6" />
        <path d="M9 19h6" />
        <path d="M9 11h6" />
      </svg>
    ),
  },
  {
    title: "Home Shift",
    description: "Professional relocation services for a hassle-free move",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <path d="M16 8l5 5" />
        <path d="M8 21h4" />
        <path d="M10 21v-5" />
      </svg>
    ),
    link: "https://townmanor.ai/homeshift"
  },
  {
    title: "Home Interior",
    description: "Professional interior design and decoration solutions",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 14h20" />
        <path d="M2 18h20" />
        <path d="M6 14v-4a4 4 0 0 1 8 0v4" />
        <path d="M10 14v4" />
        <path d="M12 2v2" />
      </svg>
    ),
    link: "https://townmanor.ai/homelane"
  },
  {
    title: "Home Loan",
    description: "Complete home loan solutions with quick processing",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22V13" />
        <path d="M6 9l6-6 6 6" />
        <path d="M2 12h4v10h12V12h4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    title: "Listed Property",
    description: "Browse through our extensive list of verified properties",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M2 7l10-5 10 5" />
        <path d="M6 10h4" />
        <path d="M6 14h2" />
      </svg>
    ),
  },
  {
    title: "Choose Plan",
    description: "Select your own tailored property investment plan",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2l-2 2l2 2" />
        <path d="M11 2h-4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-4" />
        <path d="M7 10h8" />
        <path d="M7 14h6" />
        <path d="M17 2v4" />
      </svg>
    ),
  },
  {
    title: "Pay Property Tax",
    description: "Seamless online property tax payment and guidance",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 21h8a2 2 0 0 0 2-2v-7H6v7a2 2 0 0 0 2 2z" />
        <path d="M8 3v5h8V3" />
        <path d="M12 8v13" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: "Commercial Investment",
    description: "Expert guidance for commercial property investment",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 19h18" />
        <path d="M6 19V5a2 2 0 0 1 2-2h4v16" />
        <path d="M14 19V10a2 2 0 0 1 2-2h2v11" />
      </svg>
    ),
    link: "https://townmanor.ai/commercial",
    isNew: true,
  },
];

// Reusable card component with click behavior
const ServiceCard = ({ title, description, icon, link, isNew, showPopup }) => {
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    } else {
      showPopup("Coming Soon");
    }
  };

  return (
    <div className="svc-service-card" onClick={handleClick}>
      <div className="svc-icon-wrapper">{icon}</div>
      <div className="svc-service-text">
        <h3>
          {title} {isNew && <span className="new-badge">New</span>}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const [popupMessage, setPopupMessage] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container">
      <section className="svc-services-section">
        <h3>
          Our <b>Services</b>
        </h3>
        <span className="svc-heading-underline"></span>
        <div className="svc-services-grid">
          {servicesData.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              isNew={service.isNew}
              showPopup={showPopup}
            />
          ))}
        </div>
      </section>
      {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default Services;
