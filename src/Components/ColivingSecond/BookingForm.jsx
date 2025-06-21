import React, { useState } from 'react';
import './BookingForm.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const BookingForm = ({ room, coliving, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    aadharCard: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('jwttoken');
    if (!token) {
      alert('Please login to proceed.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      localStorage.setItem('room_id', room.id);

      const payload = {
        username: username,
        property_name: coliving.property_name,
        phone_no: formData.phoneNumber,
        adhar_number: formData.aadharCard,
        occupied: 1,
      };

      const response = await fetch(`https://townmanor.ai/api/coliving-rooms/${room.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to submit booking.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || `Failed with status: ${response.status}`;
        } catch (jsonError) {
          errorMsg = `Failed with status: ${response.status}`;
        }
        throw new Error(errorMsg);
      }

      const result = await response.json();
      console.log('Submission successful:', result);

      onFormSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bookingForm__overlay">
      <div className="bookingForm__modal">
        <div className="bookingForm__header">
          <h2 className="bookingForm__headerTitle">Book Room: {room.id}</h2>
          <button onClick={onCancel} className="bookingForm__closeButton">×</button>
        </div>
        <form onSubmit={handleSubmit} className="bookingForm__form">
          <div className="bookingForm__formGroup">
            <label htmlFor="phoneNumber" className="bookingForm__label">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="bookingForm__input"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="bookingForm__formGroup">
            <label htmlFor="aadharCard" className="bookingForm__label">Aadhar Card Number</label>
            <input
              type="text"
              id="aadharCard"
              name="aadharCard"
              className="bookingForm__input"
              value={formData.aadharCard}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="bookingForm__submitButton">Submit and Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
