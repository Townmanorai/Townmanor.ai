

import React, { useState, useEffect } from 'react';
import "../common.css";
import "../commonsecond.css";
import axios from 'axios';

const ContactListingAgent = ({ agentusername }) => {
  console.log("agentusername",agentusername);
  const [formValues, setFormValues] = useState({
    firstname: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    fromdate: '',
    todate: '',
    captcha: '',
  });

  const [contactformValues, setContactFormValues] = useState({
    username:'',
    useremail: '',
    userphone: '',
  });

  const [walletBalance, setWalletBalance] = useState(0); // Fetch the balance from API
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Visibility for both details
  const [username, setUsername] = useState('ravindra'); // Replace with dynamic username if necessary

  useEffect(() => {
    // Fetch wallet balance data from the API when the component mounts
    const fetchWalletData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/userplanslimit/${username}`);
        setWalletBalance(response.data.owner_details); // Set wallet balance from API
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchWalletData();
  }, [username]);

  useEffect(() => {
    // Fetch agent data from the API when the component mounts
    const fetchAgentData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/user/${agentusername}`);
        console.log("agentusername response", response)
        setContactFormValues({
          username: response.data.name || '',
          useremail: response.data.email || '',
          userphone: response.data.phone || '',
        });
        console.log(agentusername)
        console.log("contactformValues",contactformValues)
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgentData();
  }, [username]);

  useEffect(() => {
    // Fetch agent data from the API when the component mounts
    const fetchAgentData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/user/${username}`);
        console.log(response)
        setFormValues({
          firstname: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          message: '',
          fromdate: '',
          todate: '',
          captcha: '',
        });
        console.log("formValues",formValues)
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgentData();
  }, [username]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
  };

  const handleShowDetails = async () => {
    if (walletBalance > 0) {
      // Make the API call to update the balance first
      const newBalance = walletBalance - 1; // Calculate the new balance
  
      try {
        // Send the updated balance to the backend and only update the UI after success
        const response = await axios.put(`https://www.townmanor.ai/api/userplanslimit/${username}`, {
          owner_details: newBalance, // Send new balance to update in the database
        });
  
        // If the database update is successful, update the UI
        if (response.status === 200) {
          setIsDetailsVisible(true);
          setWalletBalance(newBalance); // Deduct 1 only after successful API call
        } else {
          alert('Failed to update balance, please try again.');
        }
      } catch (error) {
        console.error('Error updating wallet balance:', error);
        alert('Error updating balance, please try again.');
      }
    } else {
      alert('Insufficient balance to view the details.');
    }
  };

  return (
    <div className="widget widget-form" id="form-contact">
      <h3 className="widget-title mt-0">Contact Listing Agent</h3>

      {/* Display wallet balance */}
      <div className="wallet-info">
        <p>Your Wallet Balance: {walletBalance}</p>
      </div>

      <div className="contct-info">
        <img
          src={contactformValues.agent_image_url || '/cm-img2.webp'}
          alt={contactformValues.username}
        />
        <div className="contct-nf">
          <h3>
            <a href={contactformValues.agent_url} title={contactformValues.username}>
              {contactformValues.username}
            </a>
          </h3>

          {/* Show phone and email logic */}
          {isDetailsVisible ? (
            <>
              <span>
                <i className="la la-phone"></i> {contactformValues.userphone}
              </span>
              <span>
                <a href={`mailto:${contactformValues.useremail}`} title={contactformValues.useremail}>
                  <i className="la la-envelope-o"></i> {contactformValues.useremail}
                </a>
              </span>
            </>
          ) : (
            <button onClick={handleShowDetails} className="btn2">
              Show Phone Number and Email Address
            </button>
          )}
        </div>
      </div>

      <div className="post-comment-sec">
        <form onSubmit={handleSubmit} className="contact-form" id="form">
          <div className="form-field">
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="First and Last Name"
              value={formValues.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Address"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Message"
              value={formValues.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button type="submit" className="btn2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactListingAgent;
