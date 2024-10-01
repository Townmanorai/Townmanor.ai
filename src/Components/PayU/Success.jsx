import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const txnid = query.get('txnid');
  // const amount = query.get('amount');
  // const firstname = query.get('firstname');
  // const email = query.get('email');

  const txnid = '123456';
  const amount = '100';
  const firstname = 'Ravindra';
  const email = 'ravindra@gmail.com';


  const navigate = useNavigate("/");

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-container">
      <div className="success-message">
        <h1>🎉 Payment Successful!</h1>
        <p>Thank you, <strong>{firstname}</strong>! Your payment of <strong>₹{amount}</strong> has been processed successfully.</p>
        <p>Transaction ID: <strong>{txnid}</strong></p>
        <p>Email: <strong>{email}</strong></p>
        <button className="home-button" onClick={goToHome}>Go to Home</button>
      </div>
    </div>
  );
};

export default Success;
