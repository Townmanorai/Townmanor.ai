import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [message, setMessage] = useState('Payment Successful!');
  const [redirectPath, setRedirectPath] = useState('/userdashboard/75369');

  useEffect(() => {
    const paymentType = localStorage.getItem('paymentType');

    if (paymentType === 'boost') {
      setMessage('Your property boost has been activated successfully.');
      setRedirectPath('/userdashboard/75369');
    } else if (paymentType === 'rentAgreement') {
      setMessage('Your rent agreement payment was successful.');
      setRedirectPath('/newRentAgreement/payment/75369'); // You can change this to the relevant page
    }
    else if (paymentType === 'coliving') {
      setMessage('Your coliving payment was successful.');
      setRedirectPath('/colivingpaymentpage'); // You can change this to the relevant page
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(redirectPath);

          // Clean up storage after redirection
          localStorage.removeItem('paymentType');
          localStorage.removeItem('boostPropertyId');
          localStorage.removeItem('agreementId');

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, redirectPath]);

  return (
    <div className="success-container">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />
        <h1>Payment Successful!</h1>
        <p>Your property boost has been activated successfully.</p>
        <p>Redirecting to dashboard in {countdown} seconds...</p>
      </div>
    </div>
  );
};

export default Success;
