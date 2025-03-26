import React, { useState } from "react";
import { FaCheckCircle, FaPercent } from "react-icons/fa";
import "./Andromeda.css";
import { TbPigMoney } from "react-icons/tb";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FiPercent } from "react-icons/fi";
const Banner = () => {
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestFormData, setRequestFormData] = useState({ name: "", phone: "", amount: "" });

  const handleRequestInputChange = (e) => {
    setRequestFormData({ ...requestFormData, [e.target.name]: e.target.value });
  };
  return (
    <>
    {/* <div className="andromeda-logo-container">
      <img src="/logo.png"></img>
      <img src="https://www.andromedaloans.com/wp-content/uploads/2022/08/andromeda-logo-new.svg" className="logo-img"></img>
    </div> */}
    <div className="banner-container">
    <div className="banner-logos">
    <img src="/logo.png" className="logo-img"></img>
      </div>
      <div className="banner-contentx">
        <h2 className="banner-title">Your <b>Dream </b>Home, Now <b>Within Reach</b></h2>
        <p className="banner-description">
          <b>TownManor And Andromeda</b> Bring You <b>Hassle-Free </b>Home Loans With The <b>Best Rates</b>
          And <b>Flexible Repayment</b> Options.
        </p>
        <div className="banner-buttons">
          <button className="btn-primary" onClick={()=>{
            setShowRequestPopup(true);
          }}>Make Request</button>
         <a href="#andromedaemi"> <button className="btn-secondary">Calculate EMI</button></a>
        </div>
      </div>
      <div className="banner-logos">
        {/* <img src="/andromedabanner.jpg" alt="TownManor" className="logo-img"/> */}
        <img src="https://www.andromedaloans.com/wp-content/uploads/2022/08/andromeda-logo-new.svg" className="logo-img"></img>
      </div>
     
    </div>
     <div className="banner-footer">
     <div className="feature-item">
       <TbPigMoney className="feature-icon"/>
       {/* <img src="/andro1.jpg" className="feature-icon"></img> */}
       <span>Customized Repayment Plans</span>
     </div>
     <div className="feature-item">
       {/* <FaCheckCircle className="feature-icon"/> */}
       <LiaChalkboardTeacherSolid className="feature-icon" />
       <span>Expert Guidance</span>
     </div>
     <div className="feature-item">
     <FiPercent className="feature-icon"/>
       {/* <FaCheckCircle className="feature-icon"/> */}
       <span>Low-Interest Rates</span>
     </div>
   </div>
   {showRequestPopup && (
        <div className="andromeda-modal-overlay">
          <div className="andromeda-modal-content">
            <h3 className="andromeda-modal-title">Request Home Loan</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="andromeda-modal-input"
              value={requestFormData.name}
              onChange={handleRequestInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="andromeda-modal-input"
              value={requestFormData.phone}
              onChange={handleRequestInputChange}
            />
            <input
              type="text"
              name="amount"
              placeholder="Loan Amount"
              className="andromeda-modal-input"
              value={requestFormData.amount}
              onChange={handleRequestInputChange}
            />
            <div className="andromeda-modal-buttons">
              <button className="andromeda-btn-primary">Submit</button>
              <button className="andromeda-btn-secondary" onClick={() => setShowRequestPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
   </>
  );
};

export default Banner;
