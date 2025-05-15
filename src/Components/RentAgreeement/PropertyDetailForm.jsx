import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./PropertyDetailForm.css";

const PropertyDetailForm = ({ formData, onFormDataChange, onNext, onPrev }) => {
  const [localFormData, setLocalFormData] = useState({
    propertyType: '',
    floorNumber: '',
    configuration: '',
    area: '',
    propertyNumber: '',
    buildingName: '',
    locality: '',
    pincode: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
    "Ladakh", "Lakshadweep", "Puducherry"
  ];

  useEffect(() => {
    // Initialize local form data with parent form data
    setLocalFormData({
      propertyType: formData.propertyType || '',
      floorNumber: formData.floorNumber || '',
      configuration: formData.configuration || '',
      area: formData.area || '',
      propertyNumber: formData.propertyNumber || '',
      buildingName: formData.buildingName || '',
      locality: formData.locality || '',
      pincode: formData.pincode || '',
      city: formData.city || '',
      state: formData.state || ''
    });
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!localFormData.propertyType) newErrors.propertyType = 'Property type is required';
    if (localFormData.propertyType !== 'Land' && !localFormData.floorNumber) {
      newErrors.floorNumber = 'Floor number is required';
    }
    if ((localFormData.propertyType === 'Apartment' || localFormData.propertyType === 'Studio') && !localFormData.configuration) {
      newErrors.configuration = 'Configuration is required';
    }
    if (!localFormData.area) newErrors.area = 'Area is required';
    if (!localFormData.locality) newErrors.locality = 'Locality is required';
    if (!localFormData.city) newErrors.city = 'City is required';
    if (!localFormData.state) newErrors.state = 'State is required';
    if (localFormData.pincode && !/^\d{6}$/.test(localFormData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onFormDataChange(localFormData);
      onNext();
    }
  };

  return (
    <div className="property-detail-unique-container">
      <div className="property-detail-unique-form-wrapper">
        <h2 className="property-detail-unique-title">Property Detail</h2>
        <p className="property-detail-unique-subtitle">
          Please fill in the details about your property
        </p>
        <form className="property-detail-unique-form" onSubmit={handleSubmit}>
          <label className="property-detail-unique-label">Type of Property <span>*</span></label>
          <select 
            className="property-detail-unique-input"
            name="propertyType"
            value={localFormData.propertyType}
            onChange={handleChange}
          >
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="Shop">Shop</option>
            <option value="Land">Land</option>
            <option value="Office">Office</option>
            <option value="Studio">Studio</option>
            <option value="Godown">Godown</option>
            <option value="Independent House">Independent House</option>
            <option value="Showroom">Showroom</option>
          </select>
          {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}

          {localFormData.propertyType !== 'Land' && (
            <>
              <label className="property-detail-unique-label">Floor Number <span>*</span></label>
              <input
                type="number"
                className="property-detail-unique-input"
                placeholder="Enter floor number (0 for ground floor)"
                name="floorNumber"
                value={localFormData.floorNumber}
                onChange={handleChange}
                min="0"
              />
              {errors.floorNumber && <span className="error-message">{errors.floorNumber}</span>}
            </>
          )}

          {(localFormData.propertyType === 'Apartment' || localFormData.propertyType === 'Studio') && (
            <>
              <label className="property-detail-unique-label">Configuration <span>*</span></label>
              <select
                className="property-detail-unique-input"
                name="configuration"
                value={localFormData.configuration}
                onChange={handleChange}
              >
                <option value="">Select configuration</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="2.5BHK">2.5 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="4BHK">4 BHK</option>
                <option value="5BHK">5 BHK</option>
                <option value="6BHK">6 BHK</option>
                <option value="6+BHK">6+ BHK</option>
              </select>
              {errors.configuration && <span className="error-message">{errors.configuration}</span>}
            </>
          )}

          <label className="property-detail-unique-label">Area Size <span>*</span></label>
          <div className="property-detail-unique-areasize-row">
            <input
              type="number"
              className="property-detail-unique-input property-detail-unique-areasize-input"
              placeholder="Enter area in sq. ft"
              name="area"
              value={localFormData.area}
              onChange={handleChange}
            />
            <span className="property-detail-unique-areasize-unit">sq. ft</span>
          </div>
          {errors.area && <span className="error-message">{errors.area}</span>}

          <label className="property-detail-unique-label">Property Number</label>
          <input
            type="text"
            className="property-detail-unique-input"
            placeholder="Enter property number (optional)"
            name="propertyNumber"
            value={localFormData.propertyNumber}
            onChange={handleChange}
          />

          <label className="property-detail-unique-label">Building Name</label>
          <input
            type="text"
            className="property-detail-unique-input"
            placeholder="Enter building name (optional)"
            name="buildingName"
            value={localFormData.buildingName}
            onChange={handleChange}
          />

          <label className="property-detail-unique-label">Locality <span>*</span></label>
          <input
            type="text"
            className="property-detail-unique-input"
            placeholder="Enter locality"
            name="locality"
            value={localFormData.locality}
            onChange={handleChange}
          />
          {errors.locality && <span className="error-message">{errors.locality}</span>}

          <label className="property-detail-unique-label">Pincode</label>
          <input
            type="text"
            className="property-detail-unique-input"
            placeholder="Enter 6-digit pincode (optional)"
            maxLength={6}
            name="pincode"
            value={localFormData.pincode}
            onChange={handleChange}
          />
          {errors.pincode && <span className="error-message">{errors.pincode}</span>}

          <label className="property-detail-unique-label">City <span>*</span></label>
          <input
            type="text"
            className="property-detail-unique-input"
            placeholder="Enter city"
            name="city"
            value={localFormData.city}
            onChange={handleChange}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}

          <label className="property-detail-unique-label">State <span>*</span></label>
          <select 
            className="property-detail-unique-input"
            name="state"
            value={localFormData.state}
            onChange={handleChange}
          >
            <option value="">Select state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <span className="error-message">{errors.state}</span>}

          <div className="property-detail-unique-btn-row">
            <button 
              type="button" 
              className="property-detail-unique-prev-btn"
              onClick={onPrev}
            >
              <FaArrowLeft style={{marginRight: 6}} /> Previous
            </button>
            <button type="submit" className="property-detail-unique-next-btn">
              Next <FaArrowRight style={{marginLeft: 6}} />
            </button>
          </div>
        </form>
      </div>
      <div className="property-detail-unique-designed">
        <span>Designed by</span>
        <span className="property-detail-unique-designed-by">Readily</span>
      </div>
    </div>
  );
};

export default PropertyDetailForm;
