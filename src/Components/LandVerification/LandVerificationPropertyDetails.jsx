import React from 'react';
import './landverification.css';

const LandVerificationPropertyDetails = ({ property }) => {
  const defaultProperty = {
    ownerName: 'John Smith',
    propertyId: 'GJ-12345-789',
    landCategory: 'Private',
    area: '2.5 Acres',
    status: 'Verified'
  };

  const data = property || defaultProperty;

  return (
    <div className="card land-verification-property-details">
      <div className="card-header">
        <h2 className="text-lg font-semibold mb-4">Property Details</h2>
        <div className="space-y-4">
          <div>
            <span className="status-badge status-verified">
              {data.status}
            </span>
          </div>
          <div className="property-grid">
            <div>
              <p className="property-label">Owner Name</p>
              <p className="property-value">{data.ownerName}</p>
            </div>
            <div>
              <p className="property-label">Property ID</p>
              <p className="property-value">{data.propertyId}</p>
            </div>
            <div>
              <p className="property-label">Land Category</p>
              <p className="property-value">{data.landCategory}</p>
            </div>
            <div>
              <p className="property-label">Area</p>
              <p className="property-value">{data.area}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="flex-between">
          <button className="button button-secondary">
            <i className="fas fa-download icon"></i>
            Download Report
          </button>
          <button className="button button-secondary">
            <i className="fas fa-print icon"></i>
            Print Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandVerificationPropertyDetails; 