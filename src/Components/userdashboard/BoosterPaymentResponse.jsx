import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoosterPaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentData = {
      txnid: searchParams.get('txnid'),
      amount: searchParams.get('amount'),
      status: searchParams.get('status'),
      firstname: searchParams.get('firstname'),
      email: searchParams.get('email'),
      phone: searchParams.get('phone'),
      productinfo: searchParams.get('productinfo'),
      mihpayid: searchParams.get('mihpayid')
    };

    const storePaymentResponse = async () => {
      try {
        const response = await axios.post('https://townmanor.ai/api/booster-payments', {
          ...paymentData,
          payment_date: new Date().toISOString(),
          plan_type: paymentData.productinfo
        });

        if (response.data.success) {
          setStatus('success');
          setTimeout(() => {
            navigate('/userdashboard');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error storing payment response:', error);
        setStatus('error');
      }
    };

    if (paymentData.txnid) {
      storePaymentResponse();
    }
  }, [location, navigate]);

  return (
    <div className="payment-response-container" style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '2rem auto',
      textAlign: 'center'
    }}>
      {status === 'processing' && (
        <div>
          <h2>Processing your payment...</h2>
          <p>Please wait while we confirm your transaction.</p>
        </div>
      )}
      {status === 'success' && (
        <div>
          <h2>Payment Successful!</h2>
          <p>Your booster plan has been activated.</p>
          <p>Redirecting to dashboard...</p>
        </div>
      )}
      {status === 'error' && (
        <div>
          <h2>Something went wrong</h2>
          <p>There was an error processing your payment. Please contact support.</p>
          <button 
            onClick={() => navigate('/userdashboard')}
            style={{
              background: 'linear-gradient(to right, #ff4447, #8a2e2e)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default BoosterPaymentResponse; 