import React from "react";
import { FaHandshake } from "react-icons/fa"; // Example icon for partnership
import "./Andromeda.css";

const HomeLoanBanner = () => {
  return (
    <div className="home-loan-banner">
      <div className="home-loan-content">
        <h2 className="home-loan-title">
          A Trusted Partnership For Your Home Loan Needs
        </h2>
        <p className="home-loan-description">
          TownManor, Your Real Estate Partner, Collaborates With Andromeda, India’s Leading Loan Provider, To Offer Seamless Home Financing Solutions.
        </p>
      </div>

      <div className="home-loan-icons">
        {/* <FaHandshake className="home-loan-icon" /> */}
        <img src="/andro1.jpg" alt="Home Financing" className="home-loan-img" />
      </div>
    </div>
  );
};

export default HomeLoanBanner;
