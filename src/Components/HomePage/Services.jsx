import React from "react";
import "./Services.css";

// Popup Modal Component
const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose} aria-label="Close popup">
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

// Service Data
const servicesData = [
  {
    title: "Sell & Rent Your Property",
    description: "Boost your property's visibility and attract quality leads by listing your property.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Listed Property Icon"
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
    link: "https://townmanor.ai/form",
  },

  {
    title: "RERA Verification",
    description: "Verify property registration status under RERA regulations",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="RERA Verification Icon"
        role="img"
      >
        <path d="M8 6H28V14L32 18V34H8V6Z" fill="#6EE7B7" />
        <path d="M28 14H32L28 10V14Z" fill="#34D399" />
        <path d="M12 18H24V22H12V18Z" fill="#ffffff" />
        <path d="M12 26H24V30H12V26Z" fill="#ffffff" />
      </svg>
    ),
    link: "https://townmanor.ai/reraverification",
  },
  {
    title: "Land Verification",
    description: "Comprehensive land title and ownership verification service",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Land Verification Icon"
        role="img"
      >
        <path d="M20 4L4 16V36H36V16L20 4Z" fill="#FDE68A" />
        <path d="M16 20L20 24L28 16" stroke="#ffffff" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="#F59E0B" />
      </svg>
    ),
    link: "https://townmanor.ai/landverification",
  },
  {
    title: "Pay Property Tax",
    description: "Seamless online property tax payment and guidance",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Pay Property Tax Icon"
        role="img"
      >
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#EF4444" />
        <path d="M20 16V24" stroke="#ffffff" strokeWidth="2" />
        <circle cx="20" cy="28" r="2" fill="#ffffff" />
      </svg>
    ),
    link: "https://www.townmanor.ai/explorestate",
  },

  {
    title: "Check Credit Score",
    description: "Get instant access to your credit score and financial health report",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Credit Score Icon"
        role="img"
      >
        <rect x="4" y="8" width="32" height="24" rx="4" fill="#3B82F6" />
        <path d="M4 16H36V20H4V16Z" fill="#ffffff" />
        <circle cx="14" cy="26" r="4" fill="#10B981" />
        <circle cx="26" cy="26" r="4" fill="#EF4444" />
      </svg>
    ),
    link: "https://townmanor.ai/credit-score",
  },
  {
    title: "Home Loan",
    description: "Complete home loan solutions with quick processing",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Home Loan Icon"
        role="img"
      >
        <path d="M20 8L8 20V32H32V20L20 8Z" fill="#10B981" />
        <path d="M20 16V24" stroke="#ffffff" strokeWidth="2" />
        <circle cx="20" cy="28" r="2" fill="#ffffff" />
      </svg>
    ),
    link: "https://townmanor.ai/home-loan",
  },

  {
    title: "Home Interior",
    description: "Professional interior design and decoration solutions",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Home Interior Icon"
        role="img"
      >
        <rect x="10" y="16" width="20" height="8" rx="2" fill="#8B5CF6" />
        <path d="M14 12H26V16H14V12Z" fill="#7C3AED" />
        <rect x="16" y="24" width="8" height="8" rx="2" fill="#A78BFA" />
      </svg>
    ),
    link: "https://townmanor.ai/homelane",
  },
  {
    title: "Home Shift",
    description: "Professional relocation services for a hassle-free move",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Home Shift Icon"
        role="img"
      >
        <rect x="6" y="14" width="24" height="12" rx="2" fill="#6B7280" />
        <path d="M30 18H34V26H30V18Z" fill="#4B5563" />
        <circle cx="14" cy="30" r="4" fill="#9CA3AF" />
        <circle cx="26" cy="30" r="4" fill="#9CA3AF" />
      </svg>
    ),
    link: "https://townmanor.ai/homeshift",
  },

  {
    title: "Rent Agreement",
    description: "Digital rental agreement creation and aadhar e-Sign",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Rent Agreement Icon"
        role="img"
      >
        <rect x="8" y="6" width="24" height="28" rx="2" fill="#3B82F6" />
        <path d="M8 12H32V16H8V12Z" fill="#ffffff" />
        <path d="M12 20H28V24H12V20Z" fill="#ffffff" />
        <path d="M12 26H20V30H12V26Z" fill="#ffffff" />
      </svg>
    ),
    link: "https://townmanor.ai/rentagreements",
  },
  {
    title: "eStamp",
    description: "Expert and secure electronic stamp paper processing",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="eStamp Icon"
        role="img"
      >
        <circle cx="20" cy="20" r="16" fill="#EF4444" />
        <path d="M16 20L20 24L24 16" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "E-Sign Documents",
    description: "Legally valid Aadhaar-based digital signatures for property documents",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="E-Sign Icon"
        role="img"
      >
        <rect x="8" y="8" width="24" height="24" rx="2" fill="#8B5CF6" />
        <path d="M12 16H28" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 24H28" stroke="#ffffff" strokeWidth="2" />
        <path d="M18 16L24 28" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    link: "https://townmanor.ai/esign",
    isNew: true,
  },

  {
    title: "Commercial Investment",
    description: "Expert guidance for commercial property investment",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Commercial Investment Icon"
        role="img"
      >
        <rect x="12" y="12" width="16" height="16" rx="2" fill="#10B981" />
        <path d="M16 16L20 12L24 16" stroke="#ffffff" strokeWidth="2" />
        <path d="M24 24L20 28L16 24" stroke="#ffffff" strokeWidth="2" />
      </svg>
    ),
    link: "https://townmanor.ai/commercial",
    isNew: true,
  },
];

// Service Card Component
const ServiceCard = ({ title, description, icon, link, isNew, showPopup }) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    } else {
      showPopup("Coming Soon");
    }
  };

  return (
    <div className="svc-service-card" onClick={handleClick} role="button" tabIndex={0}>
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

// Main Services Component
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
    <section style={{marginTop:'25px'}}>
      <div className="container">
        <div className="section-heading mb-4 h4" style={{fontFamily:'Gilroy'}}>
          <h1>Explore <b>services</b></h1>
        </div>
        <section className="svc-services-section ">
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
    </section>
  );
};

export default Services;