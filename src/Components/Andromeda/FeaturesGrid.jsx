import React from "react";
import { FaClock, FaCheckCircle, FaUsers, FaShieldAlt, FaGift, FaMoneyCheckAlt, FaUserPlus, FaHeadset, FaChartPie, FaPercentage } from "react-icons/fa";
import "./Andromeda.css";

const data = [
  {
    "id": 1,
    "image": "/andro9.jpg",
    "text": "Fast Approval in 24 hours"
  },
  {
    "id": 2,
    "image": "/andro7.jpg",
    "text": "Instant Approval"
  },
  {
    "id": 3,
    "image": "/andro8.jpg",
    "text": "Training Program"
  },
  {
    "id": 4,
    "image": "/andro3.jpg",
    "text": "Secure Data"
  },
  {
    "id": 5,
    "image": "/andro2.jpg",
    "text": "Rewards and Loyalty"
  },
  {
    "id": 6,
    "image": "/andro5.jpg",
    "text": "Best in Class & Prompt Payout"
  },
  {
    "id": 7,
    "image": "/andro11.jpg",
    "text": "Easy On Boarding"
  },
  {
    "id": 8,
    "image": "/andro4.jpg",
    "text": "Customer Support"
  },
  {
    "id": 9,
    "image": "/andro6.jpg",
    "text": "Unified DashBoard"
  },
  {
    "id": 10,
    "image": "/zero.jpg",
    "text": "Zero Investment"
  }
]


const FeatureGrid = () => {
  return (
    <>
     <div className="feature-grid-mobile">
      {data.map((feature) => (
        <div key={feature.id} className="feature-card">
          <div className=""><img src={feature.image} style={{
            width:'100%',
            height:'100px'
          }}></img></div>
          <p className="feature-text">{feature.text}</p>
        </div>
      ))}
      </div>
    <div className="feature-grid-container">
   
      <div className="fetures-card">
        <img src="/andro9.jpg" style={{
            width:'42%',
            
        }}></img>
        <p className="feature-text">Fast Approval in 24 hours</p>
      </div>
      <div className="fetures-card">
        <img src="/andro7.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Instant Approval</p>
      </div>
      <div className="fetures-card">
        <img src="/andro8.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Training Program</p>
      </div>
      {/* <div className="fetures-card">
        <img src="/andro1.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Instant Approaval</p>
      </div> */}
    </div>
    <div className="feature-grid-container">
      {/* {features.map((feature) => (
        <div key={feature.id} className="feature-card">
          <div className=""><img src={feature.icon} style={{
            width:'100%',
            height:'100px'
          }}></img></div>
          <p className="feature-text">{feature.text}</p>
        </div>
      ))} */}
      <div className="fetures-card">
        <img src="/andro3.jpg" style={{
            width:'42%',
            
        }}></img>
        <p className="feature-text">Secure Data</p>
      </div>
      <div className="fetures-card">
        <img src="/andro2.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Rewards and Loyalty</p>
      </div>
      <div className="fetures-card">
        <img src="/andro5.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Best in Class & Prompt Payout</p>
      </div>
      <div className="fetures-card">
        <img src="/andro11.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Easy On Boarding</p>
      </div>
    </div>
    <div className="feature-grid-container">
      {/* {features.map((feature) => (
        <div key={feature.id} className="feature-card">
          <div className=""><img src={feature.icon} style={{
            width:'100%',
            height:'100px'
          }}></img></div>
          <p className="feature-text">{feature.text}</p>
        </div>
      ))} */}
      <div className="fetures-card">
        <img src="/andro4.jpg" style={{
            width:'42%',
            
        }}></img>
        <p className="feature-text">Customer Support</p>
      </div>
      <div className="fetures-card">
        <img src="/andro6.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Unified DashBoard</p>
      </div>
      <div className="fetures-card">
        <img src="/zero.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Zero Investment</p>
      </div>
      {/* <div className="fetures-card">
        <img src="/andro1.jpg" style={{
           width:'42%',
           
        }}></img>
        <p className="feature-text">Instant Approaval</p>
      </div> */}
    </div>
    </>
  );
};

export default FeatureGrid;
