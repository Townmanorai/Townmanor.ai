import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './colivingPricingUnique.css';

const ColivingPaymentSuccess = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(true);
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [paymentData, setPaymentData] = useState(null); // If you have payment details, set here
  const [bookingData, setBookingData] = useState(null); // State for booking data

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const bookingId = localStorage.getItem('bookingId');
        if (bookingId) {
          // Update payment status
          await axios.patch(
            `https://townmanor.ai/api/bookings/${bookingId}`,
            { status: 'payment confirm' },
            { headers: { 'Content-Type': 'application/json' } }
          );

          // Fetch booking data
          const bookingRes = await axios.get(`https://townmanor.ai/api/bookings/${bookingId}`);
          setBookingData(bookingRes.data);
        }

        const room_id = localStorage.getItem('roomId');
        const propertyId = localStorage.getItem('propertyId');
        console.log(room_id, propertyId);
        let paymentDetails = null;
        try {
          paymentDetails = JSON.parse(localStorage.getItem('paymentData')) || null;
        } catch (e) { 
          paymentDetails = null; 
        }

        if (!room_id || !propertyId) {
          throw new Error('Room or Property ID not found');
        }

        // // Update room status
        // await axios.patch(
        //   `https://townmanor.ai/api/coliving-rooms/${room_id}/occupied`,
        //   { occupied: true },
        //   { headers: { 'Content-Type': 'application/json' } }
        // );

        // Fetch room data
        const roomRes = await axios.get(`https://townmanor.ai/api/coliving-rooms/${room_id}`);
        setRoomData(roomRes.data);

        // Fetch property data
        const propertyRes = await axios.get(`https://townmanor.ai/api/coliving/${propertyId}`);
        setPropertyData(propertyRes.data);

        setPaymentData(paymentDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsUpdating(false);
      }
    };

    fetchReceiptData();
  }, []);

  if (isUpdating) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <div className="payment-success-loading">
            <div className="payment-success-spinner"></div>
            <p>Updating your booking status...</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper to download PDF receipt
  const handleDownloadReceipt = () => {
    const room = roomData?.data || {};
    const property = propertyData || {};
    const payment = paymentData || {};
    const booking = bookingData || {};
    const today = new Date();
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Payment Receipt', 14, 16);

    // Date
    doc.setFontSize(12);
    doc.text(`Date: ${today.toLocaleString()}`, 14, 26);

    // Property Details
    doc.setFontSize(14);
    doc.text('Property Details', 14, 36);
    doc.setFontSize(12);
    doc.text(`Name: ${property.property_name || ''}`, 14, 44);
    doc.text(`Address: ${property.address || ''}`, 14, 52);
    doc.text(`Configuration: ${property.configuration || ''}`, 14, 60);

    // Room Details
    doc.setFontSize(14);
    doc.text('Room Details', 14, 72);
    doc.setFontSize(12);
    // doc.text(`Room Name: ${room.property_name || ''}`, 14, 80);
    doc.text(`Room ID: ${room.id || ''}`, 14, 88);
    doc.text(`Price: ₹${booking.price}`, 14, 96);
    doc.text(`Bedroom: ${room.bedroom || ''}`, 14, 104);
    doc.text(`Bathroom: ${room.bathroom || ''}`, 14, 112);
    doc.text(`Start Date: ${booking.start_date || ''}`, 14, 118); 
    doc.text(`End Date: ${booking.end_date || ''}`, 14, 126); 

    // User Details
    doc.setFontSize(14);
    doc.text('User Details', 14, 130);
    doc.setFontSize(12);
    doc.text(`Name: ${booking.username || room.user_name || payment.payerName || ''}`, 14, 138);
    doc.text(`Phone: ${booking.phoneverification || ''}`, 14, 146);
    doc.text(`Aadhar: ${booking.adhar_detail || ''}`, 14, 154);

    // Payment Details
    doc.setFontSize(14);
    doc.text('Payment Details', 14, 160);
    doc.setFontSize(12);
    doc.text(`Amount: ₹${booking.price || payment.amount || room.price || ''}`, 14, 168);
    // doc.text(`Transaction ID: ${payment.transactionId || ''}`, 14, 176);

    // Thank you
    doc.setFontSize(12);
    doc.text('Thank you for your booking at Town Manor!', 14, 190);

    // Save PDF
    doc.save('payment_receipt.pdf');
  };


  if (error) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <div className="payment-success-error">
            <FaCheckCircle className="payment-success-icon error" />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              className="payment-success-button"
              onClick={() => navigate('/newcoliving')}
            >
              Return to Coliving
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <div className="payment-success-message">
          <FaCheckCircle className="payment-success-icon success" />
          <h2>Payment Successful!</h2>
          <p>Your coliving room has been successfully booked.</p>
          <div className="payment-success-details">
            <p>Thank you for choosing our coliving space.</p>
            <p>You will receive a confirmation email shortly.</p>
          </div>
          <button 
            className="payment-success-button"
            onClick={() => navigate('/newcoliving')}
          >
            <FaHome className="button-icon" />
            Return to Coliving
          </button>
          {/* Download Receipt Button */}
          {(roomData && propertyData) && (
            <button
              className="payment-success-button"
              style={{marginTop: '16px', background: '#4caf50'}} 
              onClick={handleDownloadReceipt}
            >
              Download Payment Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColivingPaymentSuccess;