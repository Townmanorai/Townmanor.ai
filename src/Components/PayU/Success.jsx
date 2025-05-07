import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(12);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const storedPropertyId = localStorage.getItem('boostPropertyId');

  //   const handlePaymentSuccess = async () => {
  //     try {
  //       if (storedPropertyId) {
  //         await axios.put(`https://townmanor.ai/api/owner-property/priority/${storedPropertyId}`, {
  //           priority: true
  //         });
  //         // Clear the stored property ID after successful activation
  //         localStorage.removeItem('boostPropertyId');
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error activating property boost:', error);
  //       setLoading(false);
  //     }
  //   };

  //   handlePaymentSuccess();
  // }, []);

  useEffect(() => {
    // Start countdown only after loading is complete
    if (!loading && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      navigate('/userdashboard/75369');
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
