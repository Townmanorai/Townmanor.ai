import React from "react";
import { FaSearch, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import "./RentAgreementContractDetail.css";

const RentAgreementContract = ({ formData, onFormDataChange, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFormDataChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="rent-contract-detail-container">
      <div className="rent-contract-detail-form-wrapper">
        <h2 className="rent-contract-detail-title">Contract Detail</h2>
        <p className="rent-contract-detail-subtitle">
          Please fill in the details for your rent agreement
        </p>
        <form className="rent-contract-detail-form" onSubmit={handleSubmit}>
          <label className="rent-contract-detail-label">City <span>*</span></label>
          <div className="rent-contract-detail-searchbox">
            <FaSearch className="rent-contract-detail-searchicon" />
            <input
              type="text"
              name="city"
              className="rent-contract-detail-input"
              placeholder="Search and select your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <label className="rent-contract-detail-label">
            Security / Refundable Amount 
          </label>
          <input
            type="number"
            name="securityRefundableAmount"
            className="rent-contract-detail-input"
            placeholder="₹"
            value={formData.securityRefundableAmount}
            onChange={handleChange}
           
          />

          <label className="rent-contract-detail-label">Stamp Paper Value <span>*</span></label>
          <div className="rent-contract-detail-stamp-btns">
            <button 
              type="button" 
              className={`rent-contract-detail-stamp-btn ${formData.stampPaper === 100 ? 'rent-contract-detail-stamp-btn-active' : ''}`}
              onClick={() => onFormDataChange({ stampPaper: 100 })}
            >
              ₹100
            </button>
            <button 
              type="button" 
              className={`rent-contract-detail-stamp-btn ${formData.stampPaper === 500 ? 'rent-contract-detail-stamp-btn-active' : ''}`}
              onClick={() => onFormDataChange({ stampPaper: 500 })}
            >
              ₹500
            </button>
          </div>

          <label className="rent-contract-detail-label">Agreement Duration <span>*</span></label>
          <select 
            name="agreementDuration"
            className="rent-contract-detail-input"
            value={formData.agreementDuration}
            onChange={handleChange}
            required
          >
            <option value="">Select duration</option>
            <option value="6">6 months</option>
            <option value="11">11 months</option>
            <option value="12">15 months</option>
          </select>

          <label className="rent-contract-detail-label">Monthly Rent <span>*</span></label>
          <input
            type="number"
            name="monthlyRent"
            className="rent-contract-detail-input"
            placeholder="₹"
            value={formData.monthlyRent}
            onChange={handleChange}
            required
          />

          <div className="rent-contract-detail-toggle-row">
            <span>Rent Excluding Maintenance?</span>
            <label className="rent-contract-detail-switch">
              <input 
                type="checkbox"
                name="rentMaintenance"
                checked={formData.rentMaintenance}
                onChange={handleChange}
              />
              <span className="rent-contract-detail-slider"></span>
            </label>
          </div>

          <div className="rent-contract-detail-toggle-row">
            <span>Rent Excluding Electricity & Other Charges?</span>
            <label className="rent-contract-detail-switch">
              <input 
                type="checkbox"
                name="otherCharges"
                checked={formData.otherCharges}
                onChange={handleChange}
              />
              <span className="rent-contract-detail-slider"></span>
            </label>
          </div>

          <label className="rent-contract-detail-label">Agreement Start Date <span>*</span></label>
          <div className="rent-contract-detail-datebox">
            <input
              type="date"
              name="agreementStart"
              className="rent-contract-detail-input"
              value={formData.agreementStart}
              onChange={handleChange}
              required
            />
            <FaCalendarAlt className="rent-contract-detail-calendaricon" />
          </div>

          <label className="rent-contract-detail-label">Who are you? <span>*</span></label>
          <div className="rent-contract-detail-radio-group">
            <label className="rent-contract-detail-radio-label">
              <input 
                type="radio" 
                name="identity" 
                value="tenant"
                checked={formData.identity === 'tenant'}
                onChange={handleChange}
                required
              /> 
              Tenant
            </label>
            <label className="rent-contract-detail-radio-label">
              <input 
                type="radio" 
                name="identity" 
                value="owner"
                checked={formData.identity === 'owner'}
                onChange={handleChange}
              /> 
              Owner
            </label>
            <label className="rent-contract-detail-radio-label">
              <input 
                type="radio" 
                name="identity" 
                value="other"
                checked={formData.identity === 'other'}
                onChange={handleChange}
              /> 
              Other Person
            </label>
          </div>

          <label className="rent-contract-detail-label">Notice Period (in months) </label>
          <select 
            name="noticePeriod"
            className="rent-contract-detail-input"
            value={formData.noticePeriod}
            onChange={handleChange}
         
          >
            <option value="">Select notice period</option>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
          </select>

          <label className="rent-contract-detail-label">Lock-in Period (in months)</label>
          <select 
            name="lockInPeriod"
            className="rent-contract-detail-input"
            value={formData.lockInPeriod}
            onChange={handleChange}
           
          >
            <option value="">Select lock-in period</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
          </select>

          <div className="rent-contract-detail-btn-row">
            <button type="submit" className="rent-contract-detail-next-btn">
              Next <FaArrowRight style={{marginLeft: 6}} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentAgreementContract; 