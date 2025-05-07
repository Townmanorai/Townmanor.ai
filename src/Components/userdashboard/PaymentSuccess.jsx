import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get property ID from localStorage
        const propertyId = localStorage.getItem('boostPropertyId');
        if (!propertyId) {
          throw new Error('Property ID not found');
        }

        // Call the priority API
        await axios.put(`https://townmanor.ai/api/owner-property/priority/${propertyId}`);
        
        // Clear the stored property ID
        localStorage.removeItem('boostPropertyId');
        
        setStatus('success');
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/userdashboard');
        }, 3000);
      } catch (error) {
        console.error('Error processing payment success:', error);
        setStatus('error');
      }
    };

    handlePaymentSuccess();
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      {status === 'processing' && (
        <>
          <h2>Processing your payment...</h2>
          <p>Please wait while we confirm your transaction.</p>
        </>
      )}
      
      {status === 'success' && (
        <>
          <h2>Payment Successful!</h2>
          <p>Your property has been boosted successfully.</p>
          <p>Redirecting to dashboard...</p>
        </>
      )}
      
      {status === 'error' && (
        <>
          <h2>Something went wrong</h2>
          <p>There was an error processing your payment success. Please contact support.</p>
          <button 
            onClick={() => navigate('/userdashboard')}
            style={{
              background: 'linear-gradient(to right, #ff4447, #8a2e2e)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Return to Dashboard
          </button>
        </>
      )}
      <h1>hello</h1>
    </div>
  );
};

export default PaymentSuccess; 