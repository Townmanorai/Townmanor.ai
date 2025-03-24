import React from "react";
import { FaCheckCircle, FaPercent } from "react-icons/fa";
import "./Andromeda.css";
import { TbPigMoney } from "react-icons/tb";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FiPercent } from "react-icons/fi";
const Banner = () => {
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
          <button className="btn-primary">Check Your Eligibility</button>
          <button className="btn-secondary">Calculate EMI</button>
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
 
   </>
  );
};

export default Banner;
