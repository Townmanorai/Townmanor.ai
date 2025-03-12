import React, { useState, useEffect } from 'react';
import LandVerificationLocationMap from './LandVerificationLocationMap';
import LandVerificationPropertyDetails from './LandVerificationPropertyDetails';
import LandVerificationSearchForm from './LandVerificationSearchForm';

// Replace with your actual Bearer token or retrieve from a secure source
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN_HERE';

const LandVerification = () => {
  const [formData, setFormData] = useState({
    district: '',
    taluka: '',
    village: '',
    block: '',
    ownerName: ''
  });

  const [landDetails, setLandDetails] = useState(null);

  const handleFormSubmit = (data) => {
    // Assuming data is fetched from an existing API
    setFormData(data);
    // Simulate fetching data based on formData
    const fetchedData = {
      // Mock data structure
      ownerName: 'John Doe',
      propertyId: 'GJ-12345-789',
      landCategory: 'Private',
      area: '2.5 Acres',
      status: 'Verified'
    };
    setLandDetails(fetchedData);
  };

  return (
    <div className="container">
      <LandVerificationSearchForm onSubmit={handleFormSubmit} />
      <div className="main-grid">
        <LandVerificationPropertyDetails property={landDetails} />
        <LandVerificationLocationMap address={formData.village} />
      </div>
    </div>
  );
}

export default LandVerification;
