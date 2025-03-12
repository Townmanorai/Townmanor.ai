import React from 'react';
import './landverification.css';

const LandVerificationLocationMap = ({ address }) => {
  const defaultAddress = '123 Main Street, Sector 7, Gandhinagar, Gujarat';

  return (
    <div className="card land-verification-location-map">
      <div className="card-header">
        <h2 className="text-lg font-semibold mb-4">Location</h2>
        <div className="map-container">
          <img
            src="https://ai-public.creatie.ai/gen_page/map_placeholder_1280x720.png"
            alt="Map"
          />
        </div>
        <div className="mt-4">
          <p className="property-label">Address</p>
          <p className="property-value">{address || defaultAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default LandVerificationLocationMap; 