import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="slh-hero">
    <div className="slh-hero-bg">
      <div className="slh-hero-content">
        <h1 className="slh-hero-title">
        Elevate Your Property into a Premium Rental with Townmanor
        </h1>
        <p className="slh-hero-subtitle">
        Partner with us to design smart, stylish living spaces. From transformation to tenant experience, we handle everything-seamlessly, together.
        </p>
      
      </div>
      <div className="slh-hero-floating slh-hero-float-chat" />
      <div className="slh-hero-floating slh-hero-float-chart" />
      <div className="slh-hero-floating slh-hero-float-badge" />
    </div>
    <div className="slh-hero-cards">
      <div className="slh-hero-card nophonecard">
        
        <img
          src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752745345050-main5.jpeg"
          alt="Property"
          className="slh-hero-card-img"
        />
      </div>
      <div className="slh-hero-card">
        
        <img
          src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752838065543-image-1.png"
          alt="Card 1"
          className="slh-hero-card-img"
        />
        {/* <div className="slh-hero-card-img slh-hero-card-img-center">
          <div className="slh-hero-card-person" />
          <div className="slh-hero-card-phone" />
        </div> */}
      </div>
      <div className="slh-hero-card nophonecard">
       
        <img
          src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752745916380-main2.jpeg"
          alt="Card 1"
          className="slh-hero-card-img"
        />
        {/* <div className="slh-hero-card-img slh-hero-card-img-right">
          <div className="slh-hero-card-worker" />
          <div className="slh-hero-card-oven" />
        </div> */}
      </div>
        <button className="slh-hero-btn" onClick={() => navigate('/landlord')}>Know More</button>
    </div>
  </div></>
  );
};

export default Landing;
