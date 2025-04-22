import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
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
        <div className="smartWorldUnique__agentTitle">Property Details</div>
        <div className="smartWorldUnique__agentBadge">{property.Listed_By || 'Premium'}</div>
        <div className="smartWorldUnique__agentInfo">
          <img
            src="/Agent.png"
            alt="Property"
            className="smartWorldUnique__agentImg"
          />
          <div className="smartWorldUnique__agentDetails">
            <div className="smartWorldUnique__agentName">{property.property_name}</div>
            <div className="smartWorldUnique__agentGroup">{property.locality}, {property.city}</div>
            <div className="smartWorldUnique__agentRERA">RERA ID: {property.rera_id || 'N/A'}</div>
          </div>
        </div>
        <div className="smartWorldUnique__agentStats">
          <div>
            <strong>{property.configuration}</strong><br />CONFIGURATION
          </div>
          <div>
            <strong>{property.construction_status}</strong><br />STATUS
          </div>
        </div>
        <div className="smartWorldUnique__agentButtons">
          <button className="smartWorldUnique__profileBtn">Download Brochure</button>
          <button className="smartWorldUnique__propertyBtn">Contact Agent</button>
        </div>
      </div>
    </div>
  );
};

export default SmartWorldAbout;
