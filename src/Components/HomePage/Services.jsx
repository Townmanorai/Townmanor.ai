import React from "react";
import "./Services.css";

// Popup modal component
const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

const servicesData = [
  {
    title: "Check Credit Score",
    description: "Get instant access to your credit score and financial health report",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Credit card outline */}
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        {/* Divider */}
        <line x1="2" y1="10" x2="22" y2="10" />
        {/* Simple bar graph element */}
        <polyline points="6,16 9,13 12,16" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Document with folded corner */}
        <path d="M4 2h12l4 4v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        {/* Check mark overlay */}
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Land Verification",
    description: "Comprehensive land title and ownership verification service",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Land plot outline */}
        <path d="M3 14l9-9 9 9v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        {/* Horizontal line to denote division */}
        <line x1="3" y1="14" x2="21" y2="14" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Circular stamp outline */}
        <circle cx="12" cy="12" r="10" />
        {/* Star in the center */}
        <polygon points="12,7 13,10 16,10 14,12 15,15 12,13 9,15 10,12 8,10 11,10" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Document outline */}
        <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
        {/* Header line */}
        <line x1="2" y1="8" x2="22" y2="8" />
        {/* Signature line */}
        <line x1="7" y1="16" x2="17" y2="16" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Truck cab */}
        <rect x="1" y="10" width="12" height="8" rx="1" />
        {/* Truck container with simplified outline */}
        <path d="M13 14h6l2 2v-6l-2 2h-6" />
        {/* Wheels */}
        <circle cx="4" cy="19" r="2" />
        <circle cx="10" cy="19" r="2" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Simplified sofa shape */}
        <rect x="3" y="12" width="18" height="5" rx="2" />
        <path d="M7 12V8h10v4" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* House outline */}
        <path d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z" />
        {/* Dollar symbol simplified (vertical line with a small circle) */}
        <line x1="12" y1="16" x2="12" y2="12" />
        <circle cx="12" cy="10" r="1" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Building outline */}
        <rect x="3" y="7" width="18" height="14" rx="2" />
        {/* Windows or floor divisions */}
        <line x1="3" y1="11" x2="21" y2="11" />
        <line x1="3" y1="15" x2="21" y2="15" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Checklist document */}
        <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
        {/* Horizontal lines representing text */}
        <line x1="6" y1="8" x2="18" y2="8" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="6" y1="16" x2="18" y2="16" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Tax form / building */}
        <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
        {/* Divider line */}
        <line x1="2" y1="8" x2="22" y2="8" />
        {/* Simplified money symbol */}
        <line x1="12" y1="12" x2="12" y2="17" />
        <circle cx="12" cy="10" r="1" />
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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Skyscraper outline */}
        <rect x="4" y="4" width="16" height="16" rx="2" />
        {/* Upward trending arrow */}
        <polyline points="8 16 12 12 16 16" />
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
      <div className="svc-icon-wrapper">
        <div className="icon-container">{icon}</div>
      </div>
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
        <h1 style={{fontSize:'30px',color:'#0b1116',fontFamily:'Gilroy',fontWeight:'400'}}>
          Our <b>services</b>
        </h1>
        {/* <span className="svc-heading-underline"></span> */}
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
