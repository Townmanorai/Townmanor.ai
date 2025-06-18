import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import axios from 'axios';
import './colivingPricingUnique.css';

const ColivingPaymentSuccess = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateRoomStatus = async () => {
      try {
        // Get property ID from localStorage
        const propertyId = localStorage.getItem('propertyId');
        const paymentType = localStorage.getItem('paymentType');

        // Verify this is a coliving payment
        if (paymentType !== 'coliving') {
          throw new Error('Invalid payment type');
        }

        if (!propertyId) {
          throw new Error('Property ID not found');
        }

        // Update room status
        const response = await axios.patch(
          `https://townmanor.ai/api/coliving-rooms/${propertyId}/occupied`,
          { occupied: true },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          // Clear localStorage
          localStorage.removeItem('propertyId');
          localStorage.removeItem('paymentType');
        } else {
          throw new Error('Failed to update room status');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsUpdating(false);
      }
    };

    updateRoomStatus();
  }, []);

  if (isUpdating) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <div className="payment-success-loading">
            <div className="payment-success-spinner"></div>
            <p>Updating your booking status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <div className="payment-success-error">
            <FaCheckCircle className="payment-success-icon error" />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              className="payment-success-button"
              onClick={() => navigate('/newcoliving')}
            >
              Return to Coliving
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <div className="payment-success-message">
          <FaCheckCircle className="payment-success-icon success" />
          <h2>Payment Successful!</h2>
          <p>Your coliving room has been successfully booked.</p>
          <div className="payment-success-details">
            <p>Thank you for choosing our coliving space.</p>
            <p>You will receive a confirmation email shortly.</p>
          </div>
          <button 
            className="payment-success-button"
            onClick={() => navigate('/coliving')}
          >
            <FaHome className="button-icon" />
            Return to Coliving
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColivingPaymentSuccess; 