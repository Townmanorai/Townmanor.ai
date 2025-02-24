import React, { useState } from 'react';
import './Style.css';

const ChatForm = ({ onSubmit, agent, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, phoneNumber });
  };

  const agentInitial = agent.name.charAt(0).toUpperCase();

  return (
    <div className="form-container-chat p-4 bg-light rounded shadow-lg">
      <button className="close-button" onClick={onClose}><div className='x-button'>x</div></button>
      <h5>Chat with Real Estate Experts</h5>
      
      <div className ="agent">
        <div className="agent-header">
          <div className="agent-initial">{agentInitial}</div>
          <h3 className="text-center"> {agent.name}</h3>
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
          <button type="submit" className="btn btn-success btn-block">Chat Now</button>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
