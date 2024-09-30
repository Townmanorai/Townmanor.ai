import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Failure.css';

const Failure = () => {
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const txnid = query.get('txnid');
  // const amount = query.get('amount');
  // const firstname = query.get('firstname');
  // const email = query.get('email');

  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  const txnid = '123456';
  const amount = '100';
  const firstname = 'Ravindra';
  const email = 'ravindra@gmail.com';

  const navigate = useNavigate();

  const retryPayment = () => {
    navigate('/payment');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="failure-container">
      <div className="failure-message">
        <h1>😞 Payment Failed</h1>
        <p>Sorry, <strong>{firstname}</strong>, your payment of <strong>₹{amount}</strong> could not be processed.</p>
        <p>Transaction ID: <strong>{txnid}</strong></p>
        <p>Email: <strong>{email}</strong></p>
        <div className="failure-buttons">
          <button className="retry-button" onClick={retryPayment}>Retry Payment</button>
          <button className="home-button" onClick={goToHome}>Go to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Failure;
