import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [countdown, setCountdown] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Call the priority API to activate the property boost
        console.log('Making PUT request to priority endpoint for property:', propertyId);
        const response = await axios.put(`https://townmanor.ai/api/owner-property/priority/${propertyId}`, {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Priority API response:', response);
        setLoading(false);
        // Start countdown after successful API call
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/userdashboard');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error('Error activating property boost:', error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        } : error.message);
        // Even if there's an error, we'll continue with the countdown
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [propertyId, navigate]);

  useEffect(() => {
    // Start countdown only after loading is complete
    if (!loading && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      navigate('/userdashboard');
    }
  }, [countdown, loading, navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />
        <h1>Payment Successful!</h1>
        <p>Your property boost has been activated successfully.</p>
        {loading ? (
          <p>Activating your property boost...</p>
        ) : (
          <p>Redirecting to dashboard in {countdown} seconds...</p>
        )}
      </div>
    </div>
  );
};

export default Success;
