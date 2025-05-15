import React from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import "./RentAgreementContractDetail.css";

const RentAgreementContractDetail = () => {
  return (
    <div className="rent-contract-detail-container">
      
      <div className="rent-contract-detail-form-wrapper">
        <h2 className="rent-contract-detail-title">Contract Detail</h2>
        <p className="rent-contract-detail-subtitle">
          Please fill in the details for your rent agreement
        </p>
        <form className="rent-contract-detail-form">
          <label className="rent-contract-detail-label">City <span>*</span></label>
          <div className="rent-contract-detail-searchbox">
            <FaSearch className="rent-contract-detail-searchicon" />
            <input
              type="text"
              className="rent-contract-detail-input"
              placeholder="Search and select your city"
            />
          </div>

          <label className="rent-contract-detail-label">
            Security / Refundable Amount <span>*</span>
          </label>
          <input
            type="number"
            className="rent-contract-detail-input"
            placeholder="₹"
          />

          <label className="rent-contract-detail-label">Stamp Paper Value <span>*</span></label>
          <div className="rent-contract-detail-stamp-btns">
            <button type="button" className="rent-contract-detail-stamp-btn rent-contract-detail-stamp-btn-active">₹100</button>
            <button type="button" className="rent-contract-detail-stamp-btn">₹500</button>
          </div>

          <label className="rent-contract-detail-label">Agreement Duration <span>*</span></label>
          <select className="rent-contract-detail-input">
            <option>Select duration</option>
            <option>6 months</option>
            <option>11 months</option>
            <option>12 months</option>
          </select>

          <label className="rent-contract-detail-label">Monthly Rent <span>*</span></label>
          <input
            type="number"
            className="rent-contract-detail-input"
            placeholder="₹"
          />

          <div className="rent-contract-detail-toggle-row">
            <span>Rent Excluding Maintenance?</span>
            <label className="rent-contract-detail-switch">
              <input type="checkbox" defaultChecked />
              <span className="rent-contract-detail-slider"></span>
            </label>
          </div>

          <div className="rent-contract-detail-toggle-row">
            <span>Rent Excluding Electricity & Other Charges?</span>
            <label className="rent-contract-detail-switch">
              <input type="checkbox" defaultChecked />
              <span className="rent-contract-detail-slider"></span>
            </label>
          </div>

          <label className="rent-contract-detail-label">Agreement Start Date <span>*</span></label>
          <div className="rent-contract-detail-datebox">
            <input
              type="date"
              className="rent-contract-detail-input"
            />
            <FaCalendarAlt className="rent-contract-detail-calendaricon" />
          </div>

          <label className="rent-contract-detail-label">Who are you? <span>*</span></label>
          <div className="rent-contract-detail-radio-group">
            <label className="rent-contract-detail-radio-label">
              <input type="radio" name="userType" defaultChecked /> Tenant
            </label>
            <label className="rent-contract-detail-radio-label">
              <input type="radio" name="userType" /> Owner
            </label>
            <label className="rent-contract-detail-radio-label">
              <input type="radio" name="userType" /> Other Person
            </label>
          </div>

          <label className="rent-contract-detail-label">Notice Period (in months) <span>*</span></label>
          <select className="rent-contract-detail-input">
            <option>1 month</option>
            <option>2 months</option>
            <option>3 months</option>
          </select>

          <label className="rent-contract-detail-label">Lock-in Period (in months) <span>*</span></label>
          <select className="rent-contract-detail-input">
            <option>2 months</option>
            <option>3 months</option>
            <option>6 months</option>
          </select>

          <div className="rent-contract-detail-btn-row">
            <button type="button" className="rent-contract-detail-prev-btn">Previous</button>
            <button type="submit" className="rent-contract-detail-next-btn">Next <span>&rarr;</span></button>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default RentAgreementContractDetail;
