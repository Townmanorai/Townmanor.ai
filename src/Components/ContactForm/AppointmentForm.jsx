import React, { useState } from 'react';
import './Style.css';

function AppointmentForm({onSubmit, agent, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');

  

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, phoneNumber, city });
    alert(`Form submitted: ${JSON.stringify({ name, email, phoneNumber, city })}`);
  };

  const agentInitial = agent.name.charAt(0).toUpperCase();

  return (
    <div className="form-container-appointment p-4 bg-light rounded shadow-lg">
      <button className="close-button" onClick={onClose}><div className='x-button'>x</div></button>
      <h5>Chat with Real Estate Experts</h5>
      
      <div className="agent"> 
      <div className="agent-header">
      
        <div className="agent-initial">{agentInitial}</div>
        <h3 className="text-center">{agent.name}</h3>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">+91</span>
            </div>
            <input
              type="tel"
              id="phoneNumber"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="form-group">
          <select
            id="city"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select City</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success btn-block">Contact Now</button>
      </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
