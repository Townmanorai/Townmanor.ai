import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./OwnerDetailForm.css";

const OwnerDetailForm = ({ formData, onFormDataChange, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      [name]: value
    });
  };

  return (
    <div className="owner-detail-unique-container">
      <div className="owner-detail-unique-form-wrapper">
        <h2 className="owner-detail-unique-title">Owner Detail</h2>
        <p className="owner-detail-unique-subtitle">
          Please fill in the details about the owner
        </p>
        <form className="owner-detail-unique-form" onSubmit={handleSubmit}>
          <label className="owner-detail-unique-label">Full Name <span>*</span></label>
          <input
            type="text"
            name="landlordName"
            className="owner-detail-unique-input"
            placeholder="Enter full name as per documents"
            value={formData.landlordName}
            onChange={handleChange}
            required
          />

          <label className="owner-detail-unique-label">Age <span>*</span></label>
          <input
            type="number"
            name="landlordAge"
            className="owner-detail-unique-input"
            placeholder="Enter age"
            value={formData.landlordAge}
            onChange={handleChange}
            required
          />

          <label className="owner-detail-unique-label">Gender <span>*</span></label>
          <div className="owner-detail-unique-radio-group">
            <label className="owner-detail-unique-radio-label">
              <input 
                type="radio" 
                name="landlordGender" 
                value="male"
                checked={formData.landlordGender === 'male'}
                onChange={handleChange}
                required
              /> 
              Male
            </label>
            <label className="owner-detail-unique-radio-label">
              <input 
                type="radio" 
                name="landlordGender" 
                value="female"
                checked={formData.landlordGender === 'female'}
                onChange={handleChange}
              /> 
              Female
            </label>
            <label className="owner-detail-unique-radio-label">
              <input 
                type="radio" 
                name="landlordGender" 
                value="other"
                checked={formData.landlordGender === 'other'}
                onChange={handleChange}
              /> 
              Other
            </label>
          </div>

          <label className="owner-detail-unique-label">Phone Number <span>*</span></label>
          <div className="owner-detail-unique-phone-row">
            <span className="owner-detail-unique-phone-code">+91</span>
            <input
              type="text"
              name="landlordPhone"
              className="owner-detail-unique-input owner-detail-unique-phone-input"
              placeholder="Enter mobile number"
              maxLength={10}
              value={formData.landlordPhone}
              onChange={handleChange}
              required
            />
          </div>

          <label className="owner-detail-unique-label">Email ID <span>*</span></label>
          <input
            type="email"
            name="landlordEmail"
            className="owner-detail-unique-input"
            placeholder="Enter email address"
            value={formData.landlordEmail}
            onChange={handleChange}
            required
          />

          <label className="owner-detail-unique-label">Address </label>
          <textarea
            name="landlordAddress"
            className="owner-detail-unique-input owner-detail-unique-textarea"
            placeholder="Enter complete address"
            rows={3}
            value={formData.landlordAddress}
            onChange={handleChange}
           
          />

          <label className="owner-detail-unique-label">Identity Proof Number <span>*</span></label>
          <input
            type="text"
            name="landlordIdentityProofNumber"
            className="owner-detail-unique-input"
            placeholder="Enter Aadhaar/PAN number"
            value={formData.landlordIdentityProofNumber}
            onChange={handleChange}
            required
          />
          <span className="owner-detail-unique-id-desc">Enter Aadhaar, PAN, Voter ID, or Passport number</span>

          <div className="owner-detail-unique-btn-row">
            <button 
              type="button" 
              className="owner-detail-unique-prev-btn"
              onClick={onPrev}
            >
              <FaArrowLeft style={{marginRight: 6}} /> Previous
            </button>
            <button type="submit" className="owner-detail-unique-next-btn">
              Next <FaArrowRight style={{marginLeft: 6}} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerDetailForm;
