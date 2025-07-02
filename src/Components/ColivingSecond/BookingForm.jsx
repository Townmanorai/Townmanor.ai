import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaWifi, FaParking } from "react-icons/fa";
import "./BookingForm.tmnBooking.css";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const BookingForm = () => {
  const location = useLocation();
  const { room, coliving } = location.state || {};

  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({ phone: '', aadhar: '' });
  const [loading, setLoading] = useState(false);

  if (!room || !coliving) {
    return (
      <div style={{ padding: 32, color: 'red', textAlign: 'center' }}>
        Error: Missing booking information. Please select a room from the listing page.
      </div>
    );
  }

  // Calculate payment summary
  const monthlyRent = Number(room.price?.replace(/[^\d]/g, "")) || 0;
  const gst = Math.round(monthlyRent * 0.18);
  const total = monthlyRent + gst;

  // Enable payment only if all fields are valid and not loading
  const canProceed = agree && form.phone.length >= 10 && form.aadhar.length >= 8 && !loading;

  // Booking and payment logic
  const handleBookingAndPayment = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('jwttoken');
      if (!token) {
        alert('Please login to proceed.');
        setLoading(false);
        return;
      }
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      // Submit booking details
      const apiData = {
        user_name: username,
        property_name: coliving.property_name,
        phone_no: form.phone,
        adhar_number: form.aadhar,
      };
      const response = await axios.put(`https://townmanor.ai/api/coliving-rooms/${room.id}`, apiData);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit booking details.');
      }
      // Payment initiation
      // Fetch user details
      const userResponse = await axios.get(`https://www.townmanor.ai/api/user/${username}`);
      const userData = userResponse.data;
      const txnid = 'OID' + Date.now();
      localStorage.setItem('room_id', room.id);
      localStorage.setItem('propertyId', coliving.id);
      localStorage.setItem('paymentType', 'coliving');
      const paymentData = {
        key: 'UvTrjC',
        txnid,
        amount: 2,
        productinfo: 'Coliving Room Booking',
        firstname: userData.name || username || '',
        email: userData.email || '',
        phone: userData.phone || '',
        surl: `https://townmanor.ai/api/boster/payu/success`,
        furl: `https://townmanor.ai/api/boster/payu/failure`,
        udf1: room.id,
        service_provider: 'payu_paisa',
      };
      const payRes = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);
      if (!payRes.data || !payRes.data.paymentUrl || !payRes.data.params) {
        throw new Error('Invalid payment response received');
      }
      // Create and submit payment form
      const formElem = document.createElement('form');
      formElem.method = 'POST';
      formElem.action = payRes.data.paymentUrl;
      Object.entries(payRes.data.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          formElem.appendChild(input);
        }
      });
      document.body.appendChild(formElem);
      formElem.submit();
      document.body.removeChild(formElem);
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Booking or payment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tmnBooking__container">
      {/* Header Section */}
      <div className="tmnBooking__header">
        <div style={{ flex: 1 }}>
        <div className="tmnBooking__title">{coliving.property_name}</div>
        <div className="tmnBooking__address">
            <FaMapMarkerAlt style={{ marginRight: 5, color: '#2a6ae9' }} />
            {coliving.address || 'N/A'}
            <span className="tmnBooking__badge">{coliving.flat_type || ''}</span>
          </div>
          <div className="tmnBooking__title">Room No: {room.id}</div>
          
          <div className="tmnBooking__features">
            {room.details?.map((d, i) => (
              <div className="tmnBooking__feature" key={i}>{d}</div>
            ))}
          </div>
        </div>
        <img className="tmnBooking__img" src={room.img || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"} alt={room.title} />
      </div>

      {/* Terms & Conditions */}
      <div className="tmnBooking__section">
        <div style={{ fontWeight: 600, marginBottom: 7 }}>Terms & Conditions</div>
        <div className="tmnBooking__termsBox">
          <ol style={{ paddingLeft: 10, margin: 0 }}>
            <li>1.Maintain cleanliness and follow building rules</li>
            <li>2. Full refund if cancelled 7 days prior to check-in.</li>
            <li>3. 50% refund if cancelled 3-6 days before check-in.</li>
            <li>4. No refund if cancelled within 48 hours of check-in.</li>
            <li>5. The Host is not liable for accidents, injuries, or loss of personal belongings.</li>
            <li>6.The Guest is responsible for any damages to the property during the stay.</li>
            <li>7. The Property cannot used any trading , Bussiness & commercial purpose</li>
          </ol>
        </div>
        <div className="tmnBooking__checkboxRow">
          <input
            type="checkbox"
            className="tmnBooking__checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
            id="tmnBooking__agree"
          />
          <label htmlFor="tmnBooking__agree" style={{ fontSize: '0.97rem', color: '#444' }}>
            I agree to the Terms & Conditions
          </label>
        </div>
      </div>

      {/* Personal Information
      <div className="tmnBooking__section">
        <div style={{ fontWeight: 600, marginBottom: 7 }}>Personal Information</div>
        <div className="tmnBooking__inputRow">
          <input
            className="tmnBooking__input"
            type="tel"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            maxLength={15}
            required
          />
          <input
            className="tmnBooking__input"
            type="text"
            placeholder="Aadhaar Card Number"
            value={form.aadhar}
            onChange={e => setForm(f => ({ ...f, aadhar: e.target.value }))}
            maxLength={16}
            required
          />
        </div>
      </div> */}

  
      <div className="tmnBooking__section">
        
        <button
          className="tmnBooking__payBtn"
          onClick={() => {
            if (room?.id && coliving?.id) {
              localStorage.setItem('roomId', room.id);
              localStorage.setItem('propertyId', coliving.id);
            }
            navigate('/coliving-user-detail');
          }}
        >
          Move to Next Step
        </button>
      </div>

    </div>
  );
};

export default BookingForm;
