import React, { useState } from 'react';
import Modal from 'react-modal';
import { ImCross } from "react-icons/im";
import './HomeLane.css'; // Make sure to include necessary styles

const BookingModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    occupationType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.city || !formData.occupationType) {
      alert('All fields are required');
      return;
    }
    onSubmit(formData);
  };

  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '70vh',
      width: '30vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="3D Design Booking Form"
      ariaHideApp={false}
      style={customStyles}
      id='interiormodal'
    >
      <div className="modal-body pt-0 pb-4">
        <div id="Lead_Form" className="LeadPopup_popUpBox LeadPopup_active">
          <form
            onSubmit={handleSubmit}
            className="LeadPopup_popUpWindow pt-4 px-3"
            autoComplete="nope"
          >
            <div className="LeadPopup_headingBox pt-0">
              <h2>Meet a designer</h2>
              <span onClick={onRequestClose} style={{ cursor: 'pointer' }}>
                <ImCross />
              </span>
            </div>
            <div className="LeadPopup_contentBox">
              <div className="LeadPopup_form">
                {/* Name Field */}
                <div className="form_item">
                  <input
                    type="text"
                    name="name"
                    className="formInput"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="font12 fontMedium formLabel">Name *</label>
                </div>

                {/* Email Field */}
                <div className="form_item">
                  <input
                    type="email"
                    name="email"
                    className="formInput"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="font12 fontMedium formLabel">Email *</label>
                </div>

                {/* Mobile Field */}
                <div className="form_item contBox">
                  <span className="text303542 font12 contCode fontMedium">+91</span>
                  <input
                    type="text"
                    name="mobile"
                    className="formInput"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    pattern="[0-9]{10,15}"
                    minLength="10"
                    maxLength="15"
                    required
                  />
                  <label className="font12 fontMedium formLabel">Mobile No *</label>
                </div>

                {/* City Field */}
                <div className="form_item">
                  <div className="city-container">
                    <select
                      name="city"
                      className="formInput"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose City *</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Noida">Noida</option>
                      <option value="Faridabad">Faridabad</option>
                      <option value="Delhi">Delhi</option>
                      <option value="GreaterNoida">Greater Noida</option>
                      <option value="Ghaziabad">Ghaziabad</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                </div>

                {/* Occupation Type Field */}
                <div className="form_item">
                  <div className="SelectRange_Calc">
                    <div className="selectBox">
                      <select
                        name="occupationType"
                        className="formInput"
                        value={formData.occupationType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>
                          I'm Interested in Interiors For *
                        </option>
                        <option value="New Home For Self-Use">New Home For Self-Use</option>
                        <option value="New Home For Renting Out">New Home For Renting Out</option>
                        <option value="Home Renovation">Home Renovation</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="LeadPopup_rangecalc">
                  <button type="submit" className="btn-calc modalhomebtn">
                    Book 3D Design Session <span>Free</span>
                  </button>
                </div>

                {/* Privacy and Terms */}
                <div className="mt-4">
                  <p>
                    By submitting this form, you agree to our{' '}
                    <a href="https://townmanor.in/en/181/privacy_policy">privacy policy</a> and{' '}
                    <a href="https://townmanor.in/en/195/terms_and_condition">terms of use</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;