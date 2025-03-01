// UserDetailsForm.jsx
import React, { useState } from 'react';
import './RentUserDetailsForm.css';

const RentUserDetailsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation or API call logic here
    console.log("Submitted Name:", name, "Email:", email);
    // Optionally, clear the form after submission
    setName('');
    setEmail('');
  };

  return (
    <section className="rent-user-details-form">
    <div className="user-details-form">
      <h2>Sign Up for Updates</h2>
      <form onSubmit={handleSubmit}>
        <div className="rent-form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div className="rent-form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email address" 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </section>
  );
};

export default RentUserDetailsForm;
