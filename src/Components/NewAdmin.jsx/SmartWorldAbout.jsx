import React, { useState } from 'react';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import './SmartWorldAbout.css';

const SmartWorldAbout = ({ property }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="smartWorldUnique__aboutSection">
      <div className="smartWorldUnique__leftBlock">
        <h2 className="smartWorldUnique__title">About {property.property_name}</h2>
        <p className="smartWorldUnique__introText">
          {showFullDescription ? property.description : `${property.description?.substring(0, 200)}...`}
        </p>
        {property.description?.length > 200 && (
          <div 
            className="smartWorldUnique__showMore" 
            onClick={toggleDescription}
          >
            {showFullDescription ? 'Show Less' : 'Show More'} 
            <span className="smartWorldUnique__arrow">
              {showFullDescription ? '▲' : '▼'}
            </span>
          </div>
        )}
      </div>

      <div className="smartWorldUnique__rightCard">
        <div className="smartWorldUnique__agentTitle">Agent on Spotlight</div>
        <div className="smartWorldUnique__agentBadge">{property.Listed_By || 'Premium'}</div>
        <div className="smartWorldUnique__agentInfo">
          <img
            src="/Agent.png"
            alt="Property"
            className="smartWorldUnique__agentImg"
          />
          <div className="smartWorldUnique__agentDetails">
            <div className="smartWorldUnique__agentName">Townmanor Infratech pvt Limited</div>
            <div className="smartWorldUnique__agentGroup">Noida</div>
            <div className="smartWorldUnique__agentRERA">RERA ID: UPRERAAGT26073</div>
          </div>
        </div>
        <div className="smartWorldUnique__agentStats">
         
        </div>
        <div className="smartWorldUnique__agentButtons">
          <button className="smartWorldUnique__profileBtn">+91 7042888903</button>
         <a href='https://wa.me/+917042888903'><button className="smartWorldUnique__propertyBtn"><FaWhatsapp size={20} />
          Connect on Whatsapp</button></a> 
        </div>
      </div>
    </div>
  );
};

export default SmartWorldAbout;
