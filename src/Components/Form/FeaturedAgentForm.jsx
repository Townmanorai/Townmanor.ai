import React, { useState } from 'react';
import './FeaturedAgentForm.css';

const FeaturedAgentForm = () => {
  const dummyData = {
    propertyName: 'Luxury Apartments',
    agentName: 'John Doe',
    agentUsername: 'johndoe123',
    city: 'Delhi',
    state: 'Delhi NCR',
    address: '123, Main Street, Delhi',
    totalListings: 10,
    registeredAgent: 'Yes',
    reraId: 'RERA1234',
    pointsRequired: 2000,
  };

  // const [formData, setFormData] = useState({
  //   propertyName: '',
  //   agentName: '',
  //   agentUsername: '',
  //   city: '',
  //   state: '',
  //   address: '',
  //   totalListings: '',
  //   registeredAgent: '',
  //   reraId: '',
  //   pointsRequired: 2000,
  // });

  const [formData, setFormData] = useState(dummyData);
  const [selectedListing, setSelectedListing] = useState('self');
  const [selectedAgentType, setSelectedAgentType] = useState('featured');
  const [walletPoints, setWalletPoints] = useState(3000); // Example wallet balance

  const handleListingChange = (type) => {
    if (type === 'self') {
      setFormData(dummyData);
    } else {
      setFormData({
        propertyName: '',
        agentName: '',
        agentUsername: '',
        city: '',
        state: '',
        address: '',
        totalListings: '',
        registeredAgent: '',
        reraId: '',
        pointsRequired: formData.pointsRequired,
      });
    }
    setSelectedListing(type);
  };

  const handleAgentTypeChange = (type) => {
    setSelectedAgentType(type);
    const pointsRequired = type === 'featured' ? 2000 : 5000;
    setFormData((prevData) => ({
      ...prevData,
      pointsRequired,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (walletPoints < formData.pointsRequired) {
      console.log('Redirect to Add Points to Wallet');
    } else {
      console.log('Form Submitted:', formData);
    }
  };

  return (
    <div className="top-featured-agent-form">
    <div className="featured-agent-form">
      <h3>List Yourself as an Agent</h3>

      <div className="button-group">
        <button
          className={selectedListing === 'self' ? 'active' : ''}
          onClick={() => handleListingChange('self')}
        >
          List by Yourself
        </button>
        <button
          className={selectedListing === 'other' ? 'active' : ''}
          onClick={() => handleListingChange('other')}
        >
          List by Other Name
        </button>
      </div>

      <div className="button-group">
        <button
          className={selectedAgentType === 'featured' ? 'active' : ''}
          onClick={() => handleAgentTypeChange('featured')}
        >
          Featured Agent (2000 Points)
        </button>
        <button
          className={selectedAgentType === 'spotlight' ? 'active' : ''}
          onClick={() => handleAgentTypeChange('spotlight')}
        >
          Agent On Spotlight (5000 Points)
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Property Name/Project Name</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Agent Name</label>
          <input
            type="text"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Agent Username</label>
          <input
            type="text"
            name="agentUsername"
            value={formData.agentUsername}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Noida">Noida</option>
            <option value="Gurugram">Gurugram</option>
            <option value="Ghaziabad">Ghaziabad</option>
          </select>
        </div>

        <div className="form-group">
          <label>State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total No. of Property Listing (Optional)</label>
          <input
            type="number"
            name="totalListings"
            value={formData.totalListings}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Registered Agent (Optional)</label>
          <input
            type="text"
            name="registeredAgent"
            value={formData.registeredAgent}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>RERA Id (Optional)</label>
          <input
            type="text"
            name="reraId"
            value={formData.reraId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Points Required</label>
          <input
            type="number"
            name="pointsRequired"
            value={formData.pointsRequired}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
        >
          {walletPoints < formData.pointsRequired ? 'Add Points to Wallet' : 'Submit'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default FeaturedAgentForm;
