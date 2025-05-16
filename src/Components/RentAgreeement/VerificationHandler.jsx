import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AadhaarVerification from './AadhaarVerification';

const VerificationHandler = ({ userType, formData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [agreementData, setAgreementData] = useState(null);

  useEffect(() => {
    fetchAgreementData();
  }, []);

  const fetchAgreementData = async () => {
    try {
      const agreementId = localStorage.getItem('rentAgreementId');
      if (!agreementId) return;

      const response = await axios.get(`https://townmanor.ai/api/rentagreement/${agreementId}`);
      setAgreementData(response.data);
    } catch (error) {
      console.error('Error fetching agreement data:', error);
    }
  };

  const handleVerificationComplete = async (verificationData) => {
    try {
      const agreementId = localStorage.getItem('rentAgreementId');
      if (!agreementId) {
        console.error('No agreement ID found');
        return;
      }

      const endpoint = `https://townmanor.ai/api/rentagreement/${agreementId}/${userType === 'landlord' ? 'verify-landlord' : 'verify-tenant'}`;
      const response = await axios.patch(
        endpoint,
        { 
          [`${userType}_verified`]: true,
          [`${userType}_aadhaar_data`]: verificationData 
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} verification successful!`);
        await fetchAgreementData();
        navigate('/newRentAgreement/payment');
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
      alert('Failed to update verification status. Please try again.');
    }
  };

  if (!agreementData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="verification-handler-container">
      <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)} Verification</h2>
      <div className="verification-status">
        Status: {agreementData[`${userType}_verified`] ? 'Verified' : 'Not Verified'}
      </div>
      {!agreementData[`${userType}_verified`] && (
        <AadhaarVerification onVerificationComplete={handleVerificationComplete} />
      )}
    </div>
  );
};

export default VerificationHandler; 