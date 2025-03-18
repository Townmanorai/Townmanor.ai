import React, { useState } from 'react';
import './landverification.css';
import { FaSearch } from 'react-icons/fa';

const LandVerificationSearchForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    taluka: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Search data:', formData);
  };

  return (
    <div className="card land-verification-search-form">
      <form onSubmit={handleSubmit} className="card-header">
        <div className="townmanor-form-group">
          <div>
            <label className="form-label">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select State</option>
              <option value="gujarat">Gujarat</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
            </select>
          </div>
          <div>
            <label className="form-label">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select District</option>
            </select>
          </div>
          <div>
            <label className="form-label">Taluka</label>
            <select
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Taluka</option>
            </select>
          </div>
        </div>
        <div className="text-center mt-6">
          <button type="submit" className="button button-primary">
            <FaSearch className="icon" />
            Search Land Records
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandVerificationSearchForm; 