import React, { useState } from 'react';
import axios from 'axios';
import './AadhaarVerification.css';

const AadhaarVerification = ({ onVerificationComplete }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [clientId, setClientId] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateAadhaar = (number) => {
    return /^\d{12}$/.test(number);
  };

  const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp);
  };

  const handleAadhaarSubmit = async (e) => {
    e.preventDefault();
    if (!validateAadhaar(aadhaarNumber)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp',
        {
          id_number: aadhaarNumber
        },
        {
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setClientId(response.data.data.client_id);
        setShowOtpInput(true);
      } else {
        setError('Failed to generate OTP. Please try again.');
      }
    } catch (error) {
      setError('Error generating OTP. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!validateOtp(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp',
        {
          client_id: clientId,
          otp: otp
        },
        {
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        onVerificationComplete(response.data.data);
      } else {
        setError('OTP verification failed. Please try again.');
      }
    } catch (error) {
      setError('Error verifying OTP. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="townmanor-aadhaar-verification__wrapper">
      <h3 className="townmanor-aadhaar-verification__title">Aadhaar Verification</h3>
      {!showOtpInput ? (
        <form onSubmit={handleAadhaarSubmit} className="townmanor-aadhaar-verification__form">
          <div className="townmanor-aadhaar-verification__input-container">
            <label htmlFor="aadhaar" className="townmanor-aadhaar-verification__label">
              Enter Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaar"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
              placeholder="12-digit Aadhaar Number"
              maxLength={12}
              disabled={loading}
              className={`townmanor-aadhaar-verification__input ${loading ? 'townmanor-aadhaar-verification__input--disabled' : ''}`}
            />
          </div>
          {error && <div className="townmanor-aadhaar-verification__error">{error}</div>}
          <button 
            type="submit" 
            disabled={loading}
            className={`townmanor-aadhaar-verification__submit-btn ${loading ? 'townmanor-aadhaar-verification__submit-btn--disabled' : ''}`}
          >
            {loading ? 'Generating OTP...' : 'Generate OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="townmanor-aadhaar-verification__form">
          <div className="townmanor-aadhaar-verification__input-container">
            <label htmlFor="otp" className="townmanor-aadhaar-verification__label">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6-digit OTP"
              maxLength={6}
              disabled={loading}
              className={`townmanor-aadhaar-verification__input ${loading ? 'townmanor-aadhaar-verification__input--disabled' : ''}`}
            />
          </div>
          {error && <div className="townmanor-aadhaar-verification__error">{error}</div>}
          <button 
            type="submit" 
            disabled={loading}
            className={`townmanor-aadhaar-verification__submit-btn ${loading ? 'townmanor-aadhaar-verification__submit-btn--disabled' : ''}`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AadhaarVerification; 